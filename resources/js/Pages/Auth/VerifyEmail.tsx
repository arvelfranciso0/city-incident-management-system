import AuthLayout from '@/Layouts/AuthLayout';
import { AuthFooterLink, AuthStatus } from '@/Components/cims/AuthForm';
import { portalPrimaryBtnClass } from '@/Components/cims/PublicUi';
import { Button } from '@/Components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import { type FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <AuthLayout
            title="Verify your email"
            description="Before getting started, please verify your email address using the link we sent you."
        >
            <Head title="Email Verification" />

            <div className="space-y-5">
                {status === 'verification-link-sent' && (
                    <AuthStatus message="A new verification link has been sent to your email address." />
                )}

                <p className="text-sm leading-relaxed text-muted-foreground">
                    Didn&apos;t receive the email? Click below and we&apos;ll send another one.
                </p>

                <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Button type="submit" disabled={processing} className={portalPrimaryBtnClass}>
                        Resend verification email
                    </Button>
                    <AuthFooterLink href={route('logout')} method="post" as="button">
                        Sign out
                    </AuthFooterLink>
                </form>
            </div>
        </AuthLayout>
    );
}

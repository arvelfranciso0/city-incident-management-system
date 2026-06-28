import AuthLayout from '@/Layouts/AuthLayout';
import { AuthField, AuthFooterLink, AuthStatus } from '@/Components/cims/AuthForm';
import { portalPrimaryBtnClass } from '@/Components/cims/PublicUi';
import { Button } from '@/Components/ui/button';
import { Head, useForm } from '@inertiajs/react';
import { type FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AuthLayout
            title="Reset password"
            description="Enter your email and we'll send you a link to choose a new password."
        >
            <Head title="Forgot Password" />

            <form onSubmit={submit} className="space-y-5">
                {status && <AuthStatus message={status} />}

                <AuthField
                    id="email"
                    label="Email"
                    type="email"
                    value={data.email}
                    error={errors.email}
                    autoComplete="username"
                    autoFocus
                    onChange={(value) => setData('email', value)}
                />

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <AuthFooterLink href={route('login')}>Back to sign in</AuthFooterLink>
                    <Button type="submit" disabled={processing} className={portalPrimaryBtnClass}>
                        Send reset link
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}

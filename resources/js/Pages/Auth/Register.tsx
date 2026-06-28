import { useEffect, type FormEventHandler } from 'react';
import AuthLayout from '@/Layouts/AuthLayout';
import { AuthField, AuthFooterLink } from '@/Components/cims/AuthForm';
import { portalPrimaryBtnClass } from '@/Components/cims/PublicUi';
import { Button } from '@/Components/ui/button';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => reset('password', 'password_confirmation');
    }, [reset]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <AuthLayout
            title="Create account"
            description="Register to track incidents, receive updates, and manage your reports."
        >
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-4">
                <AuthField
                    id="name"
                    label="Full name"
                    value={data.name}
                    error={errors.name}
                    autoComplete="name"
                    autoFocus
                    required
                    onChange={(value) => setData('name', value)}
                />

                <AuthField
                    id="email"
                    label="Email"
                    type="email"
                    value={data.email}
                    error={errors.email}
                    autoComplete="username"
                    required
                    onChange={(value) => setData('email', value)}
                />

                <AuthField
                    id="password"
                    label="Password"
                    type="password"
                    value={data.password}
                    error={errors.password}
                    autoComplete="new-password"
                    required
                    onChange={(value) => setData('password', value)}
                />

                <AuthField
                    id="password_confirmation"
                    label="Confirm password"
                    type="password"
                    value={data.password_confirmation}
                    error={errors.password_confirmation}
                    autoComplete="new-password"
                    required
                    onChange={(value) => setData('password_confirmation', value)}
                />

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <AuthFooterLink href={route('login')}>Already have an account?</AuthFooterLink>
                    <Button type="submit" disabled={processing} className={`sm:min-w-28 ${portalPrimaryBtnClass}`}>
                        Register
                    </Button>
                </div>

                <p className="text-center text-xs text-muted-foreground">
                    By registering you agree to our{' '}
                    <Link href={route('public.terms')} className="underline underline-offset-2 hover:text-foreground">
                        Terms
                    </Link>{' '}
                    and{' '}
                    <Link href={route('public.privacy')} className="underline underline-offset-2 hover:text-foreground">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </form>
        </AuthLayout>
    );
}

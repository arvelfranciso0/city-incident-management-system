import { useEffect, type FormEventHandler } from 'react';
import AuthLayout from '@/Layouts/AuthLayout';
import { AuthField, AuthFooterLink, AuthStatus } from '@/Components/cims/AuthForm';
import { portalPrimaryBtnClass } from '@/Components/cims/PublicUi';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    useEffect(() => {
        return () => reset('password');
    }, [reset]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <AuthLayout
            title="Sign in"
            description="Access your citizen portal to track and manage incident reports."
        >
            <Head title="Sign in" />

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

                <AuthField
                    id="password"
                    label="Password"
                    type="password"
                    value={data.password}
                    error={errors.password}
                    autoComplete="current-password"
                    onChange={(value) => setData('password', value)}
                />

                <div className="flex items-center gap-2">
                    <input
                        id="remember"
                        type="checkbox"
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="size-4 rounded border-input text-primary focus:ring-ring/30"
                    />
                    <Label htmlFor="remember" className="font-normal text-muted-foreground">
                        Remember me
                    </Label>
                </div>

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    {canResetPassword ? (
                        <AuthFooterLink href={route('password.request')}>
                            Forgot password?
                        </AuthFooterLink>
                    ) : (
                        <span />
                    )}
                    <Button type="submit" disabled={processing} className={cn('sm:min-w-28', portalPrimaryBtnClass)}>
                        Sign in
                    </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    No account?{' '}
                    <Link href={route('register')} className="font-medium text-foreground hover:underline">
                        Create one
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}

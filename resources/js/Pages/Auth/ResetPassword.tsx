import { useEffect, type FormEventHandler } from 'react';
import AuthLayout from '@/Layouts/AuthLayout';
import { AuthField } from '@/Components/cims/AuthForm';
import { portalPrimaryBtnClass } from '@/Components/cims/PublicUi';
import { Button } from '@/Components/ui/button';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => reset('password', 'password_confirmation');
    }, [reset]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <AuthLayout
            title="Set new password"
            description="Choose a strong password for your account."
        >
            <Head title="Reset Password" />

            <form onSubmit={submit} className="space-y-4">
                <AuthField
                    id="email"
                    label="Email"
                    type="email"
                    value={data.email}
                    error={errors.email}
                    autoComplete="username"
                    onChange={(value) => setData('email', value)}
                />

                <AuthField
                    id="password"
                    label="New password"
                    type="password"
                    value={data.password}
                    error={errors.password}
                    autoComplete="new-password"
                    autoFocus
                    onChange={(value) => setData('password', value)}
                />

                <AuthField
                    id="password_confirmation"
                    label="Confirm password"
                    type="password"
                    value={data.password_confirmation}
                    error={errors.password_confirmation}
                    autoComplete="new-password"
                    onChange={(value) => setData('password_confirmation', value)}
                />

                <div className="flex justify-end pt-2">
                    <Button type="submit" disabled={processing} className={`min-w-32 ${portalPrimaryBtnClass}`}>
                        Reset password
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}

import { useEffect, type FormEventHandler } from 'react';
import AuthLayout from '@/Layouts/AuthLayout';
import { AuthField } from '@/Components/cims/AuthForm';
import { portalPrimaryBtnClass } from '@/Components/cims/PublicUi';
import { Button } from '@/Components/ui/button';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => reset('password');
    }, [reset]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.confirm'));
    };

    return (
        <AuthLayout
            title="Confirm password"
            description="This is a secure area. Please confirm your password before continuing."
        >
            <Head title="Confirm Password" />

            <form onSubmit={submit} className="space-y-5">
                <AuthField
                    id="password"
                    label="Password"
                    type="password"
                    value={data.password}
                    error={errors.password}
                    autoComplete="current-password"
                    autoFocus
                    onChange={(value) => setData('password', value)}
                />

                <div className="flex justify-end pt-1">
                    <Button type="submit" disabled={processing} className={portalPrimaryBtnClass}>
                        Confirm
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}

import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';
import { PublicCard, PublicPageShell, portalPrimaryBtnClass } from '@/Components/cims/PublicUi';
import { IconUser, IconUserQuestion } from '@tabler/icons-react';

export default function ChooseType() {
    return (
        <PublicLayout>
            <Head title="Choose Report Type" />
            <PublicPageShell
                wide
                title="Report an Incident"
                description="Choose how you'd like to submit your report."
            >
                <div className="mt-0 grid gap-6 sm:grid-cols-2">
                    <PublicCard padding="lg" className="flex flex-col">
                        <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-portal-secondary-container text-portal-primary">
                            <IconUserQuestion className="size-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-portal-primary">Guest Report</h2>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-portal-on-surface-variant">
                            Quick report without an account. You&apos;ll receive a tracking number via email.
                        </p>
                        <Button className={`mt-6 w-full ${portalPrimaryBtnClass}`} asChild>
                            <Link href={route('report.guest')}>Continue as Guest</Link>
                        </Button>
                    </PublicCard>
                    <PublicCard padding="lg" className="flex flex-col">
                        <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-portal-secondary-container text-portal-primary">
                            <IconUser className="size-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-portal-primary">Citizen Account</h2>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-portal-on-surface-variant">
                            Log in to track all your reports, receive notifications, and upload additional evidence.
                        </p>
                        <div className="mt-6 space-y-2">
                            <Button className={`w-full ${portalPrimaryBtnClass}`} asChild>
                                <Link href={route('login')}>Log In & Report</Link>
                            </Button>
                            <Button variant="outline" className="w-full border-portal-outline-variant" asChild>
                                <Link href={route('register')}>Create Account</Link>
                            </Button>
                        </div>
                    </PublicCard>
                </div>
            </PublicPageShell>
        </PublicLayout>
    );
}

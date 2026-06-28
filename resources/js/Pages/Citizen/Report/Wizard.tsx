import { Head, Link, usePage } from '@inertiajs/react';
import CitizenLayout from '@/Layouts/CitizenLayout';
import IncidentReportWizard, { type IncidentReportFormData } from '@/Components/cims/IncidentReportWizard';
import { PublicPageShell, portalPrimaryBtnClass } from '@/Components/cims/PublicUi';
import { Button } from '@/Components/ui/button';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import type { Category, Notification } from '@/types/cims';

export default function Wizard({
    categories,
    notifications,
}: {
    categories: Category[];
    notifications: Notification[];
}) {
    const { props } = usePage<{ auth: { user: { name: string; email: string } } }>();
    const user = props.auth?.user;
    const [submitted, setSubmitted] = useState(false);

    if (submitted) {
        return (
            <CitizenLayout notifications={notifications}>
                <Head title="Report Submitted" />
                <div className="mx-auto max-w-lg px-6 py-16 text-center">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <IconCheck className="size-8" />
                    </div>
                    <h1 className="mt-6 text-2xl font-semibold text-portal-primary">
                        Report Submitted Successfully
                    </h1>
                    <p className="mt-2 text-portal-on-surface-variant">Your incident has been logged as:</p>
                    <p className="mt-2 font-mono text-xl font-bold text-portal-primary">INC-2026-00450</p>
                    <p className="mt-4 text-sm text-portal-on-surface-variant">
                        You will receive status updates at {user?.email}.
                    </p>
                    <Button className={`mt-8 ${portalPrimaryBtnClass}`} asChild>
                        <Link href={route('citizen.incidents.index')}>View My Incidents</Link>
                    </Button>
                </div>
            </CitizenLayout>
        );
    }

    return (
        <CitizenLayout notifications={notifications}>
            <Head title="Report Incident" />
            <PublicPageShell
                wide
                className="max-w-2xl"
                title="Report Incident"
                description="Submit a new incident to the city using the same guided flow as the public portal."
            >
                <IncidentReportWizard
                    categories={categories}
                    variant="citizen"
                    initialContact={{
                        name: user?.name ?? '',
                        email: user?.email ?? '',
                    }}
                    onComplete={(_form: IncidentReportFormData) => setSubmitted(true)}
                />
            </PublicPageShell>
        </CitizenLayout>
    );
}

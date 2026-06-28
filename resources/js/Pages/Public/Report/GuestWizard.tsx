import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import IncidentReportWizard from '@/Components/cims/IncidentReportWizard';
import { PublicPageShell, portalPrimaryBtnClass } from '@/Components/cims/PublicUi';
import { Button } from '@/Components/ui/button';
import { IconCheck } from '@tabler/icons-react';
import type { Category, Priority } from '@/types/cims';

interface ReportSubmittedFlash {
    trackingNumber: string;
    reference: string;
    email: string;
}

export default function GuestWizard({
    categories,
    priorities,
}: {
    categories: Category[];
    priorities: Priority[];
}) {
    const { flash } = usePage<{ flash: { reportSubmitted?: ReportSubmittedFlash } }>().props;
    const submitted = flash.reportSubmitted;

    if (submitted) {
        return (
            <PublicLayout>
                <Head title="Report Submitted" />
                <div className="mx-auto max-w-lg px-6 py-16 text-center">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <IconCheck className="size-8" />
                    </div>
                    <h1 className="mt-6 text-2xl font-semibold text-portal-primary">
                        Report Submitted Successfully
                    </h1>
                    <p className="mt-2 text-portal-on-surface-variant">Your reference number is:</p>
                    <p className="mt-2 font-mono text-xl font-bold text-portal-primary">
                        {submitted.reference}
                    </p>
                    <p className="mt-2 text-sm text-portal-on-surface-variant">
                        Tracking number:{' '}
                        <span className="font-mono font-medium">{submitted.trackingNumber}</span>
                    </p>
                    <p className="mt-4 text-sm text-portal-on-surface-variant">
                        A confirmation email has been sent to {submitted.email}.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Button className={portalPrimaryBtnClass} asChild>
                            <Link href={route('report.show', submitted.trackingNumber)}>View Report</Link>
                        </Button>
                        <Button variant="outline" className="border-portal-outline-variant" asChild>
                            <Link href={route('report.track')}>Track Another</Link>
                        </Button>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title="Guest Report" />
            <PublicPageShell wide className="max-w-2xl" title="Guest Incident Report">
                <IncidentReportWizard
                    categories={categories}
                    priorities={priorities}
                    variant="guest"
                />
            </PublicPageShell>
        </PublicLayout>
    );
}

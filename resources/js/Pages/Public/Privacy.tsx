import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { PublicPageShell } from '@/Components/cims/PublicUi';

function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <PublicLayout>
            <Head title={title} />
            <PublicPageShell title={title} meta="Last updated: June 1, 2026">
                <div className="space-y-8 text-portal-on-surface-variant">{children}</div>
            </PublicPageShell>
        </PublicLayout>
    );
}

export function Privacy() {
    return (
        <LegalPage title="Privacy Policy">
            <section>
                <h2 className="text-lg font-semibold text-portal-primary">Information We Collect</h2>
                <p className="mt-2 text-sm leading-relaxed">We collect information you provide when reporting incidents, including contact details, location data, and uploaded evidence.</p>
            </section>
            <section>
                <h2 className="text-lg font-semibold text-portal-primary">How We Use Your Data</h2>
                <p className="mt-2 text-sm leading-relaxed">Your data is used solely to process and resolve incident reports, communicate status updates, and improve city services.</p>
            </section>
            <section>
                <h2 className="text-lg font-semibold text-portal-primary">Data Retention</h2>
                <p className="mt-2 text-sm leading-relaxed">Incident records are retained for 7 years per municipal records policy, after which they are anonymized or securely deleted.</p>
            </section>
        </LegalPage>
    );
}

export default Privacy;

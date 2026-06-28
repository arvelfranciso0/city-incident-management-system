import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { PublicPageShell } from '@/Components/cims/PublicUi';

export default function Terms() {
    return (
        <PublicLayout>
            <Head title="Terms & Conditions" />
            <PublicPageShell title="Terms & Conditions" meta="Last updated: June 1, 2026">
                <div className="space-y-8 text-portal-on-surface-variant">
                    <section>
                        <h2 className="text-lg font-semibold text-portal-primary">Acceptance of Terms</h2>
                        <p className="mt-2 text-sm leading-relaxed">By using CIMS, you agree to these terms and our Privacy Policy.</p>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-portal-primary">Acceptable Use</h2>
                        <p className="mt-2 text-sm leading-relaxed">Reports must be truthful and related to legitimate municipal service requests. False or abusive reports may result in account suspension.</p>
                    </section>
                    <section>
                        <h2 className="text-lg font-semibold text-portal-primary">Emergency Services</h2>
                        <p className="mt-2 text-sm leading-relaxed">CIMS is not for emergencies. Call 911 for life-threatening situations.</p>
                    </section>
                </div>
            </PublicPageShell>
        </PublicLayout>
    );
}

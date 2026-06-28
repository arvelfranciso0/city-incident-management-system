import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { PublicCard, PublicPageShell } from '@/Components/cims/PublicUi';

export default function About() {
    return (
        <PublicLayout>
            <Head title="About" />
            <PublicPageShell
                title="About CIMS"
                description="The City Incident Management System is Metroville's official platform for reporting and tracking non-emergency municipal service requests."
            >
                <div className="space-y-4">
                    <PublicCard>
                        <h2 className="text-lg font-semibold text-portal-primary">Our Mission</h2>
                        <p className="mt-2 text-sm leading-relaxed text-portal-on-surface-variant">
                            To provide transparent, efficient, and accessible incident reporting that strengthens the relationship between citizens and city government.
                        </p>
                    </PublicCard>
                    <PublicCard>
                        <h2 className="text-lg font-semibold text-portal-primary">Departments Served</h2>
                        <p className="mt-2 text-sm leading-relaxed text-portal-on-surface-variant">
                            Public Works, Sanitation, Electrical Services, Parks & Recreation, and more — all connected through a unified workflow.
                        </p>
                    </PublicCard>
                </div>
            </PublicPageShell>
        </PublicLayout>
    );
}

import { Head } from '@inertiajs/react';
import StaffLayout from '@/Layouts/StaffLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { MapPlaceholder } from '@/Components/cims/IncidentTimeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import type { Incident, Notification } from '@/types/cims';

export default function ClusterMap({ incidents, notifications }: { incidents: Incident[]; notifications: Notification[] }) {
    return (
        <StaffLayout notifications={notifications}>
            <Head title="Cluster Map" />
            <PageHeader title="Incident Cluster Map" description="Grouped incident locations for route planning." />
            <MapPlaceholder title="Cluster Map View" className="mt-6" />
            <Card className="mt-6">
                <CardHeader><CardTitle>Active Clusters</CardTitle></CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-3">
                    {['Downtown (12)', 'Westside (8)', 'Industrial (5)'].map((cluster) => (
                        <div key={cluster} className="rounded-lg border border-border p-4 text-center"><p className="font-medium">{cluster}</p><p className="text-xs text-muted-foreground">incidents</p></div>
                    ))}
                </CardContent>
            </Card>
        </StaffLayout>
    );
}

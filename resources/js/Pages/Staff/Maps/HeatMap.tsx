import { Head } from '@inertiajs/react';
import StaffLayout from '@/Layouts/StaffLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { MapPlaceholder } from '@/Components/cims/IncidentTimeline';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import type { Incident, Notification } from '@/types/cims';

export default function HeatMap({ incidents, notifications }: { incidents: Incident[]; notifications: Notification[] }) {
    return (
        <StaffLayout notifications={notifications}>
            <Head title="Heat Map" />
            <PageHeader title="Incident Heat Map" description="Visualize incident density across the city." />
            <MapPlaceholder title="Incident Heat Map" className="mt-6" />
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {incidents.map((inc) => (
                    <Card key={inc.id}><CardContent className="flex items-center justify-between pt-4">
                        <div><p className="text-sm font-medium">{inc.title}</p><p className="text-xs text-muted-foreground">{inc.location}</p></div>
                        <Badge>{inc.priority}</Badge>
                    </CardContent></Card>
                ))}
            </div>
        </StaffLayout>
    );
}

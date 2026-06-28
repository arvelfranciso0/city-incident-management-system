import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { IncidentHeatMap } from '@/Components/cims/IncidentHeatMap';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import type { Incident } from '@/types/cims';

export default function HeatMap({ incidents }: { incidents: Incident[] }) {
    const listed = incidents.filter((inc) => !inc.id.startsWith('INC-HEAT-'));

    return (
        <AdminLayout>
            <Head title="City Heat Map" />
            <PageHeader title="City Incident Heat Map" description="Executive view of incident density city-wide." />
            <div className="mt-6">
                <IncidentHeatMap incidents={incidents} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Density legend:</span>
                <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded-full bg-yellow-200" /> Low</span>
                <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded-full bg-orange-400" /> Medium</span>
                <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded-full bg-red-600" /> High</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {listed.map((inc) => (
                    <Link key={inc.id} href={route('admin.incidents.show', inc.id)}>
                        <Card className="transition-colors hover:border-primary/40 hover:bg-muted/30">
                            <CardContent className="flex items-center justify-between pt-4">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">{inc.title}</p>
                                    <p className="truncate text-xs text-muted-foreground">{inc.department}</p>
                                </div>
                                <Badge className="shrink-0">{inc.priority}</Badge>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </AdminLayout>
    );
}

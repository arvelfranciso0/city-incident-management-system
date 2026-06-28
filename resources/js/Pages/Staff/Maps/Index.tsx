import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import StaffLayout from '@/Layouts/StaffLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { IncidentHeatMap } from '@/Components/cims/IncidentHeatMap';
import { IncidentClusterMap, computeIncidentClusters } from '@/Components/cims/IncidentClusterMap';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Badge } from '@/Components/ui/badge';
import type { Incident, Notification } from '@/types/cims';

export default function MapsIndex({
    incidents,
    notifications,
    defaultView = 'heat',
}: {
    incidents: Incident[];
    notifications: Notification[];
    defaultView?: 'heat' | 'cluster';
}) {
    const [view, setView] = useState<'heat' | 'cluster'>(defaultView);
    const listed = incidents.filter((inc) => inc.lat != null && inc.lng != null && !inc.id.startsWith('INC-HEAT-'));
    const clusters = computeIncidentClusters(listed);

    return (
        <StaffLayout notifications={notifications}>
            <Head title="Incident Maps" />
            <PageHeader
                title="Incident Maps"
                description="Switch between heat density and clustered marker views for route planning."
            />

            <Tabs value={view} onValueChange={(v) => setView(v as 'heat' | 'cluster')} className="mt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <TabsList>
                        <TabsTrigger value="heat">Heat Map</TabsTrigger>
                        <TabsTrigger value="cluster">Cluster Map</TabsTrigger>
                    </TabsList>
                    <p className="text-sm text-muted-foreground">{listed.length} mapped incidents</p>
                </div>

                <TabsContent value="heat" className="mt-4 space-y-4">
                    <IncidentHeatMap incidents={incidents} />
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">Density:</span>
                        <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded-full bg-yellow-200" /> Low</span>
                        <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded-full bg-orange-400" /> Medium</span>
                        <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded-full bg-red-600" /> High</span>
                    </div>
                </TabsContent>

                <TabsContent value="cluster" className="mt-4 space-y-4">
                    <IncidentClusterMap incidents={listed} />
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Active Clusters</CardTitle>
                            <CardDescription>Grouped by neighborhood for crew dispatch</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {clusters.map((cluster) => (
                                <div key={cluster.name} className="rounded-lg border border-border p-4 text-center">
                                    <p className="text-2xl font-bold tabular-nums">{cluster.count}</p>
                                    <p className="mt-1 text-sm font-medium">{cluster.name}</p>
                                    <p className="text-xs text-muted-foreground">incidents</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-base">Incident Locations</CardTitle>
                    <CardDescription>Click an incident to manage details</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {listed.map((inc) => (
                        <Link key={inc.id} href={route('staff.incidents.show', inc.id)}>
                            <div className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:border-primary/30 hover:bg-muted/30">
                                <div className="min-w-0 pr-3">
                                    <p className="truncate text-sm font-medium">{inc.title}</p>
                                    <p className="truncate text-xs text-muted-foreground">{inc.location}</p>
                                </div>
                                <Badge className="shrink-0 capitalize">{inc.priority}</Badge>
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        </StaffLayout>
    );
}

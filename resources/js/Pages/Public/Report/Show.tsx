import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Button } from '@/Components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { PublicCard, PublicPageShell } from '@/Components/cims/PublicUi';
import { StatusBadge, PriorityBadge } from '@/Components/cims/StatusBadge';
import { IncidentTimeline } from '@/Components/cims/IncidentTimeline';
import { ImageGallery } from '@/Components/cims/ImageGallery';
import type { Incident, TimelineEvent } from '@/types/cims';

export default function Show({ incident, timeline }: { incident: Incident; timeline: TimelineEvent[] }) {
    return (
        <PublicLayout>
            <Head title={`Report ${incident.trackingNumber}`} />
            <PublicPageShell wide className="max-w-4xl">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p className="font-mono text-sm text-portal-outline">{incident.trackingNumber}</p>
                        <h1 className="text-2xl font-semibold tracking-tight text-portal-primary">{incident.title}</h1>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <StatusBadge status={incident.status} />
                            <PriorityBadge priority={incident.priority} />
                        </div>
                    </div>
                    <Button variant="outline" className="border-portal-outline-variant" asChild>
                        <Link href={route('report.track')}>Track Another</Link>
                    </Button>
                </div>

                <Tabs defaultValue="details" className="mt-8">
                    <TabsList className="bg-portal-surface-container">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                        <TabsTrigger value="evidence">Evidence</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                        <PublicCard className="grid gap-4 sm:grid-cols-2">
                            <div><p className="text-xs font-semibold uppercase tracking-wider text-portal-outline">Category</p><p className="mt-1 font-medium text-portal-on-surface">{incident.category}</p></div>
                            <div><p className="text-xs font-semibold uppercase tracking-wider text-portal-outline">Location</p><p className="mt-1 font-medium text-portal-on-surface">{incident.location}</p></div>
                            <div><p className="text-xs font-semibold uppercase tracking-wider text-portal-outline">Department</p><p className="mt-1 font-medium text-portal-on-surface">{incident.department}</p></div>
                            <div><p className="text-xs font-semibold uppercase tracking-wider text-portal-outline">Assigned To</p><p className="mt-1 font-medium text-portal-on-surface">{incident.assignedTo ?? 'Pending assignment'}</p></div>
                            <div className="sm:col-span-2"><p className="text-xs font-semibold uppercase tracking-wider text-portal-outline">Description</p><p className="mt-1 font-medium text-portal-on-surface">{incident.description}</p></div>
                        </PublicCard>
                    </TabsContent>
                    <TabsContent value="timeline">
                        <PublicCard>
                            <h2 className="mb-4 text-lg font-semibold text-portal-primary">Status Timeline</h2>
                            <IncidentTimeline events={timeline} />
                        </PublicCard>
                    </TabsContent>
                    <TabsContent value="evidence">
                        <ImageGallery images={[{ src: 'https://picsum.photos/400/400?random=1', alt: 'Evidence 1' }, { src: 'https://picsum.photos/400/400?random=2', alt: 'Evidence 2' }]} />
                    </TabsContent>
                </Tabs>
            </PublicPageShell>
        </PublicLayout>
    );
}

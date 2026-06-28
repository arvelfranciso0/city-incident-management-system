import { Head, Link } from '@inertiajs/react';
import CitizenLayout from '@/Layouts/CitizenLayout';
import { StatusBadge, PriorityBadge } from '@/Components/cims/StatusBadge';
import { IncidentTimeline } from '@/Components/cims/IncidentTimeline';
import { ImageGallery } from '@/Components/cims/ImageGallery';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import type { Incident, Notification, TimelineEvent } from '@/types/cims';

export default function Show({ incident, timeline, notifications }: { incident: Incident; timeline: TimelineEvent[]; notifications: Notification[] }) {
    return (
        <CitizenLayout notifications={notifications}>
            <Head title={incident.title} />
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="font-mono text-sm text-muted-foreground">{incident.id}</p>
                    <h1 className="text-2xl font-bold">{incident.title}</h1>
                    <div className="mt-2 flex flex-wrap gap-2"><StatusBadge status={incident.status} /><PriorityBadge priority={incident.priority} /></div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" asChild><Link href={route('citizen.incidents.upload', incident.id)}>Upload Evidence</Link></Button>
                    {incident.status === 'resolved' && <Button asChild><Link href={route('citizen.incidents.feedback', incident.id)}>Submit Feedback</Link></Button>}
                </div>
            </div>
            <Tabs defaultValue="details" className="mt-6">
                <TabsList><TabsTrigger value="details">Details</TabsTrigger><TabsTrigger value="timeline">Timeline</TabsTrigger><TabsTrigger value="evidence">Evidence</TabsTrigger></TabsList>
                <TabsContent value="details"><Card><CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
                    <div><p className="text-sm text-muted-foreground">Location</p><p>{incident.location}</p></div>
                    <div><p className="text-sm text-muted-foreground">Department</p><p>{incident.department}</p></div>
                    <div><p className="text-sm text-muted-foreground">Assigned To</p><p>{incident.assignedTo ?? 'Pending'}</p></div>
                    <div><p className="text-sm text-muted-foreground">Reported</p><p>{new Date(incident.reportedAt).toLocaleDateString()}</p></div>
                    <div className="sm:col-span-2"><p className="text-sm text-muted-foreground">Description</p><p>{incident.description}</p></div>
                </CardContent></Card></TabsContent>
                <TabsContent value="timeline"><Card><CardHeader><CardTitle>Incident Timeline</CardTitle></CardHeader><CardContent><IncidentTimeline events={timeline} /></CardContent></Card></TabsContent>
                <TabsContent value="evidence"><ImageGallery images={[{ src: 'https://picsum.photos/400/400?random=3', alt: 'Evidence' }]} /></TabsContent>
            </Tabs>
        </CitizenLayout>
    );
}

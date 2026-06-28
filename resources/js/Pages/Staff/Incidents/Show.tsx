import { Head, Link } from '@inertiajs/react';
import StaffLayout from '@/Layouts/StaffLayout';
import { StatusBadge, PriorityBadge } from '@/Components/cims/StatusBadge';
import { IncidentTimeline } from '@/Components/cims/IncidentTimeline';
import { IncidentHeatMap } from '@/Components/cims/IncidentHeatMap';
import { ResolutionUploadPanel } from '@/Components/cims/ResolutionUploadPanel';
import { ConfirmationDialog } from '@/Components/cims/ConfirmationDialog';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Progress } from '@/Components/ui/progress';
import { Badge } from '@/Components/ui/badge';
import { Separator } from '@/Components/ui/separator';
import {
    IconCalendar,
    IconClock,
    IconMapPin,
    IconPhone,
    IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';
import type { Incident, Notification, TimelineEvent } from '@/types/cims';

const STATUS_PROGRESS: Record<string, number> = {
    open: 20,
    pending: 35,
    in_progress: 60,
    resolved: 90,
    closed: 100,
};

const SLA_HOURS: Record<string, number> = {
    critical: 4,
    high: 24,
    medium: 72,
    low: 168,
};

export default function Show({ incident, timeline, notifications }: { incident: Incident; timeline: TimelineEvent[]; notifications: Notification[] }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [status, setStatus] = useState(incident.status);
    const progress = STATUS_PROGRESS[status] ?? 25;
    const slaHours = SLA_HOURS[incident.priority] ?? 72;

    return (
        <StaffLayout notifications={notifications}>
            <Head title={incident.title} />

            <div className="mb-2">
                <Button variant="ghost" size="sm" asChild className="-ml-2 text-muted-foreground">
                    <Link href={route('staff.incidents.index')}>← Back to Incidents</Link>
                </Button>
            </div>

            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="font-mono text-sm text-muted-foreground">{incident.id}</p>
                    <h1 className="text-2xl font-bold">{incident.title}</h1>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <StatusBadge status={status} />
                        <PriorityBadge priority={incident.priority} />
                        <Badge variant="outline">{incident.category}</Badge>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Dialog>
                        <DialogTrigger asChild><Button>Update Status</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Update Status</DialogTitle></DialogHeader>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>New Status</Label>
                                    <Select value={status} onValueChange={setStatus}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="open">Open</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="resolved">Resolved</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2"><Label>Note</Label><Textarea placeholder="Add a status note visible in timeline..." /></div>
                                <Button onClick={() => setConfirmOpen(true)}>Update Status</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <ConfirmationDialog open={confirmOpen} onOpenChange={setConfirmOpen} title="Confirm Status Update" description="This will notify the reporter and update the incident timeline." onConfirm={() => setConfirmOpen(false)} />

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Resolution Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="capitalize text-muted-foreground">{status.replace('_', ' ')}</span>
                            <span className="font-medium">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                            Last updated {new Date(incident.updatedAt).toLocaleString()}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <IconClock className="size-4" />
                            SLA Target
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold tabular-nums">{slaHours}h</p>
                        <p className="text-xs text-muted-foreground capitalize">{incident.priority} priority response window</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="details" className="mt-6">
                <TabsList className="flex h-auto flex-wrap">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="notes">Internal Notes</TabsTrigger>
                    <TabsTrigger value="resolution">Resolution</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-base">Incident Details</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 sm:grid-cols-2">
                                <DetailField icon={IconUser} label="Reporter" value={incident.reporter} />
                                <DetailField icon={IconMapPin} label="Location" value={incident.location} />
                                <DetailField label="Department" value={incident.department} />
                                <DetailField label="Assigned To" value={incident.assignedTo ?? 'Unassigned'} />
                                <DetailField label="Category" value={incident.category} />
                                <DetailField label="Tracking #" value={incident.trackingNumber} mono />
                                <DetailField icon={IconCalendar} label="Reported" value={new Date(incident.reportedAt).toLocaleString()} />
                                <DetailField icon={IconCalendar} label="Last Updated" value={new Date(incident.updatedAt).toLocaleString()} />
                                <div className="sm:col-span-2">
                                    <p className="text-sm text-muted-foreground">Description</p>
                                    <p className="mt-1">{incident.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Reporter Contact</CardTitle>
                                <CardDescription>For follow-up if needed</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <IconUser className="size-4 text-muted-foreground" />
                                    {incident.reporter}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <IconPhone className="size-4" />
                                    Contact via portal messaging
                                </div>
                                <Separator />
                                <p className="text-xs text-muted-foreground">
                                    Tracking: <span className="font-mono">{incident.trackingNumber}</span>
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="location">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Incident Location</CardTitle>
                            <CardDescription>{incident.location}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {incident.lat && incident.lng ? (
                                <IncidentHeatMap incidents={[incident]} showMarkers height={360} />
                            ) : (
                                <p className="text-sm text-muted-foreground">No coordinates available for this incident.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="timeline">
                    <Card>
                        <CardHeader><CardTitle className="text-base">Activity Timeline</CardTitle></CardHeader>
                        <CardContent><IncidentTimeline events={timeline} /></CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notes">
                    <Card>
                        <CardHeader><CardTitle className="text-base">Internal Notes</CardTitle><CardDescription>Not visible to citizens</CardDescription></CardHeader>
                        <CardContent className="space-y-4">
                            <Textarea placeholder="Add internal note..." rows={4} />
                            <Button>Add Note</Button>
                            <div className="rounded-lg border border-border p-4 text-sm">
                                <p className="font-medium">Sarah Chen · Jun 22, 2026</p>
                                <p className="mt-1 text-muted-foreground">Materials ordered for repair. Crew scheduled for next business day.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="resolution">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Resolution Photos</CardTitle>
                            <CardDescription>Upload proof of completed work, then click Save Resolution</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResolutionUploadPanel incidentId={incident.id} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </StaffLayout>
    );
}

function DetailField({
    label,
    value,
    icon: Icon,
    mono,
}: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    mono?: boolean;
}) {
    return (
        <div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                {Icon && <Icon className="size-3.5" />}
                {label}
            </div>
            <p className={`mt-1 text-sm ${mono ? 'font-mono' : ''}`}>{value}</p>
        </div>
    );
}

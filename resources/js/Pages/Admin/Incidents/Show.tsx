import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { StatusBadge, PriorityBadge } from "@/Components/cims/StatusBadge";
import { IncidentTimeline } from "@/Components/cims/IncidentTimeline";
import { PageHeader } from "@/Components/cims/PageHeader";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Progress } from "@/Components/ui/progress";
import type { Incident, TimelineEvent } from "@/types/cims";

const STATUS_PROGRESS: Record<string, number> = {
    open: 20,
    pending: 35,
    in_progress: 60,
    resolved: 90,
    closed: 100,
};

interface Props {
    incident: {
        data: Incident;
    };
    timeline: {
        data: TimelineEvent[];
    };
}

export default function Show(props: Props) {
    const incident = props.incident.data;
    const timeline = props.timeline.data;
    const progress = STATUS_PROGRESS[incident.status] ?? 25;

    console.log("Incident", incident);

    return (
        <AdminLayout>
            <Head title={incident.title} />
            <div className="mb-2">
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="-ml-2 text-muted-foreground"
                >
                    <Link
                        href={route("admin.departments.show", {
                            id: getDepartmentId(incident.department),
                        })}
                    >
                        ← Back to {incident.department}
                    </Link>
                </Button>
            </div>
            <PageHeader
                title={incident.title}
                description={`${incident.id} · Reported ${new Date(incident.reportedAt).toLocaleDateString()}`}
            />
            <div className="mt-4 flex flex-wrap gap-2">
                <StatusBadge status={incident.status} />
                <PriorityBadge priority={incident.priority} />
            </div>

            <Card className="mt-6">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                        Resolution Progress
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground capitalize">
                            {incident.status.replace("_", " ")}
                        </span>
                        <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                        Last updated{" "}
                        {new Date(incident.updatedAt).toLocaleString()}
                    </p>
                </CardContent>
            </Card>

            <Tabs defaultValue="timeline" className="mt-6">
                <TabsList>
                    <TabsTrigger value="timeline">
                        Progress Timeline
                    </TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                <TabsContent value="timeline">
                    <Card>
                        {timeline.length > 0 ? (
                            <>
                                <CardHeader>
                                    <CardTitle>Incident Timeline</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <IncidentTimeline events={timeline} />
                                </CardContent>
                            </>
                        ) : (
                            <CardContent className="flex items-center justify-center">
                                <p className="text-sm text-muted-foreground">
                                    No timeline yet.
                                </p>
                            </CardContent>
                        )}
                    </Card>
                </TabsContent>
                <TabsContent value="details">
                    <Card>
                        {incident.assignedTo ? (
                            <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Reporter
                                    </p>
                                    <p>{incident.reporter}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Department
                                    </p>
                                    <p>{incident.department}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Assigned To
                                    </p>
                                    <p>{incident.assignedTo ?? "Unassigned"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Location
                                    </p>
                                    <p>{incident.location}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Category
                                    </p>
                                    <p>{incident.category}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Tracking Number
                                    </p>
                                    <p className="font-mono text-sm">
                                        {incident.trackingNumber}
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-sm text-muted-foreground">
                                        Description
                                    </p>
                                    <p>{incident.description}</p>
                                </div>
                            </CardContent>
                        ) : (
                            <CardContent className="flex items-center justify-center">
                                <p className="text-sm text-muted-foreground">
                                    No Staff is assigned on this incident yet.
                                </p>
                            </CardContent>
                        )}
                    </Card>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
}

function getDepartmentId(name: string): number {
    const map: Record<string, number> = {
        "Public Works": 1,
        Sanitation: 2,
        "Electrical Services": 3,
        "Parks & Recreation": 4,
    };

    return map[name] ?? 1;
}

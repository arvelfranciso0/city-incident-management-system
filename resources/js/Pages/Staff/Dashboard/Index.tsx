import { Head, Link, router } from '@inertiajs/react';
import StaffLayout from '@/Layouts/StaffLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { ChartPlaceholder } from '@/Components/cims/ChartPlaceholder';
import { StatusBadge, PriorityBadge } from '@/Components/cims/StatusBadge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Badge } from '@/Components/ui/badge';
import { Progress } from '@/Components/ui/progress';
import {
    IconAlertTriangle,
    IconCalendar,
    IconChartBar,
    IconClipboardList,
    IconClock,
    IconLayoutKanban,
    IconMap,
    IconTrendingUp,
    IconUsers,
} from '@tabler/icons-react';
import type { ActivityLog, ChartData, Incident, Notification, StatCard } from '@/types/cims';

const STAT_ICONS = [IconClipboardList, IconClock, IconTrendingUp, IconUsers];

const kanbanColumns = [
    { id: 'open', title: 'Open', statuses: ['open', 'pending'] },
    { id: 'progress', title: 'In Progress', statuses: ['in_progress'] },
    { id: 'done', title: 'Resolved', statuses: ['resolved', 'closed'] },
];

export default function Index({
    stats,
    incidents,
    chartData,
    notifications,
    activityLogs,
}: {
    stats: StatCard[];
    incidents: Incident[];
    chartData: ChartData;
    notifications: Notification[];
    activityLogs: ActivityLog[];
}) {
    const openCount = incidents.filter((i) => ['open', 'pending'].includes(i.status)).length;
    const inProgressCount = incidents.filter((i) => i.status === 'in_progress').length;
    const dueToday = incidents.filter((i) => i.assignedTo && i.status !== 'resolved').length;
    const slaCompliance = 94;

    return (
        <StaffLayout notifications={notifications}>
            <Head title="Staff Dashboard" />

            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <PageHeader
                    title="Operations Dashboard"
                    description={`Public Works · ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`}
                />
                <div className="flex flex-wrap gap-2 pb-1">
                    <Button variant="outline" asChild>
                        <Link href={route('staff.maps.index')}>View Maps</Link>
                    </Button>
                    <Button asChild>
                        <Link href={route('staff.incidents.index')}>All Incidents</Link>
                    </Button>
                </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, i) => {
                    const Icon = STAT_ICONS[i] ?? IconClipboardList;
                    return (
                        <Card key={stat.label} className="border-border/60">
                            <CardContent className="flex items-start gap-4 pt-6">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="size-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                                    <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">{stat.value}</p>
                                    <p className="mt-0.5 text-xs text-muted-foreground">{stat.change}</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Tabs defaultValue="overview" className="mt-6">
                <TabsList className="flex h-auto flex-wrap">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="assigned">My Assignments ({dueToday})</TabsTrigger>
                    <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <ChartPlaceholder data={chartData} title="Team Incident Trends" />
                        </div>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">SLA Compliance</CardTitle>
                                <CardDescription>Public Works target: 95%</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-bold tabular-nums">{slaCompliance}%</span>
                                    <Badge variant="secondary">On track</Badge>
                                </div>
                                <Progress value={slaCompliance} className="h-2.5" />
                                <div className="grid grid-cols-2 gap-3 text-center">
                                    <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                                        <p className="text-xl font-bold">{openCount}</p>
                                        <p className="text-xs text-muted-foreground">Open</p>
                                    </div>
                                    <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                                        <p className="text-xl font-bold">{inProgressCount}</p>
                                        <p className="text-xs text-muted-foreground">In Progress</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-base">Priority Queue</CardTitle>
                                    <CardDescription>Incidents needing attention</CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={route('staff.incidents.index')}>View all</Link>
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {incidents
                                    .filter((i) => ['critical', 'high'].includes(i.priority) && i.status !== 'resolved')
                                    .slice(0, 5)
                                    .map((inc) => (
                                        <Link
                                            key={inc.id}
                                            href={route('staff.incidents.show', inc.id)}
                                            className="flex items-center justify-between gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/40"
                                        >
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium">{inc.title}</p>
                                                <p className="truncate text-xs text-muted-foreground">{inc.id} · {inc.location}</p>
                                            </div>
                                            <PriorityBadge priority={inc.priority} />
                                        </Link>
                                    ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Recent Activity</CardTitle>
                                <CardDescription>Latest team updates</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {activityLogs.map((log) => (
                                    <div key={log.id} className="flex gap-3">
                                        <div className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                                        <div>
                                            <p className="text-sm">{log.description}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(log.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: 'Incidents', href: route('staff.incidents.index'), icon: IconClipboardList },
                            { label: 'Maps', href: route('staff.maps.index'), icon: IconMap },
                            { label: 'Reports', href: route('staff.reports.monthly'), icon: IconChartBar },
                            { label: 'Notifications', href: route('staff.notifications'), icon: IconAlertTriangle },
                        ].map(({ label, href, icon: Icon }) => (
                            <Button key={label} variant="outline" className="h-auto justify-start gap-3 px-4 py-3" asChild>
                                <Link href={href}>
                                    <Icon className="size-4 text-primary" />
                                    {label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="assigned" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Assigned Incidents</CardTitle>
                            <CardDescription>Incidents currently assigned to team members</CardDescription>
                        </CardHeader>
                        <CardContent className="divide-y">
                            {incidents.filter((i) => i.assignedTo).map((inc) => (
                                <div key={inc.id} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
                                    <div className="min-w-0">
                                        <p className="font-medium">{inc.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {inc.assignedTo} · {inc.id} · {inc.location}
                                        </p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <StatusBadge status={inc.status} />
                                            <PriorityBadge priority={inc.priority} />
                                        </div>
                                    </div>
                                    <Button size="sm" asChild>
                                        <Link href={route('staff.incidents.show', inc.id)}>Manage</Link>
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="kanban" className="mt-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        {kanbanColumns.map((col) => (
                            <div key={col.id} className="rounded-xl border border-border bg-muted/20 p-3">
                                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                                    <IconLayoutKanban className="size-4" />
                                    {col.title}
                                    <Badge variant="secondary">{incidents.filter((i) => col.statuses.includes(i.status)).length}</Badge>
                                </h3>
                                <div className="space-y-2">
                                    {incidents.filter((i) => col.statuses.includes(i.status)).map((inc) => (
                                        <Card
                                            key={inc.id}
                                            className="cursor-pointer shadow-sm transition-colors hover:border-primary/30"
                                            onClick={() => router.visit(route('staff.incidents.show', inc.id))}
                                        >
                                            <CardContent className="p-3">
                                                <p className="text-sm font-medium">{inc.title}</p>
                                                <p className="text-xs text-muted-foreground">{inc.id}</p>
                                                <div className="mt-2"><PriorityBadge priority={inc.priority} /></div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="calendar" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <IconCalendar className="size-4" />
                                June 2026 Schedule
                            </CardTitle>
                            <CardDescription>Due dates and scheduled field work</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-7 gap-1 text-center text-xs">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                                    <div key={d} className="p-2 font-medium text-muted-foreground">{d}</div>
                                ))}
                                {Array.from({ length: 35 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`min-h-[60px] rounded-lg border p-1 sm:min-h-[80px] ${i === 27 ? 'border-primary bg-primary/5' : 'border-border'}`}
                                    >
                                        <span className="text-xs">{((i % 30) + 1)}</span>
                                        {i === 15 && <Badge className="mt-1 hidden text-[10px] sm:inline-flex">3 due</Badge>}
                                        {i === 27 && <Badge variant="secondary" className="mt-1 hidden text-[10px] sm:inline-flex">Today</Badge>}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </StaffLayout>
    );
}

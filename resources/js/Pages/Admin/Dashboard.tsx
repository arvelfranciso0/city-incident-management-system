import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { ChartPlaceholder } from '@/Components/cims/ChartPlaceholder';
import { StatusBadge } from '@/Components/cims/StatusBadge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';
import { Badge } from '@/Components/ui/badge';
import {
    IconAlertTriangle,
    IconArrowRight,
    IconBuilding,
    IconChartBar,
    IconClipboardList,
    IconMap,
    IconTrendingUp,
    IconUsers,
} from '@tabler/icons-react';
import type { ActivityLog, ChartData, Department, Incident, StatCard } from '@/types/cims';

const STAT_ICONS = [IconClipboardList, IconUsers, IconBuilding, IconTrendingUp];

const QUICK_ACTIONS = [
    { label: 'Manage Users', href: () => route('admin.users.index'), icon: IconUsers },
    { label: 'Departments', href: () => route('admin.departments.index'), icon: IconBuilding },
    { label: 'City Heat Map', href: () => route('admin.maps.heatmap'), icon: IconMap },
    { label: 'Analytics', href: () => route('admin.reports.analytics'), icon: IconChartBar },
];

export default function Dashboard({
    stats,
    chartData,
    departments,
    recentIncidents,
    activityLogs,
}: {
    stats: StatCard[];
    chartData: ChartData;
    departments: Department[];
    recentIncidents: Incident[];
    activityLogs: ActivityLog[];
}) {
    const maxOpen = Math.max(...departments.map((d) => d.openIncidents), 1);
    const slaCompliance = 91;

    return (
        <AdminLayout>
            <Head title="Executive Dashboard" />

            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <PageHeader
                    title="Executive Dashboard"
                    description={`City-wide overview · ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`}
                />
                <div className="flex flex-wrap gap-2 pb-1">
                    <Button variant="outline" asChild>
                        <Link href={route('admin.maps.heatmap')}>View Map</Link>
                    </Button>
                    <Button asChild>
                        <Link href={route('admin.reports.analytics')}>View Analytics</Link>
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

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <ChartPlaceholder data={chartData} title="City-Wide Incident Trends" />
                </div>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">SLA Compliance</CardTitle>
                        <CardDescription>Target: 95% city-wide</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-end justify-between">
                            <span className="text-3xl font-bold tabular-nums">{slaCompliance}%</span>
                            <Badge variant={slaCompliance >= 95 ? 'default' : 'secondary'} className="mb-1">
                                {slaCompliance >= 95 ? 'On target' : 'Below target'}
                            </Badge>
                        </div>
                        <Progress value={slaCompliance} className="h-2.5" />
                        <div className="rounded-lg border border-amber-200/60 bg-amber-50/50 p-3 dark:border-amber-900/40 dark:bg-amber-950/20">
                            <div className="flex gap-2">
                                <IconAlertTriangle className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
                                <p className="text-xs text-muted-foreground">
                                    Electrical Services and Parks & Recreation are trending below SLA this month.
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link href={route('admin.reports.sla')}>Open SLA Dashboard</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-base">Department Workload</CardTitle>
                            <CardDescription>Open incidents by department</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.departments.index')}>
                                View all <IconArrowRight className="ml-1 size-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {departments.map((d) => (
                            <Link
                                key={d.id}
                                href={route('admin.departments.show', d.id)}
                                className="block rounded-lg border border-border/60 p-4 transition-colors hover:border-primary/30 hover:bg-muted/30"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="font-medium">{d.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {d.staffCount} staff · {d.avgResolutionDays}d avg resolution
                                        </p>
                                    </div>
                                    <Badge variant="secondary">{d.openIncidents} open</Badge>
                                </div>
                                <Progress value={(d.openIncidents / maxOpen) * 100} className="mt-3 h-1.5" />
                            </Link>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Quick Actions</CardTitle>
                        <CardDescription>Common admin tasks</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        {QUICK_ACTIONS.map(({ label, href, icon: Icon }) => (
                            <Button key={label} variant="outline" className="h-auto justify-start gap-3 px-4 py-3" asChild>
                                <Link href={href()}>
                                    <Icon className="size-4 shrink-0 text-primary" />
                                    {label}
                                </Link>
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-base">Recent Incidents</CardTitle>
                            <CardDescription>Latest reports across the city</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {recentIncidents.map((inc) => (
                            <Link
                                key={inc.id}
                                href={route('admin.incidents.show', inc.id)}
                                className="flex items-center justify-between gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/40"
                            >
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">{inc.title}</p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {inc.id} · {inc.department}
                                    </p>
                                </div>
                                <StatusBadge status={inc.status} />
                            </Link>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-base">System Activity</CardTitle>
                            <CardDescription>Recent platform events</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={route('admin.system.activity-logs')}>View logs</Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {activityLogs.map((log) => (
                            <div key={log.id} className="flex gap-3">
                                <div className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                                <div className="min-w-0 flex-1">
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
        </AdminLayout>
    );
}

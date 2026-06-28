import { Head, Link } from '@inertiajs/react';
import StaffLayout from '@/Layouts/StaffLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { ChartPlaceholder } from '@/Components/cims/ChartPlaceholder';
import { StatusBadge } from '@/Components/cims/StatusBadge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';
import { Badge } from '@/Components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { IconDownload, IconTrendingUp } from '@tabler/icons-react';
import type { Category, ChartData, Department, Incident, Notification, StatCard } from '@/types/cims';

export default function Monthly({
    chartData,
    notifications,
    stats,
    categories,
    departments,
    incidents,
}: {
    chartData: ChartData;
    notifications: Notification[];
    stats: StatCard[];
    categories: Category[];
    departments: Department[];
    incidents: Incident[];
}) {
    const totalReported = chartData.incidents[chartData.incidents.length - 1] ?? 0;
    const totalResolved = chartData.resolved[chartData.resolved.length - 1] ?? 0;
    const resolutionRate = totalReported > 0 ? Math.round((totalResolved / totalReported) * 100) : 0;
    const openIncidents = incidents.filter((i) => !['resolved', 'closed'].includes(i.status));

    return (
        <StaffLayout notifications={notifications}>
            <Head title="Monthly Reports" />

            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <PageHeader
                    title="Monthly Reports"
                    description="June 2026 · Public Works department summary"
                />
                <div className="flex flex-wrap gap-2 pb-1">
                    <Button variant="outline" asChild>
                        <Link href={route('staff.reports.analytics')}>Analytics View</Link>
                    </Button>
                    <Button variant="outline">
                        <IconDownload className="size-4" />
                        Export PDF
                    </Button>
                </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Total Reported', value: String(totalReported), sub: 'This month' },
                    { label: 'Resolved', value: String(totalResolved), sub: `${resolutionRate}% rate` },
                    { label: 'Still Open', value: String(openIncidents.length), sub: 'Active incidents' },
                    { label: 'Avg Resolution', value: '2.1 days', sub: stats[3]?.change ?? 'Team average' },
                ].map((s) => (
                    <Card key={s.label}>
                        <CardContent className="pt-6">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{s.label}</p>
                            <p className="mt-1 text-2xl font-bold tabular-nums">{s.value}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{s.sub}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="overview" className="mt-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="categories">By Category</TabsTrigger>
                    <TabsTrigger value="incidents">Open Incidents</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <ChartPlaceholder data={chartData} title="Monthly Incident Volume" />
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">SLA Performance</CardTitle>
                                <CardDescription>June 2026 compliance</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-bold">94%</span>
                                    <Badge variant="secondary">+2% vs May</Badge>
                                </div>
                                <Progress value={94} className="h-2.5" />
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Critical (&lt;4h)</span>
                                        <span className="font-medium">100%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">High (&lt;24h)</span>
                                        <span className="font-medium">96%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Medium (&lt;72h)</span>
                                        <span className="font-medium">91%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <IconTrendingUp className="size-4" />
                                Department Comparison
                            </CardTitle>
                            <CardDescription>Open incidents and resolution times across departments</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {departments.map((d) => (
                                <div key={d.id} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{d.name}</span>
                                        <span className="text-muted-foreground">{d.openIncidents} open · {d.avgResolutionDays}d avg</span>
                                    </div>
                                    <Progress value={(d.openIncidents / 20) * 100} className="h-1.5" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="categories" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Incidents by Category</CardTitle>
                            <CardDescription>Volume breakdown for June 2026</CardDescription>
                        </CardHeader>
                        <CardContent className="overflow-x-auto p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Total Incidents</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.map((cat) => (
                                        <TableRow key={cat.id}>
                                            <TableCell className="font-medium">{cat.name}</TableCell>
                                            <TableCell>{cat.department}</TableCell>
                                            <TableCell>{cat.incidentCount}</TableCell>
                                            <TableCell>
                                                <Badge variant={cat.active ? 'default' : 'secondary'}>
                                                    {cat.active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="incidents" className="mt-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-base">Open Incidents</CardTitle>
                                <CardDescription>{openIncidents.length} incidents still requiring action</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={route('staff.incidents.index')}>Manage All</Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {openIncidents.map((inc) => (
                                <Link
                                    key={inc.id}
                                    href={route('staff.incidents.show', inc.id)}
                                    className="flex items-center justify-between gap-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/40"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">{inc.title}</p>
                                        <p className="truncate text-xs text-muted-foreground">{inc.id} · {inc.assignedTo ?? 'Unassigned'}</p>
                                    </div>
                                    <StatusBadge status={inc.status} />
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </StaffLayout>
    );
}

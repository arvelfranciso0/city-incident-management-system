import { Head } from '@inertiajs/react';
import PlatformLayout from '@/Layouts/PlatformLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { ChartPlaceholder } from '@/Components/cims/ChartPlaceholder';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import type { ChartData, StatCard } from '@/types/cims';

interface OrgRow {
    name: string;
    incidents: number;
    users: number;
    plan: string;
}

interface PlanRow {
    label: string;
    value: number;
}

export default function Analytics({
    stats,
    topOrganizations,
    planBreakdown,
    chartData,
}: {
    stats: StatCard[];
    topOrganizations: OrgRow[];
    planBreakdown: PlanRow[];
    chartData: ChartData;
}) {
    return (
        <PlatformLayout>
            <Head title="Platform Analytics" />
            <PageHeader
                title="Platform Analytics"
                description="Cross-tenant usage, growth, and incident volume."
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="pt-6">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                            <p className="mt-1 text-2xl font-semibold tabular-nums">{stat.value}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Incident Volume</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartPlaceholder data={chartData} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Subscription Plans</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {planBreakdown.map((plan) => (
                            <div key={plan.label} className="flex items-center justify-between text-sm">
                                <span>{plan.label}</span>
                                <Badge variant="secondary">{plan.value} orgs</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-base">Top Organizations by Incidents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {topOrganizations.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No subscriber data yet.</p>
                    ) : (
                        topOrganizations.map((org) => (
                            <div key={org.name} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                                <div>
                                    <p className="font-medium">{org.name}</p>
                                    <p className="text-muted-foreground">{org.users} users · {org.plan}</p>
                                </div>
                                <Badge variant="outline">{org.incidents} incidents</Badge>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </PlatformLayout>
    );
}

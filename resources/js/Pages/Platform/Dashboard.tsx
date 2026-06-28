import { Head, Link } from '@inertiajs/react';
import PlatformLayout from '@/Layouts/PlatformLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { IconArrowRight, IconBuilding, IconPlus, IconUsers } from '@tabler/icons-react';
import type { PlatformOrganization, StatCard } from '@/types/cims';

const STAT_ICONS = [IconBuilding, IconUsers, IconUsers, IconBuilding];

export default function Dashboard({
    stats,
    recentOrganizations,
}: {
    stats: StatCard[];
    recentOrganizations: PlatformOrganization[];
}) {
    return (
        <PlatformLayout>
            <Head title="Platform Dashboard" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <PageHeader
                    title="Platform Dashboard"
                    description="Monitor subscribers, provision organization admins, and track platform-wide activity."
                />
                <Button asChild>
                    <Link href={route('platform.organizations.create')}>
                        <IconPlus className="size-4" />
                        New Subscriber
                    </Link>
                </Button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, i) => {
                    const Icon = STAT_ICONS[i] ?? IconBuilding;
                    return (
                        <Card key={stat.label}>
                            <CardContent className="flex items-start gap-4 pt-6">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="size-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                                    <p className="mt-1 text-2xl font-semibold tabular-nums">{stat.value}</p>
                                    <p className="mt-0.5 text-xs text-muted-foreground">{stat.change}</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Card className="mt-8">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Recent Subscribers</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('platform.organizations.index')}>
                            View all
                            <IconArrowRight className="size-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    {recentOrganizations.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No subscribers yet. Provision your first organization.</p>
                    ) : (
                        <div className="space-y-3">
                            {recentOrganizations.map((org) => (
                                <Link
                                    key={org.id}
                                    href={route('platform.organizations.show', org.id)}
                                    className="flex flex-col gap-2 rounded-lg border border-border/60 p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div>
                                        <p className="font-medium">{org.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {org.admin?.email ?? 'No admin assigned'} · {org.usersCount} users
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline">{org.subscriptionPlan}</Badge>
                                        <Badge variant={org.isActive ? 'default' : 'secondary'}>
                                            {org.subscriptionStatus}
                                        </Badge>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </PlatformLayout>
    );
}

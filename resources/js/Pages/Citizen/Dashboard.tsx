import { Head, Link } from '@inertiajs/react';
import CitizenLayout from '@/Layouts/CitizenLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { StatsGrid } from '@/Components/cims/StatCard';
import { StatusBadge } from '@/Components/cims/StatusBadge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import type { Incident, Notification, StatCard } from '@/types/cims';

export default function Dashboard({ stats, recentIncidents, notifications }: { stats: StatCard[]; recentIncidents: Incident[]; notifications: Notification[] }) {
    return (
        <CitizenLayout notifications={notifications}>
            <Head title="Dashboard" />
            <PageHeader title="Welcome back" description="Here's an overview of your incident reports." actions={<Button asChild><Link href={route('citizen.report')}>Report Incident</Link></Button>} />
            <StatsGrid stats={stats} className="mt-6" />
            <Card className="mt-6">
                <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Recent Incidents</CardTitle><Button variant="ghost" size="sm" asChild><Link href={route('citizen.incidents.index')}>View all</Link></Button></CardHeader>
                <CardContent className="divide-y divide-border">
                    {recentIncidents.map((inc) => (
                        <Link key={inc.id} href={route('citizen.incidents.show', inc.id)} className="-mx-2 flex flex-wrap items-center justify-between gap-2 rounded-lg px-2 py-4 transition-colors first:pt-0 last:pb-0 hover:bg-accent/50">
                            <div><p className="font-medium">{inc.title}</p><p className="text-xs text-muted-foreground">{inc.id}</p></div>
                            <StatusBadge status={inc.status} />
                        </Link>
                    ))}
                </CardContent>
            </Card>
        </CitizenLayout>
    );
}

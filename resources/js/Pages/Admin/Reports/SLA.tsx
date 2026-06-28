import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';
import type { Department, Priority } from '@/types/cims';

export default function SLA({ priorities, departments }: { priorities: Priority[]; departments: Department[] }) {
    return (
        <AdminLayout>
            <Head title="SLA Dashboard" />
            <PageHeader title="SLA Dashboard" description="Service level agreement compliance tracking." />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {priorities.map((p) => (
                    <Card key={p.id}><CardContent className="pt-6"><p className="text-sm text-muted-foreground">{p.name}</p><p className="text-2xl font-bold">{p.slaHours}h</p><Progress value={85} className="mt-2" /><p className="mt-1 text-xs text-muted-foreground">85% compliance</p></CardContent></Card>
                ))}
            </div>
            <Card className="mt-6">
                <CardHeader><CardTitle>Department SLA Performance</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {departments.map((d) => (
                        <div key={d.id}><div className="mb-1 flex justify-between text-sm"><span>{d.name}</span><span>{Math.round(100 - d.avgResolutionDays * 5)}%</span></div><Progress value={100 - d.avgResolutionDays * 5} /></div>
                    ))}
                </CardContent>
            </Card>
        </AdminLayout>
    );
}

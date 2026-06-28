import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { ChartPlaceholder } from '@/Components/cims/ChartPlaceholder';
import { Card, CardContent } from '@/Components/ui/card';
import type { ChartData, Department } from '@/types/cims';

export default function DepartmentPerformance({ departments, chartData }: { departments: Department[]; chartData: ChartData }) {
    return (
        <AdminLayout>
            <Head title="Department Performance" />
            <PageHeader title="Department Performance" description="Compare resolution metrics across departments." />
            <ChartPlaceholder data={chartData} title="Resolution Trends by Month" className="mt-6" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {departments.map((d) => (
                    <Card key={d.id}><CardContent className="pt-6">
                        <h3 className="font-semibold">{d.name}</h3>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                            <div><p className="font-bold">{d.openIncidents}</p><p className="text-xs text-muted-foreground">Open</p></div>
                            <div><p className="font-bold">{d.avgResolutionDays}d</p><p className="text-xs text-muted-foreground">Avg Time</p></div>
                            <div><p className="font-bold">{d.staffCount}</p><p className="text-xs text-muted-foreground">Staff</p></div>
                        </div>
                    </CardContent></Card>
                ))}
            </div>
        </AdminLayout>
    );
}

import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { StatsGrid } from '@/Components/cims/StatCard';
import { ChartPlaceholder } from '@/Components/cims/ChartPlaceholder';
import { Button } from '@/Components/ui/button';
import type { ChartData, StatCard } from '@/types/cims';

export default function Analytics({ chartData, stats }: { chartData: ChartData; stats: StatCard[] }) {
    return (
        <AdminLayout>
            <Head title="Analytics" />
            <PageHeader title="Analytics Dashboard" description="City-wide performance metrics." actions={
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" asChild><Link href={route('admin.reports.sla')}>SLA Dashboard</Link></Button>
                    <Button variant="outline" asChild><Link href={route('admin.reports.department-performance')}>Departments</Link></Button>
                    <Button variant="outline" asChild><Link href={route('admin.reports.export')}>Export</Link></Button>
                </div>
            } />
            <StatsGrid stats={stats} className="mt-6" />
            <ChartPlaceholder data={chartData} className="mt-6" />
        </AdminLayout>
    );
}

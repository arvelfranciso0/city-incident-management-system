import { Head } from '@inertiajs/react';
import StaffLayout from '@/Layouts/StaffLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { StatsGrid } from '@/Components/cims/StatCard';
import { ChartPlaceholder } from '@/Components/cims/ChartPlaceholder';
import type { ChartData, Notification, StatCard } from '@/types/cims';

export default function Analytics({ chartData, stats, notifications }: { chartData: ChartData; stats: StatCard[]; notifications: Notification[] }) {
    return (
        <StaffLayout notifications={notifications}>
            <Head title="Analytics" />
            <PageHeader title="Analytics Dashboard" description="Operational metrics and trends." />
            <StatsGrid stats={stats} className="mt-6" />
            <ChartPlaceholder data={chartData} className="mt-6" />
        </StaffLayout>
    );
}

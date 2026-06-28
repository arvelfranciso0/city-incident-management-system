import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import type { ActivityLog } from '@/types/cims';

export default function ActivityLogs({ logs }: { logs: ActivityLog[] }) {
    return (
        <AdminLayout>
            <Head title="Activity Logs" />
            <PageHeader title="Activity Logs" description="System-wide activity feed." />
            <div className="mt-6 space-y-3">
                {logs.map((log) => (
                    <Card key={log.id}><CardContent className="flex flex-wrap items-center justify-between gap-2 pt-6">
                        <div><p className="text-sm">{log.description}</p><p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p></div>
                        <Badge variant="outline" className="capitalize">{log.type}</Badge>
                    </CardContent></Card>
                ))}
            </div>
        </AdminLayout>
    );
}

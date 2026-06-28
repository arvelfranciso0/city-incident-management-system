import { Head } from '@inertiajs/react';
import PlatformLayout from '@/Layouts/PlatformLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';

interface ServiceRow {
    name: string;
    status: string;
    latency: string;
}

interface MetricRow {
    label: string;
    value: string;
}

interface AuditRow {
    id: number;
    action: string;
    target: string;
    timestamp?: string | null;
}

function statusVariant(status: string): 'default' | 'secondary' | 'destructive' {
    if (status === 'operational') return 'default';
    if (status === 'degraded') return 'secondary';
    return 'destructive';
}

export default function SystemMonitor({
    services,
    metrics,
    recentAuditLogs,
}: {
    services: ServiceRow[];
    metrics: MetricRow[];
    recentAuditLogs: AuditRow[];
}) {
    return (
        <PlatformLayout>
            <Head title="System Monitor" />
            <PageHeader
                title="System Monitor"
                description="Platform health, infrastructure status, and recent audit activity."
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric) => (
                    <Card key={metric.label}>
                        <CardContent className="pt-6">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{metric.label}</p>
                            <p className="mt-1 text-2xl font-semibold tabular-nums">{metric.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-base">Service Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {services.map((service) => (
                        <div key={service.name} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                            <span className="font-medium">{service.name}</span>
                            <div className="flex items-center gap-3">
                                <span className="text-muted-foreground">{service.latency}</span>
                                <Badge variant={statusVariant(service.status)}>{service.status}</Badge>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-base">Recent Audit Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {recentAuditLogs.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No audit events recorded yet.</p>
                    ) : (
                        recentAuditLogs.map((log) => (
                            <div key={log.id} className="flex flex-col gap-1 rounded-lg border p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="font-medium">{log.action}</p>
                                    <p className="text-muted-foreground">{log.target}</p>
                                </div>
                                {log.timestamp && (
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </span>
                                )}
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </PlatformLayout>
    );
}

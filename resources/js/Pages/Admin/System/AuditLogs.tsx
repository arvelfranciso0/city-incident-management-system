import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Card } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import type { AuditLog } from '@/types/cims';

export default function AuditLogs({ logs }: { logs: AuditLog[] }) {
    return (
        <AdminLayout>
            <Head title="Audit Logs" />
            <PageHeader title="Audit Logs" description="Security and administrative action history." />
            <Card className="mt-6 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table><TableHeader><TableRow><TableHead>Action</TableHead><TableHead>User</TableHead><TableHead className="hidden sm:table-cell">Target</TableHead><TableHead className="hidden md:table-cell">IP</TableHead><TableHead>Timestamp</TableHead></TableRow></TableHeader>
                        <TableBody>{logs.map((log) => <TableRow key={log.id}><TableCell className="font-mono text-xs">{log.action}</TableCell><TableCell>{log.user}</TableCell><TableCell className="hidden sm:table-cell">{log.target}</TableCell><TableCell className="hidden md:table-cell">{log.ip}</TableCell><TableCell className="text-xs">{new Date(log.timestamp).toLocaleString()}</TableCell></TableRow>)}</TableBody>
                    </Table>
                </div>
            </Card>
        </AdminLayout>
    );
}

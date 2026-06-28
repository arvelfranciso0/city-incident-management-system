import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { IconDownload } from '@tabler/icons-react';

export default function Export() {
    return (
        <AdminLayout>
            <Head title="Export Reports" />
            <PageHeader title="Export Reports" description="Generate and download report files." />
            <Card className="mt-6 max-w-lg">
                <CardHeader><CardTitle>Export Configuration</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2"><Label>Report Type</Label><Select defaultValue="incidents"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="incidents">Incidents</SelectItem><SelectItem value="users">Users</SelectItem><SelectItem value="sla">SLA Compliance</SelectItem><SelectItem value="departments">Departments</SelectItem></SelectContent></Select></div>
                    <div className="space-y-2"><Label>Format</Label><Select defaultValue="csv"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="csv">CSV</SelectItem><SelectItem value="xlsx">Excel</SelectItem><SelectItem value="pdf">PDF</SelectItem></SelectContent></Select></div>
                    <div className="space-y-2"><Label>Date Range</Label><Select defaultValue="30"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="7">Last 7 days</SelectItem><SelectItem value="30">Last 30 days</SelectItem><SelectItem value="90">Last 90 days</SelectItem></SelectContent></Select></div>
                    <Button><IconDownload className="mr-2 size-4" />Generate Export</Button>
                    <Alert><AlertDescription>Exports are generated asynchronously and emailed when ready.</AlertDescription></Alert>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}

import { Head } from '@inertiajs/react';
import StaffLayout from '@/Layouts/StaffLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import { Switch } from '@/Components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import type { Notification } from '@/types/cims';

export default function Settings({ notifications }: { notifications: Notification[] }) {
    return (
        <StaffLayout notifications={notifications}>
            <Head title="Settings" />
            <PageHeader title="Settings" description="Configure your staff portal preferences." />
            <Card className="mt-6 max-w-lg">
                <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2"><Label>Default View</Label><Select defaultValue="dashboard"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="dashboard">Dashboard</SelectItem><SelectItem value="kanban">Kanban</SelectItem><SelectItem value="table">Table</SelectItem></SelectContent></Select></div>
                    <div className="flex items-center justify-between"><Label>Email notifications</Label><Switch defaultChecked /></div>
                    <div className="flex items-center justify-between"><Label>Assignment alerts</Label><Switch defaultChecked /></div>
                    <Button>Save Settings</Button>
                </CardContent>
            </Card>
        </StaffLayout>
    );
}

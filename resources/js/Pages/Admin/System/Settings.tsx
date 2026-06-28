import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Switch } from '@/Components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';

export default function Settings() {
    return (
        <AdminLayout>
            <Head title="System Settings" />
            <PageHeader title="System Settings" description="Configure global CIMS settings." />
            <Tabs defaultValue="general" className="mt-6">
                <TabsList><TabsTrigger value="general">General</TabsTrigger><TabsTrigger value="sla">SLA</TabsTrigger><TabsTrigger value="notifications">Notifications</TabsTrigger></TabsList>
                <TabsContent value="general">
                    <Card><CardHeader><CardTitle>General Settings</CardTitle></CardHeader><CardContent className="max-w-lg space-y-4">
                        <div className="space-y-2"><Label>City Name</Label><Input defaultValue="Metroville" /></div>
                        <div className="space-y-2"><Label>Support Email</Label><Input defaultValue="support@cims.metroville.gov" /></div>
                        <div className="flex items-center justify-between"><Label>Maintenance Mode</Label><Switch /></div>
                        <Button>Save Settings</Button>
                    </CardContent></Card>
                </TabsContent>
                <TabsContent value="sla">
                    <Card><CardHeader><CardTitle>SLA Configuration</CardTitle></CardHeader><CardContent className="max-w-lg space-y-4">
                        <div className="space-y-2"><Label>Critical SLA (hours)</Label><Input type="number" defaultValue="4" /></div>
                        <div className="space-y-2"><Label>High SLA (hours)</Label><Input type="number" defaultValue="24" /></div>
                        <Button>Save SLA Settings</Button>
                    </CardContent></Card>
                </TabsContent>
                <TabsContent value="notifications">
                    <Card><CardHeader><CardTitle>Notification Settings</CardTitle></CardHeader><CardContent className="space-y-4">
                        <div className="flex items-center justify-between"><Label>Email notifications</Label><Switch defaultChecked /></div>
                        <div className="flex items-center justify-between"><Label>SMS alerts</Label><Switch /></div>
                        <Button>Save</Button>
                    </CardContent></Card>
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
}

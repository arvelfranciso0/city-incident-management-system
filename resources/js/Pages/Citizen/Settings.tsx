import { Head } from '@inertiajs/react';
import CitizenLayout from '@/Layouts/CitizenLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Switch } from '@/Components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';

export default function Settings() {
    const [saved, setSaved] = useState(false);

    return (
        <CitizenLayout>
            <Head title="Settings" />
            <PageHeader title="Settings" description="Manage your account preferences." />
            {saved && <Alert className="mt-4"><IconCheck className="size-4" /><AlertDescription>Settings saved successfully.</AlertDescription></Alert>}
            <Tabs defaultValue="profile" className="mt-6">
                <TabsList className="flex h-auto flex-wrap"><TabsTrigger value="profile">Edit Profile</TabsTrigger><TabsTrigger value="password">Change Password</TabsTrigger><TabsTrigger value="notifications">Notification Preferences</TabsTrigger></TabsList>
                <TabsContent value="profile">
                    <Card><CardHeader><CardTitle>Edit Profile</CardTitle></CardHeader><CardContent className="max-w-md space-y-4">
                        <div className="space-y-2"><Label>Name</Label><Input defaultValue="John Martinez" /></div>
                        <div className="space-y-2"><Label>Email</Label><Input type="email" defaultValue="john@example.com" /></div>
                        <div className="space-y-2"><Label>Phone</Label><Input defaultValue="(555) 123-4567" /></div>
                        <Button onClick={() => setSaved(true)}>Save Profile</Button>
                    </CardContent></Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card><CardHeader><CardTitle>Change Password</CardTitle></CardHeader><CardContent className="max-w-md space-y-4">
                        <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
                        <div className="space-y-2"><Label>New Password</Label><Input type="password" /></div>
                        <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" /></div>
                        <Button onClick={() => setSaved(true)}>Update Password</Button>
                    </CardContent></Card>
                </TabsContent>
                <TabsContent value="notifications">
                    <Card><CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader><CardContent className="space-y-4">
                        {['Email status updates', 'SMS alerts', 'Weekly digest', 'Marketing communications'].map((label) => (
                            <div key={label} className="flex items-center justify-between"><Label>{label}</Label><Switch defaultChecked={!label.includes('Marketing')} /></div>
                        ))}
                        <Button onClick={() => setSaved(true)}>Save Preferences</Button>
                    </CardContent></Card>
                </TabsContent>
            </Tabs>
        </CitizenLayout>
    );
}

import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PlatformLayout from '@/Layouts/PlatformLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Input } from '@/Components/ui/input';
import { PasswordInput } from '@/Components/ui/password-input';
import { Label } from '@/Components/ui/label';
import { Switch } from '@/Components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import type { PlatformAdminUser, PlatformOrganization } from '@/types/cims';

interface Option {
    value: string;
    label: string;
}

export default function Show({
    organization,
    admins,
    subscriptionPlans,
    subscriptionStatuses,
}: {
    organization: PlatformOrganization;
    admins: PlatformAdminUser[];
    subscriptionPlans: Option[];
    subscriptionStatuses: Option[];
}) {
    const { flash } = usePage<{ flash: { success?: string } }>().props;

    const settingsForm = useForm({
        is_active: organization.isActive,
        subscription_plan: organization.subscriptionPlan,
        subscription_status: organization.subscriptionStatus,
        support_email: organization.supportEmail ?? '',
        subdomain: organization.subdomain ?? '',
        domain: organization.domain ?? '',
    });

    const adminForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function saveSettings(e: React.FormEvent) {
        e.preventDefault();
        settingsForm.patch(route('platform.organizations.update', organization.id));
    }

    function createAdmin(e: React.FormEvent) {
        e.preventDefault();
        adminForm.post(route('platform.organizations.admins.store', organization.id), {
            onSuccess: () => adminForm.reset(),
        });
    }

    return (
        <PlatformLayout>
            <Head title={organization.name} />

            <Button variant="ghost" size="sm" asChild className="-ml-2 mb-2 text-muted-foreground">
                <Link href={route('platform.organizations.index')}>← Back to Subscribers</Link>
            </Button>

            {flash?.success && (
                <Alert className="mb-4">
                    <AlertDescription>{flash.success}</AlertDescription>
                </Alert>
            )}

            <PageHeader
                title={organization.name}
                description={`Subscriber tenant · ${organization.slug}`}
            />

            <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge variant="outline">{organization.subscriptionPlan}</Badge>
                <Badge variant={organization.isActive ? 'default' : 'secondary'}>{organization.subscriptionStatus}</Badge>
                {organization.tenantHost && (
                    <Badge variant="secondary">{organization.tenantHost}</Badge>
                )}
            </div>

            {organization.publicUrl && (
                <Alert className="mt-4">
                    <AlertDescription>
                        Public portal URL:{' '}
                        <a href={organization.publicUrl} className="font-medium underline" target="_blank" rel="noreferrer">
                            {organization.publicUrl}
                        </a>
                    </AlertDescription>
                </Alert>
            )}

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Subscription & Status</CardTitle>
                        <CardDescription>Control tenant access and billing tier.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={saveSettings} className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label>Organization active</Label>
                                    <p className="text-sm text-muted-foreground">Disable to block all tenant logins.</p>
                                </div>
                                <Switch
                                    checked={settingsForm.data.is_active}
                                    onCheckedChange={(checked) => settingsForm.setData('is_active', checked)}
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Subscription plan</Label>
                                    <Select
                                        value={settingsForm.data.subscription_plan}
                                        onValueChange={(v) => settingsForm.setData('subscription_plan', v)}
                                    >
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {subscriptionPlans.map((plan) => (
                                                <SelectItem key={plan.value} value={plan.value}>{plan.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Subscription status</Label>
                                    <Select
                                        value={settingsForm.data.subscription_status}
                                        onValueChange={(v) => settingsForm.setData('subscription_status', v)}
                                    >
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {subscriptionStatuses.map((status) => (
                                                <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label>Support email</Label>
                                    <Input
                                        type="email"
                                        value={settingsForm.data.support_email}
                                        onChange={(e) => settingsForm.setData('support_email', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Subdomain</Label>
                                    <Input
                                        value={settingsForm.data.subdomain}
                                        onChange={(e) => settingsForm.setData('subdomain', e.target.value)}
                                        placeholder="metroville"
                                    />
                                    {settingsForm.errors.subdomain && (
                                        <p className="text-sm text-destructive">{settingsForm.errors.subdomain}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label>Domain</Label>
                                    <Input
                                        value={settingsForm.data.domain}
                                        onChange={(e) => settingsForm.setData('domain', e.target.value)}
                                        placeholder="cims.test"
                                    />
                                    {settingsForm.errors.domain && (
                                        <p className="text-sm text-destructive">{settingsForm.errors.domain}</p>
                                    )}
                                </div>
                            </div>
                            <Button type="submit" disabled={settingsForm.processing}>Save changes</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Usage</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Users</span><span className="font-medium tabular-nums">{organization.usersCount}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Departments</span><span className="font-medium tabular-nums">{organization.departmentsCount}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Incidents</span><span className="font-medium tabular-nums">{organization.incidentsCount}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Subscribed</span><span>{organization.subscribedAt ? new Date(organization.subscribedAt).toLocaleDateString() : '—'}</span></div>
                        {organization.trialEndsAt && (
                            <div className="flex justify-between"><span className="text-muted-foreground">Trial ends</span><span>{new Date(organization.trialEndsAt).toLocaleDateString()}</span></div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-base">Organization Admins</CardTitle>
                    <CardDescription>Accounts that access the Admin Portal for this subscriber.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden sm:table-cell">Last login</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {admins.map((admin) => (
                                <TableRow key={admin.id}>
                                    <TableCell className="font-medium">{admin.name}</TableCell>
                                    <TableCell>{admin.email}</TableCell>
                                    <TableCell><Badge variant={admin.status === 'active' ? 'default' : 'secondary'}>{admin.status}</Badge></TableCell>
                                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                                        {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Never'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <form onSubmit={createAdmin} className="grid gap-4 rounded-lg border border-dashed p-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="admin_name">Add admin — full name</Label>
                            <Input id="admin_name" value={adminForm.data.name} onChange={(e) => adminForm.setData('name', e.target.value)} />
                            {adminForm.errors.name && <p className="text-sm text-destructive">{adminForm.errors.name}</p>}
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="admin_email">Email</Label>
                            <Input id="admin_email" type="email" value={adminForm.data.email} onChange={(e) => adminForm.setData('email', e.target.value)} />
                            {adminForm.errors.email && <p className="text-sm text-destructive">{adminForm.errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="admin_password">Password</Label>
                            <PasswordInput id="admin_password" value={adminForm.data.password} onChange={(e) => adminForm.setData('password', e.target.value)} />
                            {adminForm.errors.password && <p className="text-sm text-destructive">{adminForm.errors.password}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="admin_password_confirmation">Confirm</Label>
                            <PasswordInput id="admin_password_confirmation" value={adminForm.data.password_confirmation} onChange={(e) => adminForm.setData('password_confirmation', e.target.value)} />
                        </div>
                        <div className="sm:col-span-2">
                            <Button type="submit" variant="secondary" disabled={adminForm.processing}>Create Admin Account</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </PlatformLayout>
    );
}

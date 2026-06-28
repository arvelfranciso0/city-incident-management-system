import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { ALL_USER_ROLES, getRoleLabel, roleRequiresDepartment } from '@/lib/roles';
import type { CimsUser, Department } from '@/types/cims';

export default function Edit({ user, departments }: { user: CimsUser; departments: Department[] }) {
    return (
        <AdminLayout>
            <Head title={`Edit ${user.name}`} />
            <PageHeader title="Edit User" description={`Update details for ${user.name}`} />
            <Card className="mt-6 max-w-lg">
                <CardHeader><CardTitle>User Details</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2"><Label>Name</Label><Input defaultValue={user.name} /></div>
                    <div className="space-y-2"><Label>Email</Label><Input type="email" defaultValue={user.email} /></div>
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Select defaultValue={user.role}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {ALL_USER_ROLES.map((r) => (
                                    <SelectItem key={r} value={r}>{getRoleLabel(r)}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {roleRequiresDepartment(user.role as Parameters<typeof roleRequiresDepartment>[0]) && (
                        <div className="space-y-2">
                            <Label>Department</Label>
                            <Select defaultValue={user.department ?? undefined}>
                                <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                                <SelectContent>{departments.map((d) => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <Button>Save Changes</Button>
                        <Button variant="outline" asChild><Link href={route('admin.users.show', user.id)}>Cancel</Link></Button>
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}

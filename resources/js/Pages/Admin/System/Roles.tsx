import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import type { Role } from '@/types/cims';

export default function Roles({ roles }: { roles: Role[] }) {
    return (
        <AdminLayout>
            <Head title="Roles & Permissions" />
            <PageHeader
                title="Roles & Permissions"
                description="Hierarchical access model for the CIMS platform."
                actions={
                    <div className="flex gap-2">
                        <Button variant="outline" asChild><Link href={route('admin.system.audit-logs')}>Audit Logs</Link></Button>
                        <Button variant="outline" asChild><Link href={route('admin.system.activity-logs')}>Activity Logs</Link></Button>
                    </div>
                }
            />

            <Card className="mt-6 border-border/60 bg-muted/20">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Provisioning chain</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                    <p>
                        <strong className="text-foreground">Super Admin</strong> creates{' '}
                        <strong className="text-foreground">Admin</strong> (subscriber) → Admin creates{' '}
                        <strong className="text-foreground">Department Admin</strong> per department → Department Admin creates{' '}
                        <strong className="text-foreground">Staff</strong>.{' '}
                        <strong className="text-foreground">Citizen</strong> and{' '}
                        <strong className="text-foreground">Guest</strong> use the public portal; their records are visible in the Admin Portal only.
                    </p>
                </CardContent>
            </Card>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {roles.map((role) => (
                    <Card key={role.id}>
                        <CardHeader>
                            <CardTitle className="flex flex-wrap items-center justify-between gap-2 text-base">
                                {role.name}
                                <Badge variant="secondary">{role.userCount ?? 0} users</Badge>
                            </CardTitle>
                            {role.portal && <CardDescription>{role.portal}</CardDescription>}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {role.description && (
                                <p className="text-sm text-muted-foreground">{role.description}</p>
                            )}
                            {role.adminManaged && (
                                <Badge variant="outline">Admin Portal records only</Badge>
                            )}
                            {role.creates && role.creates.length > 0 && (
                                <div>
                                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Can create</p>
                                    <div className="flex flex-wrap gap-1">
                                        {role.creates.map((r) => (
                                            <Badge key={r} variant="secondary">{r.replace(/_/g, ' ')}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div>
                                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Permissions</p>
                                <div className="flex flex-wrap gap-1">
                                    {role.permissions.map((p) => (
                                        <Badge key={p} variant="outline" className="text-xs font-mono">{p}</Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AdminLayout>
    );
}

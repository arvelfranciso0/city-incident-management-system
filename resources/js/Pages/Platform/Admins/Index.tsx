import { Head, Link } from '@inertiajs/react';
import PlatformLayout from '@/Layouts/PlatformLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import type { PlatformAdminWithOrg } from '@/types/cims';

export default function Index({ admins }: { admins: PlatformAdminWithOrg[] }) {
    return (
        <PlatformLayout>
            <Head title="Organization Admins" />
            <PageHeader
                title="Organization Admins"
                description="All tenant administrator accounts across subscribed organizations."
                actions={
                    <Button asChild>
                        <Link href={route('platform.organizations.create')}>Provision Subscriber</Link>
                    </Button>
                }
            />

            <Card className="mt-6 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Organization</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Last login</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {admins.map((admin) => (
                            <TableRow key={admin.id}>
                                <TableCell className="font-medium">{admin.name}</TableCell>
                                <TableCell>{admin.email}</TableCell>
                                <TableCell>
                                    {admin.organization ? (
                                        <Link href={route('platform.organizations.show', admin.organization.id)} className="hover:underline">
                                            {admin.organization.name}
                                        </Link>
                                    ) : (
                                        '—'
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={admin.status === 'active' ? 'default' : 'secondary'}>{admin.status}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-muted-foreground">
                                    {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Never'}
                                </TableCell>
                                <TableCell>
                                    {admin.organization && (
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={route('platform.organizations.show', admin.organization.id)}>View org</Link>
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </PlatformLayout>
    );
}

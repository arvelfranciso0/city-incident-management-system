import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { SearchFilters } from '@/Components/cims/SearchFilters';
import { PaginationControls } from '@/Components/cims/PaginationControls';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Card } from '@/Components/ui/card';
import { useState } from 'react';
import { PORTAL_USER_ROLES, getRoleLabel, isAdminManagedPublicRole, type UserRole } from '@/lib/roles';
import type { CimsUser } from '@/types/cims';

export default function Index({ users }: { users: CimsUser[] }) {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    const filtered = users.filter((u) => {
        const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = !roleFilter || roleFilter === 'all' || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    return (
        <AdminLayout>
            <Head title="Users" />
            <PageHeader
                title="User Management"
                description="Manage organization admins, department admins, department staff, and public user records."
                actions={<Button asChild><Link href={route('admin.users.create')}>Create User</Link></Button>}
            />
            <SearchFilters
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search users..."
                filterValues={{ role: roleFilter || 'all' }}
                onFilterChange={(_, value) => setRoleFilter(value === 'all' ? '' : value)}
                filters={[{
                    key: 'role',
                    label: 'Role',
                    options: PORTAL_USER_ROLES.filter((r) => r !== 'super_admin').map((r) => ({ value: r, label: getRoleLabel(r) })),
                }]}
                className="mt-6"
            />
            <Card className="mt-4 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden sm:table-cell">Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="hidden md:table-cell">Department</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{getRoleLabel(user.role)}</Badge>
                                        {isAdminManagedPublicRole(user.role as UserRole) && (
                                            <Badge variant="secondary" className="ml-1 text-[10px]">Admin only</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{user.department ?? '—'}</TableCell>
                                    <TableCell><Badge variant={user.status === 'active' ? 'default' : 'secondary'}>{user.status}</Badge></TableCell>
                                    <TableCell><Button variant="ghost" size="sm" asChild><Link href={route('admin.users.show', user.id)}>View</Link></Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
            <div className="mt-4 flex justify-center"><PaginationControls /></div>
        </AdminLayout>
    );
}

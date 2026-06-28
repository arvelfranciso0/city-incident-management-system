import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PlatformLayout from '@/Layouts/PlatformLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { SearchFilters } from '@/Components/cims/SearchFilters';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Card } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import type { PlatformOrganization } from '@/types/cims';

export default function Index({ organizations }: { organizations: PlatformOrganization[] }) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const filtered = organizations.filter((org) => {
        const q = search.toLowerCase();
        const matchesSearch =
            org.name.toLowerCase().includes(q) ||
            org.slug.toLowerCase().includes(q) ||
            (org.admin?.email.toLowerCase().includes(q) ?? false);
        const matchesStatus = !statusFilter || statusFilter === 'all' || org.subscriptionStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <PlatformLayout>
            <Head title="Subscribers" />
            <PageHeader
                title="Subscribers"
                description="Organizations subscribed to the CIMS platform."
                actions={
                    <Button asChild>
                        <Link href={route('platform.organizations.create')}>Provision Subscriber</Link>
                    </Button>
                }
            />

            <SearchFilters
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search by name, slug, or admin email..."
                filterValues={{ status: statusFilter || 'all' }}
                onFilterChange={(_, value) => setStatusFilter(value === 'all' ? '' : value)}
                filters={[
                    {
                        key: 'status',
                        label: 'Status',
                        options: [
                            { value: 'active', label: 'Active' },
                            { value: 'suspended', label: 'Suspended' },
                            { value: 'cancelled', label: 'Cancelled' },
                        ],
                    },
                ]}
                className="mt-6"
            />

            <Card className="mt-4 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Organization</TableHead>
                            <TableHead className="hidden md:table-cell">Admin</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden sm:table-cell">Users</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((org) => (
                            <TableRow key={org.id}>
                                <TableCell>
                                    <div className="font-medium">{org.name}</div>
                                    <div className="text-xs text-muted-foreground">{org.slug}</div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{org.admin?.email ?? '—'}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{org.subscriptionPlan}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={org.isActive ? 'default' : 'secondary'}>{org.subscriptionStatus}</Badge>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell tabular-nums">{org.usersCount}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={route('platform.organizations.show', org.id)}>Manage</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </PlatformLayout>
    );
}

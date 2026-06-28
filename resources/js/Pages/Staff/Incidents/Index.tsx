import { Head, router } from '@inertiajs/react';
import StaffLayout from '@/Layouts/StaffLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { SearchFilters } from '@/Components/cims/SearchFilters';
import { StatusBadge, PriorityBadge } from '@/Components/cims/StatusBadge';
import { PaginationControls } from '@/Components/cims/PaginationControls';
import { Card, CardContent } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { IconChevronRight } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import type { Incident, Notification } from '@/types/cims';

export default function Index({ incidents, notifications }: { incidents: Incident[]; notifications: Notification[] }) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    const filtered = useMemo(() => {
        return incidents.filter((i) => {
            const matchesSearch =
                i.title.toLowerCase().includes(search.toLowerCase()) ||
                i.id.toLowerCase().includes(search.toLowerCase()) ||
                i.location.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = !statusFilter || i.status === statusFilter;
            const matchesPriority = !priorityFilter || i.priority === priorityFilter;

            return matchesSearch && matchesStatus && matchesPriority;
        });
    }, [incidents, search, statusFilter, priorityFilter]);

    const summary = useMemo(() => ({
        total: incidents.length,
        open: incidents.filter((i) => ['open', 'pending'].includes(i.status)).length,
        inProgress: incidents.filter((i) => i.status === 'in_progress').length,
        critical: incidents.filter((i) => i.priority === 'critical' && i.status !== 'resolved').length,
    }), [incidents]);

    return (
        <StaffLayout notifications={notifications}>
            <Head title="Incidents" />
            <PageHeader title="Incident Management" description="View, filter, and manage all department incidents." />

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Total Incidents', value: summary.total },
                    { label: 'Open / Pending', value: summary.open },
                    { label: 'In Progress', value: summary.inProgress },
                    { label: 'Critical Active', value: summary.critical },
                ].map((s) => (
                    <Card key={s.label}>
                        <CardContent className="pt-6">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{s.label}</p>
                            <p className="mt-1 text-2xl font-bold tabular-nums">{s.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <SearchFilters
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search by title, ID, or location..."
                filterValues={{ status: statusFilter || 'all', priority: priorityFilter || 'all' }}
                onFilterChange={(key, value) => {
                    if (key === 'status') setStatusFilter(value === 'all' ? '' : value);
                    if (key === 'priority') setPriorityFilter(value === 'all' ? '' : value);
                }}
                onReset={() => {
                    setSearch('');
                    setStatusFilter('');
                    setPriorityFilter('');
                }}
                filters={[
                    {
                        key: 'status',
                        label: 'Status',
                        options: [
                            { value: 'open', label: 'Open' },
                            { value: 'pending', label: 'Pending' },
                            { value: 'in_progress', label: 'In Progress' },
                            { value: 'resolved', label: 'Resolved' },
                        ],
                    },
                    {
                        key: 'priority',
                        label: 'Priority',
                        options: [
                            { value: 'critical', label: 'Critical' },
                            { value: 'high', label: 'High' },
                            { value: 'medium', label: 'Medium' },
                            { value: 'low', label: 'Low' },
                        ],
                    },
                ]}
                className="mt-6"
            />

            <Card className="mt-4 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="hidden md:table-cell">Category</TableHead>
                                <TableHead className="hidden lg:table-cell">Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden sm:table-cell">Priority</TableHead>
                                <TableHead className="hidden md:table-cell">Assigned</TableHead>
                                <TableHead className="hidden lg:table-cell">Reported</TableHead>
                                <TableHead className="w-10" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="py-10 text-center text-muted-foreground">
                                        No incidents match your filters.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filtered.map((inc) => (
                                    <TableRow
                                        key={inc.id}
                                        className="group cursor-pointer hover:bg-muted/50"
                                        onClick={() => router.visit(route('staff.incidents.show', inc.id))}
                                    >
                                        <TableCell className="font-mono text-xs">{inc.id}</TableCell>
                                        <TableCell>
                                            <p className="font-medium">{inc.title}</p>
                                            <p className="text-xs text-muted-foreground md:hidden">{inc.department}</p>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">{inc.category}</TableCell>
                                        <TableCell className="hidden max-w-[180px] truncate lg:table-cell">{inc.location}</TableCell>
                                        <TableCell><StatusBadge status={inc.status} /></TableCell>
                                        <TableCell className="hidden sm:table-cell"><PriorityBadge priority={inc.priority} /></TableCell>
                                        <TableCell className="hidden md:table-cell">{inc.assignedTo ?? 'Unassigned'}</TableCell>
                                        <TableCell className="hidden text-muted-foreground lg:table-cell">
                                            {new Date(inc.reportedAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <IconChevronRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>Showing {filtered.length} of {incidents.length} incidents</span>
                <PaginationControls />
            </div>
        </StaffLayout>
    );
}

import { Head, Link } from '@inertiajs/react';
import CitizenLayout from '@/Layouts/CitizenLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { SearchFilters } from '@/Components/cims/SearchFilters';
import { StatusBadge, PriorityBadge } from '@/Components/cims/StatusBadge';
import { PaginationControls } from '@/Components/cims/PaginationControls';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Card } from '@/Components/ui/card';
import { useState } from 'react';
import type { Incident, Notification } from '@/types/cims';

export default function Index({ incidents, notifications }: { incidents: Incident[]; notifications: Notification[] }) {
    const [search, setSearch] = useState('');

    const filtered = incidents.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()));

    return (
        <CitizenLayout notifications={notifications}>
            <Head title="My Incidents" />
            <PageHeader title="My Incidents" description="View and manage all your submitted reports." actions={<Button asChild><Link href={route('citizen.report')}>New Report</Link></Button>} />
            <SearchFilters searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search incidents..." className="mt-6" />
            <Card className="mt-4 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Title</TableHead><TableHead className="hidden sm:table-cell">Category</TableHead><TableHead>Status</TableHead><TableHead className="hidden md:table-cell">Priority</TableHead><TableHead></TableHead></TableRow></TableHeader>
                        <TableBody>
                            {filtered.map((inc) => (
                                <TableRow key={inc.id}>
                                    <TableCell className="font-mono text-xs">{inc.id}</TableCell>
                                    <TableCell className="font-medium">{inc.title}</TableCell>
                                    <TableCell className="hidden sm:table-cell">{inc.category}</TableCell>
                                    <TableCell><StatusBadge status={inc.status} /></TableCell>
                                    <TableCell className="hidden md:table-cell"><PriorityBadge priority={inc.priority} /></TableCell>
                                    <TableCell><Button variant="ghost" size="sm" asChild><Link href={route('citizen.incidents.show', inc.id)}>View</Link></Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
            <div className="mt-4 flex justify-center"><PaginationControls /></div>
        </CitizenLayout>
    );
}

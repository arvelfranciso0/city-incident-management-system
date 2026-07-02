import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { StatusBadge } from '@/Components/cims/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { IconChevronRight } from '@tabler/icons-react';
import type { Department, Incident } from '@/types/cims';
import { Button } from "@/Components/ui/button";

interface ShowProps{
    departmentData :{
        data: DepartmentIncidents
    }
}

interface DepartmentIncidents extends Department {
    incidents: Incident[]
}
export default function Show({departmentData}: ShowProps) {
    const department = departmentData.data

    return (
        <AdminLayout>
            <Head title={department.name} />
            <div className="mb-2">
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="-ml-2 text-muted-foreground"
                >
                    <Link href={route("admin.departments.index")}>
                        ← Back to Departments
                    </Link>
                </Button>
            </div>
            <PageHeader title={department.name} description={`Department head: ${department.head}`} />
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[{ l: 'Staff', v: department.staffCount }, { l: 'Open Incidents', v: department.openIncidents }, { l: 'Avg Resolution', v: `${department.avgResolutionDays} days` }].map((s) => (
                    <Card key={s.l}><CardContent className="pt-6"><p className="text-sm text-muted-foreground">{s.l}</p><p className="text-2xl font-bold">{s.v}</p></CardContent></Card>
                ))}
            </div>
            <Card className="mt-6">
                <CardHeader><CardTitle>Recent Incidents</CardTitle></CardHeader>
                <CardContent className="overflow-x-auto p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-10" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {department.incidents.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                                        No incidents for this department.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                department.incidents.map((inc) => (
                                    <TableRow
                                        key={inc.id}
                                        className="group cursor-pointer hover:bg-muted/50"
                                        onClick={() => router.visit(route('admin.incidents.show', inc.id))}
                                    >
                                        <TableCell className="font-mono text-xs">{inc.id}</TableCell>
                                        <TableCell className="font-medium">{inc.title}</TableCell>
                                        <TableCell><StatusBadge status={inc.status} /></TableCell>
                                        <TableCell>
                                            <IconChevronRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}

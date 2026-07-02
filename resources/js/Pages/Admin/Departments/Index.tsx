import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import type { Department } from '@/types/cims';

interface DepartmentProps{
    departments: {
        data:  Department[]
    }
}
export default function Index({ departments: departmentsData }: DepartmentProps) {
    const departments = departmentsData.data
    return (
        <AdminLayout>
            <Head title="Departments" />
            <PageHeader title="Departments" description="Manage city departments and their incident load." />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {departments.map((d) => (
                    <Card key={d.id} className="transition-shadow hover:shadow-md">
                        <CardContent className="pt-6">
                            <h3 className="font-semibold">{d.name}</h3>
                            <p className="text-sm text-muted-foreground">Head: {d.head}</p>
                            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                                <div><p className="font-bold text-lg">{d.staffCount}</p><p className="text-muted-foreground">Staff</p></div>
                                <div><p className="font-bold text-lg">{d.openIncidents}</p><p className="text-muted-foreground">Open</p></div>
                                <div><p className="font-bold text-lg">{d.avgResolutionDays}d</p><p className="text-muted-foreground">Avg</p></div>
                            </div>
                            <Button variant="outline" size="sm" className="mt-4 w-full" asChild><Link href={route('admin.departments.show', d.id)}>View Details</Link></Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AdminLayout>
    );
}

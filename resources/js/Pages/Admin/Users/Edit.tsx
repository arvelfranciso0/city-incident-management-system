import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { PageHeader } from "@/Components/cims/PageHeader";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    ALL_USER_ROLES,
    getRoleLabel,
    roleRequiresDepartment,
    UserRole,
} from "@/lib/roles";
import type { CimsUser, Department } from "@/types/cims";
import { FormEventHandler } from "react";

interface UpdateUserProps {
    name: string;
    email: string;
    role: UserRole;
    department_id: number | null;
}

interface Props {
    user: {
        data: CimsUser;
    };
    departments: Department[];
    assignableRoles: UserRole[];
}
export default function Edit({ user:userData, departments, assignableRoles }: Props) {

    const user= userData.data;

    const { data, setData, patch, isDirty } = useForm<UpdateUserProps>({
        name: user.name,
        email: user.email,
        role: user.role,
        department_id: user.department_id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("admin.users.update", user.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => console.log("Sucess"),
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit ${user.name}`} />
            <div className="mb-2">
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="-ml-2 text-muted-foreground"
                >
                    <Link href={route("admin.users.show", user.id)}>
                        ← Back to details
                    </Link>
                </Button>
            </div>
            <PageHeader
                title="Edit User"
                description={`Update details for ${user.name}`}
            />
            <Card className="mt-6 max-w-lg">
                <CardHeader>
                    <CardTitle>User Details</CardTitle>
                </CardHeader>
                <CardContent >
                    <form onSubmit={submit} className="space-y-5">
                    <div className="space-y-2">
                        <Label>Fullname</Label>
                        <Input
                            defaultValue={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            defaultValue={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Select
                            defaultValue={data.role}
                            onValueChange={(value: UserRole) =>
                                setData("role", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {assignableRoles.map((r) => (
                                    <SelectItem key={r} value={r}>
                                        {getRoleLabel(r)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {roleRequiresDepartment(
                        user.role as Parameters<
                            typeof roleRequiresDepartment
                        >[0],
                    ) && (
                        <div className="space-y-2">
                            <Label>Department</Label>
                            <Select
                                defaultValue={data.department_id?.toString()}
                                onValueChange={(value) =>
                                    setData("department_id", Number(value))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((d) => (
                                        <SelectItem
                                            key={d.id}
                                            value={d.id.toString()}
                                        >
                                            {d.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <Button type="submit" disabled={!isDirty}>Save Changes</Button>
                        <Button variant="outline" asChild>
                            <Link href={route("admin.users.show", user.id)}>
                                Cancel
                            </Link>
                        </Button>
                    </div>
                    </form>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}

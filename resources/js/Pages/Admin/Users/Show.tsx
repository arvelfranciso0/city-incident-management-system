import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { PageHeader } from "@/Components/cims/PageHeader";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { Separator } from "@/Components/ui/separator";
import {
    IconBriefcase,
    IconBuilding,
    IconCalendar,
    IconMail,
    IconMapPin,
    IconPhone,
    IconShield,
    IconUser,
} from "@tabler/icons-react";
import type { CimsUser } from "@/types/cims";
import {
    getRoleLabel,
    isAdminManagedPublicRole,
    type UserRole,
} from "@/lib/roles";
import { UserStatus } from "@/enums/UserStatus";
import ResetUserPasswordDialog from "@/Components/cims/ResetUserPasswordDialog";

function initials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function roleLabel(role: string) {
    return getRoleLabel(role);
}

interface Props {
    user: {
        data: CimsUser;
    };
}

export default function Show({ user: userData }: Props) {
    const user = userData.data;
    const handleDeactivateUser = () => {
        if (!confirm(`Deactivate ${user.name}?`)) return;

        router.patch(
            route("admin.users.deactivate", user.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    console.log("Success");
                },
                onError: () => {
                    console.log("Something went wrong");
                },
            },
        );
    };

    const handleActivateUser = () => {
        if (!confirm(`Activate ${user.name}?`)) return;

        router.patch(
            route("admin.users.activate", user.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    console.log("Success");
                },
                onError: () => {
                    console.log("Something went wrong");
                },
            },
        );
    };
    return (
        <AdminLayout>
            <Head title={user.name} />

            <div className="mb-2">
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="-ml-2 text-muted-foreground"
                >
                    <Link href={route("admin.users.index")}>
                        ← Back to Users
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                    <Avatar size="lg" className="size-16 text-lg">
                        <AvatarFallback>{initials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <PageHeader
                            title={user.name}
                            description={user.jobTitle ?? roleLabel(user.role)}
                        />
                        <div className="mt-2 flex flex-wrap gap-2">
                            <Badge>{getRoleLabel(user.role)}</Badge>
                            {isAdminManagedPublicRole(
                                user.role as UserRole,
                            ) && (
                                <Badge variant="secondary">
                                    Admin-managed public account
                                </Badge>
                            )}
                            <Badge
                                variant={
                                    user.status === "active"
                                        ? "default"
                                        : "secondary"
                                }
                            >
                                {user.status}
                            </Badge>
                            {user.department && (
                                <Badge variant="outline">
                                    {user.department}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
                <Button asChild className="shrink-0">
                    <Link href={route("admin.users.edit", user.id)}>
                        Edit User
                    </Link>
                </Button>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <IconUser className="size-4" />
                            Profile
                        </CardTitle>
                        <CardDescription>
                            Personal and account information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {user.bio && (
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {user.bio}
                            </p>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <ProfileField
                                icon={IconMail}
                                label="Email"
                                value={user.email}
                            />
                            <ProfileField
                                icon={IconPhone}
                                label="Phone"
                                value={user.phone ?? "Not provided"}
                            />
                            <ProfileField
                                icon={IconBriefcase}
                                label="Job Title"
                                value={user.jobTitle ?? "—"}
                            />
                            <ProfileField
                                icon={IconBuilding}
                                label="Department"
                                value={user.department ?? "N/A"}
                            />
                            <ProfileField
                                icon={IconMapPin}
                                label="Address"
                                value={user.address ?? "Not provided"}
                                className="sm:col-span-2"
                            />
                            <ProfileField
                                icon={IconCalendar}
                                label="Member Since"
                                value={
                                    user.joinedAt
                                        ? new Date(
                                              user.joinedAt,
                                          ).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                          })
                                        : "—"
                                }
                            />
                            <ProfileField
                                icon={IconCalendar}
                                label="Last Login"
                                value={new Date(
                                    user.lastLogin,
                                ).toLocaleString()}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">
                                Activity Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            {user.role === "staff" && (
                                <StatBlock
                                    label="Incidents Handled"
                                    value={user.incidentsHandled ?? 0}
                                />
                            )}
                            {(user.role === "citizen" ||
                                user.role === "guest") && (
                                <StatBlock
                                    label="Reports Submitted"
                                    value={user.incidentsReported ?? 0}
                                />
                            )}
                            {user.role === "admin" && (
                                <>
                                    <StatBlock
                                        label="Incidents Handled"
                                        value={user.incidentsHandled ?? 0}
                                    />
                                    <StatBlock
                                        label="Reports Submitted"
                                        value={user.incidentsReported ?? 0}
                                    />
                                </>
                            )}
                            <StatBlock
                                label="Account Status"
                                value={user.status}
                                capitalize
                            />
                        </CardContent>
                    </Card>

                    {user.permissions && user.permissions.length > 0 && (
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <IconShield className="size-4" />
                                    Permissions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {user.permissions.map((perm) => (
                                        <Badge
                                            key={perm}
                                            variant="secondary"
                                            className="font-mono text-xs"
                                        >
                                            {perm}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-base">Account Details</CardTitle>
                    <CardDescription>
                        System identifiers and access metadata
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                User ID
                            </p>
                            <p className="mt-1 font-mono text-sm">#{user.id}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Role
                            </p>
                            <p className="mt-1 capitalize">{getRoleLabel(user.role)}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Status
                            </p>
                            <p className="mt-1 capitalize">{user.status}</p>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={route("admin.users.edit", user.id)}>
                                Edit Profile
                            </Link>
                        </Button>
                        <ResetUserPasswordDialog user={user}/>
                        
                        {user.status === UserStatus.Active ? (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDeactivateUser}
                            >
                                Deactivate Account
                            </Button>
                        ) : (
                            user.status === UserStatus.Inactive && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleActivateUser}
                                >
                                    Set Active Account
                                </Button>
                            )
                        )}
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}

function ProfileField({
    icon: Icon,
    label,
    value,
    className,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    className?: string;
}) {
    return (
        <div className={className}>
            <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Icon className="size-3.5" />
                {label}
            </div>
            <p className="mt-1 text-sm">{value}</p>
        </div>
    );
}

function StatBlock({
    label,
    value,
    capitalize,
}: {
    label: string;
    value: string | number;
    capitalize?: boolean;
}) {
    return (
        <div className="rounded-lg border border-border/60 bg-muted/20 p-3 text-center">
            <p
                className={`text-2xl font-bold tabular-nums ${capitalize ? "capitalize" : ""}`}
            >
                {value}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
        </div>
    );
}

import { Head, Link } from '@inertiajs/react';
import StaffLayout from '@/Layouts/StaffLayout';
import { PageHeader } from '@/Components/cims/PageHeader';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Separator } from '@/Components/ui/separator';
import { Progress } from '@/Components/ui/progress';
import {
    IconBriefcase,
    IconBuilding,
    IconCalendar,
    IconMail,
    IconMapPin,
    IconPhone,
    IconSettings,
    IconShield,
    IconUser,
} from '@tabler/icons-react';
import type { CimsUser, Notification } from '@/types/cims';

function initials(name: string) {
    return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

export default function Profile({ user, notifications }: { user: CimsUser; notifications: Notification[] }) {
    const resolutionRate = user.incidentsHandled
        ? Math.min(98, 85 + (user.incidentsHandled % 14))
        : 0;

    return (
        <StaffLayout notifications={notifications}>
            <Head title="Staff Profile" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                    <Avatar size="lg" className="size-16 text-lg">
                        <AvatarFallback className="bg-primary/10 text-primary">{initials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <PageHeader title={user.name} description={user.jobTitle ?? 'Staff Member'} />
                        <div className="mt-2 flex flex-wrap gap-2">
                            <Badge className="capitalize">{user.role}</Badge>
                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>{user.status}</Badge>
                            {user.department && <Badge variant="outline">{user.department}</Badge>}
                        </div>
                    </div>
                </div>
                <Button variant="outline" asChild>
                    <Link href={route('staff.settings')}>
                        <IconSettings className="size-4" />
                        Edit Settings
                    </Link>
                </Button>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <IconUser className="size-4" />
                            Profile Information
                        </CardTitle>
                        <CardDescription>Your staff account details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {user.bio && (
                            <p className="text-sm leading-relaxed text-muted-foreground">{user.bio}</p>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <ProfileField icon={IconMail} label="Email" value={user.email} />
                            <ProfileField icon={IconPhone} label="Phone" value={user.phone ?? 'Not provided'} />
                            <ProfileField icon={IconBriefcase} label="Job Title" value={user.jobTitle ?? '—'} />
                            <ProfileField icon={IconBuilding} label="Department" value={user.department ?? '—'} />
                            <ProfileField icon={IconMapPin} label="Address" value={user.address ?? 'Not provided'} className="sm:col-span-2" />
                            <ProfileField icon={IconCalendar} label="Member Since" value={user.joinedAt ? new Date(user.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'} />
                            <ProfileField icon={IconCalendar} label="Last Login" value={new Date(user.lastLogin).toLocaleString()} />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Performance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Incidents Handled</span>
                                    <span className="font-bold tabular-nums">{user.incidentsHandled ?? 0}</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Resolution Rate</span>
                                    <span className="font-bold tabular-nums">{resolutionRate}%</span>
                                </div>
                                <Progress value={resolutionRate} className="mt-2 h-2" />
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-center">
                                <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                                    <p className="text-xl font-bold">7</p>
                                    <p className="text-xs text-muted-foreground">Active</p>
                                </div>
                                <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
                                    <p className="text-xl font-bold">2.1d</p>
                                    <p className="text-xs text-muted-foreground">Avg Resolution</p>
                                </div>
                            </div>
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
                                        <Badge key={perm} variant="secondary" className="font-mono text-xs">{perm}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-base">Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Staff ID</p>
                            <p className="mt-1 font-mono text-sm">#{user.id}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Role</p>
                            <p className="mt-1 capitalize">{user.role}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</p>
                            <p className="mt-1 capitalize">{user.status}</p>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={route('staff.settings')}>Account Settings</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={route('staff.incidents.index')}>View My Incidents</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </StaffLayout>
    );
}

function ProfileField({
    icon: Icon,
    label,
    value,
    className,
}: {
    icon?: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    className?: string;
}) {
    return (
        <div className={className}>
            <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {Icon && <Icon className="size-3.5" />}
                {label}
            </div>
            <p className="mt-1 text-sm">{value}</p>
        </div>
    );
}

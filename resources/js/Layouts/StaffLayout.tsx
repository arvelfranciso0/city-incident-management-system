import {
    IconBell,
    IconCalendar,
    IconChartBar,
    IconClipboardList,
    IconDashboard,
    IconLayoutKanban,
    IconLogout,
    IconMap,
    IconSettings,
    IconUser,
} from '@tabler/icons-react';
import { prefixFromRoute } from '@/lib/nav';
import PortalLayout from './PortalLayout';
import type { Notification } from '@/types/cims';

const navItems = [
    { href: route('staff.dashboard'), label: 'Dashboard', icon: <IconDashboard className="size-4" />, exact: true },
    { href: route('staff.incidents.index'), label: 'Incidents', icon: <IconClipboardList className="size-4" /> },
    { href: route('staff.maps.index'), label: 'Maps', icon: <IconMap className="size-4" />, exact: true },
    {
        href: route('staff.reports.monthly'),
        label: 'Reports',
        icon: <IconChartBar className="size-4" />,
        matchPrefix: prefixFromRoute('staff.reports.monthly', 1),
    },
    { href: route('staff.notifications'), label: 'Notifications', icon: <IconBell className="size-4" />, exact: true },
    { href: route('staff.profile'), label: 'Profile', icon: <IconUser className="size-4" />, exact: true },
    { href: route('staff.settings'), label: 'Settings', icon: <IconSettings className="size-4" />, exact: true },
    { href: route('logout'), label: 'Log out', icon: <IconLogout className="size-4" />, method: 'post' as const, exact: true },
];

export default function StaffLayout({
    children,
    notifications = [],
}: {
    children: React.ReactNode;
    notifications?: Notification[];
}) {
    return (
        <PortalLayout
            portalName="Staff Portal"
            portalSubtitle="Department operations"
            navItems={navItems}
            notifications={notifications}
            notificationsHref={route('staff.notifications')}
            accent="staff"
            userMenuLinks={[
                { href: route('staff.profile'), label: 'Profile' },
                { href: route('staff.settings'), label: 'Settings' },
                { href: route('logout'), label: 'Log out', method: 'post' },
            ]}
        >
            {children}
        </PortalLayout>
    );
}

export { IconLayoutKanban, IconCalendar };

import {
    IconBell,
    IconClipboardList,
    IconDashboard,
    IconFileReport,
    IconSettings,
    IconUser,
} from '@tabler/icons-react';
import PortalLayout from './PortalLayout';
import type { Notification } from '@/types/cims';

const navItems = [
    { href: route('citizen.dashboard'), label: 'Dashboard', icon: <IconDashboard className="size-4" />, exact: true },
    { href: route('citizen.incidents.index'), label: 'My Incidents', icon: <IconClipboardList className="size-4" /> },
    { href: route('citizen.report'), label: 'Report Incident', icon: <IconFileReport className="size-4" />, exact: true },
    { href: route('citizen.notifications'), label: 'Notifications', icon: <IconBell className="size-4" />, exact: true },
    { href: route('citizen.profile'), label: 'Profile', icon: <IconUser className="size-4" />, exact: true },
    { href: route('citizen.settings'), label: 'Settings', icon: <IconSettings className="size-4" />, exact: true },
];

export default function CitizenLayout({
    children,
    notifications = [],
}: {
    children: React.ReactNode;
    notifications?: Notification[];
}) {
    return (
        <PortalLayout
            portalName="Citizen Portal"
            portalSubtitle="Track & report incidents"
            navItems={navItems}
            notifications={notifications}
            notificationsHref={route('citizen.notifications')}
            accent="citizen"
            userMenuLinks={[
                { href: route('citizen.profile'), label: 'Profile' },
                { href: route('citizen.settings'), label: 'Settings' },
                { href: route('logout'), label: 'Log out' },
            ]}
        >
            {children}
        </PortalLayout>
    );
}

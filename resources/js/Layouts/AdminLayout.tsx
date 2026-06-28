import {
    IconBuilding,
    IconCategory,
    IconChartBar,
    IconDashboard,
    IconMap,
    IconSettings,
    IconShield,
    IconUsers,
} from '@tabler/icons-react';
import { prefixFromRoute } from '@/lib/nav';
import PortalLayout from './PortalLayout';
import type { Notification } from '@/types/cims';

const navItems = [
    { href: route('admin.dashboard'), label: 'Executive Dashboard', icon: <IconDashboard className="size-4" />, exact: true },
    { href: route('admin.users.index'), label: 'Users', icon: <IconUsers className="size-4" /> },
    { href: route('admin.departments.index'), label: 'Departments', icon: <IconBuilding className="size-4" /> },
    { href: route('admin.categories.index'), label: 'Categories', icon: <IconCategory className="size-4" />, exact: true },
    {
        href: route('admin.system.roles'),
        label: 'System',
        icon: <IconShield className="size-4" />,
        matchPrefix: prefixFromRoute('admin.system.roles', 1),
        excludePaths: [route('admin.system.settings')],
    },
    {
        href: route('admin.reports.analytics'),
        label: 'Reports',
        icon: <IconChartBar className="size-4" />,
        matchPrefix: prefixFromRoute('admin.reports.analytics', 1),
    },
    { href: route('admin.maps.heatmap'), label: 'City Map', icon: <IconMap className="size-4" />, exact: true },
    { href: route('admin.system.settings'), label: 'Settings', icon: <IconSettings className="size-4" />, exact: true },
];

export default function AdminLayout({
    children,
    notifications = [],
}: {
    children: React.ReactNode;
    notifications?: Notification[];
}) {
    return (
        <PortalLayout
            portalName="Administrator Portal"
            portalSubtitle="City administration"
            navItems={navItems}
            notifications={notifications}
            accent="admin"
            userMenuLinks={[
                { href: route('admin.system.settings'), label: 'Settings' },
                { href: route('logout'), label: 'Log out' },
            ]}
        >
            {children}
        </PortalLayout>
    );
}

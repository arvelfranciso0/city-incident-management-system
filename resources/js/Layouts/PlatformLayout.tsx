import {
    IconBuilding,
    IconChartBar,
    IconDashboard,
    IconLogout,
    IconShield,
    IconUsers,
} from '@tabler/icons-react';
import { prefixFromRoute } from '@/lib/nav';
import PortalLayout from './PortalLayout';

const navItems = [
    { href: route('platform.dashboard'), label: 'Platform Dashboard', icon: <IconDashboard className="size-4" />, exact: true },
    {
        href: route('platform.organizations.index'),
        label: 'Subscribers',
        icon: <IconBuilding className="size-4" />,
        matchPrefix: prefixFromRoute('platform.organizations.index', 1),
    },
    { href: route('platform.admins.index'), label: 'Organization Admins', icon: <IconUsers className="size-4" />, exact: true },
    { href: route('platform.analytics'), label: 'Analytics', icon: <IconChartBar className="size-4" />, exact: true },
    { href: route('platform.monitor'), label: 'System Monitor', icon: <IconShield className="size-4" />, exact: true },
    { href: route('logout'), label: 'Log out', icon: <IconLogout className="size-4" />, method: 'post' as const, exact: true },
];

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <PortalLayout
            portalName="Super Admin Console"
            portalSubtitle="Platform operations"
            navItems={navItems}
            accent="admin"
            userMenuLinks={[
                { href: route('platform.dashboard'), label: 'Platform Home' },
                { href: route('logout'), label: 'Log out', method: 'post' },
            ]}
        >
            {children}
        </PortalLayout>
    );
}

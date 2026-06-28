export type UserRole = 'super_admin' | 'admin' | 'staff' | 'citizen' | 'guest';

export interface RoleDefinition {
    slug: UserRole;
    label: string;
    description: string;
    portal: string;
    adminManaged?: boolean;
}

export const ROLES: Record<UserRole, RoleDefinition> = {
    super_admin: {
        slug: 'super_admin',
        label: 'Super Admin',
        description: 'Platform operator who provisions subscribers and organization admins.',
        portal: 'Super Admin Console',
    },
    admin: {
        slug: 'admin',
        label: 'Organization Admin',
        description: 'Subscriber administrator for one organization tenant.',
        portal: 'Admin Portal',
    },
    staff: {
        slug: 'staff',
        label: 'Staff',
        description: 'Department worker handling assigned incidents.',
        portal: 'Staff Portal',
    },
    citizen: {
        slug: 'citizen',
        label: 'Citizen',
        description: 'Registered public user who reports and tracks incidents.',
        portal: 'Citizen Portal',
        adminManaged: true,
    },
    guest: {
        slug: 'guest',
        label: 'Guest',
        description: 'Anonymous reporter without a full account.',
        portal: 'Public Portal',
        adminManaged: true,
    },
};

export const ROLE_CREATORS: Record<UserRole, UserRole[]> = {
    super_admin: ['admin'],
    admin: ['staff', 'citizen', 'guest'],
    staff: [],
    citizen: [],
    guest: [],
};

export function getRoleLabel(role: string): string {
    return ROLES[role as UserRole]?.label ?? role.replace(/_/g, ' ');
}

export function getRoleDescription(role: string): string {
    return ROLES[role as UserRole]?.description ?? '';
}

export function getCreatableRoles(actorRole: UserRole): UserRole[] {
    return ROLE_CREATORS[actorRole] ?? [];
}

export function roleRequiresDepartment(role: UserRole): boolean {
    return role === 'staff';
}

export function isAdminManagedPublicRole(role: UserRole): boolean {
    return Boolean(ROLES[role]?.adminManaged);
}

export const ALL_USER_ROLES = Object.keys(ROLES) as UserRole[];

export const PORTAL_USER_ROLES = ALL_USER_ROLES.filter((r) => r !== 'super_admin');

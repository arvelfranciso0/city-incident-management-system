export type IncidentStatus = 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed';
export type IncidentPriority = 'critical' | 'high' | 'medium' | 'low';

export interface Incident {
    id: string;
    title: string;
    description: string;
    category: string;
    priority: IncidentPriority | string;
    status: IncidentStatus | string;
    location: string;
    lat?: number;
    lng?: number;
    reportedAt: string;
    updatedAt: string;
    assignedTo: string | null;
    department: string;
    reporter: string;
    trackingNumber: string;
}

export interface TimelineEvent {
    id: number;
    type: string;
    title: string;
    description: string;
    timestamp: string;
    user: string;
}

export interface Notification {
    id: number;
    title: string;
    message: string;
    read: boolean;
    timestamp: string;
    type: string;
}

export type UserRole = 'super_admin' | 'admin' | 'staff' | 'citizen' | 'guest';

export interface CimsUser {
    id: number;
    name: string;
    email: string;
    role: UserRole | string;
    department: string | null;
    status: string;
    lastLogin: string;
    phone?: string;
    jobTitle?: string | null;
    joinedAt?: string;
    address?: string;
    bio?: string;
    incidentsHandled?: number;
    incidentsReported?: number;
    permissions?: string[];
}

export interface Department {
    id: number;
    name: string;
    head: string;
    staffCount: number;
    openIncidents: number;
    avgResolutionDays: number;
}

export interface Category {
    id: number;
    name: string;
    department: string;
    incidentCount: number;
    active: boolean;
}

export interface Priority {
    id: number;
    name: string;
    slaHours: number;
    color: string;
    incidentCount: number;
}

export interface StatCard {
    label: string;
    value: string;
    change: string;
}

export interface Faq {
    question: string;
    answer: string;
}

export interface AuditLog {
    id: number;
    action: string;
    user: string;
    target: string;
    timestamp: string;
    ip: string;
}

export interface ActivityLog {
    id: number;
    type: string;
    description: string;
    timestamp: string;
}

export interface Role {
    id: number;
    slug?: string;
    name: string;
    description?: string;
    portal?: string;
    permissions: string[];
    userCount: number;
    creates?: string[];
    adminManaged?: boolean;
}

export interface ChartData {
    labels: string[];
    incidents: number[];
    resolved: number[];
}

export interface PlatformAdminUser {
    id: number;
    name: string;
    email: string;
    status: string;
    lastLogin?: string | null;
    joinedAt?: string | null;
}

export interface PlatformOrganization {
    id: number;
    name: string;
    slug: string;
    subdomain?: string | null;
    domain?: string | null;
    customDomain?: string | null;
    tenantHost?: string | null;
    publicUrl?: string;
    supportEmail?: string | null;
    supportPhone?: string | null;
    isActive: boolean;
    subscriptionPlan: string;
    subscriptionStatus: string;
    subscribedAt?: string | null;
    trialEndsAt?: string | null;
    createdAt?: string | null;
    usersCount: number;
    incidentsCount: number;
    departmentsCount: number;
    admin?: PlatformAdminUser | null;
}

export interface PlatformAdminWithOrg extends PlatformAdminUser {
    organization?: {
        id: number;
        name: string;
        slug: string;
    } | null;
}

export interface TenantOrganization {
    id: number;
    name: string;
    slug: string;
    subdomain?: string | null;
    domain?: string | null;
    customDomain?: string | null;
    tenantHost?: string | null;
    supportEmail?: string | null;
    supportPhone?: string | null;
    publicUrl?: string;
}

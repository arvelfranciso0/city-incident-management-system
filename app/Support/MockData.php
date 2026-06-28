<?php

namespace App\Support;

class MockData
{
    public static function incidents(): array
    {
        return [
            [
                'id' => 'INC-2026-00421',
                'title' => 'Pothole on Main Street',
                'description' => 'Large pothole causing traffic slowdown near the intersection.',
                'category' => 'Road Maintenance',
                'priority' => 'high',
                'status' => 'in_progress',
                'location' => '142 Main Street, Downtown',
                'lat' => 40.7128,
                'lng' => -74.006,
                'reportedAt' => '2026-06-20T09:15:00',
                'updatedAt' => '2026-06-22T14:30:00',
                'assignedTo' => 'Sarah Chen',
                'department' => 'Public Works',
                'reporter' => 'John Martinez',
                'trackingNumber' => 'TRK-8F3K2M9P',
            ],
            [
                'id' => 'INC-2026-00398',
                'title' => 'Broken streetlight',
                'description' => 'Streetlight not working for 3 nights on Oak Avenue.',
                'category' => 'Utilities',
                'priority' => 'medium',
                'status' => 'open',
                'location' => '88 Oak Avenue, Westside',
                'lat' => 40.718,
                'lng' => -74.012,
                'reportedAt' => '2026-06-18T20:45:00',
                'updatedAt' => '2026-06-19T10:00:00',
                'assignedTo' => null,
                'department' => 'Electrical Services',
                'reporter' => 'Guest Reporter',
                'trackingNumber' => 'TRK-2A7B9C1D',
            ],
            [
                'id' => 'INC-2026-00405',
                'title' => 'Illegal dumping',
                'description' => 'Construction debris dumped in alley behind commercial building.',
                'category' => 'Sanitation',
                'priority' => 'low',
                'status' => 'resolved',
                'location' => '15 Commerce Alley, Industrial District',
                'lat' => 40.705,
                'lng' => -74.018,
                'reportedAt' => '2026-06-15T07:30:00',
                'updatedAt' => '2026-06-17T16:00:00',
                'assignedTo' => 'Mike Torres',
                'department' => 'Sanitation',
                'reporter' => 'Emily Wong',
                'trackingNumber' => 'TRK-5E8F1G4H',
            ],
            [
                'id' => 'INC-2026-00412',
                'title' => 'Sinkhole forming near crosswalk',
                'description' => 'Road surface collapsing on Broadway near 5th.',
                'category' => 'Road Maintenance',
                'priority' => 'critical',
                'status' => 'in_progress',
                'location' => 'Broadway & 5th Street, Downtown',
                'lat' => 40.7142,
                'lng' => -74.0055,
                'reportedAt' => '2026-06-24T06:00:00',
                'updatedAt' => '2026-06-25T11:00:00',
                'assignedTo' => 'Sarah Chen',
                'department' => 'Public Works',
                'reporter' => 'Transit Authority',
                'trackingNumber' => 'TRK-9K2L4M6N',
            ],
            [
                'id' => 'INC-2026-00408',
                'title' => 'Overflowing trash bins',
                'description' => 'Bins not emptied for two collection cycles.',
                'category' => 'Sanitation',
                'priority' => 'medium',
                'status' => 'open',
                'location' => '220 Market Street, Downtown',
                'lat' => 40.7115,
                'lng' => -74.0082,
                'reportedAt' => '2026-06-23T14:20:00',
                'updatedAt' => '2026-06-23T14:20:00',
                'assignedTo' => null,
                'department' => 'Sanitation',
                'reporter' => 'Store Owner',
                'trackingNumber' => 'TRK-3C5D7E9F',
            ],
            [
                'id' => 'INC-2026-00391',
                'title' => 'Power outage reported',
                'description' => 'Multiple units without power on Oak Avenue block.',
                'category' => 'Utilities',
                'priority' => 'high',
                'status' => 'in_progress',
                'location' => '90-98 Oak Avenue, Westside',
                'lat' => 40.7185,
                'lng' => -74.0115,
                'reportedAt' => '2026-06-22T19:00:00',
                'updatedAt' => '2026-06-23T08:30:00',
                'assignedTo' => 'Lisa Park',
                'department' => 'Electrical Services',
                'reporter' => 'Building Manager',
                'trackingNumber' => 'TRK-1A3B5C7D',
            ],
            [
                'id' => 'INC-2026-00418',
                'title' => 'Fallen tree branch in park',
                'description' => 'Large branch blocking walking path after storm.',
                'category' => 'Parks & Trees',
                'priority' => 'medium',
                'status' => 'open',
                'location' => 'Riverside Park, North Trail',
                'lat' => 40.722,
                'lng' => -74.003,
                'reportedAt' => '2026-06-26T07:45:00',
                'updatedAt' => '2026-06-26T07:45:00',
                'assignedTo' => null,
                'department' => 'Parks & Recreation',
                'reporter' => 'Jogger',
                'trackingNumber' => 'TRK-6G8H0J2K',
            ],
            [
                'id' => 'INC-2026-00402',
                'title' => 'Damaged guardrail',
                'description' => 'Vehicle impact damaged guardrail on bridge approach.',
                'category' => 'Road Maintenance',
                'priority' => 'high',
                'status' => 'pending',
                'location' => 'Harbor Bridge Approach, East River',
                'lat' => 40.7088,
                'lng' => -74.0012,
                'reportedAt' => '2026-06-19T22:10:00',
                'updatedAt' => '2026-06-20T09:00:00',
                'assignedTo' => 'Sarah Chen',
                'department' => 'Public Works',
                'reporter' => 'Police Dispatch',
                'trackingNumber' => 'TRK-4L6M8N0P',
            ],
            [
                'id' => 'INC-2026-00385',
                'title' => 'Graffiti on public mural',
                'description' => 'Vandalism on community mural wall.',
                'category' => 'Parks & Trees',
                'priority' => 'low',
                'status' => 'resolved',
                'location' => 'Community Arts Plaza, Westside',
                'lat' => 40.716,
                'lng' => -74.014,
                'reportedAt' => '2026-06-12T16:00:00',
                'updatedAt' => '2026-06-14T10:00:00',
                'assignedTo' => 'David Kim',
                'department' => 'Parks & Recreation',
                'reporter' => 'Arts Council',
                'trackingNumber' => 'TRK-2Q4R6S8T',
            ],
            [
                'id' => 'INC-2026-00425',
                'title' => 'Water main leak',
                'description' => 'Water pooling on sidewalk from suspected main break.',
                'category' => 'Road Maintenance',
                'priority' => 'critical',
                'status' => 'in_progress',
                'location' => '78 Pine Street, Financial District',
                'lat' => 40.7095,
                'lng' => -74.0098,
                'reportedAt' => '2026-06-27T05:30:00',
                'updatedAt' => '2026-06-27T12:00:00',
                'assignedTo' => 'Sarah Chen',
                'department' => 'Public Works',
                'reporter' => 'Early Commuter',
                'trackingNumber' => 'TRK-7U9V1W3X',
            ],
        ];
    }

    public static function heatmapIncidents(): array
    {
        $base = self::incidents();
        $extra = [
            ['lat' => 40.713, 'lng' => -74.0065, 'intensity' => 0.6],
            ['lat' => 40.7135, 'lng' => -74.007, 'intensity' => 0.8],
            ['lat' => 40.7125, 'lng' => -74.0058, 'intensity' => 0.7],
            ['lat' => 40.714, 'lng' => -74.0068, 'intensity' => 0.9],
            ['lat' => 40.7118, 'lng' => -74.0075, 'intensity' => 0.5],
            ['lat' => 40.7105, 'lng' => -74.009, 'intensity' => 0.65],
            ['lat' => 40.7155, 'lng' => -74.004, 'intensity' => 0.55],
            ['lat' => 40.7175, 'lng' => -74.0125, 'intensity' => 0.75],
            ['lat' => 40.719, 'lng' => -74.0105, 'intensity' => 0.45],
            ['lat' => 40.7065, 'lng' => -74.0165, 'intensity' => 0.5],
            ['lat' => 40.7048, 'lng' => -74.0175, 'intensity' => 0.4],
            ['lat' => 40.7205, 'lng' => -74.0025, 'intensity' => 0.35],
        ];

        foreach ($extra as $i => $point) {
            $base[] = [
                'id' => 'INC-HEAT-'.str_pad((string) ($i + 1), 3, '0', STR_PAD_LEFT),
                'title' => 'Density cluster point',
                'description' => 'Aggregated incident density for heat map visualization.',
                'category' => 'Various',
                'priority' => 'medium',
                'status' => 'open',
                'location' => 'Downtown Metroville',
                'lat' => $point['lat'],
                'lng' => $point['lng'],
                'intensity' => $point['intensity'],
                'reportedAt' => '2026-06-28T00:00:00',
                'updatedAt' => '2026-06-28T00:00:00',
                'assignedTo' => null,
                'department' => 'Various',
                'reporter' => 'System',
                'trackingNumber' => 'TRK-HEAT-'.$i,
            ];
        }

        return $base;
    }

    public static function incidentsForDepartment(string $departmentName): array
    {
        return array_values(
            array_filter(self::incidents(), fn (array $inc) => $inc['department'] === $departmentName)
        );
    }

    public static function incidentTimeline(string $id): array
    {
        return [
            ['id' => 1, 'type' => 'created', 'title' => 'Incident reported', 'description' => 'Report submitted via citizen portal.', 'timestamp' => '2026-06-20T09:15:00', 'user' => 'John Martinez'],
            ['id' => 2, 'type' => 'assigned', 'title' => 'Assigned to Public Works', 'description' => 'Automatically routed based on category.', 'timestamp' => '2026-06-20T09:20:00', 'user' => 'System'],
            ['id' => 3, 'type' => 'status', 'title' => 'Status changed to In Progress', 'description' => 'Crew dispatched to location.', 'timestamp' => '2026-06-21T08:00:00', 'user' => 'Sarah Chen'],
            ['id' => 4, 'type' => 'note', 'title' => 'Internal note added', 'description' => 'Materials ordered for repair.', 'timestamp' => '2026-06-22T14:30:00', 'user' => 'Sarah Chen'],
        ];
    }

    public static function notifications(): array
    {
        return [
            ['id' => 1, 'title' => 'Status update on INC-2026-00421', 'message' => 'Your incident is now In Progress.', 'read' => false, 'timestamp' => '2026-06-22T14:30:00', 'type' => 'status'],
            ['id' => 2, 'title' => 'New assignment', 'message' => 'INC-2026-00398 assigned to you.', 'read' => false, 'timestamp' => '2026-06-19T10:00:00', 'type' => 'assignment'],
            ['id' => 3, 'title' => 'Weekly report ready', 'message' => 'June Week 3 analytics are available.', 'read' => true, 'timestamp' => '2026-06-18T09:00:00', 'type' => 'report'],
        ];
    }

    public static function users(): array
    {
        return [
            [
                'id' => 1,
                'name' => 'Sarah Chen',
                'email' => 'sarah.chen@city.gov',
                'role' => 'staff',
                'department' => 'Public Works',
                'status' => 'active',
                'lastLogin' => '2026-06-28T08:00:00',
                'phone' => '+1 (555) 234-5678',
                'jobTitle' => 'Field Supervisor',
                'joinedAt' => '2024-03-15T00:00:00',
                'address' => '120 City Hall Ave, Metroville',
                'bio' => 'Leads road maintenance crews and coordinates emergency response for infrastructure incidents.',
                'incidentsHandled' => 142,
                'incidentsReported' => 0,
                'permissions' => ['incidents.manage', 'notes.create', 'resolution.upload'],
            ],
            [
                'id' => 2,
                'name' => 'Mike Torres',
                'email' => 'mike.torres@city.gov',
                'role' => 'staff',
                'department' => 'Sanitation',
                'status' => 'active',
                'lastLogin' => '2026-06-27T16:30:00',
                'phone' => '+1 (555) 345-6789',
                'jobTitle' => 'Sanitation Lead',
                'joinedAt' => '2023-08-01T00:00:00',
                'address' => '45 Industrial Blvd, Metroville',
                'bio' => 'Oversees waste collection routes and illegal dumping investigations.',
                'incidentsHandled' => 98,
                'incidentsReported' => 0,
                'permissions' => ['incidents.manage', 'notes.create'],
            ],
            [
                'id' => 3,
                'name' => 'Metroville Admin',
                'email' => 'admin@city.gov',
                'role' => 'admin',
                'department' => 'City Administration',
                'status' => 'active',
                'lastLogin' => '2026-06-28T07:45:00',
                'phone' => '+1 (555) 111-0000',
                'jobTitle' => 'City Administrator',
                'joinedAt' => '2022-01-10T00:00:00',
                'address' => '1 Government Plaza, Metroville',
                'bio' => 'Manages departments, staff accounts, and city-wide incident operations.',
                'incidentsHandled' => 0,
                'incidentsReported' => 0,
                'permissions' => ['users.manage', 'departments.manage', 'reports.view'],
            ],
            [
                'id' => 4,
                'name' => 'John Martinez',
                'email' => 'john@example.com',
                'role' => 'citizen',
                'department' => null,
                'status' => 'active',
                'lastLogin' => '2026-06-26T12:00:00',
                'phone' => '+1 (555) 987-6543',
                'jobTitle' => null,
                'joinedAt' => '2025-11-20T00:00:00',
                'address' => '88 Oak Avenue, Westside',
                'bio' => 'Active community member reporting neighborhood maintenance issues.',
                'incidentsHandled' => 0,
                'incidentsReported' => 7,
                'permissions' => ['incidents.report', 'incidents.view_own'],
            ],
            [
                'id' => 6,
                'name' => 'Lisa Park',
                'email' => 'lisa.park@city.gov',
                'role' => 'staff',
                'department' => 'Electrical Services',
                'status' => 'active',
                'lastLogin' => '2026-06-28T08:30:00',
                'phone' => '+1 (555) 456-7890',
                'jobTitle' => 'Department Lead',
                'joinedAt' => '2023-02-01T00:00:00',
                'address' => '200 Utility Row, Metroville',
                'bio' => 'Leads Electrical Services crews and coordinates utility incident response.',
                'incidentsHandled' => 24,
                'incidentsReported' => 0,
                'permissions' => ['incidents.manage', 'notes.create', 'resolution.upload'],
            ],
            [
                'id' => 7,
                'name' => 'Guest Reporter',
                'email' => 'guest-reporter@anonymous.local',
                'role' => 'guest',
                'department' => null,
                'status' => 'active',
                'lastLogin' => '2026-06-25T14:00:00',
                'phone' => null,
                'jobTitle' => null,
                'joinedAt' => '2026-06-25T14:00:00',
                'address' => null,
                'bio' => 'Anonymous guest report contact record (admin-managed).',
                'incidentsHandled' => 0,
                'incidentsReported' => 1,
                'permissions' => ['incidents.report_guest'],
            ],
        ];
    }

    public static function creatableRolesFor(string $actorRole): array
    {
        return match ($actorRole) {
            'admin' => ['staff', 'citizen', 'guest'],
            default => [],
        };
    }

    public static function departments(): array
    {
        return [
            ['id' => 1, 'name' => 'Public Works', 'head' => 'Sarah Chen', 'staffCount' => 24, 'openIncidents' => 18, 'avgResolutionDays' => 3.2],
            ['id' => 2, 'name' => 'Sanitation', 'head' => 'Mike Torres', 'staffCount' => 16, 'openIncidents' => 12, 'avgResolutionDays' => 2.1],
            ['id' => 3, 'name' => 'Electrical Services', 'head' => 'Lisa Park', 'staffCount' => 12, 'openIncidents' => 8, 'avgResolutionDays' => 1.8],
            ['id' => 4, 'name' => 'Parks & Recreation', 'head' => 'David Kim', 'staffCount' => 10, 'openIncidents' => 5, 'avgResolutionDays' => 4.5],
        ];
    }

    public static function categories(): array
    {
        return [
            ['id' => 1, 'name' => 'Road Maintenance', 'department' => 'Public Works', 'incidentCount' => 142, 'active' => true],
            ['id' => 2, 'name' => 'Sanitation', 'department' => 'Sanitation', 'incidentCount' => 89, 'active' => true],
            ['id' => 3, 'name' => 'Utilities', 'department' => 'Electrical Services', 'incidentCount' => 67, 'active' => true],
            ['id' => 4, 'name' => 'Parks & Trees', 'department' => 'Parks & Recreation', 'incidentCount' => 34, 'active' => true],
        ];
    }

    public static function priorities(): array
    {
        return [
            ['id' => 1, 'name' => 'Critical', 'slaHours' => 4, 'color' => 'destructive', 'incidentCount' => 3],
            ['id' => 2, 'name' => 'High', 'slaHours' => 24, 'color' => 'warning', 'incidentCount' => 28],
            ['id' => 3, 'name' => 'Medium', 'slaHours' => 72, 'color' => 'default', 'incidentCount' => 156],
            ['id' => 4, 'name' => 'Low', 'slaHours' => 168, 'color' => 'secondary', 'incidentCount' => 89],
        ];
    }

    public static function dashboardStats(string $portal): array
    {
        return match ($portal) {
            'citizen' => [
                ['label' => 'Open Reports', 'value' => '3', 'change' => '+1 this month'],
                ['label' => 'In Progress', 'value' => '1', 'change' => 'Updated today'],
                ['label' => 'Resolved', 'value' => '12', 'change' => 'Last 90 days'],
                ['label' => 'Avg. Response', 'value' => '2.4d', 'change' => 'City average'],
            ],
            'staff' => [
                ['label' => 'Assigned to Me', 'value' => '7', 'change' => '2 due today'],
                ['label' => 'Team Open', 'value' => '43', 'change' => '-5 vs last week'],
                ['label' => 'Resolved Today', 'value' => '4', 'change' => 'On track'],
                ['label' => 'SLA Compliance', 'value' => '94%', 'change' => '+2% this month'],
            ],
            'admin' => [
                ['label' => 'Total Incidents', 'value' => '276', 'change' => '+18 this month'],
                ['label' => 'Active Users', 'value' => '1,248', 'change' => '+42 new'],
                ['label' => 'Departments', 'value' => '12', 'change' => 'All operational'],
                ['label' => 'SLA Compliance', 'value' => '91%', 'change' => 'Target: 95%'],
            ],
            default => [],
        };
    }

    public static function faqs(): array
    {
        return [
            ['question' => 'How do I report an incident?', 'answer' => 'Click "Report Incident" on the homepage and follow the guided wizard. You can report as a guest or create a citizen account for tracking.'],
            ['question' => 'How long until my report is reviewed?', 'answer' => 'Most reports are reviewed within 24-48 hours. Critical safety issues are prioritized within 4 hours.'],
            ['question' => 'Can I report anonymously?', 'answer' => 'Guest reports require contact information for follow-up, but your details are kept confidential per our privacy policy.'],
            ['question' => 'How do I track my report?', 'answer' => 'Use the tracking number provided after submission on the Track Report page.'],
        ];
    }

    public static function auditLogs(): array
    {
        return [
            ['id' => 1, 'action' => 'user.created', 'user' => 'Admin User', 'target' => 'John Martinez', 'timestamp' => '2026-06-28T07:00:00', 'ip' => '192.168.1.10'],
            ['id' => 2, 'action' => 'role.updated', 'user' => 'Admin User', 'target' => 'Sarah Chen', 'timestamp' => '2026-06-27T15:30:00', 'ip' => '192.168.1.10'],
            ['id' => 3, 'action' => 'settings.changed', 'user' => 'Admin User', 'target' => 'SLA Configuration', 'timestamp' => '2026-06-26T11:00:00', 'ip' => '192.168.1.10'],
        ];
    }

    public static function activityLogs(): array
    {
        return [
            ['id' => 1, 'type' => 'incident', 'description' => 'INC-2026-00421 status changed to In Progress', 'timestamp' => '2026-06-22T14:30:00'],
            ['id' => 2, 'type' => 'login', 'description' => 'Sarah Chen logged in', 'timestamp' => '2026-06-28T08:00:00'],
            ['id' => 3, 'type' => 'report', 'description' => 'Monthly report generated for Public Works', 'timestamp' => '2026-06-28T06:00:00'],
        ];
    }

    public static function roles(): array
    {
        return [
            [
                'id' => 1,
                'slug' => 'admin',
                'name' => 'Administrator',
                'description' => 'Full access to manage users, departments, categories, and system settings.',
                'portal' => 'Admin Portal',
                'permissions' => ['users.manage', 'departments.manage', 'reports.view', 'system.settings'],
                'userCount' => 5,
                'creates' => ['staff', 'citizen', 'guest'],
            ],
            [
                'id' => 2,
                'slug' => 'staff',
                'name' => 'Staff',
                'description' => 'Department worker handling assigned incidents in the Staff Portal.',
                'portal' => 'Staff Portal',
                'permissions' => ['incidents.manage', 'notes.create', 'resolution.upload'],
                'userCount' => 52,
                'creates' => [],
            ],
            [
                'id' => 3,
                'slug' => 'citizen',
                'name' => 'Citizen',
                'description' => 'Registered public user who reports and tracks incidents.',
                'portal' => 'Citizen Portal',
                'permissions' => ['incidents.report', 'incidents.view_own'],
                'userCount' => 1193,
                'creates' => [],
                'adminManaged' => true,
            ],
            [
                'id' => 4,
                'slug' => 'guest',
                'name' => 'Guest',
                'description' => 'Anonymous reporter without a full account.',
                'portal' => 'Public Portal',
                'permissions' => ['incidents.report_guest'],
                'userCount' => 340,
                'creates' => [],
                'adminManaged' => true,
            ],
        ];
    }

    public static function chartData(): array
    {
        return [
            'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            'incidents' => [45, 52, 48, 61, 55, 68],
            'resolved' => [42, 50, 46, 58, 53, 62],
        ];
    }
}

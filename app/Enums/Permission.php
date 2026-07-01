<?php

namespace App\Enums;

enum Permission:string
{
    case UsersManage = 'users.manage';
    case DepartmentsManage = 'departments.manage';
    case ReportsView = 'reports.view';
    case SystemSettings = 'system.settings';

    case IncidentsManage = 'incidents.manage';
    case NotesCreate = 'notes.create';
    case ResolutionUpload = 'resolution.upload';

    case IncidentsReport = 'incidents.report';
    case IncidentsViewOwn = 'incidents.view_own';
    case IncidentView = 'incidents.view';
    case IncidentUpdate = 'incidents.update';

    case IncidentsReportGuest = 'incidents.report_guest';

    case OrganizationsManage = 'organizations.manage';
    case OrganizationView = 'organization.view';
    case OrganizationUpdate = 'organization.update';

    case PlatformAdmins = 'platform.admins';
    case PlatformAnalytics = 'platform.analytics';
    case PlatformSettings = 'platform.settings';
}
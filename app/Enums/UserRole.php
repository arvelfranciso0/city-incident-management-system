<?php

namespace App\Enums;

enum UserRole: string
{
    case SuperAdmin = 'super_admin';
    case Admin = 'admin';
    case Staff = 'staff';
    case Citizen = 'citizen';
    case DepartmentHead = 'department_head';
    case Guest = 'guest';

    public function label(): string
    {
        return match ($this) {
            self::SuperAdmin => 'Super Admin',
            self::Admin => 'Organization Admin',
            self::Staff => 'Staff',
            self::Citizen => 'Citizen',
            self::Guest => 'Guest',
        };
    }

    public function homeRoute(): string
    {
        return match ($this) {
            self::SuperAdmin => 'platform.dashboard',
            self::Admin => 'admin.dashboard',
            self::Staff => 'staff.dashboard',
            self::Citizen => 'citizen.dashboard',
            self::Guest => 'public.home',
        };
    }

    /**
     * @return list<string>
     */
    public function grantedPermissions(): array
    {
        return match ($this) {
            self::SuperAdmin => [
                Permission::OrganizationsManage,
                Permission::PlatformAdmins,
                Permission::PlatformAnalytics,
                Permission::PlatformSettings
            ],
            self::Admin => [
                Permission::UsersManage,
                Permission::DepartmentsManage,
                Permission::ReportsView,
                Permission::SystemSettings,
                Permission::IncidentsManage,
                Permission::OrganizationView
                
            ],
            self::DepartmentHead => [
                Permission::UsersManage,
                Permission::DepartmentView,
                Permission::ReportsView,
                Permission::SystemSettings,
                Permission::IncidentsManage,
            ],

            self::Staff => [
                Permission::IncidentsManage,
                Permission::NotesCreate,
                Permission::ResolutionUpload
            ],
            self::Citizen => [
                Permission::IncidentsReport,
                Permission::IncidentsViewOwn,
                Permission::IncidentUpdate
            ],
            self::Guest => [
                Permission::IncidentsReportGuest,
                Permission::IncidentsViewOwn
            ],
        };
    }

    public function assignableRoles(): array
    {
        return match ($this) {
            self::SuperAdmin => [
                self::SuperAdmin,
                self::Admin,
                self::Staff,
            ],
            self::Admin => [
                self::Staff,
                self::Admin,
            ],
            self::Staff => [],
        };
    }
}

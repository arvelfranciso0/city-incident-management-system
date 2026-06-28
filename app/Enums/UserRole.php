<?php

namespace App\Enums;

enum UserRole: string
{
    case SuperAdmin = 'super_admin';
    case Admin = 'admin';
    case Staff = 'staff';
    case Citizen = 'citizen';
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
}

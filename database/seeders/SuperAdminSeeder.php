<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'superadmin@cims.io'],
            [
                'organization_id' => null,
                'name' => 'CIMS Super Admin',
                'password' => Hash::make('password'),
                'role' => UserRole::SuperAdmin,
                'status' => UserStatus::Active,
                'job_title' => 'Platform Super Admin',
                'email_verified_at' => now(),
                'joined_at' => now(),
            ],
        );
    }
}

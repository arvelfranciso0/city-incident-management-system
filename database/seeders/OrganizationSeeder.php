<?php

namespace Database\Seeders;

use App\Enums\SubscriptionPlan;
use App\Enums\SubscriptionStatus;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class OrganizationSeeder extends Seeder
{
    public function run(): void
    {
        $organization = Organization::updateOrCreate(
            ['slug' => 'metroville'],
            [
                'name' => 'Metroville',
                'subdomain' => 'metroville',
                'domain' => env('TENANT_DEFAULT_DOMAIN', env('PLATFORM_DOMAIN', 'cims.test')),
                'support_email' => 'support@metroville.gov',
                'support_phone' => '+1 (555) 100-2000',
                'timezone' => 'America/New_York',
                'locale' => 'en',
                'is_active' => true,
                'subscription_plan' => SubscriptionPlan::Professional,
                'subscription_status' => SubscriptionStatus::Active,
                'subscribed_at' => now(),
            ],
        );

        User::updateOrCreate(
            ['email' => 'admin@city.gov', 'organization_id' => $organization->id],
            [
                'name' => 'Metroville Admin',
                'password' => Hash::make('password'),
                'role' => UserRole::Admin,
                'status' => UserStatus::Active,
                'job_title' => 'City Administrator',
                'email_verified_at' => now(),
                'joined_at' => now(),
            ],
        );

        Organization::updateOrCreate(
            ['slug' => 'springfield'],
            [
                'name' => 'Springfield',
                'subdomain' => 'springfield',
                'domain' => env('TENANT_DEFAULT_DOMAIN', env('PLATFORM_DOMAIN', 'cims.test')),
                'support_email' => 'support@springfield.gov',
                'timezone' => 'America/Chicago',
                'locale' => 'en',
                'is_active' => true,
                'subscription_plan' => SubscriptionPlan::Trial,
                'subscription_status' => SubscriptionStatus::Active,
                'subscribed_at' => now(),
                'trial_ends_at' => now()->addDays(30),
            ],
        );
    }
}

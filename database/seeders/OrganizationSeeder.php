<?php

namespace Database\Seeders;

use App\Enums\SubscriptionPlan;
use App\Enums\SubscriptionStatus;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\Category;
use App\Models\Department;
use App\Models\Organization;
use App\Models\Priority;
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

        $this->seedCatalog($organization);

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

        $springfield = Organization::where('slug', 'springfield')->first();
        if ($springfield) {
            $this->seedCatalog($springfield);
        }
    }

    private function seedCatalog(Organization $organization): void
    {
        $departments = [
            ['name' => 'Public Works', 'slug' => 'public-works'],
            ['name' => 'Sanitation', 'slug' => 'sanitation'],
            ['name' => 'Electrical Services', 'slug' => 'electrical-services'],
            ['name' => 'Parks & Recreation', 'slug' => 'parks-recreation'],
        ];

        $departmentIds = [];
        foreach ($departments as $index => $department) {
            $record = Department::updateOrCreate(
                [
                    'organization_id' => $organization->id,
                    'slug' => $department['slug'],
                ],
                [
                    'name' => $department['name'],
                    'is_active' => true,
                    'sort_order' => $index + 1,
                ],
            );
            $departmentIds[$department['slug']] = $record->id;
        }

        $categories = [
            ['name' => 'Road Maintenance', 'slug' => 'road-maintenance', 'department' => 'public-works'],
            ['name' => 'Sanitation', 'slug' => 'sanitation', 'department' => 'sanitation'],
            ['name' => 'Utilities', 'slug' => 'utilities', 'department' => 'electrical-services'],
            ['name' => 'Parks & Trees', 'slug' => 'parks-trees', 'department' => 'parks-recreation'],
        ];

        foreach ($categories as $index => $category) {
            Category::updateOrCreate(
                [
                    'organization_id' => $organization->id,
                    'slug' => $category['slug'],
                ],
                [
                    'department_id' => $departmentIds[$category['department']],
                    'name' => $category['name'],
                    'is_active' => true,
                    'sort_order' => $index + 1,
                ],
            );
        }

        $priorities = [
            ['name' => 'Critical', 'slug' => 'critical', 'sla_hours' => 4, 'color' => 'destructive'],
            ['name' => 'High', 'slug' => 'high', 'sla_hours' => 24, 'color' => 'warning'],
            ['name' => 'Medium', 'slug' => 'medium', 'sla_hours' => 72, 'color' => 'default'],
            ['name' => 'Low', 'slug' => 'low', 'sla_hours' => 168, 'color' => 'secondary'],
        ];

        foreach ($priorities as $index => $priority) {
            Priority::updateOrCreate(
                [
                    'organization_id' => $organization->id,
                    'slug' => $priority['slug'],
                ],
                [
                    'name' => $priority['name'],
                    'sla_hours' => $priority['sla_hours'],
                    'color' => $priority['color'],
                    'is_active' => true,
                    'sort_order' => $index + 1,
                ],
            );
        }
    }
}

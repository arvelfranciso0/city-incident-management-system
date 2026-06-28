<?php

namespace App\Services\Platform;

use App\Enums\SubscriptionPlan;
use App\Enums\SubscriptionStatus;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class OrganizationProvisioningService
{
    /**
     * @param  array<string, mixed>  $organizationData
     * @param  array<string, mixed>  $adminData
     */
    public function provision(array $organizationData, array $adminData): Organization
    {
        return DB::transaction(function () use ($organizationData, $adminData) {
            $slug = Str::slug($organizationData['slug'] ?? $organizationData['name']);

            $organization = Organization::create([
                'name' => $organizationData['name'],
                'slug' => $this->uniqueSlug($slug),
                'subdomain' => $organizationData['subdomain'] ?? $slug,
                'domain' => $organizationData['domain'] ?? config('tenant.default_domain'),
                'support_email' => $organizationData['support_email'] ?? $adminData['email'],
                'support_phone' => $organizationData['support_phone'] ?? null,
                'timezone' => $organizationData['timezone'] ?? 'UTC',
                'locale' => $organizationData['locale'] ?? 'en',
                'is_active' => true,
                'subscription_plan' => $organizationData['subscription_plan'] ?? SubscriptionPlan::Trial->value,
                'subscription_status' => SubscriptionStatus::Active->value,
                'subscribed_at' => now(),
                'trial_ends_at' => ($organizationData['subscription_plan'] ?? SubscriptionPlan::Trial->value) === SubscriptionPlan::Trial->value
                    ? now()->addDays(30)
                    : null,
            ]);

            User::create([
                'organization_id' => $organization->id,
                'name' => $adminData['name'],
                'email' => $adminData['email'],
                'password' => Hash::make($adminData['password']),
                'role' => UserRole::Admin,
                'status' => UserStatus::Active,
                'job_title' => 'Organization Administrator',
                'email_verified_at' => now(),
                'joined_at' => now(),
            ]);

            return $organization->fresh(['users']);
        });
    }

    private function uniqueSlug(string $slug): string
    {
        $base = $slug;
        $counter = 1;

        while (Organization::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$counter;
            $counter++;
        }

        return $slug;
    }
}

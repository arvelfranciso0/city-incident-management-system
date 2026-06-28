<?php

namespace App\Support\Platform;

use App\Enums\UserRole;
use App\Models\Organization;
use App\Models\User;
use App\Services\Tenant\OrganizationHostResolver;

class OrganizationPresenter
{
    public static function summary(Organization $organization): array
    {
        $admin = $organization->relationLoaded('users')
            ? $organization->users->first(fn (User $user) => $user->role === UserRole::Admin)
            : $organization->users()->where('role', UserRole::Admin->value)->first();

        $resolver = app(OrganizationHostResolver::class);

        return [
            'id' => $organization->id,
            'name' => $organization->name,
            'slug' => $organization->slug,
            'subdomain' => $organization->subdomain,
            'domain' => $organization->domain,
            'customDomain' => $organization->custom_domain,
            'tenantHost' => $organization->tenantHost(),
            'publicUrl' => $resolver->publicUrlFor($organization),
            'supportEmail' => $organization->support_email,
            'supportPhone' => $organization->support_phone,
            'isActive' => $organization->is_active,
            'subscriptionPlan' => $organization->subscription_plan?->value ?? $organization->subscription_plan,
            'subscriptionStatus' => $organization->subscription_status?->value ?? $organization->subscription_status,
            'subscribedAt' => $organization->subscribed_at?->toIso8601String(),
            'trialEndsAt' => $organization->trial_ends_at?->toIso8601String(),
            'createdAt' => $organization->created_at?->toIso8601String(),
            'usersCount' => $organization->users_count ?? $organization->users()->count(),
            'incidentsCount' => $organization->incidents_count ?? $organization->incidents()->count(),
            'departmentsCount' => $organization->departments_count ?? $organization->departments()->count(),
            'admin' => $admin ? self::adminUser($admin) : null,
        ];
    }

    public static function adminUser(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'status' => $user->status?->value ?? $user->status,
            'lastLogin' => $user->last_login_at?->toIso8601String(),
            'joinedAt' => $user->joined_at?->toIso8601String(),
        ];
    }
}

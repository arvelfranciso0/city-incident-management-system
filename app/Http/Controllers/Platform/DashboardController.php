<?php

namespace App\Http\Controllers\Platform;

use App\Enums\SubscriptionPlan;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\User;
use App\Support\Platform\OrganizationPresenter;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $organizations = Organization::query()
            ->withCount(['users', 'incidents', 'departments'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn (Organization $org) => OrganizationPresenter::summary($org));

        $stats = [
            ['label' => 'Subscribers', 'value' => (string) Organization::count(), 'change' => Organization::where('is_active', true)->count().' active'],
            ['label' => 'Organization Admins', 'value' => (string) User::where('role', UserRole::Admin)->count(), 'change' => 'Tenant administrators'],
            ['label' => 'Platform Users', 'value' => (string) User::where('role', UserRole::SuperAdmin)->count(), 'change' => 'Internal team'],
            ['label' => 'Total Incidents', 'value' => (string) \App\Models\Incident::count(), 'change' => 'Across all tenants'],
        ];

        return Inertia::render('Platform/Dashboard', [
            'stats' => $stats,
            'recentOrganizations' => $organizations,
            'subscriptionPlans' => collect(SubscriptionPlan::cases())->map(fn ($plan) => [
                'value' => $plan->value,
                'label' => $plan->label(),
            ]),
        ]);
    }
}

<?php

namespace App\Http\Controllers\Platform;

use App\Enums\SubscriptionPlan;
use App\Enums\SubscriptionStatus;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\Incident;
use App\Models\Organization;
use App\Models\User;
use App\Support\Platform\OrganizationPresenter;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    public function index(): Response
    {
        $organizations = Organization::query()
            ->withCount(['users', 'incidents'])
            ->orderByDesc('incidents_count')
            ->limit(10)
            ->get()
            ->map(fn (Organization $org) => [
                'name' => $org->name,
                'incidents' => $org->incidents_count,
                'users' => $org->users_count,
                'plan' => $org->subscription_plan?->value ?? $org->subscription_plan,
            ]);

        $planBreakdown = collect(SubscriptionPlan::cases())->map(fn ($plan) => [
            'label' => $plan->label(),
            'value' => Organization::where('subscription_plan', $plan->value)->count(),
        ]);

        return Inertia::render('Platform/Analytics', [
            'stats' => [
                ['label' => 'Total Incidents', 'value' => (string) Incident::count(), 'change' => 'All tenants'],
                ['label' => 'Active Subscribers', 'value' => (string) Organization::where('is_active', true)->count(), 'change' => 'Organizations'],
                ['label' => 'Citizens', 'value' => (string) User::where('role', UserRole::Citizen)->count(), 'change' => 'Registered users'],
                ['label' => 'Staff Users', 'value' => (string) User::where('role', UserRole::Staff)->count(), 'change' => 'Across tenants'],
            ],
            'topOrganizations' => $organizations,
            'planBreakdown' => $planBreakdown,
            'chartData' => [
                'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                'incidents' => [120, 145, 132, 168, 155, 190],
                'resolved' => [110, 138, 128, 160, 148, 175],
            ],
        ]);
    }
}

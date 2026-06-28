<?php

namespace App\Http\Controllers\Platform;

use App\Enums\SubscriptionPlan;
use App\Enums\SubscriptionStatus;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Platform\StoreOrganizationAdminRequest;
use App\Http\Requests\Platform\StoreOrganizationRequest;
use App\Http\Requests\Platform\UpdateOrganizationRequest;
use App\Models\Organization;
use App\Models\User;
use App\Services\Platform\OrganizationProvisioningService;
use App\Support\Platform\OrganizationPresenter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationController extends Controller
{
    public function index(): Response
    {
        $organizations = Organization::query()
            ->with(['users' => fn ($q) => $q->where('role', UserRole::Admin->value)])
            ->withCount(['users', 'incidents', 'departments'])
            ->latest()
            ->get()
            ->map(fn (Organization $org) => OrganizationPresenter::summary($org));

        return Inertia::render('Platform/Organizations/Index', [
            'organizations' => $organizations,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Platform/Organizations/Create', [
            'subscriptionPlans' => collect(SubscriptionPlan::cases())->map(fn ($plan) => [
                'value' => $plan->value,
                'label' => $plan->label(),
            ]),
            'defaultDomain' => config('tenant.default_domain'),
        ]);
    }

    public function store(
        StoreOrganizationRequest $request,
        OrganizationProvisioningService $provisioning,
    ): RedirectResponse {
        $validated = $request->validated();

        $organization = $provisioning->provision(
            [
                'name' => $validated['name'],
                'slug' => $validated['slug'] ?? null,
                'subdomain' => $validated['subdomain'] ?? null,
                'domain' => $validated['domain'] ?? null,
                'support_email' => $validated['support_email'] ?? null,
                'support_phone' => $validated['support_phone'] ?? null,
                'subscription_plan' => $validated['subscription_plan'],
            ],
            [
                'name' => $validated['admin_name'],
                'email' => $validated['admin_email'],
                'password' => $validated['admin_password'],
            ],
        );

        return redirect()
            ->route('platform.organizations.show', $organization)
            ->with('success', 'Subscriber provisioned and organization admin account created.');
    }

    public function show(Organization $organization): Response
    {
        $organization->loadCount(['users', 'incidents', 'departments']);
        $organization->load(['users' => fn ($q) => $q->where('role', UserRole::Admin->value)]);

        $admins = $organization->users->map(fn (User $user) => OrganizationPresenter::adminUser($user));

        return Inertia::render('Platform/Organizations/Show', [
            'organization' => OrganizationPresenter::summary($organization),
            'admins' => $admins,
            'subscriptionPlans' => collect(SubscriptionPlan::cases())->map(fn ($plan) => [
                'value' => $plan->value,
                'label' => $plan->label(),
            ]),
            'subscriptionStatuses' => collect(SubscriptionStatus::cases())->map(fn ($status) => [
                'value' => $status->value,
                'label' => $status->label(),
            ]),
        ]);
    }

    public function update(UpdateOrganizationRequest $request, Organization $organization): RedirectResponse
    {
        $organization->update($request->validated());

        return back()->with('success', 'Organization updated.');
    }

    public function storeAdmin(
        StoreOrganizationAdminRequest $request,
        Organization $organization,
    ): RedirectResponse {
        User::create([
            'organization_id' => $organization->id,
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'password' => Hash::make($request->validated('password')),
            'role' => UserRole::Admin,
            'status' => UserStatus::Active,
            'job_title' => 'Organization Administrator',
            'email_verified_at' => now(),
            'joined_at' => now(),
        ]);

        return back()->with('success', 'Organization admin account created.');
    }
}

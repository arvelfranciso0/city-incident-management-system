<?php

namespace App\Http\Middleware;

use App\Services\Tenant\OrganizationContext;
use App\Support\Tenant\TenantPresenter;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $organization = app(OrganizationContext::class)->organization();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role?->value,
                    'roleLabel' => $request->user()->role?->label(),
                ] : null,
            ],
            'organization' => TenantPresenter::organization($organization),
            'tenant' => [
                'host' => $request->getHost(),
                'isOrganizationHost' => $organization !== null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'reportSubmitted' => fn () => $request->session()->get('reportSubmitted'),
            ],
        ];
    }
}

<?php

namespace App\Http\Middleware;

use App\Models\Organization;
use App\Services\Tenant\OrganizationContext;
use App\Services\Tenant\OrganizationHostResolver;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetOrganizationFromHost
{
    public function __construct(
        private OrganizationContext $context,
        private OrganizationHostResolver $resolver,
    ) {}

    public function handle(Request $request, Closure $next): Response
    {
        $host = strtolower($request->getHost());

        if ($this->resolver->isCentralHost($host)) {
            $organization = $this->resolveCentralHostOrganization($request);

            if ($organization?->is_active) {
                $this->context->set($organization);
            }

            return $next($request);
        }

        $organization = $this->resolver->resolveFromHost($host);

        if (! $organization) {
            abort(404, 'Organization portal not found for this address.');
        }

        if (! $organization->is_active) {
            abort(403, 'This organization portal is temporarily unavailable.');
        }

        $this->context->set($organization);

        return $next($request);
    }

    private function resolveCentralHostOrganization(Request $request): ?Organization
    {
        $organization = $this->resolver->resolveFromRequest($request);

        $param = config('tenant.query_param', 'org');

        if ($organization && $request->query($param)) {
            $request->session()->put('tenant_preview_organization_id', $organization->id);
        } elseif ($request->session()->has('tenant_preview_organization_id')) {
            $organization = Organization::query()
                ->where('is_active', true)
                ->find($request->session()->get('tenant_preview_organization_id'));
        }

        return $organization;
    }
}

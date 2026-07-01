<?php

namespace App\Http\Middleware;

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
}

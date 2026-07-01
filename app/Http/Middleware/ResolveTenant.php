<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\Tenant\OrganizationHostResolver;

class ResolveTenant
{
    public function __construct(
        private OrganizationHostResolver $resolver,
    ) {}
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!$this->resolver->resolveTenantHost($request)){
            abort(404, 'Organization portal not found for this address.');
        }

        return $next($request);
    }
}

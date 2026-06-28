<?php

namespace App\Services\Tenant;

use App\Models\Organization;
use Illuminate\Http\Request;

class OrganizationHostResolver
{
    public function resolveFromRequest(Request $request): ?Organization
    {
        $host = strtolower($request->getHost());

        if ($this->isCentralHost($host)) {
            return $this->resolveFromQueryPreview($request);
        }

        return $this->resolveFromHost($host);
    }

    public function resolveFromHost(string $host): ?Organization
    {
        $host = strtolower($host);

        return Organization::query()
            ->where('is_active', true)
            ->where(function ($query) use ($host) {
                $query->where('custom_domain', $host)
                    ->orWhereRaw('LOWER(CONCAT(subdomain, \'.\', domain)) = ?', [$host]);
            })
            ->first();
    }

    public function isCentralHost(string $host): bool
    {
        return in_array(strtolower($host), config('tenant.central_hosts', []), true);
    }

    public function isTenantHost(string $host): bool
    {
        if ($this->isCentralHost($host)) {
            return false;
        }

        return $this->resolveFromHost($host) !== null;
    }

    public function publicUrlFor(Organization $organization): string
    {
        $scheme = parse_url(config('app.url'), PHP_URL_SCHEME) ?: 'http';
        $port = parse_url(config('app.url'), PHP_URL_PORT);
        $portSuffix = $port ? ":{$port}" : '';

        if ($host = $organization->tenantHost()) {
            return "{$scheme}://{$host}{$portSuffix}";
        }

        $param = config('tenant.query_param', 'org');

        return url('/').'?'.$param.'='.($organization->subdomain ?? $organization->slug);
    }

    private function resolveFromQueryPreview(Request $request): ?Organization
    {
        if (! config('tenant.query_preview', true)) {
            return null;
        }

        $param = config('tenant.query_param', 'org');
        $value = $request->query($param);

        if (! is_string($value) || $value === '') {
            return null;
        }

        return Organization::query()
            ->where('is_active', true)
            ->where(function ($query) use ($value) {
                $query->where('slug', $value)
                    ->orWhere('subdomain', $value);
            })
            ->first();
    }
}

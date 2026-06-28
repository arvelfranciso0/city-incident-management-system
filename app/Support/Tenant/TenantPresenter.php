<?php

namespace App\Support\Tenant;

use App\Models\Organization;
use App\Services\Tenant\OrganizationHostResolver;

class TenantPresenter
{
    public static function organization(?Organization $organization): ?array
    {
        if (! $organization) {
            return null;
        }

        $resolver = app(OrganizationHostResolver::class);

        return [
            'id' => $organization->id,
            'name' => $organization->name,
            'slug' => $organization->slug,
            'subdomain' => $organization->subdomain,
            'domain' => $organization->domain,
            'customDomain' => $organization->custom_domain,
            'supportEmail' => $organization->support_email,
            'supportPhone' => $organization->support_phone,
            'publicUrl' => $resolver->publicUrlFor($organization),
        ];
    }
}

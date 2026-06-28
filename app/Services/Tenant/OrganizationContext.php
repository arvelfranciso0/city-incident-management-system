<?php

namespace App\Services\Tenant;

use App\Models\Organization;

class OrganizationContext
{
    private ?Organization $organization = null;

    public function set(Organization $organization): void
    {
        $this->organization = $organization;
    }

    public function clear(): void
    {
        $this->organization = null;
    }

    public function hasOrganization(): bool
    {
        return $this->organization !== null;
    }

    public function organization(): ?Organization
    {
        return $this->organization;
    }

    public function id(): ?int
    {
        return $this->organization?->id;
    }
}

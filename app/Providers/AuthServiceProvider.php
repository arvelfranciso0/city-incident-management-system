<?php

namespace App\Providers;

use App\Models\Department;
use App\Models\Incident;
use App\Models\Organization;
use App\Models\Staff;
use App\Models\User;
use App\Policies\DepartmentPolicy;
use App\Policies\IncidentPolicy;
use App\Policies\OrganizationPolicy;
use App\Policies\StaffPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        User::class => UserPolicy::class,
        Department::class => DepartmentPolicy::class,
        Incident::class => IncidentPolicy::class,
        Organization::class => OrganizationPolicy::class,
        Staff::class => StaffPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}

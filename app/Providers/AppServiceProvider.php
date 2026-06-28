<?php

namespace App\Providers;

use App\Services\Tenant\OrganizationContext;
use App\Services\Tenant\OrganizationHostResolver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(OrganizationContext::class);
        $this->app->singleton(OrganizationHostResolver::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}

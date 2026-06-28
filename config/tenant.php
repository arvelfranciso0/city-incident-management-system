<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default tenant domain (new organizations)
    |--------------------------------------------------------------------------
    |
    | Each organization stores its own subdomain + domain in the database.
    | This value is only used as the default when provisioning new tenants.
    |
    | Local: set TENANT_DEFAULT_DOMAIN=cims.test and add hosts entries like:
    |   127.0.0.1 cims.test
    |   127.0.0.1 metroville.cims.test
    |
    */

    'default_domain' => env('TENANT_DEFAULT_DOMAIN', env('PLATFORM_DOMAIN', 'cims.test')),

    /*
    |--------------------------------------------------------------------------
    | Central application hosts
    |--------------------------------------------------------------------------
    |
    | These hosts serve the main app (login, admin, staff, platform) without
    | requiring a tenant subdomain. Public pages work without org branding.
    |
    */

    'central_hosts' => array_values(array_filter(array_map(
        'trim',
        explode(',', env('CENTRAL_HOSTS', 'localhost,127.0.0.1,cims.test,www.cims.test'))
    ))),

    /*
    |--------------------------------------------------------------------------
    | Local preview query parameter
    |--------------------------------------------------------------------------
    |
    | On central hosts, ?org=metroville resolves the tenant without DNS.
    | Disable in production by setting TENANT_QUERY_PREVIEW=false.
    |
    */

    'query_preview' => env('TENANT_QUERY_PREVIEW', true),
    'query_param' => env('TENANT_QUERY_PARAM', 'org'),

];

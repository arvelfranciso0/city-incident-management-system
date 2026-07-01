<?php

namespace App\Support;

class HostHelper
{
    public static function getSubdomain(string $host): ?string
    {
        $parts = explode('.', strtolower($host));

        return count($parts) > 2
            ? implode('.', array_slice($parts, 0, -2))
            : null;
    }

    public static function getDomain(string $host): string
    {
        $parts = explode('.', strtolower($host));

        return implode('.', array_slice($parts, -2));
    }
}
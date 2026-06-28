<?php

namespace App\Services\Public;

use Illuminate\Support\Facades\Http;

class ReverseGeocodeService
{
    /**
     * @return array{address_line: string, city: string, postal_code: string, location: string}|null
     */
    public function resolve(float $lat, float $lng): ?array
    {
        $response = Http::withHeaders([
            'User-Agent' => config('app.name', 'CIMS').' Reverse Geocode',
            'Accept-Language' => 'en',
        ])->get('https://nominatim.openstreetmap.org/reverse', [
            'lat' => $lat,
            'lon' => $lng,
            'format' => 'json',
            'addressdetails' => 1,
        ]);

        if (! $response->successful()) {
            return null;
        }

        /** @var array<string, mixed> $payload */
        $payload = $response->json();

        if (! is_array($payload) || empty($payload['address'])) {
            return null;
        }

        /** @var array<string, string> $address */
        $address = $payload['address'];

        $streetParts = array_filter([
            $address['house_number'] ?? null,
            $address['road'] ?? $address['pedestrian'] ?? $address['footway'] ?? null,
        ]);

        $addressLine = trim(implode(' ', $streetParts));

        if ($addressLine === '') {
            $addressLine = $address['suburb']
                ?? $address['neighbourhood']
                ?? $address['hamlet']
                ?? '';
        }

        $city = $address['city']
            ?? $address['town']
            ?? $address['village']
            ?? $address['municipality']
            ?? $address['county']
            ?? '';

        return [
            'address_line' => $addressLine,
            'city' => $city,
            'postal_code' => $address['postcode'] ?? '',
            'location' => is_string($payload['display_name'] ?? null) ? $payload['display_name'] : '',
        ];
    }
}

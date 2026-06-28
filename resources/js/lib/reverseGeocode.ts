export interface GeocodedAddress {
    address_line: string;
    city: string;
    postal_code: string;
    location: string;
}

export async function reverseGeocode(lat: number, lng: number): Promise<GeocodedAddress | null> {
    const url = new URL(route('report.geocode'), window.location.origin);
    url.searchParams.set('lat', String(lat));
    url.searchParams.set('lng', String(lng));

    const response = await fetch(url.toString(), {
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });

    if (!response.ok) {
        return null;
    }

    return (await response.json()) as GeocodedAddress;
}

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { cn } from '@/lib/utils';
import type { Incident } from '@/types/cims';

const PRIORITY_COLOR: Record<string, string> = {
    critical: '#991b1b',
    high: '#dc2626',
    medium: '#f97316',
    low: '#eab308',
};

function ClusterLayer({ incidents }: { incidents: Incident[] }) {
    const map = useMap();

    useEffect(() => {
        const mapped = incidents.filter((inc) => inc.lat != null && inc.lng != null);

        if (mapped.length === 0) {
            return;
        }

        const cluster = (L as typeof L & { markerClusterGroup: (options?: object) => L.LayerGroup }).markerClusterGroup({
            showCoverageOnHover: false,
            maxClusterRadius: 50,
            spiderfyOnMaxZoom: true,
        });

        mapped.forEach((inc) => {
            const marker = L.circleMarker([inc.lat!, inc.lng!], {
                radius: 8,
                color: '#ffffff',
                weight: 2,
                fillColor: PRIORITY_COLOR[inc.priority] ?? '#dc2626',
                fillOpacity: 0.9,
            });

            marker.bindPopup(`
                <div style="font-family: system-ui, sans-serif; font-size: 13px;">
                    <p style="margin: 0 0 4px; font-family: monospace; font-size: 11px; color: #666;">${inc.id}</p>
                    <p style="margin: 0 0 4px; font-weight: 600;">${inc.title}</p>
                    <p style="margin: 0; color: #666;">${inc.department}</p>
                </div>
            `);

            cluster.addLayer(marker);
        });

        map.addLayer(cluster);

        const bounds = L.latLngBounds(mapped.map((inc) => [inc.lat!, inc.lng!] as [number, number]));
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });

        return () => {
            map.removeLayer(cluster);
        };
    }, [map, incidents]);

    return null;
}

export function IncidentClusterMap({
    incidents,
    className,
}: {
    incidents: Incident[];
    className?: string;
}) {
    const center = useMemo((): [number, number] => {
        const mapped = incidents.filter((inc) => inc.lat != null && inc.lng != null);

        if (mapped.length === 0) {
            return [40.7128, -74.006];
        }

        const lat = mapped.reduce((sum, inc) => sum + inc.lat!, 0) / mapped.length;
        const lng = mapped.reduce((sum, inc) => sum + inc.lng!, 0) / mapped.length;

        return [lat, lng];
    }, [incidents]);

    return (
        <MapContainer
            center={center}
            zoom={12}
            scrollWheelZoom
            style={{ height: '480px', width: '100%' }}
            className={cn('z-0 rounded-lg border border-border', className)}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClusterLayer incidents={incidents} />
        </MapContainer>
    );
}

export function computeIncidentClusters(incidents: Incident[]) {
    const zones: { name: string; latMin: number; latMax: number; lngMin: number; lngMax: number }[] = [
        { name: 'Downtown', latMin: 40.709, latMax: 40.716, lngMin: -74.012, lngMax: -74.003 },
        { name: 'Westside', latMin: 40.716, latMax: 40.724, lngMin: -74.016, lngMax: -74.008 },
        { name: 'Industrial District', latMin: 40.702, latMax: 40.709, lngMin: -74.02, lngMax: -74.012 },
        { name: 'East River', latMin: 40.706, latMax: 40.712, lngMin: -74.004, lngMax: -73.998 },
    ];

    return zones
        .map((zone) => {
            const count = incidents.filter(
                (inc) =>
                    inc.lat != null &&
                    inc.lng != null &&
                    inc.lat >= zone.latMin &&
                    inc.lat <= zone.latMax &&
                    inc.lng >= zone.lngMin &&
                    inc.lng <= zone.lngMax,
            ).length;

            return { name: zone.name, count };
        })
        .filter((z) => z.count > 0);
}

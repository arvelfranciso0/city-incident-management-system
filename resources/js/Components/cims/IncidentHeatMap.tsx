import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import { cn } from '@/lib/utils';
import type { Incident } from '@/types/cims';

const PRIORITY_INTENSITY: Record<string, number> = {
    critical: 1,
    high: 0.85,
    medium: 0.6,
    low: 0.35,
};

function HeatLayer({ points }: { points: [number, number, number][] }) {
    const map = useMap();

    useEffect(() => {
        if (points.length === 0) {
            return;
        }

        const layer = L.heatLayer(points, {
            radius: 28,
            blur: 20,
            maxZoom: 17,
            max: 1,
            gradient: {
                0.2: '#fef08a',
                0.4: '#fb923c',
                0.6: '#ef4444',
                0.8: '#dc2626',
                1: '#991b1b',
            },
        }).addTo(map);

        return () => {
            map.removeLayer(layer);
        };
    }, [map, points]);

    return null;
}

function FitBounds({ incidents }: { incidents: Incident[] }) {
    const map = useMap();

    useEffect(() => {
        const coords = incidents
            .filter((inc) => inc.lat != null && inc.lng != null)
            .map((inc) => [inc.lat!, inc.lng!] as [number, number]);

        if (coords.length === 0) {
            return;
        }

        map.fitBounds(L.latLngBounds(coords), { padding: [40, 40], maxZoom: 14 });
    }, [map, incidents]);

    return null;
}

export function IncidentHeatMap({
    incidents,
    className,
    showMarkers = true,
    height = 480,
}: {
    incidents: Incident[];
    className?: string;
    showMarkers?: boolean;
    height?: number | string;
}) {
    const mapped = useMemo(
        () => incidents.filter((inc) => inc.lat != null && inc.lng != null && !inc.id.startsWith('INC-HEAT-')),
        [incidents],
    );

    const heatPoints = useMemo(
        () =>
            incidents
                .filter((inc) => inc.lat != null && inc.lng != null)
                .map((inc) => {
                    const intensity =
                        (inc as Incident & { intensity?: number }).intensity ??
                        PRIORITY_INTENSITY[inc.priority] ??
                        0.5;

                    return [inc.lat!, inc.lng!, intensity] as [number, number, number];
                }),
        [incidents],
    );

    const center = useMemo((): [number, number] => {
        if (mapped.length === 0) {
            return [40.7128, -74.006];
        }

        const lat = mapped.reduce((sum, inc) => sum + inc.lat!, 0) / mapped.length;
        const lng = mapped.reduce((sum, inc) => sum + inc.lng!, 0) / mapped.length;

        return [lat, lng];
    }, [mapped]);

    return (
        <MapContainer
            center={center}
            zoom={12}
            scrollWheelZoom
            style={{ height: typeof height === 'number' ? `${height}px` : height, width: '100%' }}
            className={cn('z-0 rounded-lg border border-border', className)}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <HeatLayer points={heatPoints} />
            <FitBounds incidents={mapped} />
            {showMarkers &&
                mapped.map((inc) => (
                    <CircleMarker
                        key={inc.id}
                        center={[inc.lat!, inc.lng!]}
                        radius={7}
                        pathOptions={{
                            color: '#ffffff',
                            weight: 2,
                            fillColor: '#dc2626',
                            fillOpacity: 0.9,
                        }}
                    >
                        <Popup>
                            <div className="space-y-1 text-sm">
                                <p className="font-mono text-xs text-muted-foreground">{inc.id}</p>
                                <p className="font-semibold">{inc.title}</p>
                                <p className="text-muted-foreground">{inc.department}</p>
                                <p className="capitalize">{inc.priority} priority · {inc.status.replace('_', ' ')}</p>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
        </MapContainer>
    );
}

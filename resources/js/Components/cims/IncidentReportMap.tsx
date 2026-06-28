import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useEffect } from 'react';

interface IncidentReportMapProps {
    lat: number;
    lng: number;
    onChange: (lat: number, lng: number) => void;
}

function MapClickHandler({ onChange }: { onChange: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(event) {
            onChange(event.latlng.lat, event.latlng.lng);
        },
    });

    return null;
}

function MapViewSync({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap();

    useEffect(() => {
        map.setView([lat, lng], map.getZoom(), { animate: true });
    }, [lat, lng, map]);

    return null;
}

export default function IncidentReportMap({ lat, lng, onChange }: IncidentReportMapProps) {
    return (
        <MapContainer
            center={[lat, lng]}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
            className="z-0 rounded-lg"
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapViewSync lat={lat} lng={lng} />
            <MapClickHandler onChange={onChange} />
            <Marker
                key={`${lat}-${lng}`}
                position={[lat, lng]}
                draggable
                eventHandlers={{
                    dragend: (event) => {
                        const marker = event.target;
                        const next = marker.getLatLng();
                        onChange(next.lat, next.lng);
                    },
                }}
            >
                <Popup>Drag or click the map to set the incident location</Popup>
            </Marker>
        </MapContainer>
    );
}

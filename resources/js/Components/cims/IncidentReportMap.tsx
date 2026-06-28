import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function IncidentReportMap() {
    return (
        <MapContainer center={[10.3157, 123.8854]} zoom={13} style={{ height: '400px', width: '100%' }} className="z-0 rounded-lg">
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[10.3157, 123.8854]}>
                <Popup>Incident location</Popup>
            </Marker>
        </MapContainer>
    );
}

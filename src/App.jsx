import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const stops = [
  { id: 1, name: "Stop A", lat: 43.4723, lng: -80.5449 },
  { id: 2, name: "Stop B", lat: 43.4668, lng: -80.5164 },
];

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        center={[43.4723, -80.5449]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stops.map((stop) => (
          <Marker key={stop.id} position={[stop.lat, stop.lng]}>
            <Popup>{stop.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
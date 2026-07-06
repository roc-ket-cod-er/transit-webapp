import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { loadStops } from "./loadStops";

export default function App() {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    loadStops().then((data) => {
      setStops(data);
    });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        center={[43.4643, -80.5204]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stops.map((stop) => (
          <Marker
            key={stop.id}
            position={[stop.lat, stop.lng]}
          >
            <Popup>
              {stop.name}
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}
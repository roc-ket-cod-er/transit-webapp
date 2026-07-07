import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { loadStops } from "./loadStops";

import { Analytics } from "@vercel/analytics/next"

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

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
        center={[43.4643, -80.52]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stops.map((stop) => (
          <Marker
            key={`${stop.id} @ (${stop.lat}, ${stop.lng}) ${stop.agency}`}
            position={[stop.lat, stop.lng]}
          >
            <Popup>
              {stop.name} ({stop.agency})
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
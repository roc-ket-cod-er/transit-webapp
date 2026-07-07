import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { loadGRTStops, loadGuelphTransitStops } from "./loadStops";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function App() {
  const [stops, setStops] = useState([]);
  const [stops2, setStops2] = useState([]);

  useEffect(() => {
    loadGRTStops().then((data) => {
      console.log(data.length);
      console.log(data.slice(0, 5));
      setStops(data);
    });
    loadGuelphTransitStops().then((data) => {
      console.log(data.length);
      console.log(data.slice(0, 5));
      setStops2(data);
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
            key={`${stop.id}-${stop.lat}-${stop.lng}`}
            position={[stop.lat, stop.lng]}
          >
            <Popup>
              {stop.name}
            </Popup>
          </Marker>
        ))}
        {stops2.map((stop) => (
          <Marker
            key={`${stop.id}-${stop.lat}-${stop.lng}`}
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
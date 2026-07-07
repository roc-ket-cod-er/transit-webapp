import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { loadStops, transitAgencies } from "./loadStops";

import { Analytics } from "@vercel/analytics/react"

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function App() {
  const [stops, setStops] = useState([]);
  const [filters, setFilters] = useState(
    Object.fromEntries(transitAgencies.map((agency) => [agency, false]))
  );

  useEffect(() => {
    loadStops().then((data) => {
      setStops(data);
    });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 52,
          zIndex: 1000,
          background: "white",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <strong>Transit Agencies</strong>

        {transitAgencies.map((agency) => (
          <div key={agency}>
            <label>
              <input
                type="checkbox"
                checked={filters[agency]}
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    [agency]: !prev[agency],
                  }))
                }
              />
              {" "}{agency}
            </label>
          </div>
        ))}
      </div>
      <MapContainer
        center={[43.65, -79.9]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          maxClusterRadius={40}
          disableClusteringAtZoom={16}
        >
          {stops
            .filter((stop) => filters[stop.agency])
            .map((stop) => (
              <Marker
                key={`${stop.id}-${stop.agency}`}
                position={[stop.lat, stop.lng]}
              >
                <Popup>
                  {stop.name} ({stop.agency})
                </Popup>
              </Marker>
            ))}
        </MarkerClusterGroup>
      </MapContainer>
      <Analytics />
    </div>
  );
}
import Papa from "papaparse";

export async function loadGRTStops() {
  const response = await fetch("/gtfs/grt/stops.txt");
  const text = await response.text();

  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true
  });

  return result.data
    .filter((stop) => stop.stop_id && stop.stop_lat && stop.stop_lon)
    .map((stop) => ({
      id: stop.stop_id,
      name: stop.stop_name,
      lat: Number(stop.stop_lat),
      lng: Number(stop.stop_lon)
    }));
}

export async function loadGuelphTransitStops() {
  const response = await fetch("/gtfs/guelph-transit/stops.txt");
  const text = await response.text();

  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true
  });

  return result.data
    .filter((stop) => stop.stop_id && stop.stop_lat && stop.stop_lon)
    .map((stop) => ({
      id: stop.stop_id,
      name: stop.stop_name,
      lat: Number(stop.stop_lat),
      lng: Number(stop.stop_lon)
    }));
}
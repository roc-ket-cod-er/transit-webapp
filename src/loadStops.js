import Papa from "papaparse";

export async function loadStops() {
  const response = await fetch("/gtfs/stops.txt");
  const text = await response.text();

  const data = Papa.parse(text, {
    header: true
  });

  return data.data.map(stop => ({
    id: stop.stop_id,
    name: stop.stop_name,
    lat: Number(stop.stop_lat),
    lng: Number(stop.stop_lon)
  }));
}
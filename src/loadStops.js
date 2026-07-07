import Papa from "papaparse";

const transitAgencies = [
  "GRT",
  "Guelph Transit",
  "Stratford Transit",
  "GO Transit",
];

export async function loadStops() {
  const allStops = [];

  for (const agency of transitAgencies) {
    const stops = await loadStopsForAgency(agency);
    allStops.push(...stops);
    console.log(`Loaded ${stops.length} stops for ${agency}`);
  }

  return allStops;
}

async function loadStopsForAgency(agency) {
  const path = `/gtfs/${agency}/stops.txt`;
  const response = await fetch(path.toLowerCase().replace(' ', '-'));
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
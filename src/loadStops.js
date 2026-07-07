import Papa from "papaparse";

export const transitAgencies = [
  "GRT",
  "Guelph Transit",
  "Stratford Transit",
  "GO Transit",
  "UP Express",
  "TTC",
  "MiWay",
  "Brampton Transit",
  "YRT",
  "HSR",
  "Oakville Transit",
  "Burlington Transit",
  "Niagara Transit",
  "London Transit CA",
  "Durham Transit",
  "Kingston Transit",
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
  const response = await fetch(path.toLowerCase().replaceAll(' ', '-'));
  const text = await response.text();
  const result = Papa.parse(text, {
    header: true,
    skipEmptyLines: true
  });

  return result.data
    .filter((stop) => stop.stop_id && stop.stop_lat && stop.stop_lon)
    .map((stop) => ({
      agency: agency,
      id: stop.stop_id,
      name: stop.stop_name,
      lat: Number(stop.stop_lat),
      lng: Number(stop.stop_lon)
    }));
}
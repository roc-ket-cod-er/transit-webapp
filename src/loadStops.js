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
  "OC Transpo",
  "Transit Windsor",
  "Barrie Transit",
  "Via Rail"
];

export async function loadStops() {
  const results = await Promise.all(
    transitAgencies.map(async (agency) => {
      const stops = await loadStopsForAgency(agency);
      console.log(`Loaded ${stops.length} stops for ${agency}`);
      return stops;
    })
  );

  return results.flat();
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
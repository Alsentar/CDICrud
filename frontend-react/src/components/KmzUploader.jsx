

import * as turf from "@turf/turf";
import JSZip from "jszip";
import { kml } from "@tmcw/togeojson";

const santoDomingo = [-69.9312, 18.4861];

export default function KmzUploader({ onCalculated }) {
  async function extractKmlFromKmz(arrayBuffer) {
    const zip = await JSZip.loadAsync(arrayBuffer);
    const kmlFile = Object.keys(zip.files).find(p => p.endsWith(".kml"));
    if (!kmlFile) throw new Error("No KML found");
    return await zip.files[kmlFile].async("text");
  }

  async function handleProcess(e) {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const arrayBuffer = await file.arrayBuffer();
      const kmlText = await extractKmlFromKmz(arrayBuffer);

      const parser = new DOMParser();
      const kmlDom = parser.parseFromString(kmlText, "text/xml");
      const geojson = kml(kmlDom);

      const polygon = geojson.features[0];

      const areaSqMeters = turf.area(polygon);
      const centroid = turf.center(polygon).geometry.coordinates;
      const distanceKm = turf.distance(santoDomingo, centroid, { units: "kilometers" });

      const roundTripKm = distanceKm * 2;
      const gallons = roundTripKm / 45;
      const gasCost = gallons * 300;

      const finalPrice = (areaSqMeters + gasCost) * 1.27 * 1.35;

      onCalculated({
        area: Math.round(areaSqMeters),
        distance: distanceKm.toFixed(2),
        precio: Math.round(finalPrice),
      });

    } catch (err) {
      alert("Error procesando KMZ");
      console.error(err);
    }
  }

  return (
    <div className="card" id="selectordearchivos">
      <label id="textofile">Seleccionar archivo KMZ:</label>
      <input id="filein" type="file" accept=".kmz" onChange={handleProcess} />
    </div>
  );
}

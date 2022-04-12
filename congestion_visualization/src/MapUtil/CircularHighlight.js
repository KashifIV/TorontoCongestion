import * as turf from "@turf/turf";
import { MapData } from "./MapDataController";
function CreateCircularHighlight(center, radius, name){
  let _circle = turf.circle(turf.point(center), radius, {
    steps: 80,
    units: 'kilometers' // or "mile"
  });

  const data = {
    name: name+'Source',
    data: {
      type: "geojson",
      data: _circle,
      }
  }; 

  const layer = {
    id: name,
    type: "fill",
    source: name+'Source',
    paint: {
      "fill-color": "red",
      "fill-opacity": 0.8,
    },
  };
  MapData.addData(data, layer);
  return {source: data, layer: layer};
}

export {CreateCircularHighlight};
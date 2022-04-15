//Largely Helped to this absolute chad: 
// https://stackoverflow.com/questions/63053688/how-to-draw-arrows-on-satellite-view-map-with-plotly

import { MapData } from "./MapDataController";

function createArrow(a, b){
    // a: source point 
    // b: destination point
    var angle = Math.atan2(a[1]-b[1], a[0]-b[0]);
    var v = [b[0]-a[0], b[1]-a[1]]        // get direction vector
    var m = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2))  // module
    var u = [v[0]/m, v[1]/m]              // get unitary vector in the direction
    var k = 0.002                           // how far to place the arrow end
    var newb = [b[0]-u[0]*k, b[1]-u[1]*k] // place the arrow end a bit before the destination
    var s1 = rotate([0.003, 0.003], angle)  // "sides" of the arrow. Applied to a base vector in left direction <--, and rotated to match the correct angle
    var s2 = rotate([0.003, -0.003], angle)
    return [a, newb, [newb[0]+s1[0], newb[1]+s1[1]], newb, [newb[0]+s2[0], newb[1]+s2[1]]]
}
function rotate(a, theta) {
  return [a[0]*Math.cos(theta) - a[1]*Math.sin(theta), a[0]*Math.sin(theta) + a[1]*Math.cos(theta)];
}

function Arrow(id, a, b, name, colour, thickness, onClick = null){
  const arrow = createArrow(a, b); 
  name = 'cu-' + name; 
  const data = {
    name: name, 
    data: {
      type: "geojson",
      data: {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "MultiLineString",
              "coordinates": [arrow],
            }
          }
        ]
      },
      
    },
  }
  const layer = {
    'id': name,
    'sourcetype': 'geojson',
    'source': name,
    'type': 'line',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'color': colour,
    'paint': {
      'line-color': colour,
      'line-width': thickness
    }
  }; 
  let click = null
  if (onClick !== null){
    click = {
      layer: name, 
      func: onClick
    }
  }
  MapData.addData(id, data, layer, click);
  return {source: data, layer: layer};
}

export {Arrow}
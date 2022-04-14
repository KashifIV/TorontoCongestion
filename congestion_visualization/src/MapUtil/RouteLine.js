import { MapData } from "./MapDataController";

function RouteLine(id, coordinates, name, color, onClick = null){
  const data = {
    name: name, 
    data: {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': coordinates,
        }
      }
    }
  }; 
  const layer = {
    'id': name,
    'type': 'line',
    'source': name,
    'layout': {
    'line-join': 'round',
    'line-cap': 'round'
    },
    'paint': {
    'line-color': color,
    'line-width': 8
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

export {RouteLine};
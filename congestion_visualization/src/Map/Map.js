import React, { useRef, useEffect } from "react"; 
import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
export const Map = (props) => {
  const {sources, layers} = props;
  const mapContainer = useRef(); 
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      center: [-79.3883, 43.6548],
      zoom: 14,
      pitch: 60,
    }); 
    map.on("load", () => {
      console.log(sources)
      console.log(layers)
      if (sources !== undefined){
        sources.forEach((source) =>{
          map.addSource(source.name, source.data);
        });
      }

      // map.addSource("circleData", {
      //       type: "geojson",
      //       data: _circle,
      //     });

      map.addLayer(
        {
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 2,
        'paint': {
        'fill-extrusion-color': '#aaa',
         
        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        2,
        0,
        2.05,
        ['get', 'height']
        ],
        'fill-extrusion-base': [
        'interpolate',
        ['linear'],
        ['zoom'],
        2,
        0,
        2.05,
        ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 1.0
        }
        },
        );
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxZoom: 16,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 })
      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });
      // map.addLayer({
      //   id: "circle-fill",
      //   type: "fill",
      //   source: "circleData",
      //   paint: {
      //     "fill-color": "red",
      //     "fill-opacity": 0.8,
      //   },
      // });
      if (layers !== undefined){
        layers.forEach((layer) =>{
          map.addLayer(layer);
        });
      }
    });
  });

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: "100%", height: "100vh" }}
    />
  )
};
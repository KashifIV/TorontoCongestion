import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { MapData } from "../MapUtil/MapDataController";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
export const Map = (props) => {
  let map = useRef();
  const mapContainer = useRef(); 

  const forceUpdate = useCallback(() => {
    console.log(MapData.data);
    if (map.current === undefined){
      return; 
    }
    const update = () => {
      MapData.sources().forEach(source => {
        if (map.current.getSource(source.name) == null) {
          map.current.addSource(source.name, source.data); 
        }
      }); 
      MapData.layers().forEach(layer => {
        if (map.current.getLayer(layer.id) == null){
          map.current.addLayer(layer); 
        }
      }); 
      MapData.clicks().forEach(click => {
        map.current.on('click', click.layer, click.func);
      }); 
    }; 
    if (!map.current.isStyleLoaded()){
      map.current.on('styledata', () => {
        update();
      });
    }
    else {
      update(); 
    }
  }, [map]);

  MapData.addSubscriber(forceUpdate);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      center: [-79.3883, 43.6548],
      zoom: 14,
      pitch: 60,
    });
    map.current.on("load", () => {
      map.current.addLayer({
        id: "add-3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 2,
        paint: {
          "fill-extrusion-color": "#aaa",

          // Use an 'interpolate' expression to
          // add a smooth transition effect to
          // the buildings as the user zooms in.
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            2,
            0,
            2.05,
            ["get", "height"],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            2,
            0,
            2.05,
            ["get", "min_height"],
          ],
          "fill-extrusion-opacity": 1.0,
        },
      });
      map.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxZoom: 16,
      });
      map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      map.current.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });
    });
  }, []);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

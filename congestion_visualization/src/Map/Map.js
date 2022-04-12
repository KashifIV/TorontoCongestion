import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapData } from "../MapUtil/MapDataController";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
export const Map = (props) => {
  const mapContainer = useRef();

  const [sources, setSources] = useState(MapData.sources());
  const [layers, setLayers] = useState(MapData.layers());
  const [clicks, setClicks] = useState(MapData.clicks())

  const forceUpdate = () => {
    setSources(MapData.sources());
    setLayers(MapData.layers());
    setClicks(MapData.clicks())
  };

  MapData.addSubscriber(forceUpdate);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      center: [-79.3883, 43.6548],
      zoom: 14,
      pitch: 60,
    });
    map.on("load", () => {
      console.log(MapData.data);
      sources.forEach((source) => {
        map.addSource(source.name, source.data);
      });

      map.addLayer({
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
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxZoom: 16,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });

      layers.forEach((layer) => {
        map.addLayer(layer);
      });

      clicks.forEach((click)=> {
        map.on('click', click.layer, click.func);
      });
    });
  });

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import mapboxgl from "mapbox-gl";
import { MapData } from "../MapUtil/MapDataController";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
export const Map = (props) => {
  let map = useRef();
  const mapContainer = useRef();

  const update = () => {
    MapData.sources().forEach((source) => {
      if (map.current.getSource(source.name) === undefined) {
        map.current.addSource(source.name, source.data);
      }
      else {
        map.current.getSource(source.name).setData(source.data.data); 
      }
    });
    MapData.layers().forEach((layer) => {
      if (map.current.getLayer(layer.id) === undefined) {
        map.current.addLayer(layer);
      }
    });
    MapData.clicks().forEach((click) => {
      map.current.on("click", click.layer, click.func);
    });
    // Remove dangling layers
    const ids = new Set(MapData.layers().map((item) => item.id));
    const removeSources = Object.entries(map.current.getStyle().sources).filter(
      ([key, value]) => !(key in ids) && "cu-" === key.substring(0, 4)
    );
    const removeLayers = Object.values(map.current.getStyle().layers).filter(
      (e) => !(e.id in ids) && "cu-" === e.id.substring(0, 4)
    );
    
    removeSources.forEach(source => map.current.removeLayer(source[0]));
    removeLayers.forEach(layer => map.current.removeLayer(layer.id)); 
  };

  const forceUpdate = useCallback(() => {
    console.log(MapData.data);
    if (map.current === undefined) {
      return;
    }
    if (!map.current.isStyleLoaded()) {
      map.current.on("styledata", () => {
        update();
      });
    } else {
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
        minzoom: 13,
        paint: {
          "fill-extrusion-color": "#aaa",
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            13,
            0,
            13.05,
            ["get", "height"],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            13,
            0,
            1305,
            ["get", "min_height"],
          ],
          "fill-extrusion-opacity": 0.6,
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
      update();
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

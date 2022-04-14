import { useEffect } from "react";
import { MapData } from "../../MapUtil/MapDataController";
import { RouteLine } from "../../MapUtil/RouteLine";
import { Routes, Stops } from "../../Providers/TransitProvider";

function TransitRoutesPanel(){

  useEffect(() => {
   if (!MapData.containsData('TransitRoutes')){
      Routes.slice(0,80).forEach(route => {
        const coordinates = route.stops.map(s => [Stops[s].stop_lon, Stops[s].stop_lat]);
        RouteLine('TransitRoutes', coordinates, route.id, '#' + route.color);
      });
      MapData.notifySubscribers();
   }
  }, [])

  return <div className="transitRoutesPanel">
    
  </div>
}

export {TransitRoutesPanel};
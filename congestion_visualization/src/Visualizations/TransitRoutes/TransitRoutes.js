import { useEffect } from "react";
import { CreateCircularHighlight } from "../../MapUtil/CircularHighlight";
import { MapData } from "../../MapUtil/MapDataController";
import { RouteLine } from "../../MapUtil/RouteLine";
import { RouteNames, Routes, Stops } from "../../Providers/TransitProvider";

function TransitRoutesPanel(){

  useEffect(() => {
   if (!MapData.containsData('TransitRoutes')){
      Routes.slice(0, 1).forEach(route => {
        const coordinates = route.stops.map(s => [Stops[s].stop_lon, Stops[s].stop_lat]);
        RouteLine('TransitRoutes', coordinates, route.id, 'green');
      });
      MapData.notifySubscribers();
   }
  }, [])

  return <div className="transitRoutesPanel">
    
  </div>
}

export {TransitRoutesPanel};
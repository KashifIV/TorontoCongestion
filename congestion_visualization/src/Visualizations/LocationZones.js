import { useEffect, useState } from "react";
import { CreateCircularHighlight } from "../MapUtil/CircularHighlight";
import { MapData } from "../MapUtil/MapDataController";
import { KeyLocations } from "../Providers/LocationProvider";
import './LocationZones.css';


function LocationZonePanel(){
  const [clickCount, setClickCount] = useState(0);


  useEffect(() => {
    if (!MapData.containsData('LocationZones')){
      KeyLocations().then((locations)=>{
        locations.forEach((item) => {
          CreateCircularHighlight('LocationZones', item['location'].split(',').reverse(), 0.4, item['name'],() => setClickCount(e => e+1));
        });
        MapData.notifySubscribers();
      });
    }
  }, [setClickCount])

  return <div className="locationZonePanel">
    <h1>Red Circles have been clicked {clickCount} times.</h1>
  </div>
}

export {LocationZonePanel};
import { useEffect, useState } from "react";
import { Arrow } from "../../MapUtil/Arrow";
import { MapData } from "../../MapUtil/MapDataController";
import { colourScale, KeyLocations } from "../../Providers/LocationProvider";
import './LocationZones.css';


function LocationZonePanel(){
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (!MapData.containsData('LocationZones')){
      KeyLocations().then((locations)=>{
        locations.forEach((item) => {
          const a = item['location'].split(',').reverse().map(e => Number(e)); 
          const b = item['destination'].split(',').reverse().map(e => Number(e))
          Arrow('LocationZones', a, b, item.name, colourScale(item.numPeople), 20); 
          //CreateCircularHighlight('LocationZones', item['location'].split(',').reverse(), 0.4, item['name']+'circle', 'red',() => setClickCount(e => e+1));
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
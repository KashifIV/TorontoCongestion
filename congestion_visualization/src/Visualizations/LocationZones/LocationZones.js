import { useEffect, useState } from "react";
import { Arrow } from "../../MapUtil/Arrow";
import { CreateCircularHighlight } from "../../MapUtil/CircularHighlight";
import { MapData } from "../../MapUtil/MapDataController";
import { KeyLocations } from "../../Providers/LocationProvider";
import './LocationZones.css';


function LocationZonePanel(){
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    let directionModifier = 1; 
    if (!MapData.containsData('LocationZones')){
      KeyLocations().then((locations)=>{
        locations.slice(0, 1).forEach((item) => {
          const a = item['location'].split(',').reverse().map(e => Number(e)); 
          const b = [Number(a[0])+ 0.04*directionModifier, Number(a[1])];
          console.log(a); 
          console.log(b); 
          if (directionModifier > 0){
            Arrow('LocationZones', a, b, item.name, 'red', 20); 
          }
          else {
            Arrow('LocationZones', b, a, item.name, 'red', 20); 
          }
          directionModifier *= -1; 
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
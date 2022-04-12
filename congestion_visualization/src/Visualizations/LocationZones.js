import { CreateCircularHighlight } from "../MapUtil/CircularHighlight";
import { KeyLocations } from "../Providers/LocationProvider";

function LocationZones(){
  KeyLocations().then((locations)=>{
    locations.forEach((item) => {
      CreateCircularHighlight(item['location'].split(',').reverse(), 0.4, item['name']);
    });
  });
}

export {LocationZones};
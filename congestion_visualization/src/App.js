import {Map} from './Map/Map'; 
import { KeyLocations } from './Providers/LocationProvider';
import './App.css';
import { useEffect, useState } from 'react';
import { CreateCircularHighlight } from './MapUtil/CircularHighlight';

function App() {
  const [mapSources, setMapSources] = useState([]);
  const [mapLayers, setMapLayers] = useState([])
  useEffect(() => {
    KeyLocations().then((locations)=>{
      let sources = [];
      let layers = [];
      locations.forEach((item) => {
        const {source, layer} = CreateCircularHighlight(item['location'].split(',').reverse(), 0.4, item['name']);
        sources.push(source); 
        layers.push(layer);
      });
      setMapSources(sources);
      setMapLayers(layers);
    });
  }, []);
  return (
    <div className="App">
      <Map layers={mapLayers} sources={mapSources}/>
    </div>
  );
}

export default App;

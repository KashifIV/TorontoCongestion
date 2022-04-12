import {Map} from './Map/Map'; 
import './App.css';
import { useEffect} from 'react';
import { MapData } from './MapUtil/MapDataController';
import Panel from './Visualizations/Panel/Panel';

function App() {
  useEffect(() => {
    MapData.dumpData();
  }, []);
  return (
    <div className="App">
      <Panel />
      <Map/>
    </div>
  );
}

export default App;

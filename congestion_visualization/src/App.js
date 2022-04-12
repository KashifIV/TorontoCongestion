import {Map} from './Map/Map'; 
import './App.css';
import { useEffect, useState } from 'react';
import { MapData } from './MapUtil/MapDataController';
import { LocationZones } from './Visualizations/LocationZones';

function App() {
  useEffect(() => {
    MapData.dumpData();
    LocationZones();
  }, []);
  return (
    <div className="App">
      <Map/>
    </div>
  );
}

export default App;

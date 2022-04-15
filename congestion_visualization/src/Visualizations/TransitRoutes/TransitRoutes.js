import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Form} from "react-bootstrap";
import { MapData } from "../../MapUtil/MapDataController";
import { RouteLine } from "../../MapUtil/RouteLine";
import { Routes, Stops } from "../../Providers/TransitProvider";
import './TransitRoutes.css';

function TransitRoutesPanel(){

  const [selectValue, setSelectValue] = useState("None"); 

  const drawRoutes = useCallback((value) => {
    MapData.removeData('TransitRoutes');
    Routes.filter(e => e.name.includes(value)).forEach(route => {
      const coordinates = route.stops.map(s => [Stops[s].stop_lon, Stops[s].stop_lat]);
      RouteLine('TransitRoutes', coordinates, route.id, '#' + route.color);
    });
  }, []);

  const onSelectRegion = useCallback((e) => {
    setSelectValue(e.target.value); 
    drawRoutes(e.target.value);
    MapData.notifySubscribers();
  }, [drawRoutes, setSelectValue]);


  return <Card className="transitRoutes">
    <Card.Body>
      <Card.Title>Transit Routes</Card.Title>
      <Card.Text>Please select a Transit Route.</Card.Text>
      <Form.Select size="lg" value={selectValue} onChange={onSelectRegion}>
        <option value="">All Regions</option>
        <option value="Toronto">Toronto</option>
        <option value="Oshawa">Oshawa</option>
        <option value="None">None</option>
      </Form.Select>
      <Card.Text>The visualization only depicts the GO Transit routes but statistics include the TTC.</Card.Text>
    </Card.Body>
  </Card>
}

export {TransitRoutesPanel};
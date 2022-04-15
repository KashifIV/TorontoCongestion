import { useEffect, useState } from "react";
import { Card, Container, Row, Col} from "react-bootstrap";
import { Arrow } from "../../MapUtil/Arrow";
import { MapData } from "../../MapUtil/MapDataController";
import { colourScale, KeyLocations, sizeScale } from "../../Providers/LocationProvider"; 
import {BsPersonFill} from 'react-icons/bs';
import {AiFillCar} from 'react-icons/ai';
import {FaBus, FaTrain} from 'react-icons/fa';
import {IoTrain} from 'react-icons/io5';
import {MdTrain} from 'react-icons/md';
import './LocationZones.css';


function LocationZonePanel(){
  const [arrow, selectArrow] = useState(null); 

  useEffect(() => {
    if (!MapData.containsData('LocationZones')){
      KeyLocations().then((locations)=>{
        locations.forEach((item) => {
          const a = item['location'].split(',').reverse().map(e => Number(e)); 
          const b = item['destination'].split(',').reverse().map(e => Number(e))
          Arrow('LocationZones', a, b, item.id, colourScale(item.numPeople), sizeScale(item.numPeople), () => selectArrow(item)); 
          //CreateCircularHighlight('LocationZones', item['location'].split(',').reverse(), 0.4, item['name']+'circle', 'red',() => setClickCount(e => e+1));
        });
        MapData.notifySubscribers();
      });
    }
  }, [selectArrow])

  return <Card className="locationZonePanel">
    {
      (arrow == null) ?
        <Card.Body>
          <Card.Text>Click on an Arrow to learn more about them!</Card.Text>
        </Card.Body>
      : 
        <Card.Body>
          <div className="divider" style={{'backgroundColor': colourScale(arrow.numPeople)}}></div>
          <Card.Title>{arrow.name}</Card.Title>
          <Card.Text>Daily Statistics</Card.Text>
          <div className="divider" style={{'backgroundColor': colourScale(arrow.numPeople)}}></div>
          <CardStat Icon={BsPersonFill} category='People' value={arrow.numPeople}/>
          <CardStat Icon={AiFillCar} category='Cars' value={arrow.numAuto}/>
          <CardStat Icon={FaTrain} category='Transit Vehicles' value={arrow.numTransit}/>
          <div className="divider" style={{'backgroundColor': colourScale(arrow.numPeople)}}></div>
          <Card.Text>Number of people who take:</Card.Text>
          <CardStat Icon={AiFillCar} category='Cars' value={arrow.numPeopleAuto}/>
          <CardStat Icon={IoTrain} category='GO Train' value={arrow.numGoTrain}/>
          <CardStat Icon={MdTrain} category='Subway' value={arrow.numSubWay}/>
          <CardStat Icon={FaBus} category='Bus' value={arrow.numBus}/>
        </Card.Body>
    }
  </Card>
}

function CardStat(props){
  const {Icon, category, value} = props;

  return <Container className="cardStat">
    <Row>
      <Col>
        <Icon/>
        <Card.Text>{category}</Card.Text>
      </Col>
      <Col>
        <Card.Text>{value}</Card.Text>
      </Col>
    </Row>
  </Container>
}

export {LocationZonePanel};
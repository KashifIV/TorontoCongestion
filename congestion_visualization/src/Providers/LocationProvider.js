import * as d3 from 'd3';
import dataLocation from '../Data/2016_toronto_pm.csv'

async function KeyLocations(){
  const data = await d3.csv(dataLocation);
  const locations = data
    .map((item) => ({'name': item['SCREEN LINE'], 'location': item['COORDINATES']}))
    .filter((value, index, self) => self.indexOf(value) === index);
  return locations;
}

export {KeyLocations};
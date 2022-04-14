import * as d3 from "d3";
import dataLocation from "../Data/2016_toronto_pm.csv";

async function KeyLocations() {
  const data = await d3.csv(dataLocation);
  const locations = data
    .map((item) => ({
      id: item["SCREEN LINE"],
      name: item['Unnamed: 0'],
      numPeople: item["TOTAL PERSONS (NOT including Pedestrians)"],
      numAuto: item['TOTAL AUTO'],
      numGoTrain: item['TOTAL GO TRAIN PASSENGERS'],
      numSubWay: item['TOTAL SUBWAY PASSENGERS'],
      numBus: item['TOTAL BUS PASSENGERS'],
      numTransit: item['TOTAL TRANSIT (including school bus)'], 
      location: item["COORDINATES"],
      destination: item["DESTINATIONS"],
    }))
    .filter((value, index, self) => self.indexOf(value) === index);
  return locations;
}
const colourScale = d3.scaleQuantize()
  .domain([0, 400000])
  .range('#8598EF,#977AC9,#9A5FA2,#91477C,#803258,#69233A'.split(','));

const sizeScale = d3.scaleLinear()
  .domain([0, 400000])
  .range([10, 30]);

export { KeyLocations , colourScale, sizeScale};

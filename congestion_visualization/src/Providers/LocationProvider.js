import * as d3 from "d3";
import dataLocation from "../Data/2016_toronto_pm.csv";

async function KeyLocations() {
  const data = await d3.csv(dataLocation);
  const locations = data
    .map((item) => ({
      name: item["SCREEN LINE"],
      numPeople: item["TOTAL PERSONS (NOT including Pedestrians)"],
      location: item["COORDINATES"],
      destination: item["DESTINATIONS"],
    }))
    .filter((value, index, self) => self.indexOf(value) === index);
  return locations;
}
const colourScale = d3.scaleQuantize()
  .domain([0, 360367])
  .range('#8598EF,#977AC9,#9A5FA2,#91477C,#803258,#69233A'.split(','));

export { KeyLocations , colourScale};

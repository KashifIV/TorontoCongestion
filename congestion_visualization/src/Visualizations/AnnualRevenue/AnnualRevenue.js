import * as d3 from "d3";
import { Button, Card } from "react-bootstrap";
import dataFile from '../../Data/annualrevenue.csv';
import screenshot from './screenshot.png'; 
import './AnnualRevenue.css';

function tweenDash() {
  var l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
  return function (t) { return i(t); };
}

function transition(path) {
  path.transition()
      .duration(2000)
      .attrTween("stroke-dasharray", tweenDash);
}

async function GetSVG(ref){
  const width = 500; 

  const data = await d3.csv(dataFile, {typed: true});
  const revenueAverage = [...d3.rollup(data, v => d3.mean(v, d => d.Value),  d => d.Year)]; 
  const margin = ({top: 50, right: 30, bottom: 20, left: 70}); 
  const visWidth = width - margin.left - margin.right;
  const visHeight = 500 - margin.top - margin.bottom; 
  const x = d3.scaleLinear()
  .domain(d3.extent(data, d => d.Year))
  .range([0, visWidth]); 
  const maxRev = d3.max(revenueAverage, d => d[1]); 
  const y = d3.scaleLinear()
  .domain([0, maxRev])
  .range([visHeight, 0]); 
  const line = d3.line()
    .x(d => x(d[0]))
    .y(d => y(d[1])); 

  const svg = d3.create('svg')
    .attr('width', visWidth + margin.left + margin.right)
    .attr('height', visHeight + margin.top + margin.bottom);

// create the group element for the elements of the 
const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Axes

const xAxis = d3.axisBottom(x)
  // change the format of the tick marks to only show month names
  .tickFormat(d3.format("d")); 

const yAxis = d3.axisLeft(y);

g.append('g')
    // move x-axis down to the bottom
    .attr('transform', `translate(0,${visHeight})`)
    .call(xAxis);

g.append('g')
    .call(yAxis)
    .call(g => g.select('.domain').remove()) // remove the vertical line for a cleaner look
  // add axis label
  .append('text')
    .attr('fill', 'black')
    .attr('text-anchor', 'start')
    .attr('dominant-baseline', 'hanging')
    .attr('font-weight', 'bold')
    .attr('y', -margin.top + 5)
    .attr('x', -margin.left)
    .text('Average Annual TTC Revenue');

// Line - This is where we actually draw the line on the chart!
// we are only drawing one line, so we can append one path
g.append('path')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('fill', 'none')
    .attr('d', line(revenueAverage));


const lines = svg
  .selectAll('path')

lines.call(transition)


//inspiration
//https://observablehq.com/@maliky/simple-styled-line-chart-with-customizable-markers


g.append("g")
  .selectAll(".symbol")
  .data(data)
  .enter()
  .append("text")
  .attr("class", "symbol")
  .attr("transform", d => `translate(${margin.left}, ${margin.top})`)
  .html(function(d,i){
    return "🚃";
  })
  .on('mouseover', function() {
    // console.log("je suis ici");
    // g.append('title').text("uwu");
    // g.selectAll('.symbol').remove();
    d3.select(this).attr("class", "nu").html(function(d,i){return "🤮";}
  )})
  .on('mouseout', function() {
    g.selectAll('.nu').remove()
  });


return svg.node();
}

function AnnualRevenuePanel(){

  return <Card className="annualRevenue">
    <Card.Img src={screenshot}/>
    <Card.Body> 
      <Card.Title>TTC Annual Revenue</Card.Title>
      <Card.Text>Take a look at the Annual Revenue through out the years of TTC's service.</Card.Text>
      <a href="https://observablehq.com/@7d51e3545c45b0d5/annualrevenue">
        <Button variant='primary'>Observable Notebook</Button>
      </a>
    </Card.Body>
  </Card>
}

export {AnnualRevenuePanel};
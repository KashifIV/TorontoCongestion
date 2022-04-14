import stops from '../Data/stops.json';
import Routes from '../Data/routes.json';

const RouteNames = Routes.map(e => e['name']);

let StopToRoutes = {}; 


Routes.forEach(route => {
  route.stops.forEach(stop => {
    if (stop.id in StopToRoutes){
      StopToRoutes[stop.id].push(route.id);
    }
    else {
      StopToRoutes[stop.id] = [route.id];
    }
  })
}); 

const Stops =  Object.assign({}, ...stops.map((x) => ({[x.stop_id]: x})));

export {Stops, Routes, RouteNames, StopToRoutes};
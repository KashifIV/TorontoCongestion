import stops from '../Data/stops.json';
import routes from '../Data/routes.json';

let StopToRoutes = {}; 

const Routes = routes//.filter(e => e.name.indexOf('Toronto') !== -1); 
const RouteNames = Routes.map(e => e['name']);

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
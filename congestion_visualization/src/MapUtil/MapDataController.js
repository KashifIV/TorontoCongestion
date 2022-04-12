function MapDataController(){

  this.data = [];
  this.subscribers = [];
}

MapDataController.prototype.addData = function(id, src, layer, onClick){
  this.data.push({id: id, source: src, layer: layer, click: onClick});
}
MapDataController.prototype.removeData = function(id){
  this.data = this.data.filter(item => item.id !== id);
}
MapDataController.prototype.containsData = function(id){
  return this.data.filter(item => item.id === id).length > 0;
}
MapDataController.prototype.sources = function(){
  return this.data.map(e => e.source); 
}
MapDataController.prototype.layers = function(){
  return this.data.map(e => e.layer); 
}
MapDataController.prototype.clicks = function(){
  return this.data.filter(e => e.click !== null).map(e => e.click); 
}
MapDataController.prototype.dumpData = function(){
  this.data = [];
}
MapDataController.prototype.addSubscriber = function(func){
  this.subscribers.push(func);
}
MapDataController.prototype.notifySubscribers = function(){
  this.subscribers.forEach(e => e());
}

let MapData = new MapDataController(); 

export {MapData};
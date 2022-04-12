function MapDataController(){

  this.data = [];
}

MapDataController.prototype.addData = function(src, layer){
  this.data.push({source: src, layer: layer});
}
MapDataController.prototype.sources = function(){
  return this.data.map(e => e.source); 
}
MapDataController.prototype.layers = function(){
  return this.data.map(e => e.layer); 
}
MapDataController.prototype.dumpData = function(){
  this.data = [];
}

let MapData = new MapDataController(); 

export {MapData};
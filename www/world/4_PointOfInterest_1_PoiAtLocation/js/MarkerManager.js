function MarkerManager(markers) {}

MarkerManager.prototype.addMarker = function(marker) {

};

MarkerManager.prototype.addMarkers = function(markers) {

};

MarkerManager.prototype.getNearbyMarkers = function(currentLocation) {

};

MarkerManager.prototype.redraw = function(currentLocation) {

};


MarkerManager.fromPOIJSON = function(poiJSON) {
  return new MarkerManager(poiJSON.map(function(poi) {
    return new Marker(poi);
  }));
}

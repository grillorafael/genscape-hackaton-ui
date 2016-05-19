function MarkerManager(markers) {
  this.markers = markers;
  console.log(this);
}
MarkerManager.prototype.addMarker = function(marker) {};
MarkerManager.prototype.addMarkers = function(markers) {};
MarkerManager.prototype.redraw = function(currentLocation) {
  this.markers.forEach(function(m) {
    var location = m.arObject.locations[0];
    var distanceToUser = location.distanceToUser();
    console.log('Distance to user', distanceToUser);
    if(distanceToUser <= MarkerManager.DISTANCE_THRESHOLD) m.show();
    else m.hide();
  });
};

MarkerManager.DISTANCE_THRESHOLD = 600;
MarkerManager.fromPOIJSON = function(poiJSON) {
  return new MarkerManager(poiJSON.map(function(poi) {
    return new Marker(poi);
  }));
}

function MarkerManager(markers) {
  this.markers = markers;
  this.distanceMapping = [];
}
MarkerManager.prototype.addMarker = function(marker) {};
MarkerManager.prototype.addMarkers = function(markers) {};
MarkerManager.prototype.redraw = function(currentLocation) {
  this.markers.forEach(function(m, i) {
    var location = m.location;
    var distanceToUser = location.distanceToUser();
    var lastDistance = this.distanceMapping[i];
    this.distanceMapping[i] = distanceToUser;

    console.log('Distance to user', distanceToUser);
    console.log('Previous distance to user', lastDistance);

    if(distanceToUser <= MarkerManager.DISTANCE_THRESHOLD) {
      if((!lastDistance || Math.abs(lastDistance - distanceToUser) >= 100)) {
          m.show();
      }
    }
    else {
      this.distanceMapping[i] = undefined;
      m.hide();
    }
  }, this);
};

MarkerManager.DISTANCE_THRESHOLD = 450;
MarkerManager.fromPOIJSON = function(poiJSON) {
  return new MarkerManager(poiJSON.map(function(poi) {
    return new Marker(poi);
  }));
}

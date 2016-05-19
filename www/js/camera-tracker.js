function CameraTracker(wtcFile) {
  this.tracker = new AR.ClientTracker(wtcFile, {
    onLoaded: this.onWTCLoaded
  });
}

CameraTracker.prototype.onWTCLoaded = function() {

};

CameraTracker.init = function() { return new CameraTracker("assets/magazine.wtc"); }

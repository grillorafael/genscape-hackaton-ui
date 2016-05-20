function Marker(poi) {
    var markerLocation = new AR.GeoLocation(Number(poi.Lat), Number(poi.Long), poi.altitude || 650);

    this.htmlDrawable = new AR.HtmlDrawable({ html: Marker.process(poi, $('template#hotel-overlay').html()) }, Marker.DEFAULT_SIZE, {
        offsetX: 0,
        offsetY: 0,
        onClick: function() { cordova.InAppBrowser.open('http://' + poi.Website, '_system'); },
        viewportWidth: 300,
        viewportHeight: 300,
        horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.LEFT,
        opacity: 0.5
    });

    this.location = markerLocation;
}

Marker.prototype.hide = function() {
  if(this.arObject) { this.arObject.destroy(); this.arObject = undefined; }
};

Marker.prototype.show = function() {
  this.arObject = new AR.GeoObject(this.location, { drawables: { cam: this.htmlDrawable } });
};

Marker.DEFAULT_SIZE = 5;
Marker.POWER_UNIT = 'kWh';

Marker.process = function(data, template) {
  return template
    .replace('{{Name}}', data.Name)
    .replace('{{CurrentPower}}', Marker.withUnit(data.CurrentPower))
    .replace('{{DailyPower}}', Marker.withUnit(data.DailyPower))
    .replace('{{MonthlyPower}}', Marker.withUnit(data.MonthlyPower))
    .replace('{{Rooms}}', Marker.withUnit(data.Rooms))
    .replace('{{TotalGamingSpaceSqM}}', Marker.withUnit(data.TotalGamingSpaceSqM));
};

Marker.withUnit = function(number) {
    return (number || 0) + Marker.POWER_UNIT;
}

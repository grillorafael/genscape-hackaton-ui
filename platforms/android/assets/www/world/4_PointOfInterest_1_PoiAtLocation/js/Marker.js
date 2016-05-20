function Marker(poi) {
    var markerLocation = new AR.GeoLocation(Number(poi.Lat), Number(poi.Long), poi.altitude || 650);
    this.data = poi;
    this.location = markerLocation;
}

Marker.prototype.hide = function() {
    if (this.arObject) {
        this.arObject.destroy();
        this.arObject = undefined;
    }
};

Marker.prototype.show = function() {
    this.hide();
    if (!this.arObject) {
        this.arObject = new AR.GeoObject(this.location, {
            drawables: {
                cam: this.getHTMLElement()
            }
        });
    }
};

Marker.prototype.getHTMLElement = function() {
  return new AR.HtmlDrawable({
      html: Marker.process(this.data, this.location, $('template#hotel-overlay').html())
  }, Marker.DEFAULT_SIZE, {
      offsetX: 0,
      offsetY: 0,
      viewportWidth: 300,
      viewportHeight: 300,
      horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.LEFT,
      opacity: 0.6
  });
}

Marker.DEFAULT_SIZE = 5;
Marker.POWER_UNIT = 'kWh';

Marker.process = function(data, location, template) {
    return template
        .replace('{{Name}}', data.Name)
        .replace('{{CurrentPower}}', Marker.withUnit(data.CurrentPower))
        .replace('{{DailyPower}}', Marker.withUnit(data.DailyPower))
        .replace('{{MonthlyPower}}', Marker.withUnit(data.MonthlyPower))
        .replace('{{Rooms}}', Number(data.Rooms).toLocaleString())
        .replace('{{TotalGamingSpaceSqM}}', Marker.round(data.TotalGamingSpaceSqM))
        .replace('{{MonthlyPowerCost}}', Marker.round(data.MonthlyPowerCost))
        .replace('{{Distance}}', Marker.round(location.distanceToUser()));
};

Marker.round = function(number) {
  number = Number(number);
  return (Math.round(number * 100) / 100).toLocaleString();
}

Marker.withUnit = function(number) {
    number = Number(number);
    return Marker.round((number || 0)) + Marker.POWER_UNIT;
}

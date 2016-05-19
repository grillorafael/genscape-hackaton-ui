function Marker(poi) {
    var markerLocation = new AR.GeoLocation(Number(poi.Lat), Number(poi.Long), poi.altitude || 650);

    var htmlDrawable = new AR.HtmlDrawable({ html: Marker.process(poi, $('template#hotel-overlay').html()) }, Marker.DEFAULT_SIZE, {
        offsetX: 0,
        offsetY: -3,
        onClick: function() { window.open(poi.Website, '_system', ''); },
        viewportWidth: 300,
        viewportHeight: 300,
        horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.LEFT,
        opacity: 0.5
    });

    this.drawables = [htmlDrawable];
    this.arObject = new AR.GeoObject(markerLocation, {
        drawables: {
            cam: this.drawables
        }
    });
}

Marker.prototype.hide = function() {
    this.arObject.drawables.removeCamDrawable();
};

Marker.prototype.show = function() {
    this.arObject.drawables.addCamDrawable(this.drawables);
};

Marker.DEFAULT_SIZE = 5;
Marker.POWER_UNIT = 'kWh';

Marker.process = function(data, template) {
  return template
    .replace('{{Name}}', data.Name)
    .replace('{{CurrentPower}}', Marker.withUnit(data.CurrentPower))
    .replace('{{DailyPower}}', Marker.withUnit(data.DailyPower))
    .replace('{{MonthlyPower}}', Marker.withUnit(data.MonthlyPower));
};

Marker.withUnit = function(number) {
    return number + Marker.POWER_UNIT;
}

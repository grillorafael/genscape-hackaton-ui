function Marker(poi) {
    var markerLocation = new AR.GeoLocation(poi.latitude, poi.longitude, poi.altitude);

    var nameLabel = new AR.Label(poi.name, Marker.DEFAULT_SIZE, Marker.getStyleForOffset(0, 0, 1));
    var addressLabel = new AR.Label(poi.address, Marker.DEFAULT_SIZE, Marker.getStyleForOffset(-Marker.DEFAULT_SIZE, 0, 1));

    var currentConsumptionLabel = new AR.Label(poi.currentConsumption, Marker.DEFAULT_SIZE, Marker.getStyleForOffset(-2*Marker.DEFAULT_SIZE, 0, 1));
    var consumptionPerDayLabel = new AR.Label(poi.dailyConsumption, Marker.DEFAULT_SIZE, Marker.getStyleForOffset(-3*Marker.DEFAULT_SIZE, 0, 1));
    var consumptionPerMonthLabel = new AR.Label(poi.monthlyConsumption, Marker.DEFAULT_SIZE, Marker.getStyleForOffset(-4*Marker.DEFAULT_SIZE, 0, 1));

    var websiteLabel = new AR.Label('Website', Marker.DEFAULT_SIZE, $.extend(
        Marker.getStyleForOffset(-5*Marker.DEFAULT_SIZE, 0, 1), {
            onClick: function() {
                window.open(poi.website, '_system', '');
            }
        }
    ));

    this.drawables = [
        nameLabel,
        addressLabel,
        currentConsumptionLabel,
        consumptionPerDayLabel,
        consumptionPerMonthLabel,
        websiteLabel
    ];
    this.arObject = new AR.GeoObject(markerLocation, {
        drawables: {
          cam: this.drawables
        }
    });
}

Marker.prototype.hide = function() {
    this.arObject.removeCamDrawable();
};

Marker.prototype.show = function() {
    this.arObject.addCamDrawable(this.drawables);
};

Marker.getStyleForOffset = function(offsetY, offsetX, zOrder) {
    return {
        zOrder: zOrder || 0,
        offsetY: offsetY || 0,
        offsetX: offsetX || 0,
        style: Marker.commonLabelStyle
    }
}

Marker.DEFAULT_SIZE = 0.5;

Marker.commonLabelStyle = {
    opacity: 0.6,
    textColor: '#FFFFFF',
    backgroundColor: '#0000FF',
    fontStyle: AR.CONST.FONT_STYLE.BOLD
};

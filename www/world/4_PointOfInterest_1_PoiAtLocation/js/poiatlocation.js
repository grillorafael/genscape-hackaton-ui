var World = {
    initiallyLoadedData: false,
    markerManager: undefined,
    processMarkers: function() {
        if (World.markerManager) {
            World.markerManager.redraw();
            World.updateStatusMessage('redraw');
        }
    },
    updateStatusMessage: function updateStatusMessageFn(message, isWarning) {
        var themeToUse = isWarning ? "e" : "c";
        var iconToUse = isWarning ? "alert" : "info";
        $("#status-message").html(message);
        $("#popupInfoButton").buttonMarkup({
            theme: themeToUse
        });
        $("#popupInfoButton").buttonMarkup({
            icon: iconToUse
        });
    },
    locationChanged: function locationChangedFn(lat, lon, alt, acc) {
        if (!World.initiallyLoadedData) {
            PoiService.get().then(function(poiData) {
                World.markerManager = MarkerManager.fromPOIJSON(poiData);
            });
            World.initiallyLoadedData = true;
        }

        World.processMarkers();
    },
};
AR.context.onLocationChanged = World.locationChanged;

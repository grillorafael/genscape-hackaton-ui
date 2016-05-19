var World = {
    initiallyLoadedData: false,
    markerManager: undefined,
    processMarkers: function(lat, lon) {
        if (World.markerManager) {
            World.markerManager.redraw({
                latitude: lat,
                longitude: lon
            });
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
        console.log(arguments);
        if (!World.initiallyLoadedData) {
            PoiService.get().then(function(poiData) {
                World.markerManager = MarkerManager.fromPOIJSON(poiData);
            });
            World.initiallyLoadedData = true;
        }

        World.processMarkers(lat, lon);
    },
};
AR.context.onLocationChanged = World.locationChanged;

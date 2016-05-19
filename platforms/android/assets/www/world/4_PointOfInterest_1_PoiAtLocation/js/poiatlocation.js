// implementation of AR-Experience (aka "World")
var World = {
    // true once data was fetched
    initiallyLoadedData: false,

    // called to inject new POI data
    loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {
        var geoObjects = poiData.map(function(poi) {
            var markerLocation = new AR.GeoLocation(poi.latitude, poi.longitude, poi.altitude);
            var titleLabel = new AR.Label(poi.title, 1, {
                zOrder: 1,
                offsetY: 0.55,
                style: {
										opacity: 0.5,
                    textColor: '#FFFFFF',
										backgroundColor: '#0000FF',
                    fontStyle: AR.CONST.FONT_STYLE.BOLD
                }
            });
            var descriptionLabel = new AR.Label(poi.description, 0.8, {
                zOrder: 1,
                offsetY: -0.55,
                style: {
										opacity: 0.5,
                    textColor: '#FFFFFF',
										backgroundColor: '#0000FF',
                }
            });

            // create GeoObject
            return new AR.GeoObject(markerLocation, {
                drawables: {
                    cam: [titleLabel, descriptionLabel]
                }
            });
        });

        // Updates status message as a user feedback that everything was loaded properly.
        World.updateStatusMessage(poiData.length + ' place loaded');
    },

    // updates status message shon in small "i"-button aligned bottom center
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

    // location updates, fired every time you call architectView.setLocation() in native environment
    locationChanged: function locationChangedFn(lat, lon, alt, acc) {

        /*
        	The custom function World.onLocationChanged checks with the flag World.initiallyLoadedData if the function was already called. With the first call of World.onLocationChanged an object that contains geo information will be created which will be later used to create a marker using the World.loadPoisFromJsonData function.
        */
        if (!World.initiallyLoadedData) {
            var poiData = [{
                "id": 1,
                "latitude": 36.101583,
                "longitude": -115.172706,
                "altitude": 650,
                title: 'MGM',
                description: 'POWER CONSUMPT.'
            }, {
                "id": 2,
                "latitude": 36.100690,
                "longitude": -115.174021,
                "altitude": 650,
                title: 'Excalibur',
                description: 'POWER CONSUMPT.'
            }];

            World.loadPoisFromJsonData(poiData);
            World.initiallyLoadedData = true;
        }
    },
};

/*
	Set a custom function where location changes are forwarded to. There is also a possibility to set AR.context.onLocationChanged to null. In this case the function will not be called anymore and no further location updates will be received.
*/
AR.context.onLocationChanged = World.locationChanged;

function PoiService() {}

PoiService.get = function() {
  return new Promise(function(resolve, reject) {
    resolve([{
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
    }]);
  });
}

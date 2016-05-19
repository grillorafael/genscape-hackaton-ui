function PoiService() {}

PoiService.get = function() {
  return new Promise(function(resolve, reject) {
    resolve([{
        id: 1,
        latitude: 36.102360,
        longitude: -115.170029,
        altitude: 650,
        name: 'MGM',
        address: 'POWER CONSUMPT.',
        website: 'http://mgm.com',
        currentConsumption: 0,
        dailyConsumption: 0,
        monthlyConsumption: 0
    }]);
  });
}

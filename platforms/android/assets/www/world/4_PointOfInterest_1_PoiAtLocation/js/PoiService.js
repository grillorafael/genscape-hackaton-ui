function PoiService() {}

PoiService.get = function() {
  return new Promise(function(resolve, reject) {
    $.get("http://powertrip-api.azurewebsites.net/api/Meta/GetMarkerObject", resolve, "json");
  });
}

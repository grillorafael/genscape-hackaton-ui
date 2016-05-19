function PoiService() {}

PoiService.get = function() {
  return new Promise(function(resolve, reject) {
    $.get("PUT_URL_HERE", function( data ) {
        resolve(data);
      }, "json");
  });
}

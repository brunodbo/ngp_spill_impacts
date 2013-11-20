/* Build GeoJSON object of proposed pipeline route lat/long coordinates, and add it to the map. */
$(function() {

// Layer style and popup behaviour.
var routeColor = "#122128";
var routeStyle = {
  "color": routeColor,
  "weight": 3,
  "opacity": 0.65
};
var popup = L.popup({closeButton: false})
  .setContent('<p>Proposed pipeline route</p>');

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: addHighlight,
    mouseout: removeHighlight
  });
}

function addHighlight(e) {
  var layer = e.target;

  layer.bindPopup(popup).openPopup();
  layer.setStyle({
    opacity: 1,
  });

  if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToBack();
  }
}

function removeHighlight(e) {
  var layer = e.target;

  layer.closePopup();
  layer.setStyle({
    opacity: 0.65,
  });

  if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToFront();
  }
}

// @TODO: Show popup at location of mouse, instead of centered on layer.
// function showPopup(e) {
//   var feature = e.target;
//   feature.bindPopup(popup).openPopup();
// }

// function removePopup(e) {
//   var feature = e.target;
//   feature.closePopup();
// }

// L.geoJson(route_layer, {
//   style: routeStyle,
//   onEachFeature: onEachFeature
// }).addTo(map);


 var route_layer = L.geoJson(null, {
    style: routeStyle,
    onEachFeature: onEachFeature
  });

// var route_layer = L.geoJson();

// $.getJSON('js/route_topo.json', function(data) {
//   var route_geojson = topojson.feature(data, data.objects.route_data);
//   route_layer.addData(route_geojson);
// });

$.getJSON('js/route_data.json', function(data) {
  var route_geojson = data;
  route_layer.addData(route_geojson);
});

map.addLayer(route_layer);

});
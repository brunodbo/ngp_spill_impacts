/* Build GeoJSON object of proposed pipeline route lat/long coordinates, and add it to the map. */
$(function() {

// Set up GeoJSON
var route_layer = L.geoJson();

$.getJSON('js/route_data.json', function(data) {
  route_layer.addData(data);
  console.log(route_layer);
});

// Layer style and popup behaviour.
var routeColor = "#ff7800";
var routeHighlightColor = "#666";
var routeStyle = {
  "color": routeColor,
  "weight": 5,
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
    color: routeHighlightColor,
  });

  if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToFront();
  }
}

function removeHighlight(e) {
  var layer = e.target;

  layer.closePopup();
  layer.setStyle({
    color: routeColor,
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

L.geoJson(route_layer, {
  style: routeStyle,
  onEachFeature: onEachFeature
}).addTo(map);

});
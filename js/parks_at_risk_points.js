$(function() {

  'use strict';

  function onEachFeature(feature, layer) {
    // var feature.properties.marker-symbol = "park";

    var parkName = feature.properties.park_name;
    var watershed = feature.properties.watershed;
    var ecoValue = feature.properties.eco_value;
    var area = feature.properties.area;
    var areaToPerim = feature.properties.area_to_perim;
    var pipelineLength = feature.properties.pl_length;
    var flow = feature.properties.flow;
    var pipelineDistance = feature.properties.pl_distance;
    var risk = feature.properties.risk;

    var popupContent = '<h2 class="popup-title">' + parkName + '</h2>'
    + '<p>' + '<strong>Primary watershed:</strong>' + ' ' + watershed + '</p>'
    + '<p>' + '<strong>Ecological value:</strong>' + ' ' + ecoValue + '</p>'
    + '<p>' + '<strong>Area:</strong>' + ' ' + area + 'km<sup>2</sup>' + '</p>'
    + '<p>' + '<strong>Area to perimeter ration:</strong>' + ' ' + areaToPerim + '</p>'
    + '<p>' + '<strong>Length of pipeline:</strong>' + ' ' + pipelineLength + '</p>'
    + '<p>' + '<strong>Flow:</strong>' + ' ' + flow + '</p>'
    + '<p>' + '<strong>Distance to pipeline:</strong>' + ' ' + pipelineDistance + '</p>'
    + '<p>' + '<strong>Risk index:</strong>' + ' ' + risk + '</p>';
  
    var popup = L.popup().setContent(popupContent);
    layer.bindPopup(popup);

    // console.log(feature.properties);

    // @TODO: Load center points for locations
    // marker = new L.marker(feature.geometry.coordinates, {
    //   icon: L.mapbox.marker.icon({
    //     'marker-symbol': 'park',
    //     // 'marker-size': 'large',
    //     'marker-color': '#ff0000'
    //   })
    // });

    // marker.bindPopup(popup);

    // // // Add marker to our to map
    // // // map.addLayer(marker);
    // layer.add(marker);

  }

  var parksAtRiskMarkers = L.geoJson(null, {
    onEachFeature: onEachFeature
  });

  $.getJSON('js/parks_at_risk_points_data.json', function(data) {
    parksAtRiskMarkers.addData(data);
  });

  map.addLayer(parksAtRiskMarkers);
});

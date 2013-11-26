$(function() {

  'use strict';

  function markerStyle(feature) {
    var parkName = feature.properties.park_name;
    var watershed = feature.properties.watershed;
    var ecoValue = feature.properties.eco_value;
    var area = feature.properties.area;
    var areaToPerim = feature.properties.area_to_perim;
    var pipelineLength = feature.properties.pl_length;
    var flow = feature.properties.flow;
    var pipelineDistance = feature.properties.pl_distance;
    var risk = feature.properties.risk;

    var popupContent = '<p>' + '<strong>Primary watershed:</strong>' + ' ' + watershed + '</p>'
    + '<p>' + '<strong>Ecological value:</strong>' + ' ' + ecoValue + '</p>'
    + '<p>' + '<strong>Area:</strong>' + ' ' + area + 'km<sup>2</sup>' + '</p>'
    + '<p>' + '<strong>Area to perimeter ration:</strong>' + ' ' + areaToPerim + '</p>'
    + '<p>' + '<strong>Length of pipeline:</strong>' + ' ' + pipelineLength + '</p>'
    + '<p>' + '<strong>Flow:</strong>' + ' ' + flow + '</p>'
    + '<p>' + '<strong>Distance to pipeline:</strong>' + ' ' + pipelineDistance + '</p>'
    + '<p>' + '<strong>Risk index:</strong>' + ' ' + risk + '</p>';

    feature.properties.title = parkName;
    feature.properties.description = popupContent;

    feature.properties['marker-symbol'] = 'park';
    feature.properties['marker-color'] = '#ff0000';

    return true;
  }

  // AJAX callback
  function add_parks_data(data) {
    var parksAtRiskMarkers = L.mapbox.markerLayer(data);
    parksAtRiskMarkers.setFilter(markerStyle);
    // parksAtRiskMarkers.on('mouseover', function(e) {
    //   e.layer.openPopup();
    // });
    // parksAtRiskMarkers.on('mouseout', function(e) {
    //     e.layer.closePopup();
    // });
    map.addLayer(parksAtRiskMarkers);
  }

  function parks(add_parks_data) {
    $.getJSON('js/parks_at_risk_points_data.json', function(data) {
      add_parks_data(data);
    });
  }

  parks(add_parks_data);
});

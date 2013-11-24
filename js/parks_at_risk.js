$(function() {

  'use strict';

  function onEachFeature(feature, layer) {
    var parkName = feature.properties.park_name;
    var watershed = feature.properties.watershed;
    var ecoValue = feature.properties.eco_value;
    var area = feature.properties.area;
    var areaToPerim = feature.properties.area_to_perim;
    var pipelineLength = feature.properties.pl_length;
    var flow = feature.properties.flow;
    var pipelineDistance = feature.properties.pl_distance;
    var risk = feature.properties.risk;

    var popupContent = '<h2 class="popup-title">' + parkName + '</h2>';
    popupContent += '<p>' + '<strong>Primary watershed:</strong>' + ' ' + watershed + '</p>';
    popupContent += '<p>' + '<strong>Ecological value:</strong>' + ' ' + ecoValue + '</p>';
    popupContent += '<p>' + '<strong>Area:</strong>' + ' ' + area + 'km<sup>2</sup>' + '</p>';
    popupContent += '<p>' + '<strong>Area to perimeter ration:</strong>' + ' ' + areaToPerim + '</p>';
    popupContent += '<p>' + '<strong>Length of pipeline:</strong>' + ' ' + pipelineLength + '</p>';
    popupContent += '<p>' + '<strong>Flow:</strong>' + ' ' + flow + '</p>';
    popupContent += '<p>' + '<strong>Distance to pipeline:</strong>' + ' ' + pipelineDistance + '</p>';
    popupContent += '<p>' + '<strong>Risk index:</strong>' + ' ' + risk + '</p>';
  
    var popup = L.popup().setContent(popupContent);
    layer.bindPopup(popup);

    // @TODO: Load center points for locations
    // marker = new L.marker(marker_location, {
    //   icon: L.mapbox.marker.icon({
    //     'marker-symbol': 'park',
    //     // 'marker-size': 'large',
    //     'marker-color': '#ff0000'
    //   })
    // });

    // marker.bindPopup(popup);

    // // Add marker to our to map
    // // map.addLayer(marker);
    // marker.addTo(map);

  }

  var parksAtRiskLayer = L.geoJson(null, {
    style: {
      color: '#ff0000',
      weight: 1,
      opacity: 0.4,
      fillOpacity: 1
    },
    onEachFeature: onEachFeature
  });

  $.getJSON('js/parks_at_risk_data.json', function(data) {
    parksAtRiskLayer.addData(data);
  });

  map.addLayer(parksAtRiskLayer);
});

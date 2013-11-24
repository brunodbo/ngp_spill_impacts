$(function() {

  'use strict';

  function onEachFeature(feature, layer) {
    var parkName = feature.properties.park_name;
    var popup = L.popup().setContent(parkName);
    layer.bindPopup(popup);
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

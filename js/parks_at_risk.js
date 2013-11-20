$(function() {

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

  // AJAX callback
  function addParksAtRiskData(data) {
    parksAtRiskLayer.addData(data);
  }

  function parksAtRisk(add_parks_at_risk_data) {
    $.getJSON('js/parks_at_risk_data.json', function(data) {
      addParksAtRiskData(data);
      parksAtRiskLayer.bringToFront();
    });
  };

  parksAtRisk(addParksAtRiskData);

  parksAtRiskLayer.addTo(map);
  // map.addLayer(parksAtRiskLayer);
});

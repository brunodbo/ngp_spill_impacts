$(function() {

  function onEachFeature(feature, layer) {
    var coordinates = feature.geometry.coordinates[0];
    var coordinatesString = '';
    $.each(coordinates, function(key, value) {
      coordinatesString = coordinatesString + '[' + value + ']'; 
    });
    var popup = L.popup().setContent(coordinatesString);
    layer.bindPopup(popup);
  }

  var parks_layer = L.geoJson(null, {
    style: {
      color: '#19851c',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.4
      // clickable: false
    // }
    },
    onEachFeature: onEachFeature
  });

  // AJAX callback
  function add_parks_data(data) {
    // var parks_geojson = topojson.feature(data, data.objects.parks);
    // parks_layer.addData(parks_geojson);
    parks_layer.addData(data);
  }

  function parks(add_parks_data) {
    // $.getJSON('js/parks_data.json', function(data) {
    $.getJSON('js/parks_data_full.geojson', function(data) {
      console.log('boo');
      add_parks_data(data);
  parks_layer.bringToBack();
    });
  };

  parks(add_parks_data);
  map.addLayer(parks_layer);
});
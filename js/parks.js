$(function() {
  
  'use strict';

  var parks_layer = L.geoJson(null, {
    style: {
      color: '#19851c',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.4,
      clickable: false
    }
  });

  $.getJSON('js/parks_data.json', function(data) {
    var parks_geojson = topojson.feature(data, data.objects.parks);
    parks_layer.addData(parks_geojson);
    parks_layer.bringToBack();
  });

  map.addLayer(parks_layer);
});
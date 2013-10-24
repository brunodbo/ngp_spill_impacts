$(document).ready(function() {

var parks_layer = L.geoJson(null, {
        style: {
            color: '#666',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.3
        }
    });

$.getJSON('/js/bc_parks_ecores_topo.json', function (data) {
    var parks_geojson = topojson.feature(data, data.objects.bc_parks_ecores);
    parks_layer.addData(parks_geojson);
});

map.addLayer(parks_layer);

});
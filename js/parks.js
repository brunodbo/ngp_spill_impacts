$(document).ready(function() {

// var parks_layer = L.geoJson(null, {
//         style: {
//             color: '#666',
//             weight: 1,
//             opacity: 1,
//             fillOpacity: 0.3
//         }
//     });

var parkStyle = {
  "color": "#ff0000",
  "weight": 3,
  "opacity": 1
};
    
    // map = L.map('map');

// L.tileLayer('http://{s}.tiles.mapbox.com/v3/jcsanford.map-xu5k4lii/{z}/{x}/{y}.png', {
//     maxZoom: 17,
//     attribution: 'Map data &copy; Someone, Somewhere.',
// }).addTo(map);

var parks = '';
$.getJSON('/js/parks.json', function (data) {
    var parks = topojson.feature(data, data.objects.parks);
});


// $.getJSON('/js/parks.json', function (data) {
//     var parks_geojson = topojson.feature(data, data.objects.parks);
//     // console.log(parks_geojson);
//     parks_layer.addData(parks_geojson);
//     console.log(parks_layer);
// });

// map.addLayer(parks_layer);

// L.geoJson(parks_layer).addTo(map);

L.geoJson(parks, {
  style: parkStyle
}).addTo(map);

});
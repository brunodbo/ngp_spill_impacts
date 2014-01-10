$(function() {

  'use strict';

  var flickrApiKey = '37f987b3db22ad31b938468f9a30c250';
  var getFlickrPhotos = function(location) {
    var flickrApiUrl = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + flickrApiKey + '&tags=' + location + '&text=' + location + '&sort=date-posted-desc' + '&content_type=1' + '&extras=owner_name' + '&per_page=1&format=json&nojsoncallback=1';
    return $.getJSON(flickrApiUrl);
  };

  function markerStyle(feature) {
    feature.properties['marker-symbol'] = 'park';
    feature.properties['marker-color'] = '#ff0000';

    return true;
  }

  function markerPopup(feature) {
    var popupContent = '<p>' + '<strong>Primary watershed:</strong>' + ' ' + feature.properties.watershed + '</p>'
      + '<p>' + '<strong>Ecological value:</strong>' + ' ' + feature.properties.eco_value + '</p>'
      + '<p>' + '<strong>Area:</strong>' + ' ' + feature.properties.area + 'km<sup>2</sup>' + '</p>'
      + '<p>' + '<strong>Area to perimeter ration:</strong>' + ' ' + feature.properties.area_to_perim + '</p>'
      + '<p>' + '<strong>Length of pipeline:</strong>' + ' ' + feature.properties.pl_length + '</p>'
      + '<p>' + '<strong>Flow:</strong>' + ' ' + feature.properties.flow + '</p>'
      + '<p>' + '<strong>Distance to pipeline:</strong>' + ' ' + feature.properties.pl_distance + '</p>'
      + '<p>' + '<strong>Risk index:</strong>' + ' ' + feature.properties.risk + '</p>';

      return popupContent;
  }

  var parksAtRiskMarkers = L.mapbox.markerLayer().addTo(map);
  parksAtRiskMarkers.setFilter(markerStyle);
  parksAtRiskMarkers.loadURL('js/parks_at_risk_points_data.json');
  // Create custom popup content and bind popup to marker.
  parksAtRiskMarkers.on('layeradd', function(e) {
    var marker = e.layer,
      feature = marker.feature,
      parkName = feature.properties.park_name,
      popupContent =  '<h2>' + parkName + '</h2>',
      flickrPhoto = '';
    // Get Flickr photo.
    getFlickrPhotos(parkName).done(function(data) {
      console.log(data);
      $.each(data.photos.photo, function(key, photo) {
        flickrPhoto += '<img src="' + 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_n.jpg' + '" />';
        flickrPhoto += '<cite>Photographer: <a target="_blank" href="http://www.flickr.com/photos/' + photo.ownername + '/' + photo.id + '">' + photo.ownername + '</a></cite>';
      });
      popupContent += flickrPhoto;
      popupContent += markerPopup(feature);
      marker.bindPopup(popupContent, {
        closeButton: true,
        minWidth: 340
      });
    });
  });
});

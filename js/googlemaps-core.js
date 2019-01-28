// Initialize and add the map
var map;
var googolArray = [];
var infoWindow;
var markers = [];
function initMap() {
    // The location of Uluru
    var uluru = {lat: 0, lng: 0};
    // The map, centered at Uluru
    map = new google.maps.Map(
        document.getElementById('map'), {center: uluru,
            zoom: 1,
            minZoom: 1});
    // The marker, positioned at Uluru
    infoWindow = new google.maps.InfoWindow({
        content:"388-A , Road no 22, Jubilee Hills, Hyderabad Telangana, INDIA-500033",
    });

    setTimeout(function() {
        if(googolArray.length !== 0) {
            console.log("Google Maps Log: " + googolArray[0].lat + " size: " + googolArray.length);

            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            markers = googolArray.map(function (item, i) {
                var ulol = {lat: item.lat, lng: item.long};
                var marker = new google.maps.Marker({position: ulol, map: map, label: labels[i % labels.length]});
                marker.addListener('click', function() {
                    infoWindow.setContent( '<div style="float:left;"><img src="' + item.url + '" height="25%" width="25%" style="float:left;"/></div>' );
                    infoWindow.open(map, this);
                });
                return marker;
            });

            var markerCluster = new MarkerClusterer(map, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

        }
    }, 3000);


}
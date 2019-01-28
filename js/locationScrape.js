import { getIGMediaNew } from './dataRetrieve.js'
import { getDbPath } from './dbPath.js'

export function instagramLocation(hashtag){
    var igMedia = getIGMediaNew(hashtag);
    var instagramCall = '', shortCode = '', igObject;
    var locationRestBody = [], locationName, locationRegion, tempLocationObj;
    var tempBody;

    for(let media of igMedia){
        if(!media.hasOwnProperty('geocode_info')) {
            shortCode = media.ig_object.shortcode;
            instagramCall = 'https://www.instagram.com/p/' + shortCode + '/?__a=1';
            $.ajax({
                async: false,
                type: "GET",
                url: instagramCall,
                dataType: "json",
                success: function (response) {
                    igObject = response.graphql.shortcode_media;
                    tempBody = {oid: media._id.$oid,};
					
					if(igObject.location != null){
						//console.log(igObject.location);
						tempLocationObj = JSON.parse(igObject.location.address_json);
						
						locationName = igObject.location.name;
						locationRegion = tempLocationObj.country_code.toLowerCase();
						
						//console.log(locationName + " " + locationRegion);
						tempBody.geocode_info = getGeocodeFromGoogle(locationName, locationRegion);
					}else{
						//console.log('empty location info');
						tempBody.geocode_info = null;
					}
					
                    locationRestBody.push(tempBody);
                },
                error: function (request, status, error) {
                    insertErrorGeocode(media._id.$oid);
                }
            });
        }
    }
	//console.log(locationRestBody);
    insertGeocode(locationRestBody);
}

function insertGeocode(locationRestBody){
    var domain = getDbPath();
    var restUrl;
    var restBody = {};
    for(let a of locationRestBody) {
        restUrl = domain + '/smile/ig_media/' + a.oid;
        restBody.geocode_info = a.geocode_info;
        $.ajax({
            async: true,
            type: "PATCH",
            url: restUrl,
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(restBody),
            complete: function (xhr, status) {
                console.log('----------------\ninsertGeocode')
                console.log(xhr)
                console.log('----------------')
			}
        });
    }
}

function insertErrorGeocode(oid){
    var domain = 'http://127.0.0.1:88';
    var restUrl = domain + '/smile/ig_media/' + oid;
    var restBody = {};
    restBody.geocode_info = null;
    $.ajax({
        async: true,
        type: "PATCH",
        url: restUrl,
        processData: false,
        contentType: "application/json",
        data: JSON.stringify(restBody),
        complete: function (xhr, status) {
            console.log('----------------\ninsertErrorGeocode')
            console.log(xhr)
            console.log('----------------')
        }
    });
}

function getGeocodeFromGoogle(name, countryCode){
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + name + '&key=AIzaSyDn-kpTRu7LwAuYYbDJ3mZo2evvmH2qL9U', geocodeResponse = null;
	if(countryCode != "")
		url += '&region=' + countryCode;
	
	$.ajax({
		async: false,
        type: "GET",
        url: url,
        dataType: "json",
        success: function (response) {
			geocodeResponse = response;
			//console.log(response);			
        },
        error: function (xhr, status) {
            console.log('----------------\ngetGeocode')
            console.log(xhr)
            console.log('----------------')
        }
    });
	return geocodeResponse;
}
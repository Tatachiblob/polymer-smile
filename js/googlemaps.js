import { getDbPath } from './dbPath.js'
import {getSpecificRange} from "./dataRetrieve.js";
var continents = {
    "Europe": 0,
    "Asia": 0,
    "North America": 0,
    "South America": 0,
    "Australia": 0,
    "Africa": 0,
    "Antarctica": 0
};
var regionszxc = {
    "AD": "Europe",
    "AE": "Asia",
    "AF": "Asia",
    "AG": "North America",
    "AI": "North America",
    "AL": "Europe",
    "AM": "Asia",
    "AN": "North America",
    "AO": "Africa",
    "AQ": "Antarctica",
    "AR": "South America",
    "AS": "Australia",
    "AT": "Europe",
    "AU": "Australia",
    "AW": "North America",
    "AZ": "Asia",
    "BA": "Europe",
    "BB": "North America",
    "BD": "Asia",
    "BE": "Europe",
    "BF": "Africa",
    "BG": "Europe",
    "BH": "Asia",
    "BI": "Africa",
    "BJ": "Africa",
    "BM": "North America",
    "BN": "Asia",
    "BO": "South America",
    "BR": "South America",
    "BS": "North America",
    "BT": "Asia",
    "BW": "Africa",
    "BY": "Europe",
    "BZ": "North America",
    "CA": "North America",
    "CC": "Asia",
    "CD": "Africa",
    "CF": "Africa",
    "CG": "Africa",
    "CH": "Europe",
    "CI": "Africa",
    "CK": "Australia",
    "CL": "South America",
    "CM": "Africa",
    "CN": "Asia",
    "CO": "South America",
    "CR": "North America",
    "CU": "North America",
    "CV": "Africa",
    "CX": "Asia",
    "CY": "Asia",
    "CZ": "Europe",
    "DE": "Europe",
    "DJ": "Africa",
    "DK": "Europe",
    "DM": "North America",
    "DO": "North America",
    "DZ": "Africa",
    "EC": "South America",
    "EE": "Europe",
    "EG": "Africa",
    "EH": "Africa",
    "ER": "Africa",
    "ES": "Europe",
    "ET": "Africa",
    "FI": "Europe",
    "FJ": "Australia",
    "FK": "South America",
    "FM": "Australia",
    "FO": "Europe",
    "FR": "Europe",
    "GA": "Africa",
    "GB": "Europe",
    "GD": "North America",
    "GE": "Asia",
    "GF": "South America",
    "GG": "Europe",
    "GH": "Africa",
    "GI": "Europe",
    "GL": "North America",
    "GM": "Africa",
    "GN": "Africa",
    "GP": "North America",
    "GQ": "Africa",
    "GR": "Europe",
    "GS": "Antarctica",
    "GT": "North America",
    "GU": "Australia",
    "GW": "Africa",
    "GY": "South America",
    "HK": "Asia",
    "HN": "North America",
    "HR": "Europe",
    "HT": "North America",
    "HU": "Europe",
    "ID": "Asia",
    "IE": "Europe",
    "IL": "Asia",
    "IM": "Europe",
    "IN": "Asia",
    "IO": "Asia",
    "IQ": "Asia",
    "IR": "Asia",
    "IS": "Europe",
    "IT": "Europe",
    "JE": "Europe",
    "JM": "North America",
    "JO": "Asia",
    "JP": "Asia",
    "KE": "Africa",
    "KG": "Asia",
    "KH": "Asia",
    "KI": "Australia",
    "KM": "Africa",
    "KN": "North America",
    "KP": "Asia",
    "KR": "Asia",
    "KW": "Asia",
    "KY": "North America",
    "KZ": "Asia",
    "LA": "Asia",
    "LB": "Asia",
    "LC": "North America",
    "LI": "Europe",
    "LK": "Asia",
    "LR": "Africa",
    "LS": "Africa",
    "LT": "Europe",
    "LU": "Europe",
    "LV": "Europe",
    "LY": "Africa",
    "MA": "Africa",
    "MC": "Europe",
    "MD": "Europe",
    "ME": "Europe",
    "MG": "Africa",
    "MH": "Australia",
    "MK": "Europe",
    "ML": "Africa",
    "MM": "Asia",
    "MN": "Asia",
    "MO": "Asia",
    "MP": "Australia",
    "MQ": "North America",
    "MR": "Africa",
    "MS": "North America",
    "MT": "Europe",
    "MU": "Africa",
    "MV": "Asia",
    "MW": "Africa",
    "MX": "North America",
    "MY": "Asia",
    "MZ": "Africa",
    "NA": "Africa",
    "NC": "Australia",
    "NE": "Africa",
    "NF": "Australia",
    "NG": "Africa",
    "NI": "North America",
    "NL": "Europe",
    "NO": "Europe",
    "NP": "Asia",
    "NR": "Australia",
    "NU": "Australia",
    "NZ": "Australia",
    "OM": "Asia",
    "PA": "North America",
    "PE": "South America",
    "PF": "Australia",
    "PG": "Australia",
    "PH": "Asia",
    "PK": "Asia",
    "PL": "Europe",
    "PM": "North America",
    "PN": "Australia",
    "PR": "North America",
    "PS": "Asia",
    "PT": "Europe",
    "PW": "Australia",
    "PY": "South America",
    "QA": "Asia",
    "RE": "Africa",
    "RO": "Europe",
    "RS": "Europe",
    "RU": "Europe",
    "RW": "Africa",
    "SA": "Asia",
    "SB": "Australia",
    "SC": "Africa",
    "SD": "Africa",
    "SE": "Europe",
    "SG": "Asia",
    "SH": "Africa",
    "SI": "Europe",
    "SJ": "Europe",
    "SK": "Europe",
    "SL": "Africa",
    "SM": "Europe",
    "SN": "Africa",
    "SO": "Africa",
    "SR": "South America",
    "ST": "Africa",
    "SV": "North America",
    "SY": "Asia",
    "SZ": "Africa",
    "TC": "North America",
    "TD": "Africa",
    "TF": "Antarctica",
    "TG": "Africa",
    "TH": "Asia",
    "TJ": "Asia",
    "TK": "Australia",
    "TM": "Asia",
    "TN": "Africa",
    "TO": "Australia",
    "TR": "Asia",
    "TT": "North America",
    "TV": "Australia",
    "TW": "Asia",
    "TZ": "Africa",
    "UA": "Europe",
    "UG": "Africa",
    "US": "North America",
    "UY": "South America",
    "UZ": "Asia",
    "VC": "North America",
    "VE": "South America",
    "VG": "North America",
    "VI": "North America",
    "VN": "Asia",
    "VU": "Australia",
    "WF": "Australia",
    "WS": "Australia",
    "YE": "Asia",
    "YT": "Africa",
    "ZA": "Africa",
    "ZM": "Africa",
    "ZW": "Africa"
};
var processing = {};
var tableHeading = "<th>Continents</th>", tableBody = "<td></td>";

$(document).ready(function(){
    //processing = getIGMedia(sessionStorage.getItem("hashtagInput"));
    var start = Math.round(new Date(sessionStorage.getItem('startDate')).getTime() / 1000), end = Math.round(new Date(sessionStorage.getItem('endDate')).getTime() / 1000);
    processing = getSpecificRange(start, end, sessionStorage.getItem('hashtagInput'));

    $.ajax({
        async: false,
        type: "GET",
        url: getDbPath() + "/smile/country_to_continent",
        contentType: "application/json",
        success: function(response){
            response = response._embedded[0];
            //regions = response;
        }
    });

    getTotalNoOfPosts(processing);

});

function getTotalNoOfPosts(igMediaData){
    //console.log(igMediaData);
	var filterYear;
    for(let node of igMediaData){
		filterYear = new Date((node.ig_object.taken_at_timestamp) * 1000);
		if (filterYear.getFullYear() == sessionStorage.getItem("year")) {
			if(node.geocode_info != null){
				for(let geoNode of node.geocode_info.results){
					var mainArray = geoNode.geometry.location;
					var url = node.ig_object.display_url;
					var wayPoint = {lat:mainArray.lat, long:mainArray.lng, link:46, url:url};
					googolArray.push(wayPoint);
					for(let component of geoNode.address_components){
						if(component.types.indexOf('country') != -1){
							continents[regionszxc[component.short_name]]++;
						}
					}
				}
			
			}
		}
    }
    for(let key of sort(continents)){
        console.log(key + " : " + continents[key]);
        tableHeading += '<th>' + key + '</th>';
        tableBody += '<td>' + continents[key] + '</td>'
    }
    $('#tableHeading').html(tableHeading);
    $('#tableBody').html(tableBody);
}

function sort(list){
    var keysSorted = Object.keys(list).sort(function(a,b){return list[b]-list[a]});
    return keysSorted;
}

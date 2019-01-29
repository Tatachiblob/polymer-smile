import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-image/iron-image.js';
import '@google-web-components/google-apis/google-maps-api';
import { MarkerClusterer } from './markerclusterer.js';
import './my-caption.js';
import './shared-styles.js';
import './bootstrap-style.js';

class MyMap extends PolymerElement {
	static get template() {
		return html`
		<style include="bootstrap-style"></style>
		<style include="shared-styles">
        :host {
			display: block;
			padding: 10px;
		}
		
		.mappy{
			height: 500px;
		}
		</style>
		
		<iron-ajax
			id="geocodeAjax"
			url="{{ajaxUrl}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse"
			debounce-duration="300">
		</iron-ajax>
		
		<google-maps-api 
			id="gapi" 
			api-key="AIzaSyDn-kpTRu7LwAuYYbDJ3mZo2evvmH2qL9U" 
			version="3.exp">
		</google-maps-api>
		
		<div class="row">
			<div class="col-md-5 col-md-offset-7">
				<div class="card">
					<my-caption />
				</div>
			</div>
		</div>
		<div class="card mappy" id="map"></div>
		<div class="card">
			<table class="table table-bordered">
				<thead class="thead-dark">
					<tr>
						<template is="dom-repeat" items="{{continents}}">
						<th scope="col">{{item.continent}}</th>
						</template>
					</tr>
				</thead>
				<tbody>
					<tr>
						<template is="dom-repeat" items="{{continents}}">
						<td>{{item.count}}</td>
						</template>
					</tr>
				</tbody>
			</table>
		</div>
		`;
	}
	
	static get properties() {
		return {
			hashtag: {
				type: String
			},
			mediaIdArr: Array,
			ajaxUrl: String,
			mapData: Array,
			regionszxc: Object,
			continentCount: Array,
			google: Object,
			continents: Array
		}
	}
	
	ready(){
		super.ready();
		
		this.$.gapi.addEventListener('api-load', function(e){
			this.google = google;
		}.bind(this));
		
		this.regionszxc = {
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
	}
	
	generateMapRequest(){
		this.ajaxUrl = this.__createUrl();
		this.$.geocodeAjax.generateRequest();
	}
	
	__handleResponse(event, res){
		res = res.response._embedded;
		res = res.filter(this.__filterGeocode);
		//console.log(res);
		
		this.__makeTable(res);
	}
	
	__makeTable(igMediaData){
		let google = this.google;
		let continents = {
			"Europe": 0,
			"Asia": 0,
			"North America": 0,
			"South America": 0,
			"Australia": 0,
			"Africa": 0,
			"Antarctica": 0
		};
		let googolArray = [];
		let markers = [];
		
		for(let node of igMediaData){
			for(let geoNode of node.geocode_info.results){
				var mainArray = geoNode.geometry.location;
				var url = node.ig_object.display_url;
				var wayPoint = {lat:mainArray.lat, long:mainArray.lng, link:46, url:url};
				googolArray.push(wayPoint);
				for(let component of geoNode.address_components){
					if(component.types.indexOf('country') != -1){
						continents[this.regionszxc[component.short_name]]++;
					}
				}
			}
		}
		
		continents = Object.keys(continents).map(function(key) {
			return {"continent": key, "count": continents[key]};
		});
		continents.sort((a, b) => b.count - a.count);
		this.continentCount = continents;
		
		let uluru = {lat: 0, lng: 0};
		let infoWindow;
		let map = new google.maps.Map(this.$.map, {
			center: uluru,
            zoom: 1,
			minZoom: 1
        });
		infoWindow = new google.maps.InfoWindow({
			content:"388-A , Road no 22, Jubilee Hills, Hyderabad Telangana, INDIA-500033",
		});
		
		if(googolArray.length !== 0) {
            //console.log("Google Maps Log: " + googolArray[0].lat + " size: " + googolArray.length);

            let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

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

		console.log(continents);
		this.continents = continents;
	}
	
	__filterGeocode(response){
		return response.geocode_info != null;
	}
	
	__createUrl(){
		return "http://localhost:8080/smile/ig_media?filter={'hashtag':'" + this.hashtag + "'}&filter={'ig_object.id':{'$in':" + JSON.stringify(this.mediaIdArr) + "}}&keys={'geocode_info':1}&keys={'ig_object.display_url':1}&pagesize=1000";
	}
}

window.customElements.define('my-map', MyMap);
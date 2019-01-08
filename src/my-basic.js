import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';
import 'highcharts/highcharts.js';
import 'highcharts/modules/histogram-bellcurve.js';
import './shared-styles.js';

class MyBasic extends PolymerElement {
	static get template() {
		return html`
		<style include="granite-bootstrap"></style>
		<style include="shared-styles">
        :host {
			display: block;
			padding: 10px;
		}
		</style>
		
		<iron-ajax
			id="googleAjax"
			url="{{ajaxUrl}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse"
			debounce-duration="300">
		</iron-ajax>
		
		<div class="card" on-click="__handleImgClick">
			<h1>{{totalImgs}}</h1>
			<h2>Instagram Images</h2>
			<h3>Total Volumes of Images Collected</h3>
		</div>
		<div class="card">
			<h1>{{totalLikes}}</h1>
			<h2>Likes</h2>
			<h3>Total No. of Likes from All Posts</h3>
		</div>
		<div class="card" on-click="__handleBrandClick">
			<h1>{{totalBrand}}</h1>
			<h2>Brand Logos</h2>
			<h3>Total Brand Logos Spotted</h3>
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
			rawMediaData: Array,
			googleLogoData: Array,
			totalImgs: String,
			totalLikes: String,
			totalBrand: String
		}
	}
	
	generateGoogleRequest(){
		this.ajaxUrl = this.__createUrl();
		this.$.googleAjax.generateRequest();
	}
	
	setRawMediaData(rawMediaData){this.rawMediaData = rawMediaData;}
	
	__handleImgClick(){
		let data = [];
		
		for(let d of this.rawMediaData){
			data.push(d.ig_object.display_url);
		}
		
		this.dispatchEvent(new CustomEvent('modal1', {detail: {title: "Images Collected", imgs: data}}));
	}
	
	__handleBrandClick(){
		console.log(this.googleLogoData);
		
		this.dispatchEvent(new CustomEvent('modal2', {detail: {title: "Brands Detected", imgs: this.googleLogoData}}));
	}
	
	__displayBasicInfo(googleData){
		this.totalImgs = this.rawMediaData.length;
		
		let sum = 0;
		let totalLikes = 0;
		for (var i = 0; i < this.rawMediaData.length; i++) {
			sum = this.rawMediaData[i].ig_object.edge_liked_by.count;
			totalLikes += sum;
		}
		this.totalLikes = totalLikes;
		
		let finalData = [];
		let temp = {};
		let googleResult = this.__groupBy(googleData, data => data.desc);
		
		for (const [key, value] of googleResult.entries()) {
			temp = {};
			temp.desc = key;
			temp.ig = value;
			finalData.push(temp);
		}
		
		this.googleLogoData = finalData;
		this.totalBrand = finalData.length;
	}
	
	__handleResponse(event, res){
		res = res.response._embedded;
		
		let logoArray = [];
		let tempObj = {};
		for(let i = res.length - 1; i >= 0; i--){
			//console.log(i);
			if(res[i].google.responses[0].hasOwnProperty("logoAnnotations")){
				res[i].logoAnnotations = res[i].google.responses[0].logoAnnotations;
				delete res[i].google;
			}
			else
				res.splice(i, 1);
		}
		
		for(let r of res){
			for(let logo of r.logoAnnotations){
				tempObj = {};
				tempObj.desc = logo.description;
				tempObj.logoAnnotations = logo;
				tempObj.ig_url = r.ig_url;
				logoArray.push(tempObj);
			}
		}
		
		this.__displayBasicInfo(logoArray);
	}
	
	__groupBy(list, keyGetter) {
		const map = new Map();
		list.forEach((item) => {
			const key = keyGetter(item);
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [item]);
			} else {
				collection.push(item);
			}
		});
		return map;
	}
	
	__createUrl(){
		return "http://localhost:8080/smile/ig_processing_google?filter={'hashtag':'" + this.hashtag + "'}&filter={'ig_id':{'$in':" + JSON.stringify(this.mediaIdArr) + "}}&pagesize=1000&keys={'google':1}&keys={'ig_url':1}"
	}
}

window.customElements.define('my-basic', MyBasic);
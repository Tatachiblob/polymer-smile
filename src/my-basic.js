import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import 'highcharts/highcharts.js';
import 'highcharts/modules/histogram-bellcurve.js';
import './shared-styles.js';
import './bootstrap-style.js';
import './font-awesome.js';
import './style.js';

class MyBasic extends PolymerElement {
	static get template() {
		return html`
		<style include="bootstrap-style"></style>
		<style include="font-awesome"></style>
		<style include="style"></style>
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
		
		<div class="col-sm-4 widget_1_box set_display" on-click="__handleImgClick">
			<div class="wid-social flickr" id="imagesScraped">
				<div class="social-icon">
					<i class="fa fa-instagram text-light icon-lg pull-right" style="font-size: 72px;"></i>
				</div>
				<div class="social-info">
					<h3 id="total-dataset" class="number_counter bold count text-light start_timer counted">{{totalImgs}}</h3>
					<h4 class="counttype text-light">Instagram Images</h4>
					<span class="percent">Total Volume of Images Collected</span>
				</div>
			</div>
		</div>
		
		<div class="col-sm-4 widget_1_box set_display">
			<div class="wid-social bg-secondary" style="color: #fff">
				<div class="social-icon">
					<i class="fa fa-thumbs-up text-light icon-lg pull-right" style="font-size: 72px;"></i>
				</div>
				<div class="social-info">
					<h3 id="total-likes" class="number_counter bold count text-light start_timer counted">{{totalLikes}}</h3>
					<h4 class="counttype text-light">Likes</h4>
					<span class="percent">Total No. of Likes from all posts</span>
				</div>
			</div>
		</div>
		
		<div class="col-sm-4 widget_1_box set_display" on-click="__handleBrandClick">
			<div class="wid-social twitter" id="brands">
				<div class="social-icon">
					<i class="fa fa-comment text-light icon-lg pull-right" style="font-size: 72px;"></i>
				</div>
				<div class="social-info">
					<h3 id="brands-spotted" class="number_counter bold count text-light start_timer counted">{{totalBrand}}</h3>
					<h4 class="counttype text-light">Brand Logos</h4>
					<span class="percent">Total Brand Logos Spotted</span>
				</div>
			</div>
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
			totalBrand: String,
			totalComments: String,
			summary: String
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
		
		sum = 0;
		let totalComments = 0;
		
		for (i = 0; i < this.rawMediaData.length; i ++) {
			sum = this.rawMediaData[i].ig_object.edge_media_to_comment.count;
			totalComments += sum;
		}
		
		this.totalComments = totalComments;
		
		if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "consumer-analysis" || 
			window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "post-event" || 
			window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "expected-actual") {
			this.summary = "The total number of images scraped is " + this.totalImgs + ".<br>";
			this.summary += "The images altogether have " + this.totalLikes + " likes.<br>";
			this.summary += "There were " + this.totalBrand + " logos detected in the scraped images.<br>";
			this.summary += "The total number of user comments from all images is " + this.totalComments + ".<br>";
		} else if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "comparison-report" || 
				   window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary.html") {
			this.summary = "Total number of images: " + this.totalImgs + "<br>";
			this.summary += "Total number of likes: " + this.totalLikes + "<br>";
			this.summary += "Total number of logos: " + this.totalBrand + "<br>";
			this.summary += "Total number of comments: " + this.totalComments + "<br>";
		}
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
	
	__getTotalComments(media) {
		var i, totalComments;
		
		totalComments = 0;
		
		for (i = 0; i < media.length; i ++) {
			totalComments += media[i].ig_object.edge_media_to_comment.count;
		}
		
		return totalComments;
	}

	__createUrl(){
		return "http://localhost:8080/smile/ig_processing_google?filter={'hashtag':'" + this.hashtag + "'}&filter={'ig_id':{'$in':" + JSON.stringify(this.mediaIdArr) + "}}&pagesize=1000&keys={'google':1}&keys={'ig_url':1}"
	}
}

window.customElements.define('my-basic', MyBasic);
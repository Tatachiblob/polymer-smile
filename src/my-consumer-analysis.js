import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@fooloomanzoo/datetime-picker/datetime-picker.js';
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import './shared-styles.js';
import './bootstrap-style.js';
import './my-basic';
import './my-linechart';
import './my-wordcloud';
import './my-genderchart';
import './my-histogram';
import './my-piechart';
import './my-barchart';
import './my-emotion';
import './my-modal';
import './my-map';

class MyDashboard extends PolymerElement {
	static get template() {
		return html`
		<style include="bootstrap-style"></style>
		<style include="shared-styles">
			:host {
				display: block;
				padding: 10px;
			}
		</style>
		
		<iron-ajax
			id="mediaAjax"
			url="{{ajaxUrl}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse"
			debounce-duration="300">
		</iron-ajax>
		
		<iron-ajax
			id="hashtagAjax"
			url="http://localhost:8080/smile/ig_media/_aggrs/group_hashtag"
			method="GET"
			handle-as="json"
			on-response="__handleHashtagResponse"
			debounce-duration="300">
		</iron-ajax>
		
		<div class="row">
			<div class="card col-11">
				<div class="row">
                    <div class="col-md-3">
                        <paper-dropdown-menu label="Select Hashtag" noink no-animations value={{hashtag}} vertical-offset="60">
                            <paper-listbox slot="dropdown-content" class="dropdown-content">
                                <dom-repeat items="[[availHashtags]]" as="hash">
                                    <template>
                                    <paper-item>[[hash._id]]</paper-item>
                                    </template>
                                </dom-repeat>
                            </paper-listbox>
                        </paper-dropdown-menu>
                    </div>
                    <div class="col-md-3" style="padding-top: 20px">
                        Start Time: <datetime-picker date="{{sDate}}" value="{{startDate}}" default="{{defaultStart}}"></datetime-picker>
                    </div>
                    <div class="col-md-3" style="padding-top: 20px">
                        End Time: <datetime-picker date="{{eDate}}" value="{{endDate}}" default="{{defaultEnd}}"></datetime-picker>
                    </div>
                    <div class="col-md-3">
                		<paper-button raised class="indigo col-3" on-click="__handleClick" style="margin-top: 20px">Set Date</paper-button>
                	</div>
                </div>
			</div>
		</div>
		
		<div class="row">
			<my-basic id="basicViews" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}}></my-basic>
		</div>
		<div class="row">
			<my-linechart id="linechart" class="col-md-6" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}} style="display:none"></my-linechart>
			<my-piechart id="piechart" class="col-md-6" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}} style="display:none"></my-piechart>
		</div>
		<div class="row">
		<my-genderchart id="gender" class="col-md-6" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}}></my-genderchart>
		<my-histogram id="age" class="col-md-6" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}}></my-histogram>
		</div>
		<my-barchart id="barchart" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}} style="display:none"></my-barchart>
		<my-emotion id="emo" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}}></my-emotion>
		<my-wordcloud id="wordcloud" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}}></my-wordcloud>
		
		<my-map id="googleMap" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}} style="display:none" onload=""></my-map>
		<my-modal id="mymodal" style="display:none"></my-modal>	
		
		<div class="card" id="generalSummary"></div>
		`;
	}
	
	ready() {
		super.ready();
		//this.__generateSummary();
		this.$.hashtagAjax.generateRequest();
		this.__createListeners();
	}
	
	static get properties(){
		return{
			hashtag: String,
			defaultStart: {
				type: Date,
				value: function(){
					//return new Date(new Date().getFullYear(), 0, 1);
					return new Date((new Date().getFullYear()-1), 0, 1);
				},
			},
			defaultEnd: {
				type: Date,
				value: function(){
					//return new Date(new Date().getFullYear(), 11, 31);
					return new Date((new Date().getFullYear()-1), 11, 31);
				},
			},
			startDate: Number,
			formattedStartDate: {
				type: Number,
				computed: '__dateFormatter(startDate)'
			},
			endDate: Number,
			formattedEndDate: {
				type: Number,
				computed: '__dateFormatter(endDate)'
			},
			ajaxUrl:{
				type: String,
				computed: '__createUrl(hashtag, formattedStartDate, formattedEndDate)'
			},
			mediaIdArr: {
				type: Array,
				value: function(){return [];}
			},
			availHashtags: Array,
            sDate: String,
            eDate: String,
			summary: String
		}
	}
	
	__handleResponse(event, res){
		this.mediaIdArr = [];
		res = res.response._embedded;
		for(let node of res)
			this.push('mediaIdArr', node.ig_object.id);
		
		//console.log("After: " + this.mediaIdArr.length);
		
		this.$.basicViews.setRawMediaData(res);
		this.$.barchart.setRawMediaData(res);
		
		this.__generateElementRequest();
	}
	
	__handleHashtagResponse(event, res){
		this.availHashtags = res.response._embedded;
	}
	
	//Add the generateRequest of the element.
	__generateElementRequest(){
		this.$.basicViews.generateGoogleRequest();
		this.$.linechart.generateLinechartRequest();
		this.$.wordcloud.generateWordcloudRequest();
		this.$.gender.generateGenderRequest();
		this.$.age.generateAgeRequest();
		this.$.piechart.generatePieRequest();
		this.$.barchart.generateBarRequest();
        this.$.emo.generateEmoRequest();
		this.$.googleMap.generateMapRequest();
		this.__generateSummary();
	}
	
	__generateSummary() {
		var basicViews = this.$.basicViews;
		var linechart = this.$.linechart;
		var barchart = this.$.barchart;
		var age = this.$.age;
		var gender = this.$.gender;
		var emo = this.$.emo;
		var generalSummary = this.$.generalSummary;
		
		var observer = new MutationObserver(function(mutations) {
		  //  if (basicViews.summary != undefined && linechart.summary != undefined && gender.summary != undefined && age.summary != undefined) {
		    //if (mutations.type == 'attributes') {
				//console.log(mutations);
				/*do {
				this.summary = basicViews.summary;
				this.summary += linechart.summary;
				this.summary += barchart.summary;
				this.summary += age.summary;
				this.summary += gender.summary;
				this.summary += emo.summary;
				} while ((this.summary).isNaN);*/
				//window.addEventListener('load', function() {
					
				console.log(basicViews.summary);
					this.summary = basicViews.summary;
					//this.summary += linechart.summary;
					//this.summary += barchart.summary;
					this.summary += age.summary;
					this.summary += gender.summary;
					this.summary += emo.summary;
					generalSummary.innerHTML = this.summary;
				//});
				/*setTimeout(function(){
					this.summary = basicViews.summary;
					//this.summary += linechart.summary;
					//this.summary += barchart.summary;
					this.summary += age.summary;
					this.summary += gender.summary;
					this.summary += emo.summary;
					generalSummary.innerHTML = this.summary;
				}, 5000);*/
				
				//console.log(this.summary);
			//	observer.disconnect();
			//}
		});

		observer.observe(document, {attributes: true, childList: true, characterData: true, subtree:true});
	}
	
	__generateSummaryV2(event) {
		console.log(event);
		event = event.detail;
		
		console.log(event.summary);
	}
	
	//Add the listeners of the element
	__createListeners(){
		this.$.basicViews.addEventListener('modal1', this.__listenModal.bind(this));
		this.$.basicViews.addEventListener('modal2', this.__listenModal2.bind(this));
		this.$.basicViews.addEventListener('summary', this.__generateSummaryV2.bind(this));
		this.$.linechart.addEventListener('modal1', this.__listenModal.bind(this));
		this.$.gender.addEventListener('modal1', this.__listenModal.bind(this));
		this.$.age.addEventListener('modal1', this.__listenModal.bind(this));
        this.$.emo.addEventListener('modal1', this.__listenModal.bind(this));
		this.$.wordcloud.addEventListener('modal1', this.__listenModal.bind(this));
		this.$.wordcloud.addEventListener('modal1', this.__listenModal.bind(this));
		
	}
	
	__listenModal(event){
		event = event.detail;
		//this.$.mymodal.callModal(detail.title, detail.imgs);
		this.$.mymodal.callModal(event.title, event.imgs);
	}
	
	__listenModal2(event){
		event = event.detail;
		//this.$.mymodal.callModal(detail.title, detail.imgs);
		this.$.mymodal.callModal2(event.title, event.imgs);
	}
	
	__handleClick(){
		/*
		console.log("Get Data button clicked!!");
		console.log("Start Date: " + this.formattedStartDate);
		console.log("End Date: " + this.formattedEndDate);
		*/
		this.$.mediaAjax.generateRequest();
	}
	
	__dateFormatter(date){
		//console.log((startDate - (startDate % 1000)) / 1000);
		return ((date - (date % 1000)) / 1000);
	}
	
	__createUrl(hashtag, startDate, endDate){
		return "http://localhost:8080/smile/ig_media?filter={'hashtag':'" + hashtag + "'}&filter={'ig_object.taken_at_timestamp':{'$gte':" + startDate + "}}&filter={'ig_object.taken_at_timestamp':{'$lte':" + endDate + "}}&keys={'ig_object.id':1}&keys={'ig_object.display_url':1}&keys={'ig_object.edge_liked_by':1}&keys={'ig_object.edge_media_to_comment':1}&pagesize=1000"
	}

}

window.customElements.define('my-dashboard', MyDashboard);
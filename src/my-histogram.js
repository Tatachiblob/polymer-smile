import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import 'highcharts/highcharts.js';
import 'highcharts/modules/histogram-bellcurve.js';
import './shared-styles.js';

class MyHistogram extends PolymerElement {
	static get template() {
		return html`
		<style include="shared-styles">
        :host {
			display: block;
			padding: 10px;
		}
		</style>
		
		<iron-ajax
			id="ageAjax"
			url="{{ajaxUrl}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse"
			debounce-duration="300">
		</iron-ajax>
		
		<div class="card">
			<div id="ageHistogram"></div>
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
			ageImgs: Array
		}
	}
	
	generateAgeRequest(){
		this.ajaxUrl = this.__createUrl();
		this.$.ageAjax.generateRequest();
	}
	
	__handleResponse(event, res){
		this.__renderHistogram(res.response._embedded);
	}
	
	__renderHistogram(data){
		data = this.__getAge(data);
		
		new Highcharts.chart(this.$.ageHistogram, {
			chart: {
				//height: 380,
			},
			title: {
				text: 'Age Facial Recognition Averages'
			},
			boost: {
				enabled: true,
				allowForce: true
			},
			xAxis: [{
				title: { text: 'No. of Images' },
				alignTicks: false
			}, {
				title: { text: 'Age' },
				alignTicks: false,
				opposite: true
			}],
			yAxis: [{
				title: { text: 'Age' }
			}, {
				title: { text: 'No. of Images' },
				opposite: true
			}],
			series: [{
				name: 'Frequency',
				type: 'histogram',
				xAxis: 1,
				yAxis: 1,
				baseSeries: 's1',
				zIndex: -1,
				point:{
					events: {
						click: function(e){
							let title = "";
							let p = e.point;
							//console.log(p);
							//console.log("x=" + p.x + "/y=" + p.x2);
							let result = this.ageImgs.filter(function(el){
								return p.x <= el.age && el.age <= p.x2;
							});
							
							result.sort(function(a, b) { 
								return a.age - b.age;
							});
							title = "Images of Age ranged from " + result[0].age + " to " + result[result.length - 1].age;
							this.__callModal(title, result.map(a => a.img));
						}.bind(this)
					}
				}
			}, {
				name: 'Data',
				type: 'scatter',
				data: data,
				id: 's1',
				visible: false,
				showInLegend: false, 
				marker: {
					radius: 1.5
				}
			}],
			plotOptions:{
				histogram: {
					binsNumber: 20
				}
			}
		});
	}
	
	__callModal(title, data){
		this.dispatchEvent(new CustomEvent('modal1', {detail: {title: title, imgs: data}}));
	}
	
	__getAge(igProcessing){
		let ages = [];
		let tempAgeImg = [];
		let a = {};
		for(let media of igProcessing){
			for(let faces of media.face){
				a = {};
				a.age = faces.faceAttributes.age;
				a.img = media.ig_url;
				ages.push(faces.faceAttributes.age);
				tempAgeImg.push(a);
			}
		}
		
		this.ageImgs = tempAgeImg;
		return ages;
	}
	
	__createUrl(){
		return "http://localhost:8080/smile/ig_processing_ms?filter={'hashtag':'" + this.hashtag + "'}&filter={'ig_id':{'$in':" + JSON.stringify(this.mediaIdArr) + "}}&pagesize=1000&keys={'face':1}&keys={'ig_url':1}"
	}
}

window.customElements.define('my-histogram', MyHistogram);
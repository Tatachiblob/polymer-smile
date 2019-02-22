import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import 'highcharts/highcharts.js';
import './shared-styles.js';
import './my-modal';

class MyGenderchart extends PolymerElement {
	static get template() {
		return html`
		<style include="shared-styles">
        :host {
			display: block;
			padding: 10px;
		}
		</style>
		
		<iron-ajax
			id="genderAjax"
			url="{{ajaxUrl}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse"
			debounce-duration="300">
		</iron-ajax>
		
		<div class="card">
			<div id="genderChart"></div>
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
			maleSrc: Array,
			femaleSrc: Array,
			summary: {
				type: String,
				notify: true
			}
		}
	}
	
	generateGenderRequest(){
		this.ajaxUrl = this.__createUrl();
		this.$.genderAjax.generateRequest();
	}
	
	__handleResponse(event, res){
		this.__renderGenderchart(res.response._embedded);
	}
	
	__renderGenderchart(data){
		let myChart = Highcharts.chart(this.$.genderChart, {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: 0,
				plotShadow: false,
			},
			boost:{
				enabled: true,
				allowForce: true
			},
			title: {
				text: 'Gender<br>Facial Recognition<br>',
				align: 'center',
				verticalAlign: 'middle',
				y: 40
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					dataLabels: {
						enabled: true,
						distance: -50,
						style: {
							fontWeight: 'bold',
							color: 'white'
						}
					},
					startAngle: -90,
					endAngle: 90,
					center: ['50%', '75%']//,
					//size: '110%'
				}
			},
			series:[{
				type: 'pie',
				name: 'Posts',
				innerSize: '50%',
				data: this.__genderFacialRecognition(data),
				cursor: 'pointer',
				point: {
					events: {
						click: function(e) {
							let p = e.point
							console.log('Category: '+ p.name +', value: '+ p.y);
							
							if(p.name == "Male"){
								this.__callModal("Images containing Males", this.maleSrc);
							}else if(p.name == "Female"){
								this.__callModal("Images containing Females", this.femaleSrc);
							}
							
						}.bind(this)
					}
				}
			}]
		});
		
		if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "consumer-analysis.html" || 
			window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "post-event.html" || 
			window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "expected-actual" || 
			window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary.html" || 
			window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "dashboard.html") {
			this.__createSummary(myChart);
		}
	}
	
	__callModal(month, data){
		this.dispatchEvent(new CustomEvent('modal1', {detail: {title: month, imgs: data}}));
	}
	
	__genderFacialRecognition(igProcessingData){
		let male = 0;
		let female = 0;
		
		let maleFace = [];
		let femaleFace = [];
		
		for(let node of igProcessingData){
			let faceArr = node.face;
			for(let face of faceArr){
				if(face.faceAttributes.gender == "male"){
					if(maleFace.indexOf(node.ig_url) === -1)
						maleFace.push(node.ig_url);
					male++;
				}else{
					if(femaleFace.indexOf(node.ig_url) === -1)
						femaleFace.push(node.ig_url);
					female++;
				}
			}
		}
		this.maleSrc = maleFace;
		this.femaleSrc = femaleFace;
		var result = [['Male', male],['',0],['',0],['',0],['',0],['Female', female]];
		
		//console.log("Male: " + male);
		//console.log("Female: " + female);
		return result;
	}
	
	__createSummary(chart) {
		var i, j, chartGenderData, gender, temp;
		
		chartGenderData = chart.series[0].data;
		gender = [];
		temp = {};
		
		for (i = 0; i < chartGenderData.length; i ++) {
			if (chartGenderData[i].name != "") {
				temp.firstCol = (chartGenderData[i].name + "s");
				temp.secondCol = Math.round(chartGenderData[i].percentage);
				gender.push(temp);
				temp = {};
			}
		}
		
		for (i = 0; i < gender.length; i ++) {
			for (j = i; j < gender.length; j ++) {
				if (gender[i].secondCol < gender[j].secondCol) {
					gender.splice(i, 0, gender.splice(j, 1)[0]);
				}
			}
			gender[i].secondCol += "%";
		}
		
		this.summary = gender;
		//console.log(this.summary);
	}
	
	__createUrl(){
		return "http://localhost:8080/smile/ig_processing_ms?filter={'hashtag':'" + this.hashtag + "'}&filter={'ig_id':{'$in':" + JSON.stringify(this.mediaIdArr) + "}}&pagesize=1000&keys={'face':1}&keys={'ig_url':1}";
	}
	
}

window.customElements.define('my-genderchart', MyGenderchart);
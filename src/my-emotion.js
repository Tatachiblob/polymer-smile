import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import 'highcharts/highcharts.js';
import './shared-styles.js';

class MyEmotion extends PolymerElement {
	static get template() {
		return html`
		<style include="shared-styles">
        :host {
			display: block;
			padding: 10px;
		}
		</style>
		
		<iron-ajax
			id="emoAjax"
			url="{{ajaxUrl}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse"
			debounce-duration="300">
		</iron-ajax>
		
		<div class="card">
			<div id="emotionChart"></div>
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
			emotionImageIDs: Object
		}
	}
	
	generateEmoRequest(){
		this.ajaxUrl = this.__createUrl();
		this.$.emoAjax.generateRequest();
	}
	
	__handleResponse(event, res){
		this.__renderEmoChart(res.response._embedded);
	}
	
	__renderEmoChart(data){
		let emotionData = this.__calcEmotion(data);
		
		Highcharts.chart(this.$.emotionChart, {
			chart: {type: 'bar'},
			title: {text: 'Facial Emotion Recognition'},
			xAxis: {
				categories: ['Joy', 'Surprise', 'Neutral', 'Sadness', 'Fear', 'Disgust', 'Contempt', 'Anger'],
				title: {
					text: null
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Percentage (%)',
					align: 'high'
				},
				labels: {overflow: 'justify'}
			},
			tooltip: {valueSuffix: ' %'},
			plotOptions: {
				bar: {
					dataLabels: {enabled: true}
				},
				series: {colorByPoint: true}
			},
			colors: ['#A0BE4A', '#A0BE4A', '#A0BE4A', '#6FA6DF', '#FCCC65', '#FCCC65', '#FCAE48', '#FA8452'],
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				x: -40,
				y: 80,
				floating: true,
				borderWidth: 1,
				backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
				shadow: true
			},
			credits: {enabled: false},
			series: [{
				name: "Emotion",
				showInLegend: false,
				data: [ emotionData.happiness,
                        emotionData.surprise,
                        emotionData.neutral,
                        emotionData.sadness,
                        emotionData.fear,
                        emotionData.disgust,
                        emotionData.contempt,
                        emotionData.anger ],
				point:{
					events: {
						click: function(e){
							let p = e.point;
							if(p.category == "Joy")
								p.category = "happiness";
							//console.log(this.emotionImageIDs[p.category.toLowerCase()]);
							this.__callModal("Images with emotion of " + p.category, this.emotionImageIDs[p.category.toLowerCase()]);
						}.bind(this)
					}
				}
			}]
		});
	}
	
	__callModal(title, data){
		this.dispatchEvent(new CustomEvent('modal1', {detail: {title: title, imgs: data}}));
	}
	
	__calcEmotion(ig){
		let emotionImageIDs = {
			"anger": [],
			"contempt": [],
			"disgust": [],
			"fear": [],
			"happiness": [],
			"neutral": [],
			"sadness": [],
			"surprise": []
		};
		let totalFaces = 0;
		let totalEmotion = {
			"anger": 0,
			"contempt": 0,
			"disgust": 0,
			"fear": 0,
			"happiness": 0,
			"neutral": 0,
			"sadness": 0,
			"surprise": 0
		};

		for(let picture of ig){
			let msFace = picture.face;
			let bool = true;
			for(let face of msFace){
				let emotion = face.faceAttributes.emotion;
				totalFaces++;
				totalEmotion.anger += emotion.anger;
				totalEmotion.contempt += emotion.contempt;
				totalEmotion.disgust += emotion.disgust;
				totalEmotion.fear += emotion.fear;
				totalEmotion.happiness += emotion.happiness;
				totalEmotion.neutral += emotion.neutral;
				totalEmotion.sadness += emotion.sadness;
				totalEmotion.surprise += emotion.surprise;
				
				if (bool) {
					for (let emo in emotion) {
						if (emotion[emo] != 0) {
							emotionImageIDs[emo].push(picture.ig_url);
						}
					}
					bool = false;
				}
			}
		}
		
		//console.log(emotionImageIDs);

		//console.log("Before Calc");
		//console.log(totalEmotion);

		totalEmotion.anger = (totalEmotion.anger / totalFaces) * 100;
		totalEmotion.contempt = (totalEmotion.contempt / totalFaces) * 100;
		totalEmotion.disgust = (totalEmotion.disgust / totalFaces) * 100;
		totalEmotion.fear = (totalEmotion.fear / totalFaces) * 100;
		totalEmotion.happiness = (totalEmotion.happiness / totalFaces) * 100;
		totalEmotion.neutral = (totalEmotion.neutral / totalFaces) * 100;
		totalEmotion.sadness = (totalEmotion.sadness / totalFaces) * 100;
		totalEmotion.surprise = (totalEmotion.surprise / totalFaces) * 100;

		//Math.round(num * 100) / 100
		
		totalEmotion.anger = Math.round(totalEmotion.anger * 100) / 100;
		totalEmotion.contempt = Math.round(totalEmotion.contemp * 100) / 100;
		totalEmotion.disgust = Math.round(totalEmotion.disgust * 100) / 100;
		totalEmotion.fear = Math.round(totalEmotion.fear * 100) / 100;
		totalEmotion.happiness = Math.round(totalEmotion.happiness * 100) / 100;
		totalEmotion.neutral = Math.round(totalEmotion.neutral * 100) / 100;
		totalEmotion.sadness = Math.round(totalEmotion.sadness * 100) / 100;
		totalEmotion.surprise = Math.round(totalEmotion.surprise * 100) / 100;
		
		//console.log("After calc");
		//console.log(totalEmotion);

		//console.log("Total faces: " + totalFaces);
		this.emotionImageIDs = emotionImageIDs;
		return totalEmotion;
	}
	
	__createUrl(){
		return "http://localhost:8080/smile/ig_processing_ms?filter={'hashtag':'" + this.hashtag + "'}&filter={'ig_id':{'$in':" + JSON.stringify(this.mediaIdArr) + "}}&pagesize=1000&keys={'face':1}&keys={'ig_url':1}"
	}
}

window.customElements.define('my-emotion', MyEmotion);
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import 'highcharts/highcharts.js';
import './shared-styles.js';

class MyLinechart extends PolymerElement {
	static get template() {
		return html`
		<style include="shared-styles">
			:host {
				display: block;
				padding: 10px;
			}
		</style>
		
		<iron-ajax
			id="lineAjax"
			url="{{ajaxUrl}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse"
			debounce-duration="300">
		</iron-ajax>
		
		<div class="card">
			<div id="lineTrend"></div>
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
			modalTitle: String,
			imgLinks: Array,
			summary: {
				type: Array,
				notify: true
			}
		}
	}
	
	generateLinechartRequest(){
		//console.log("Generating Request my-linechart");
		this.ajaxUrl = this.__createUrl();
		//console.log(this.ajaxUrl);
		this.$.lineAjax.generateRequest();
	}
	
	__handleResponse(event, res){
		this.__renderLinechart(res.response._embedded);
	}
	
	__renderLinechart(data){
		let myChart = Highcharts.chart(this.$.lineTrend, {
			chart: {
				scrollablePlotArea: {
					minWidth: 400
				},
				height: 400
			},
			title: {
				text: 'Instagram Images Volume Trend Per Month'
			},
			boost: {
				enabled: true,
				allowForce: true
			},
			subtitle: {
				text: 'for the hashtag #' + this.hashtag
			},
			
			xAxis: {
				categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			},
			
			yAxis: [{ // left y axis
				title: {
					text: null
				},
				labels: {
					align: 'left',
					x: 3,
					y: 16,
					format: '{value:.,0f}'
				},
				showFirstLabel: false
			}, 
			{ // right y axis
				linkedTo: 0,
				gridLineWidth: 0,
				opposite: true,
				title: {
					text: null
				},
				labels: {
					align: 'right',
					x: -3,
					y: 16,
					format: '{value:.,0f}'
				},
				showFirstLabel: false
			}],
			
			legend: {
				align: 'left',
				verticalAlign: 'top',
				borderWidth: 0
			},

			tooltip: {
				shared: true,
				crosshairs: true
			},
			
			plotOptions: {
				series: {
					cursor: 'pointer',
					point: {
						events: {
							click: function(e) {
								//console.log(imgLinks[this.series.name.toString() + " " + this.x]);
								let p = e.point
								this.__callModal("Temporary Line Chart", this.imgLinks[p.series.name.toString() + " " + p.x]);
							}.bind(this)
						}
					},
					marker: {
						lineWidth: 1
					}
				}
			},
			//series:[{}]
			series: this.__getTotalNoOfPosts(data)
		});
		//myChart.series[0].setData(this.__getTotalNoOfPosts(data));
		
		if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "engagement-report" || 
			window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary.html" ||
			window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "dashboard.html") {
			this.__createSummary(myChart);
		}
	}
	
	__callModal(month, data){
		this.dispatchEvent(new CustomEvent('modal1', {detail: {title: month, imgs: data}}));
	}
	
	__getTotalNoOfPosts(igMediaData){
		let theseries = [];
		let yearsArr = [];
		this.imgLinks = [];
		//console.log(igMediaData);
		for(let node of igMediaData){
			//console.log(node);
			var searchArr = node.searched_date;
			var nodesArr = [];
			//nodesArr = node.nodes;
			//for(let imgnode of nodesArr){
			let imgnode = node;
			var date = new Date(imgnode.ig_object.taken_at_timestamp * 1000);
			var year = date.getFullYear().toString();
			var month = date.getMonth();
			
			if(yearsArr.includes(year)){
				for(let i = 0; i < theseries.length;i++){
					if(theseries[i].name == year){
						if(this.imgLinks[year + " " + month] == undefined){
							this.imgLinks[year + " " + month] = [];
							this.imgLinks[year + " " + month].push(imgnode.ig_object.display_url);
						}
						else{
							this.imgLinks[year + " " + month].push(imgnode.ig_object.display_url);
						}
						theseries[i].data[month] += 1;
						break;
					}
				}
			}//if
			else{
				var toPush = {};
				toPush.data = [0,0,0,0,0,0,0,0,0,0,0,0];
				toPush.name = year;
				theseries.push(toPush);
				yearsArr.push(year);
				this.imgLinks[year] = []
				for(let i = 0; i < theseries.length;i++){
					if(theseries[i].name == year){
						if(this.imgLinks[year + " " + month] == undefined){
							this.imgLinks[year + " " + month] = [];
							this.imgLinks[year + " " + month].push(imgnode.ig_object.display_url);
						}
						else{
							this.imgLinks[year + " " + month].push(imgnode.ig_object.display_url);
						}
						theseries[i].data[month] += 1;
						break;
					}
				}	
			}//else
		}//for
		console.log(theseries);
		return theseries;
	}
	
	__createSummary(chart) {
		var i, j, calendarProcessing, calendar, temp;
		
		calendarProcessing = chart.series[0].data;
		calendar = [];
		temp = {};
		
		for (i = 0; i < calendarProcessing.length; i ++) {
			temp.firstCol = (calendarProcessing[i].category + " " + chart.series[0].name);
			temp.secondCol = calendarProcessing[i].y;
			calendar.push(temp);
			temp = {};
		}
		
		var max;
		
		for (i = 0; i < calendar.length; i ++) {
			for (j = i; j < calendar.length; j ++) {
				if (calendar[i].secondCol < calendar[j].secondCol) {
					calendar.splice(i, 0, calendar.splice(j, 1)[0]);
				}
			}
			if (calendar[i].secondCol == 1) {
				calendar[i].secondCol += " image";
			} else {
				calendar[i].secondCol += " images";
			}
		}
		
		this.summary = calendar;
		//console.log(this.summary);
	}
	
	__createUrl(){
		return "http://localhost:8080/smile/ig_media?filter={'hashtag':'" + this.hashtag + "'}&filter={'ig_object.id':{'$in':" + JSON.stringify(this.mediaIdArr) + "}}&keys={'ig_object.taken_at_timestamp':1}&keys={'ig_object.display_url':1}&pagesize=1000";
	}
}

window.customElements.define('my-linechart', MyLinechart);
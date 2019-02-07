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
			summary: String
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
				height: 400,
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
			//Images Posted Heat Map lays out the number of posts made each day, and the most posts were on 2018-10-13 and 2018-10-14 
			//with 16 and 9 images posted respectively.
			
			console.log(chart.series);
			console.log();

			var i, calendarProcessing, calendarArray, currMax, indices, calendar;
			
			calendarArray = chart.series[0].yData;
			indices = [];
			//calendar = "<b>Instagram Images Volume Trend</b> compares the number of posts made each year per month, and the most posts were on ";
			calendarProcessing = chart.series[0].data;
			/*
			for (i = 0; i < calendarProcessing.length; i ++) {
				calendarArray.push(calendarProcessing[i][1]);
			}
			*/
			for (i = 1; i <= 3; i ++) {
				currMax = calendarArray.indexOf(Math.max(...calendarArray));
				indices.push(currMax);
				calendarArray[currMax] = -1;
			}
			//console.log(calendarProcessing[indices[0]]);
			//sessionStorage.setItem("linechartDate", (calendarProcessing[indices[0]].category + " " + chart.series[0].name));
			//sessionStorage.setItem("linechartValue", calendarProcessing[indices[0]].y);
			//calendar += calendarProcessing[indices[0]].category + " " + chart.series[0].name + " and " + calendarProcessing[indices[1]].category + " " + chart.series[0].name + " with " + calendarProcessing[indices[0]].y + " and " + calendarProcessing[indices[1]].y + " images posted respectively.";

			calendar = "<b>Volume Trend</b><br><table class='table'><thead><tr><th>Month</th><th>No. of Images</th></tr></thead><tbody><tr><td>" + calendarProcessing[indices[0]].category + " " + chart.series[0].name + "</td><td>" + calendarProcessing[indices[0]].y  + "</td></tr>";
			calendar += "<tr><td>" + calendarProcessing[indices[1]].category + " " + chart.series[0].name + "</td><td>" + calendarProcessing[indices[1]].y  + "</td></tr>";
			calendar += "<tr><td>" + calendarProcessing[indices[2]].category + " " + chart.series[0].name + "</td><td>" + calendarProcessing[indices[2]].y  + "</td></tr></tbody></table>";

			//console.log(sessionStorage.getItem("linechartDate"));
			//console.log(sessionStorage.getItem("linechartValue"));
			/*try {
				document.getElementById("linechart").innerHTML = calendar;
			} catch (e) {}*/
			
			this.summary = calendar;
			//this.$.sum.innerHTML = this.summary;
			console.log(this.summary);
	}
	
	__getSummary() {
		return this.summary;
	}
	
	__createUrl(){
		return "http://localhost:8080/smile/ig_media?filter={'hashtag':'" + this.hashtag + "'}&filter={'ig_object.id':{'$in':" + JSON.stringify(this.mediaIdArr) + "}}&keys={'ig_object.taken_at_timestamp':1}&keys={'ig_object.display_url':1}&pagesize=1000";
	}
}

window.customElements.define('my-linechart', MyLinechart);
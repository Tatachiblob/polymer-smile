import { getIGMedia } from './dataRetrieve.js';

var processing = {};
var monthlyArr = [0,0,0,0,0,0,0,0,0,0,0,0];
var year = 2018
var startMonth = 1 // this month minus 8 months
$(document).ready(function(){
	
	
	processing = getIGMedia(sessionStorage.getItem("hashtagInput"));
	console.log(processing);
	
	Highcharts.chart('line-chart', {

		title: {
			text: 'Dataset Trend ' + year
		},

		subtitle: {
			text: 'Number of posts in Instagram for the past months'
		},

		xAxis: {
			title: {
				text: 'Month'
			}
		},

		yAxis: {
			title: {
				text: 'Number of Posts'
			}
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle'
		},

		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
				pointStart: 1
			}
		},

		series: [{
			name: '#AnimoLasalle',
			data: getTotalNoOfPosts(processing)
		}/*, {
		 name: 'Manufacturing',
		 data: [2491, 2406, 2974, 2985, 3249, 3028, 3812, 4043]
		 }, {
		 name: 'Sales & Distribution',
		 data: [1174, 1772, 1605, 1977, 2085, 2477, 3217, 3987]
		 }, {
		 name: 'Project Development',
		 data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
		 }, {
		 name: 'Other',
		 data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
		 }*/],

		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					}
				}
			}]
		}

	});

});

function getTotalNoOfPosts(igMediaData){
	console.log(igMediaData);
	
	for(let node of igMediaData.search_history){
		var searchArr = node.searched_date;
		var date = new Date(searchArr * 1000);
		//startMonth = (date.getMonth() + 1) - 8;
		var nodesArr = [];
		nodesArr = node.nodes;
		for(let imgnode of nodesArr){
			var date = new Date(imgnode.taken_at_timestamp * 1000);
			monthlyArr[date.getMonth()] += 1;
		}
		console.log("FINAL COUNT?: " + monthlyArr);
	
	}
	return monthlyArr;
}
	
	
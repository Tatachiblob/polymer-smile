import { 
	getIGMedia, 
	getIGMedia2, 
	getHashtag, 
	getHashtag2 
} from './mapper.js';

var processing = {};
var theseries = [];
var yearsArr = [];
var theCategories = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var imgLinks = [];

var date ;
var year;
var month;
var chart;
var name = "";
var hashtag;

$(document).ready(function(){
	hashtag = getHashtag();
    processing = getIGMedia();
    //console.log(processing);
	initializeLineChart(name, hashtag);
	comparisonReport(name);
	
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "comparison-report") {
		hashtag = getHashtag2();
		processing = getIGMedia2();
		name += 2;
		initializeLineChart(name, hashtag);
		comparisonReport(name);
	}
	
	//only returns two months of 2018 as of now
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "engagement-report" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary") {
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
		try {
			document.getElementById("linechart").innerHTML = calendar;
    	} catch (e) {}
	}
});

function comparisonReport(name) {
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "comparison-report") {
		var i, calendarProcessing, calendarArray, currMax, indices, calendar;
		
		calendarArray = chart.series[0].yData;
		indices = [];
		calendar = "Most posts were on:<ul>";
		calendarProcessing = chart.series[0].data;
		
		for (i = 1; i <= 2; i ++) {
			currMax = calendarArray.indexOf(Math.max(...calendarArray));
			indices.push(currMax);
			calendarArray[currMax] = -1;
		}
		
		calendar += "<li>" + calendarProcessing[indices[0]].category + " " + chart.series[0].name + "</li>"; 
		calendar += "<li>" + calendarProcessing[indices[1]].category + " " + chart.series[0].name + "</li> ";
		
		document.getElementById("linechart" + name).innerHTML = calendar + "</ul>";
	}
}
function initializeLineChart(name, hashtag) {
	chart = Highcharts.chart('line-chart' + name, {

		chart: {
			scrollablePlotArea: {
				minWidth: 400
			},
			height: 400,
		},

		/* data: {
		 csvURL: 'https://cdn.rawgit.com/highcharts/highcharts/' +
		 '057b672172ccc6c08fe7dbb27fc17ebca3f5b770/samples/data/analytics.csv',
		 beforeParse: function (csv) {
		 return csv.replace(/\n\n/g, '\n');
		 }
		 }, */

		title: {
			text: 'Instagram Images Volume Trend Per Month'
		},
		boost: {
			enabled: true,
			allowForce: true
		},

		subtitle: {
			text: 'for the hashtag #' + hashtag
		},

		xAxis: {
			categories: theCategories
			/* tickInterval: 7 * 24 * 3600 * 1000, // one week
			 tickWidth: 0,
			 gridLineWidth: 1,
			 labels: {
			 align: 'left',
			 x: 3,
			 y: -3
			 } */
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
		}, { // right y axis
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
					click: function() {
						var theArray = imgLinks[this.series.name.toString() + " " + this.x];
						//alert ('Category: '+ this.name +', value: '+ this.y);
						var images = '<div class="row">';
						for (var i = 0; i < theArray.length; i ++) {
							images += '<div class="col-sm-2 padding-10"><img src="' + theArray[i] + '" height="90" width="90"></div>';
							if ((i + 1) % 6 == 0) {
								images += '</div><div class="row">';
							}
						}
						document.getElementById("title").innerHTML = this.series.name + " " + theCategories[this.x] + " pictures";
						document.getElementById("pics").innerHTML = images + '</div>';
						$('#myModal').modal('show');
					}
				}
				},
				marker: {
					lineWidth: 1
				}
			}
		},

		/*
		series: [{
			name: '2018 Images',
			data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
			links: [""]
		},{
			name: '2017 Images',
			data: [17.0, 16.9, 19.5, 140.5, 108.4, 11.5, 15.2, 16.5, 13.3, 10.3, 10.9, 19.6]
		}
		*/

		series: getTotalNoOfPosts(processing)
	});
}

function getTotalNoOfPosts(igMediaData){
	//console.log(igMediaData);
	for(let node of igMediaData){
		var searchArr = node.searched_date;
		var nodesArr = [];
		//nodesArr = node.nodes;
		//for(let imgnode of nodesArr){
		let imgnode = node;
			date = new Date(imgnode.ig_object.taken_at_timestamp * 1000);
			year = date.getFullYear().toString();
			month = date.getMonth();

			//console.log("YEAR " + year + " MONTH " + month);

			if(yearsArr.includes(year)){
				for(let i = 0; i < theseries.length;i++){
					if(theseries[i].name == year){
						if(imgLinks[year + " " + month] == undefined){
							imgLinks[year + " " + month] = [];
							imgLinks[year + " " + month].push(imgnode.ig_object.display_url);
						}
						else{
							imgLinks[year + " " + month].push(imgnode.ig_object.display_url);
						}
						theseries[i].data[month] += 1;
						break;
					}
				}
			}
			else{
				var toPush = {};
				toPush.data = [0,0,0,0,0,0,0,0,0,0,0,0];
				toPush.name = year;
				theseries.push(toPush);
				yearsArr.push(year);
				imgLinks[year] = []

				for(let i = 0; i < theseries.length;i++){
					if(theseries[i].name == year){
						if(imgLinks[year + " " + month] == undefined){
							imgLinks[year + " " + month] = [];
							imgLinks[year + " " + month].push(imgnode.ig_object.display_url);
						}
						else{
							imgLinks[year + " " + month].push(imgnode.ig_object.display_url);
						}
						theseries[i].data[month] += 1;
						break;
					}
				}
			}

		//}


	}
	return theseries;
}

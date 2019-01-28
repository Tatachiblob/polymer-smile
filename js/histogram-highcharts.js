import { 
	getEmotionImages, 
	getIGProcessingMS
 } from './mapper.js';

var ageIDs = [];
	
$(document).ready(function(){

	var ageProcessing = getIGProcessingMS();
	//console.log(ageProcessing);
	// ages
	var data = getAge(ageProcessing);
	
	var chart = Highcharts.chart('histogram', {
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
			name: 'Histogram',
			type: 'histogram',
			xAxis: 1,
			yAxis: 1,
			baseSeries: 's1',
			zIndex: -1,
			point:{
				events:{
					click: function(e) {
						var filteredAgesArray = [];
						var i;
						
						for (i = 0; i < data.length; i ++) {
							if (this.x <= data[i] && data[i] <= this.x2) {
								filteredAgesArray.push(ageIDs[i]);
							}
						}
						
						var imagesArray = getEmotionImages(filteredAgesArray);
						
						var images = '<div class="row">';
						
						for (i = 0; i < imagesArray.length; i ++) {
							images += '<div class="col-md-2 col-xs-4 col-sm-4 padding-10"><img src="' + imagesArray[i] + '" height="90" width="90"></div>';
							
							if ((i + 1) % 6 == 0) {
								images += '</div><div class="row">';
							}
						}
						
						document.getElementById("title").innerHTML = "Ages Images";
						document.getElementById("pics").innerHTML = images + '</div>';
						$('#myModal').modal('show');
					}
				}
			}
		}, {
			name: 'Data',
			type: 'scatter',
			data: data,
			id: 's1',
			marker: {
				radius: 1.5
			}
		}]
	});
	
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "consumer-analysis" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "post-event" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "expected-actual" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary") {
		var currMax, indexOfMax, x, x2, i, numOfImages, ageRanges, xArray, x2Array;
		
		xArray = [];
		x2Array = [];
		numOfImages = chart.series[0].yData;
		
		//ageRanges = "<b>Age Facial Recognition Histogram</b> shows that users usually post images with ages ranging from ";
		ageRanges = "<b>Age Facial Recognition Histogram</b><br><table class='table'><thead><tr><th>Age range</th></tr></thead><tbody>";
		
		for (i = 1; i <= 3; i ++) {
			currMax = Math.max(...numOfImages);
			indexOfMax = numOfImages.indexOf(currMax);
			numOfImages[indexOfMax] = 0;
			
			x = Math.floor(chart.series[0].data[indexOfMax].x);
			x2 = Math.floor(chart.series[0].data[indexOfMax].x2);
			
			xArray.push(x);
			x2Array.push(x2);
		}
		
		xArray.sort();
		x2Array.sort();
		
		for (i = 0; i < xArray.length; i ++) {
			/*if (i === 0) {
				sessionStorage.setItem("ageRange", (xArray[i] + " - " + x2Array[i]));
			}*/
			ageRanges += "<tr><td>" + xArray[i] + " - " + x2Array[i] + "</td></tr>";
		}
		ageRanges += "</tbody></table>";
		
		/*
		for (i = 0; i < xArray.length; i ++) {
			//17-23, 23-28, and 28-34
			switch (i) {
				case xArray.length - 1: 
					ageRanges += "and " + xArray[i] + "-" + x2Array[i] + "."; 
					break;
				default: 
					ageRanges += xArray[i] + "-" + x2Array[i] + ", ";
			}	
		}
		*/
		//console.log(sessionStorage.getItem("ageRange"));
		try {
			document.getElementById("age-range").innerHTML = ageRanges;
        } catch (e) {}
	}
});

function getAge(igProcessing){
	var ages = [];
	for(let media of igProcessing){
		for(let faces of media.face){
			ages.push(faces.faceAttributes.age);
			ageIDs.push(media.ig_id);
		}
	}
	return ages;
}


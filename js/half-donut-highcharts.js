import { getIGProcessingMS } from './mapper.js';

var processing = {};
var maleFace = [];
var femaleFace = [];

$(document).ready(function(){
	processing = getIGProcessingMS();
	//console.log(processing);
	
	var chart = Highcharts.chart('half-donut-chart', {
        chart: {
            plotBackgroundColor: null,
			plotBorderWidth: 0,
			plotShadow: false,
            // spacingBottom: 20,
            // height: 400,
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
		series: [{
			type: 'pie',
			name: 'Posts',
			innerSize: '50%',
			data: genderFacialRecognition(processing),
			cursor: 'pointer',
			point: {
				events: {
					click: function() {
						//alert ('Category: '+ this.name +', value: '+ this.y);
						var images = '<div class="row">';
						if(this.name == 'Male'){
							for (var i = 0; i < maleFace.length; i ++) {
								images += '<div class="col-sm-2 padding-10"><img src="' + maleFace[i] + '" height="90" width="90"></div>';
								if ((i + 1) % 6 == 0) {
									images += '</div><div class="row">';
								}
							}
						}
						else if(this.name == 'Female'){
							for (var i = 0; i < femaleFace.length; i ++) {
								images += '<div class="col-sm-2 padding-10"><img src="' + femaleFace[i] + '" height="90" width="90"></div>';
								if ((i + 1) % 6 == 0) {
									images += '</div><div class="row">';
								}
							}
						}
						document.getElementById("title").innerHTML = this.name + " Gender Images";
						document.getElementById("pics").innerHTML = images + '</div>';
						$('#myModal').modal('show');
					}
				}
			}
		}]
	});
	
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "consumer-analysis" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "post-event" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "expected-actual" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary") {
		var i, j, genderArray, gender, percentage, percentageArray, chartGenderData;
		
		genderArray = [];
		percentageArray = [];
		chartGenderData = chart.series[0].data;
		
		percentage = "";
		//gender = "<b>Gender Facial Recognition</b> tells that the images show ";
		gender = "<b>Gender Facial Recognition</b><br><table class='table'><thead><tr><th>Gender</th><th>Percentage</th></tr></thead><tbody>";
		
		for (i = 0; i < chartGenderData.length; i ++) {
			//genderArray.push(chartGenderData[i].name);
			if (chartGenderData[i].name != "") {
				//gender += chartGenderData[i].name.toLowerCase + "s"
				percentageArray.push(chartGenderData[i].percentage);
			}
		}
		
		percentageArray.sort(function(a,b){return b-a;});
		
		for (i = 0; i < percentageArray.length; i ++) {
			for (j = 0; j < chartGenderData.length; j ++) {
				if (chartGenderData[j].percentage == percentageArray[i]) {
					genderArray.push((chartGenderData[j].name).toLowerCase() + "s");
				}
			}
		}
		
		/*
		genderArray.push("gays");
		percentageArray.push(9);
		genderArray.push("lesbians");
		percentageArray.push(5);
		*/

		for (i = 0; i < percentageArray.length; i ++) {
			percentageArray[i] = Math.round(percentageArray[i]);
		}
		
		for (i = 0; i < genderArray.length; i ++) {
			/*if (i === 0) {
				sessionStorage.setItem("genderName", genderArray[i]);
				sessionStorage.setItem("genderValue", percentageArray[i]);
			}*/
			gender += "<tr><td>" + genderArray[i] + "</td><td>" + percentageArray[i] + "</td></tr>";
		}
		gender += "</tbody></table>";
		//console.log(gender);
        //console.log(sessionStorage.getItem("genderName"));
        //console.log(sessionStorage.getItem("genderValue"));
		/*
		gender += genderArray[0] + " more frequently than ";
		
		if (genderArray.length == 2) {
			gender += genderArray[1] + " with a percentage of " + percentageArray[0] + "% over " + percentageArray[1] + "%.";
		} else if (genderArray.length == 3) {
			gender += genderArray[1] + " and " + genderArray[2] + " with a percentage of " + percentageArray[0] + "% over " + percentageArray[1] + "% and " + percentageArray[2] + "%.";
		} else {
			for (i = 1; i < genderArray.length; i ++) {
				if (genderArray.length - 1 == i) {
					gender += "and " + genderArray[i];
				} else {
					gender += genderArray[i] + ", ";
				}
			}
			
			gender += " with a percentage of " + percentageArray[0] + "% over ";
			
			for (i = 1; i < percentageArray.length; i ++) {
				if (genderArray.length - 1 == i) {
					gender += "and " + percentageArray[i] + "% respectively."
				} else {
					gender += percentageArray[i] + "%, ";
				}
			}
		}
		*/
		try {
            document.getElementById("gender").innerHTML = gender;
		} catch (e) {}
	}
});

function genderFacialRecognition(igProcessingData){
	//console.log(igProcessingData);
	var male = 0;
	var female = 0;
	
	for(let node of igProcessingData){
		var faceArr = node.face;
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
	
	var result = [['Male', male],['',0],['',0],['',0],['',0],['Female', female]];
	
	//console.log("Male: " + male);
	//console.log("Female: " + female);
	return result;
}
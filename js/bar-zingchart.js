import { getLikesArray, getLikesArray2 } from './mapper.js';
import { getCategoryImages } from './mapper.js';
var likesArray = getLikesArray();
//console.log(likesArray);

zingchart.THEME="classic";
var initState = null; // Used later to store the chart state before changing the data
var store = { // Data store --> replace this with data dump of ms api & google api (e.g. under activity category there are sports, volleyball, tournament, etc.)
    ie:[["v11.0",24.1],["v8.0",17.2],["v9.0",8.1],["v10.0",5.3],["v6.0",1.1],["v7.0",0.5]],
    chrome:[["v40.0",4.8],["v41.0",4.3],["v42.0",3.7],["v39.0",3.0],["v36.0",2.5],["v43.0",1.4],["v31.0",1.2],["v35.0",0.8],["v38.0",0.6],["v32.0",0.6],["v37.0",0.4],["v33.0",0.2],["v34.0",0.1],["v30.0",0.1]],
    firefox:[["v35",2.8],["v36",2.3],["v37",2.3],["v34",1.3],["v38",1.0],["v31",0.3],["v33",0.2],["v32",0.1]],
    safari:[["v8.0",2.6],["v7.1",0.8],["v5.1",0.4],["v5.0",0.3],["v6.1",0.3],["v7.0",0.3],["v6.2",0.2]],
    opera:[["v12.x",0.25],["v28",0.2],["v27",0.15],["v29",0.1]]
};
var bgColors = ["#1976d2","#424242","#388e3c","#ffa000","#7b1fa2","#c2185b","#e4d354","#2b908f"]; // ie, chrome, ff, safari, opera, unknown
var barConfig;

function initializebarConfig() {
	barConfig = {
		"globals": {
			"font-family": "verdana"
		},
		"type": "bar",
		"background-color": "white",
		"title": {
			"font-color": "#333333",
			"font-weight": "normal",
			"background-color": "white",
			"text": "Image Categories and Their Number of Likes",
			"font-size":18
		},
		"subtitle": {
			"color": "#606060",
			"text": "Click the columns to view labels and tags",
			"font-weight": "normal",
			"font-size":13
		},
		"scale-y": {
			"label":{
				"text":"Percentage of Likes",
				"color":"#555",
				"font-weight":"none",
				"font-size":16
			},
			"line-color": "none",
			"tick": {
				"line-color": "none"
			},
			"guide": {
				"line-style": "solid"
			},
			"item": {
				"color": "#606060"
			}
		},
		"scale-x": {
			"values": [
				"Friends",
				"Selfies",
				"Gadget",
				"Food",
				"Pet",
				"Fashion",
				"Scene/Activity",
				"Others"
			],
			"line-color": "#C0D0E0",
			"line-width": 1,
			"tick": {
				"line-width": 1,
				"line-color": "#C0D0E0"
			},
			"guide": {
				"visible": false
			},
			"item": {
				"color": "#606060"
			}
		},
		"crosshair-x": {
			"marker": {
				"visible": false
			},
			"line-color": "none",
			"line-width": "0px",
			"scale-label": {
				"visible": false
			},
			"plot-label": {
				"text": "%data-browser: %v% of total likes",
				"multiple": true,
				"font-size": "12px",
				"color": "#606060",
				"background-color": "white",
				"border-width": 3,
				"alpha": 0.9,
				"callout": true,
				"callout-position": "bottom",
				"shadow": 0,
				"placement": "node-top",
				"border-radius": 4,
				"offsetY":-20,
				"padding":8,
				"rules": [  // tooltip border color
					{   // Friends
						"rule": "%i==0",
						"border-color": "#1976d2"
					},
					{   // Selfies
						"rule": "%i==1",
						"border-color": "#424242"
					},
					{   // Food
						"rule": "%i==2",
						"border-color": "#388e3c"
					},
					{   // Gadget
						"rule": "%i==3",
						"border-color": "#ffa000"
					},
					{   // Captioned Photo
						"rule": "%i==4",
						"border-color": "#7b1fa2"
					},
					{   // Scene/Activity
						"rule": "%i==5",
						"border-color": "#c2185b"
					},
					{   // Pet
						"rule": "%i==6",
						"border-color": "#e4d354"
					},
					{   // Fashion
						"rule": "%i==7",
						"border-color": "#2b908f"
					}
				]
			}
		},
		"plot": {
			"data-browser": [ // tooltip caption color
				"<span style='font-weight:bold;color:#1976d2;'>Friends</span>",
				"<span style='font-weight:bold;color:#434348;'>Selfies</span>",
				"<span style='font-weight:bold;color:#388e3c;'>Gadget</span>",
				"<span style='font-weight:bold;color:#f7a35c;'>Food</span>",
				"<span style='font-weight:bold;color:#7b1fa2;'>Pet</span>",
				"<span style='font-weight:bold;color:#f15c80;'>Fashion</span>",
				"<span style='font-weight:bold;color:#e4d354;'>Scene/Activity</span>",
				"<span style='font-weight:bold;color:#2b908f;'>Others</span>",
			],
			"cursor": "hand",
			"value-box": {
				"text": "%v%",
				"text-decoration": "underline",
				"color": "#606060"
			},
			"tooltip": {
				"visible": false
			},
			"animation": {
				"effect": "7"
			},
			"rules": [  // background fill of each bar
				{   // Friends
					"rule": "%i==0",
					"background-color": "#7cb5ec"
				},
				{   // Selfies
					"rule": "%i==1",
					"background-color": "#434348"
				},
				{   // Food
					"rule": "%i==2",
					"background-color": "#90ed7d"
				},
				{   //Gadget
					"rule": "%i==3",
					"background-color": "#f7a35c"
				},
				{   //Captioned Photo
					"rule": "%i==4",
					"background-color": "#8085e9"
				},
				{   // Scene/ Activity
					"rule": "%i==5",
					"background-color": "#f15c80"
				},
				{   // Pet
					"rule": "%i==6",
					"background-color": "#e4d354"
				},
				{   // Fashion
					"rule": "%i==7",
					"background-color": "#2b908f"
				}
			]
		},
		"series": [
			{
				"values": [
					likesArray[0],
					likesArray[1],
					likesArray[2],
					likesArray[3],
					likesArray[4],
					likesArray[5],
					likesArray[6],
					likesArray[7]
				]
			}
		]
	};
}

var updateChart = function(p){
    //document.body.innerHTML = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h2 class="modal-title" id="title"></h2></div><div class="modal-body" id="pics"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>';
	//console.log(p);
	/*var hashtagNum = 1;
	
	if (p.id === "bar-chart2") {
		hashtagNum = 2;
	}
	
	var imagesArray = getCategoryImages(p.nodeindex, hashtagNum);
	console.log(imagesArray);
	var i;
	var images = '<div class="row">';
	
	for (i = 0; i < imagesArray.length; i ++) {
		images += '<div class="col-md-2 col-xs-4 col-sm-4 padding-10"><img src="' + imagesArray[i] + '" height="90" width="90"></div>';
		
		if ((i + 1) % 6 == 0) {
			images += '</div><div class="row">';
		}
	}*/
	
	var imagesArray = getCategoryImages(p.nodeindex);
	console.log(imagesArray);
	var i, tempstring, images = "", node;

	for (node of Object.keys(imagesArray)) {
		let image = imagesArray[node];
		
		if (image.length > 0) {
			tempstring = '<div class="row">';
			
			for (i = 0; i < image.length; i ++) {
				tempstring += '<div class="col-md-2 col-xs-4 col-sm-4 padding-10"><img src="' + image[i] + '" height="90" width="90"></div>';
			
				if ((i + 1) % 6 == 0) {
					tempstring += '</div><div class="row">';
				}
			}
			
			tempstring += '</div>';
			images += node + " - " + image.length + "<br>" + tempstring;
		}
	}
						
	document.getElementById("title").innerHTML = p.scaletext + " Category Images";
	document.getElementById("pics").innerHTML = images + '</div>';
	$('#myModal').modal('show');
};

initializebarConfig();

zingchart.render({
    id : 'bar-chart',
    data : barConfig,
    height: 400,
});

zingchart.bind('bar-chart','node_click',updateChart);

if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "comparison-report") {
	likesArray = getLikesArray2();
	
	initializebarConfig();
	
	zingchart.render({
		id : 'bar-chart2',
		data : barConfig,
		height: 400,
	});

	zingchart.bind('bar-chart2','node_click',updateChart);
}


if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "engagement-report" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary") {
	//console.log(barConfig["scale-x"].values);
	//console.log(barConfig.series[0].values);
	var currMax, indexOfMax, x, x2, i, numOfImages, ageRanges, xArray, x2Array;
	
	xArray = [];
	x2Array = [];
	numOfImages = barConfig.series[0].values;
	
	//ageRanges = "<b>Image Categories and Their Number of Likes</b> displays that the categories of images with the most number of likes are ";
	
	for (i = 1; i <= 3; i ++) {
		currMax = Math.max(...numOfImages);
		indexOfMax = numOfImages.indexOf(currMax);
		numOfImages[indexOfMax] = 0;
		
		x = barConfig["scale-x"].values[indexOfMax].toLowerCase();
		x2 = Math.round(currMax);
		
		xArray.push(x);
		x2Array.push(x2);
	}
	
	/*Facial Emotion Recognition expresses that the usual
	emotions expressed in the images are joy, sadness and neutral, with the 
	number of photos being 79, 20 and 1 respectively.*/
	
	/*for (i = 0; i < xArray.length; i ++) {
		if (i === 0) {
			sessionStorage.setItem("categoryName", xArray[i]);
		}

		if (xArray.length - 1 == i) {
			ageRanges += "and " + xArray[i];
		} else {
			ageRanges += xArray[i] + ", ";
		}
	}
		
	ageRanges += " with the percentage of likes being ";

	for (i = 0; i < x2Array.length; i ++) {
		if (i === 0) {
			sessionStorage.setItem("categoryValue", x2Array[i]);
		}
		if (xArray.length - 1 == i) {
			ageRanges += "and " + x2Array[i] + "% respectively.";
		} else {
			ageRanges += x2Array[i] + "%, ";
		}
	}*/

	ageRanges = "<b>Image Categories</b><br><table class='table'><thead><tr><th>Category</th><th>No. of Images</th></tr></thead><tbody>"

	for (i = 0; i < xArray.length; i ++) {
		ageRanges += "<tr><td>" + xArray[i] + "</td><td>" + x2Array[i] + "</td></tr>";
	}

	//console.log(sessionStorage.getItem("categoryName"));
	//console.log(sessionStorage.getItem("categoryValue"));
	try {
        document.getElementById("barchart").innerHTML = ageRanges;
	} catch (e) {}
}
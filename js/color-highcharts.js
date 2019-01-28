import { getIGMedia } from './mapper.js';
import { getIGProcessingGoogle, getIGMediaNew, getGoogleProcessingRange } from './dataRetrieve.js';

var colorMapper = {
	"red": [],
	"pink": [], 
	"purple": [], 
	"deepPurple": [], 
	"indigo": [], 
	"blue": [], 
	"lightBlue": [],
	"cyan": [],
	"teal": [],
	"green": [],
	"lightGreen": [],
	"lime": [],
	"yellow": [],
	"amber": [],
	"orange": [],
	"deepOrange": []
};
var start = Math.round(new Date(sessionStorage.getItem('startDate')).getTime() / 1000), end = Math.round(new Date(sessionStorage.getItem('endDate')).getTime() / 1000);
var igProcessing = getGoogleProcessingRange(start, end, sessionStorage.getItem("hashtagInput"));
$(document).ready(function(){
	filterByYear();
	
	var dColors = getDominantColors(igProcessing);
	
	var chart = Highcharts.chart('color-chart', {
		chart: {
			type: 'variwide'
		},

		title: {
			text: 'Dominant Colors'
		},

        boost: {
            enabled: true,
            allowForce: true
        },

		subtitle: {
			text: 'Hover over each color to see percentage'
		},

		xAxis: {
			type: 'category',
			title: {
				text: 'Column widths are proportional to percentage of dominance'
			},
            labels: {
                enabled: false
            }
		},
		yAxis: {
			title:{
				text: ''
			},
			visible: false,
		},

		legend: {
			enabled: false
		},

		series: [{
			name: 'Labor Costs',
			data: [
				{
					name: "Red",
					y: 5,
					//z: dColors.Red,
					z: Math.round(dColors.red / dColors.totalPictures * 100),
					color: 'rgb(244,67,54)'
				},
				{
					name: "Pink",
					y: 5,
					//z: dColors.Orange,
					z: Math.round(dColors.pink / dColors.totalPictures * 100),
					color: 'rgb(233,30,99)'
				},
				{
					name: "Purple",
					y: 5,
					//z: dColors.Yellow,
					z: Math.round(dColors.purple / dColors.totalPictures * 100),
					color: 'rgb(156,39,176)'
				},
				{
					name: "Deep Purple",
					y: 5,
					//z: dColors.Lime,
					z: Math.round(dColors.deepPurple / dColors.totalPictures * 100),
					color: 'rgb(103,58,183)'
				},
				{
					name: "Indigo",
					y: 5,
					//z: dColors.Blue,
					z: Math.round(dColors.indigo / dColors.totalPictures * 100),
					color: 'rgb(63,81,181)'
				},
				{
					name: "Blue",
					y: 5,
					//z: dColors.Deep,
					z: Math.round(dColors.blue / dColors.totalPictures * 100),
					color: 'rgb(33,150,243)'
				},
				{
					name: "Light Blue",
					y: 5,
					//z: dColors.Magenta,
					z: Math.round(dColors.lightBlue / dColors.totalPictures * 100),
					color: 'rgb(3,169,244)'
				},
				{
					name: "Cyan",
					y: 5,
					//z: dColors.Magenta,
					z: Math.round(dColors.cyan / dColors.totalPictures * 100),
					color: 'rgb(0,188,212))'
				},
				{
					name: "Teal",
					y: 5,
					//z: dColors.Magenta,
					z: Math.round(dColors.teal / dColors.totalPictures * 100),
					color: 'rgb(0,150,136)'
				},
				{
					name: "Green",
					y: 5,
					//z: dColors.Magenta,
					z: Math.round(dColors.green / dColors.totalPictures * 100),
					color: 'rgb(76,175,80)'
				},
				{
					name: "Light Green",
					y: 5,
					//z: dColors.Magenta,
					z: Math.round(dColors.lightGreen / dColors.totalPictures * 100),
					color: 'rgb(139,195,74)'
				},
				{
					name: "Lime",
					y: 5,
					//z: dColors.Magenta,
					z: Math.round(dColors.lime / dColors.totalPictures * 100),
					color: 'rgb(205,220,57)'
				},
				{
					name: "Yellow",
					y: 5,
					//z: dColors.Magenta,
					z: Math.round(dColors.yellow / dColors.totalPictures * 100),
					color: 'rgb(255,235,59)'
				},
				{
					name: "Amber",
					y: 5,
					//z: dColors.Magenta,
					z: Math.round(dColors.amber / dColors.totalPictures * 100),
					color: 'rgb(255,193,7)'
				},
				{
					name: "Orange",
					y: 5,
					//z: dColors.Magenta,
					z: Math.round(dColors.orange / dColors.totalPictures * 100),
					color: 'rgb(255,152,0)'
				},
				{
					name: "Deep Orange",
					y: 5,
					//z: dColors.Magenta,
					z: Math.round(dColors.deepOrange / dColors.totalPictures * 100),
					color: 'rgb(255,87,34)'
				},
			],
			// dataLabels: {
			//   enabled: true,
			//   format: '€{point.y:.0f}'
			// },
			tooltip: {
				pointFormat: '<b>{point.z}%</b><br>' //+'GDP: <b>€ {point.z} million</b><br>'
			},
			colorByPoint: true,
			point:{
				events:{
					click: function(e) {
						//console.log(this);
						//console.log(colorMapper);
						var images = '<div class="row">';
						switch(this.name){
							case 'Red':
								for (var i = 0; i < colorMapper.red.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.red[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Pink':
								for (var i = 0; i < colorMapper.pink.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.pink[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Purple':
								for (var i = 0; i < colorMapper.purple.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.purple[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Deep Purple':
								for (var i = 0; i < colorMapper.deepPurple.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.deepPurple[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Indigo':
								for (var i = 0; i < colorMapper.indigo.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.indigo[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Blue':
								for (var i = 0; i < colorMapper.blue.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.blue[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Light Blue':
								for (var i = 0; i < colorMapper.lightBlue.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.lightBlue[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Cyan':
								for (var i = 0; i < colorMapper.cyan.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.cyan[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Teal':
								for (var i = 0; i < colorMapper.teal.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.teal[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Green':
								for (var i = 0; i < colorMapper.green.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.green[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Light Green':
								for (var i = 0; i < colorMapper.lightGreen.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.lightGreen[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Lime':
								for (var i = 0; i < colorMapper.lime.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.lime[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Yellow':
								for (var i = 0; i < colorMapper.yellow.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.yellow[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Amber':
								for (var i = 0; i < colorMapper.amber.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.amber[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Orange':
								for (var i = 0; i < colorMapper.orange.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.orange[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
							case 'Deep Orange':
								for (var i = 0; i < colorMapper.deepOrange.length; i ++) {
									images += '<div class="col-sm-2 padding-10"><img src="' + colorMapper.deepOrange[i] + '" height="90" width="90"></div>';
									if ((i + 1) % 6 == 0) {
										images += '</div><div class="row">';
									}
								}
								break;
						}
						document.getElementById("title").innerHTML = this.name + " Colored Images";
						document.getElementById("pics").innerHTML = images + '</div>';
						$('#myModal').modal('show');
					}
				}
			}
		}]
	});
	
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "consumer-analysis" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "post-event" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary") {
		console.log(chart.series);
		
		var i, j, colorArray, colorProcessing, indexArray, finalIndices, index, colors;
		
		colorArray = [];
		indexArray = [];
		finalIndices = [];
		colorProcessing = chart.series[0].points;
		index = [];
		//colors = "<b>Dominant Colors</b> presents the usual colors in the images, with the highest being ";
		colors = "<b>Dominant Colors</b><br><table class='table'><thead><tr><th>Color</th><th>Percentage</th></tr></thead><tbody>";
		
		for (i = 0; i < colorProcessing.length; i ++) {
			colorArray.push(colorProcessing[i].z);
			indexArray.push(colorProcessing[i].z);	
		}
		
		colorArray.sort(function(a,b) {return b-a});
		
		for (i = 0; i < colorArray.length - 1 && index.length < 3; i ++) {
			if (colorArray[i] != colorArray[i + 1]) {
				index.push(i + 1);
			}
		}
		
		if (i < colorArray.length - 1) {
			colorArray = colorArray.slice(0, i);
		}
		
		for (i = 0; i < colorArray.length; i ++) {
			finalIndices.push(indexArray.indexOf(colorArray[i]));
			indexArray[indexArray.indexOf(colorArray[i])] = -1;
		}
		
		index.splice(0, 0, 0);
		
		for (i = 0; i < index.length - 1; i ++) {
			var newArray = finalIndices.slice(index[i], index[i + 1]);
			
			for (j = 0; j < newArray.length; j ++) {
				/*console.log(colorProcessing[newArray[j]]);
				if (i === 0) {
					sessionStorage.setItem("colorName", colorProcessing[newArray[j]].name.toLowerCase());
					sessionStorage.setItem("colorValue", colorProcessing[newArray[0]].z);
				}*/
				colors += "<tr><td>" + colorProcessing[newArray[j]].name.toLowerCase() + "</td><td>" + colorProcessing[newArray[0]].z + "</td></tr>";
			}
				
			/*
			if (i == index.length - 2) {
				colors += "and ";
			}
			
			if (newArray.length == 1) {
				colors += colorProcessing[newArray[0]].name.toLowerCase();
			} else if (newArray.length == 2) {
				colors += colorProcessing[newArray[0]].name.toLowerCase() + " and " + colorProcessing[newArray[1]].name.toLowerCase();
			} else {
				for (j = 0; j < newArray.length; j ++) {
					if (j == newArray.length - 1) {
						colors += "and " + colorProcessing[newArray[j]].name.toLowerCase();
					} else {
						colors += colorProcessing[newArray[j]].name.toLowerCase() + ", ";
					}
				}
			}
			
			if (i == 0) {
				colors += " with " + colorProcessing[newArray[0]].z + "%, followed by ";
			} else if (i == index.length - 2){
				colors += " with " + colorProcessing[newArray[0]].z + "%."; 
			} else {
				colors += " with " + colorProcessing[newArray[0]].z + "%, ";
			}
			*/
		}
		colors += "</tbody></table>";

		try {
            document.getElementById("colors").innerHTML = colors;
		} catch (e) {}
	}
});

function getIgUrls(){
	var igMedia = getIGMedia();
	var tempColorMapper = {
		"red": [],
		"pink": [], 
		"purple": [], 
		"deepPurple": [], 
		"indigo": [], 
		"blue": [], 
		"lightBlue": [],
		"cyan": [],
		"teal": [],
		"green": [],
		"lightGreen": [],
		"lime": [],
		"yellow": [],
		"amber": [],
		"orange": [],
		"deepOrange": []
	};
	
	for(let ids of colorMapper.red){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.red.push(temp.display_url);
	}
	for(let ids of colorMapper.pink){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.pink.push(temp.display_url);
	}
	for(let ids of colorMapper.purple){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.purple.push(temp.display_url);
	}
	for(let ids of colorMapper.deepPurple){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.deepPurple.push(temp.display_url);
	}
	for(let ids of colorMapper.indigo){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.indigo.push(temp.display_url);
	}
	for(let ids of colorMapper.blue){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.blue.push(temp.display_url);
	}
	for(let ids of colorMapper.lightBlue){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.lightBlue.push(temp.display_url);
	}
	for(let ids of colorMapper.cyan){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.cyan.push(temp.display_url);
	}
	for(let ids of colorMapper.teal){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.teal.push(temp.display_url);
	}
	for(let ids of colorMapper.green){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.green.push(temp.display_url);
	}
	for(let ids of colorMapper.lightGreen){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.lightGreen.push(temp.display_url);
	}
	for(let ids of colorMapper.lime){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.lime.push(temp.display_url);
	}
	for(let ids of colorMapper.yellow){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.yellow.push(temp.display_url);
	}
	for(let ids of colorMapper.amber){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.amber.push(temp.display_url);
	}
	for(let ids of colorMapper.orange){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.orange.push(temp.display_url);
	}
	for(let ids of colorMapper.deepOrange){
		var temp = igMedia.find(function(element){
			return element.id == ids;
		});
		tempColorMapper.deepOrange.push(temp.display_url);
	}
	colorMapper = tempColorMapper;
}

function getDominantColors(igProcessing){
	
	var totalPictures = 0;
	var totalColors = {
		"red": 0,
		"pink": 0,
		"purple": 0,
		"deepPurple": 0,
		"indigo": 0,
		"blue": 0,
		"lightBlue": 0,
		"cyan": 0,
		"teal": 0,
		"green": 0,
		"lightGreen": 0,
		"lime": 0,
		"yellow": 0,
		"amber": 0,
		"orange": 0,
		"deepOrange": 0,
	};
	
	for(let media of igProcessing){
		if(media.hasOwnProperty('google')){
			if(media.google.responses[0].hasOwnProperty('imagePropertiesAnnotation')){
				var google = media.google.responses[0].imagePropertiesAnnotation.dominantColors.colors[0].color;
				
				if(!google.hasOwnProperty('red'))
					google.red = 0;
				if(!google.hasOwnProperty('green'))
					google.green = 0;
				if(!google.hasOwnProperty('blue'))
					google.blue = 0;
				
				var color = {
					r: google.red,
					g: google.green,
					b: google.blue
				};
				switch(nearestColor(color)){
					case "#f44336":
						totalColors.red++;
						colorMapper.red.push(media.ig_url);
						break;
					case "#E91E63":
						totalColors.pink++;
						colorMapper.pink.push(media.ig_url);
						break;
					case "#9C27B0":
						totalColors.purple++;
						colorMapper.purple.push(media.ig_url);
						break;
					case "#673AB7":
						totalColors.deepPurple++;
						colorMapper.deepPurple.push(media.ig_url);
						break;
					case "#3F51B5":
						totalColors.indigo++;
						colorMapper.indigo.push(media.ig_url);
						break;
					case "#2196F3":
						totalColors.blue++;
						colorMapper.blue.push(media.ig_url);
						break;
					case "#03A9F4":
						totalColors.lightBlue++;
						colorMapper.lightBlue.push(media.ig_url);
						break;
					case "#00BCD4":
						totalColors.cyan++;
						colorMapper.cyan.push(media.ig_url);
						break;
					case "#009688":
						totalColors.teal++;
						colorMapper.teal.push(media.ig_url);
						break;
					case "#4CAF50":
						totalColors.green++;
						colorMapper.green.push(media.ig_url);
						break;
					case "#8BC34A":
						totalColors.lightGreen++;
						colorMapper.lightGreen.push(media.ig_url);
						break;
					case "#CDDC39":
						totalColors.lime++;
						colorMapper.lime.push(media.ig_url);
						break;
					case "#FFEB3B":
						totalColors.yellow++;
						colorMapper.yellow.push(media.ig_url);
						break;
					case "#FFC107":
						totalColors.amber++;
						colorMapper.amber.push(media.ig_url);
						break;
					case "#FF9800":
						totalColors.orange++;
						colorMapper.orange.push(media.ig_url);
						break;
					case "#FF5722":
						totalColors.deepOrange++;
						colorMapper.deepOrange.push(media.ig_url);
						break;
				}
				totalPictures++;
			}
		}
	}
	//console.log(totalPictures);
	//getIgUrls();
	totalColors.totalPictures = totalPictures;
	console.log(totalColors);
	return totalColors;
}

function filterByYear(){
	var igMedia = getIGMediaNew(sessionStorage.getItem("hashtagInput"));
	var neededIG = [], filterYear, tempIgProcessing = [];
	for(let a of igMedia){
		filterYear = new Date((a.ig_object.taken_at_timestamp) * 1000);
		if (filterYear.getFullYear() == sessionStorage.getItem("year")) 
			neededIG.push(a.ig_object.id);
	}
	
	for(let b of igProcessing){
		if(neededIG.includes(b.ig_id))
			tempIgProcessing.push(b);
	}
	igProcessing = tempIgProcessing;
}

  /**
   * Defines an available color.
   *
   * @typedef {Object} ColorSpec
   * @property {string=} name A name for the color, e.g., 'red'
   * @property {string} source The hex-based color string, e.g., '#FF0'
   * @property {RGB} rgb The {@link RGB} color values
   */

  /**
   * Describes a matched color.
   *
   * @typedef {Object} ColorMatch
   * @property {string} name The name of the matched color, e.g., 'red'
   * @property {string} value The hex-based color string, e.g., '#FF0'
   * @property {RGB} rgb The {@link RGB} color values.
   */

  /**
   * Provides the RGB breakdown of a color.
   *
   * @typedef {Object} RGB
   * @property {number} r The red component, from 0 to 255
   * @property {number} g The green component, from 0 to 255
   * @property {number} b The blue component, from 0 to 255
   */

  /**
   * Gets the nearest color, from the given list of {@link ColorSpec} objects
   * (which defaults to {@link nearestColor.DEFAULT_COLORS}).
   *
   * Probably you wouldn't call this method directly. Instead you'd get a custom
   * color matcher by calling {@link nearestColor.from}.
   *
   * @public
   * @param {RGB|string} needle Either an {@link RGB} color or a hex-based
   *     string representing one, e.g., '#FF0'
   * @param {Array.<ColorSpec>=} colors An optional list of available colors
   *     (defaults to {@link nearestColor.DEFAULT_COLORS})
   * @return {ColorMatch|string} If the colors in the provided list had names,
   *     then a {@link ColorMatch} object with the name and (hex) value of the
   *     nearest color from the list. Otherwise, simply the hex value.
   *
   * @example
   * nearestColor({ r: 200, g: 50, b: 50 }); // => '#f00'
   * nearestColor('#f11');                   // => '#f00'
   * nearestColor('#f88');                   // => '#f80'
   * nearestColor('#ffe');                   // => '#ff0'
   * nearestColor('#efe');                   // => '#ff0'
   * nearestColor('#abc');                   // => '#808'
   * nearestColor('red');                    // => '#f00'
   * nearestColor('foo');                    // => null
   */
  function nearestColor(needle, colors) {
    needle = parseColor(needle);

    if (!needle) {
      return null;
    }

    var distance,
        minDistance = Infinity,
        rgb,
        value;

    colors || (colors = nearestColor.DEFAULT_COLORS);

    for (var i = 0; i < colors.length; ++i) {
      rgb = colors[i].rgb;

      distance = Math.sqrt(
        Math.pow(needle.r - rgb.r, 2) +
        Math.pow(needle.g - rgb.g, 2) +
        Math.pow(needle.b - rgb.b, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        value = colors[i];
      }
    }

    if (value.name) {
      return {
        name: value.name,
        value: value.source,
        rgb: value.rgb,
        distance: minDistance
      };
    }

    return value.source;
  }

  /**
   * Provides a matcher to find the nearest color based on the provided list of
   * available colors.
   *
   * @public
   * @param {Array.<string>|Object} availableColors An array of hex-based color
   *     strings, or an object mapping color *names* to hex values.
   * @return {function(string):ColorMatch|string} A function with the same
   *     behavior as {@link nearestColor}, but with the list of colors 
   *     predefined.
   *
   * @example
   * var colors = {
   *   'maroon': '#800',
   *   'light yellow': { r: 255, g: 255, b: 51 },
   *   'pale blue': '#def'
   * };
   *
   * var bgColors = [
   *   '#eee',
   *   '#444'
   * ];
   *
   * var getColor = nearestColor.from(colors);
   * var getBGColor = getColor.from(bgColors);
   * var getAnyColor = nearestColor.from(colors).or(bgColors);
   *
   * getColor('#f00');
   * // => { name: 'maroon', value: '#800', rgb: { r: 136, g: 0, b: 0 }, distance: 119}
   *
   * getColor('#ff0');
   * // => { name: 'light yellow', value: '#ffff33', rgb: { r: 255, g: 255, b: 51 }, distance: 51}
   *
   * getBGColor('#fff'); // => '#eee'
   * getBGColor('#000'); // => '#444'
   *
   * getAnyColor('#f00');
   * // => { name: 'maroon', value: '#800', rgb: { r: 136, g: 0, b: 0 }, distance: 119}
   *
   * getAnyColor('#888'); // => '#444'
   */
  nearestColor.from = function from(availableColors) {
    var colors = mapColors(availableColors),
        nearestColorBase = nearestColor;

    var matcher = function nearestColor(hex) {
      return nearestColorBase(hex, colors);
    };

    // Keep the 'from' method, to support changing the list of available colors
    // multiple times without needing to keep a reference to the original
    // nearestColor function.
    matcher.from = from;

    // Also provide a way to combine multiple color lists.
    matcher.or = function or(alternateColors) {
      var extendedColors = colors.concat(mapColors(alternateColors));
      return nearestColor.from(extendedColors);
    };

    return matcher;
  };

  /**
   * Given either an array or object of colors, returns an array of
   * {@link ColorSpec} objects (with {@link RGB} values).
   *
   * @private
   * @param {Array.<string>|Object} colors An array of hex-based color strings, or
   *     an object mapping color *names* to hex values.
   * @return {Array.<ColorSpec>} An array of {@link ColorSpec} objects
   *     representing the same colors passed in.
   */
  function mapColors(colors) {
    if (colors instanceof Array) {
      return colors.map(function(color) {
        return createColorSpec(color);
      });
    }

    return Object.keys(colors).map(function(name) {
      return createColorSpec(colors[name], name);
    });
  };

  /**
   * Parses a color from a string.
   *
   * @private
   * @param {RGB|string} source
   * @return {RGB}
   *
   * @example
   * parseColor({ r: 3, g: 22, b: 111 }); // => { r: 3, g: 22, b: 111 }
   * parseColor('#f00');                  // => { r: 255, g: 0, b: 0 }
   * parseColor('#04fbc8');               // => { r: 4, g: 251, b: 200 }
   * parseColor('#FF0');                  // => { r: 255, g: 255, b: 0 }
   * parseColor('rgb(3, 10, 100)');       // => { r: 3, g: 10, b: 100 }
   * parseColor('rgb(50%, 0%, 50%)');     // => { r: 128, g: 0, b: 128 }
   * parseColor('aqua');                  // => { r: 0, g: 255, b: 255 }
   */
  function parseColor(source) {
    var red, green, blue;

    if (typeof source === 'object') {
      return source;
    }

    if (source in nearestColor.STANDARD_COLORS) {
      return parseColor(nearestColor.STANDARD_COLORS[source]);
    }

    var hexMatch = source.match(/^#((?:[0-9a-f]{3}){1,2})$/i);
    if (hexMatch) {
      hexMatch = hexMatch[1];

      if (hexMatch.length === 3) {
        hexMatch = [
          hexMatch.charAt(0) + hexMatch.charAt(0),
          hexMatch.charAt(1) + hexMatch.charAt(1),
          hexMatch.charAt(2) + hexMatch.charAt(2)
        ];

      } else {
        hexMatch = [
          hexMatch.substring(0, 2),
          hexMatch.substring(2, 4),
          hexMatch.substring(4, 6)
        ];
      }

      red = parseInt(hexMatch[0], 16);
      green = parseInt(hexMatch[1], 16);
      blue = parseInt(hexMatch[2], 16);

      return { r: red, g: green, b: blue };
    }

    var rgbMatch = source.match(/^rgb\(\s*(\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)\s*\)$/i);
    if (rgbMatch) {
      red = parseComponentValue(rgbMatch[1]);
      green = parseComponentValue(rgbMatch[2]);
      blue = parseComponentValue(rgbMatch[3]);

      return { r: red, g: green, b: blue };
    }

    return null;
  }

  /**
   * Creates a {@link ColorSpec} from either a string or an {@link RGB}.
   *
   * @private
   * @param {string|RGB} input
   * @param {string=} name
   * @return {ColorSpec}
   *
   * @example
   * createColorSpec('#800'); // => {
   *   source: '#800',
   *   rgb: { r: 136, g: 0, b: 0 }
   * }
   *
   * createColorSpec('#800', 'maroon'); // => {
   *   name: 'maroon',
   *   source: '#800',
   *   rgb: { r: 136, g: 0, b: 0 }
   * }
   */
  function createColorSpec(input, name) {
    var color = {};

    if (name) {
      color.name = name;
    }

    if (typeof input === 'string') {
      color.source = input;
      color.rgb = parseColor(input);

    } else if (typeof input === 'object') {
      // This is for if/when we're concatenating lists of colors.
      if (input.source) {
        return createColorSpec(input.source, input.name);
      }

      color.rgb = input;
      color.source = rgbToHex(input);
    }

    return color;
  }

  /**
   * Parses a value between 0-255 from a string.
   *
   * @private
   * @param {string} string
   * @return {number}
   *
   * @example
   * parseComponentValue('100');  // => 100
   * parseComponentValue('100%'); // => 255
   * parseComponentValue('50%');  // => 128
   */
  function parseComponentValue(string) {
    if (string.charAt(string.length - 1) === '%') {
      return Math.round(parseInt(string, 10) * 255 / 100);
    }

    return Number(string);
  }

  /**
   * Converts an {@link RGB} color to its hex representation.
   *
   * @private
   * @param {RGB} rgb
   * @return {string}
   *
   * @example
   * rgbToHex({ r: 255, g: 128, b: 0 }); // => '#ff8000'
   */
  function rgbToHex(rgb) {
    return '#' + leadingZero(rgb.r.toString(16)) +
      leadingZero(rgb.g.toString(16)) + leadingZero(rgb.b.toString(16));
  }

  /**
   * Puts a 0 in front of a numeric string if it's only one digit. Otherwise
   * nothing (just returns the value passed in).
   *
   * @private
   * @param {string} value
   * @return
   *
   * @example
   * leadingZero('1');  // => '01'
   * leadingZero('12'); // => '12'
   */
  function leadingZero(value) {
    if (value.length === 1) {
      value = '0' + value;
    }
    return value;
  }

  /**
   * A map from the names of standard CSS colors to their hex values.
   */
  nearestColor.STANDARD_COLORS = {
    aqua: '#0ff',
    black: '#000',
    blue: '#00f',
    fuchsia: '#f0f',
    gray: '#808080',
    green: '#008000',
    lime: '#0f0',
    maroon: '#800000',
    navy: '#000080',
    olive: '#808000',
    orange: '#ffa500',
    purple: '#800080',
    red: '#f00',
    silver: '#c0c0c0',
    teal: '#008080',
    white: '#fff',
    yellow: '#ff0'
  };

  /**
   * Default colors. Comprises the colors of the rainbow (good ol' ROY G. BIV).
   * This list will be used for calls to {@nearestColor} that don't specify a list
   * of available colors to match.
   */
  nearestColor.DEFAULT_COLORS = mapColors([
    '#f44336', //red
    '#E91E63', //pink
    '#9C27B0', //purple
    '#673AB7', //deep purple
    '#3F51B5', //indigo
    '#2196F3', //blue
    '#03A9F4', //light blue
    '#00BCD4', //cyan
    '#009688', //teal
    '#4CAF50', //green
    '#8BC34A', //light green
    '#CDDC39', //lime
    '#FFEB3B', //yellow
    '#FFC107', //amber
    '#FF9800', //orange
    '#FF5722', //deep orange
	/*
    '#795548', //brown
	'#9E9E9E', //grey
	'#607D8B'  //blue-grey
	*/
  ]);
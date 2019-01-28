import { 
	getIGProcessingMs,
	getIGProcessingGoogle,
	getIGHistory,
	getIGMediaNew,
	getSpecificRange	
} from './dataRetrieve.js';

//int
var totalLikes, i, j, tempArray, newProcessing, year;

//string
var hashtag, hashtag2, name, name2, startDate, endDate, startUnix, endUnix;

//array
var processing, mappingArray, media, likesArray, processing2, mappingArray2, media2, likesArray2, logoArray, logoDescriptions, occurences;

var currPage = window.location.href.slice(window.location.href.lastIndexOf("/") + 1);

if (currPage == "consumer-analysis" || currPage == "post-event") {
	try {
		hashtag = sessionStorage.getItem("hashtagEvent");
	} catch (e) {
		hashtag = sessionStorage.getItem("hashtagInput");
	}
} else {
	hashtag = sessionStorage.getItem("hashtagInput");
}
console.log(hashtag);

if (hashtag == null) {
	hashtag = getIGHistory()[0].search_hashtag;
	
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "dashboard") {
		document.getElementById("dashboard").innerHTML = '<label id="dashboard" class="control-label"><h3>Dashboard for #' + hashtag + ' as of </h3></label>';
	}
	
	sessionStorage.setItem("hashtagInput", hashtag);
}

name = "";
year = sessionStorage.getItem("year");
console.log(year);
startDate = sessionStorage.getItem("startDate");
endDate = sessionStorage.getItem("endDate");

console.log(startDate);
console.log(endDate);

if (startDate == null && endDate == null) {
	startUnix = moment(moment().year(year).startOf('year').format('MMMM D, YYYY'), 'MMMM D, YYYY').unix();
	endUnix = moment(moment(), 'MMMM D, YYYY').unix();
	
	media = getSpecificRange(startUnix, endUnix, hashtag);
} else {
	/*if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "dashboard") {
		startUnix = moment(moment().year(year).startOf('year').format('MMMM D, YYYY'), 'MMMM D, YYYY').unix();
		
		if (year != moment().format('YYYY')) {
			endUnix = moment(moment().year(year).endOf('year').format('MMMM D, YYYY'), 'MMMM D, YYYY').unix();	
		} else {
			endUnix = moment(moment().year(year).format('MMMM D, YYYY'), 'MMMM D, YYYY').unix()
		}
		
		media = getSpecificRange(startUnix, endUnix, hashtag);
	} */
	//else {
		console.log(moment(moment(startDate).format('MMMM D, YYYY'), 'MMMM D, YYYY').unix());
		console.log(moment(moment(endDate).format('MMMM D, YYYY'), 'MMMM D, YYYY').unix());
		media = getSpecificRange(moment(moment(startDate).format('MMMM D, YYYY'), 'MMMM D, YYYY').unix(), moment(moment(endDate).format('MMMM D, YYYY'), 'MMMM D, YYYY').unix(), hashtag);
		console.log("working");
	//}
}

console.log(media);
console.log(media.length == 0);

if (media.length == 0) {
	document.getElementById("isThereData").innerHTML = "There was nothing collected.";
	
	var displays = document.getElementsByClassName("set_display");
	
	for (i = 0; i < displays.length; i ++) {
		displays[i].style.display = "none";
	}
} else {
	occurences = [[], [], [], [], [], [], []]
	tempArray = [];
	processing = getIGProcessingMs(hashtag);
	//console.log(processing);

	for (i = 0; i < media.length; i ++) {
		for (j = 0; j < processing.length; j ++) {
			if (processing[j].ig_id == media[i].ig_object.id) {
				tempArray.push(processing[j]);
			}
		}
	}

	processing = tempArray;
	mappingArray = mappingLabels(processing);
	likesArray = mappingID(media, mappingArray);

	tempArray = [];
	newProcessing = getIGProcessingGoogle(hashtag);
		
	for (i = 0; i < media.length; i ++) {
		for (j = 0; j < newProcessing.length; j ++) {
			if (newProcessing[j].ig_id == media[i].ig_object.id) {
				tempArray.push(newProcessing[j]);
			}
		}
	}

	newProcessing = tempArray;
	mappingGoogleLabels(newProcessing);
	comparisonReport(media, totalLikes, hashtag, name, newProcessing);

	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "comparison-report") {
		hashtag2 = getIGHistory()[1].search_hashtag;
		
		document.getElementById("more-details").innerHTML = '<h3>Comparison Report for #' + hashtag + ' and #' + hashtag2 + '</h3>';
		
		name2 = 2;
		
		processing2 = getIGProcessingMs(hashtag2);
		mappingArray2 = mappingLabels(processing2);
		
		media2 = getIGMediaNew(hashtag2);
		likesArray2 = mappingID(media2, mappingArray2);
		
		comparisonReport(media2, totalLikes, hashtag2, name2);
	}

	try {
		document.getElementById("brands").onclick = function() {
			var i, j, k, tempLogos, tempstring, count;
			var images = "";

			tempLogos = logoArray;
			tempLogos = [...new Set(tempLogos)];

			for (i = 0; i < logoDescriptions.length; i ++) {
				tempstring = '<div class="row">';
				count = 0;

				for (j = 0; j < tempLogos.length; j ++) {
					for (k = 0; k < tempLogos[j].google.responses[0].logoAnnotations.length; k ++) {
						if (logoDescriptions[i] == tempLogos[j].google.responses[0].logoAnnotations[k].description) {
							tempstring += '<div class="col-md-2 col-xs-4 col-sm-4 padding-10"><img src="' + tempLogos[j].ig_url + '" height="90" width="90"></div>';
							count ++;
						}
					}
				}
				tempstring += '</div>';
				images += logoDescriptions[i] + " - " + count + " image/s<br>" + tempstring;
			}
			
			document.getElementById("title").innerHTML = "Brand Images";
			document.getElementById("pics").innerHTML = images + '</div>';
			$('#myModal').modal('show');
		}
		document.getElementById("imagesScraped").onclick = function() {
			var i;
			var images = '<div class="row">';

			for (i = 0; i < media.length; i ++) {
				images += '<div class="col-md-2 col-xs-4 col-sm-4 padding-10"><img src="' + media[i].ig_object.display_url + '" height="90" width="90"></div>';

				if ((i + 1) % 6 == 0) {
					images += '</div><div class="row">';
				}
			}

			document.getElementById("title").innerHTML = "Images Collected for the year " + year;
			document.getElementById("pics").innerHTML = images + '</div>';
			$('#myModal').modal('show');
			// alert("working");
		}
	} catch (err) {}

}
function filterByYear(media){
	var i, time=[];
	//console.log('filterByYear');
	//console.log(media);
	
	for (i = 0; i < media.length; i ++) {
		var UNIX_timestamp = media[i].ig_object.taken_at_timestamp;
		var a = new Date(UNIX_timestamp * 1000);
		
		//var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
		
		var year = a.getFullYear();
		/*var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = year + '-' + month + '-' + date;
		time = time.replace(/\b(\d{1})\b/g, '0$1');
		console.log(year);*/
		//console.log(sessionStorage.getItem("year"));
		if (year == sessionStorage.getItem("year")) {
			time.push(media[i]);
		}
	}
	//console.log(time);
    return time;
}

//Function for the Expeted vs Actual results
//Filters the posts inclusive of a start and end date range
function filterByYearMonthDay(media, startDate, endDate){
    var i, time=[];
    startDate = new Date( (1533052800) * 1000);
    endDate = new Date( (1535644800) * 1000);
    for (i = 0; i < media.length; i ++) {
        var UNIX_timestamp = media[i].ig_object.taken_at_timestamp;
        var a = new Date(UNIX_timestamp * 1000);

        if(a >= startDate && a <= endDate){
            time.push(media[i]);
        }
    }
    //console.log(time);
    return time;
}

function comparisonReport(media, totalLikes, hashtag, name, newProcessing) {
	try {
		var string;

		string = media.length;
		
		if (string > 1000) {
			string /= 1000;
			string += "K";
		}

		sessionStorage.setItem("totalVolume", string);

		if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "consumer-analysis" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "post-event" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "expected-actual") {
			string = "The total number of images scraped is " + string + ".";
		} else if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "comparison-report" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary") {
			string = "Total number of images: " + string;
		}
		
		document.getElementById("total-dataset" + name).innerHTML = string;
	} catch (err) {}

	try {
		var string;
		
		string = totalLikes;
		
		if (string > 1000) {
			string /= 1000;
			string += "K";
			console.log(string);
		}

		sessionStorage.setItem("totalLikes", string);

		if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "consumer-analysis" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "post-event" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "expected-actual") {
			string = "The images altogether have " + string + " likes.";
		} else if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "comparison-report" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary") {
			string = "Total number of likes: " + string;
		}
		
		document.getElementById("total-likes" + name).innerHTML = string;
	} catch (err) {}

	try {
		var string;
		
		logoArray = getLogos(hashtag, newProcessing);
		string = logoDescriptions.length;
		
		if (string > 1000) {
			string /= 1000;
			string += "K";
		}

		sessionStorage.setItem("totalBrands", string);

		if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "consumer-analysis" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "post-event" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "expected-actual") {
			string = "There were " + string + " logos detected in the scraped images.";
		} else if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "comparison-report" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary") {
			string = "Total number of logos: " + string;
		}
		
		document.getElementById("brands-spotted" + name).innerHTML = string;
	} catch (err) {}

	try {
		var string;
		
		string = getTotalComments(media);
		
		if (string > 1000) {
			string /= 1000;
			string += "K";
		}

		sessionStorage.setItem("totalComments", string);

		if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "consumer-analysis" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "post-event" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "expected-actual") {
			string = "The total number of user comments from all images is " + string + ".";
		} else if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "comparison-report" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary") {
			string = "Total number of comments: " + string;
		}
		
		document.getElementById("total-comments" + name).innerHTML = string;
	} catch (err) {}
}


function getTotalComments(media) {
	var i, totalComments;
	
	totalComments = 0;
	
	for (i = 0; i < media.length; i ++) {
		totalComments += media[i].ig_object.edge_media_to_comment.count;
	}
	
	return totalComments;
}

function getLogos(hashtag, newProcessing) {
	var i, j, k;
	var logoArray;
	
	logoArray = [];
	logoDescriptions = [];
	
	for (i = 0; i < newProcessing.length; i ++) {
		if (newProcessing[i].google.responses[0].logoAnnotations != undefined) {
			for (j = 0; j < newProcessing[i].google.responses[0].logoAnnotations.length; j ++) {
				k = 0;
				
				while (k < logoArray.length && logoArray[k] != newProcessing[i].google.responses[0].logoAnnotations[j].description && newProcessing[i].google.responses[0].logoAnnotations[j].score >= 0.2) {
					k ++;
				}
				
				if (k == logoArray.length) {
					logoArray.push(newProcessing[i]);
					logoDescriptions.push(newProcessing[i].google.responses[0].logoAnnotations[j].description);
				}
			}
		}
	}
	
	console.log("Number of brands: " + logoArray.length);
	logoDescriptions = [...new Set(logoDescriptions)];
	
	return logoArray;
}

export function getEmotionImages(emotionImageIDs) {
	var i, j, k;
	var igMediaData, imagesArray;
	
	igMediaData = media;
	imagesArray = [];
	
	for (i = 0; i < emotionImageIDs.length; i ++) {
		for (j = 0; j < igMediaData.length; j ++) {
			if (emotionImageIDs[i] == igMediaData[j].ig_object.id) {
				imagesArray.push(igMediaData[j].ig_object.display_url);
			}
		}
	}
	
	return imagesArray;
}

export function getCategoryImages(index, hashtagNum) {
	//var i, j, k;
	var igMediaData, comparisonArray, imagesArray;
	
	//igMediaData = media;
	//comparisonArray = mappingArray;
	//imagesArray = [];
	/*
	if (hashtagNum == 2) {
		igMediaData = media2;
		comparisonArray = mappingArray2;
	}
	
	for (i = 0; i < comparisonArray[index].length; i ++) {
		for (j = 0; j < igMediaData.length; j ++) {
			if (comparisonArray[index][i].ig_id == igMediaData[j].ig_object.id) {
				imagesArray.push(igMediaData[j].ig_object.display_url);
			}
		}
	}*/
	
	imagesArray = occurences[index];
	
	return imagesArray;
}

export function mappingID(igMediaData, mappingArray) {
	var h, i, j, sum;
	var likesArray;
	
	totalLikes = 0;
	sum = 0;
	
	likesArray = [];
	
	
	for (h = 0; h < mappingArray.length; h ++) {
		sum = 0;
		for (i = 0; i < mappingArray[h].length; i ++) {
			for (j = 0; j < igMediaData.length; j ++) {
				if (mappingArray[h][i].ig_id == igMediaData[j].ig_object.id) {
					sum += igMediaData[j].ig_object.edge_liked_by.count;
				}
			}
		}
		likesArray.push(sum);
	}
	
	for (i = 0; i < igMediaData.length; i ++) {
		sum = igMediaData[i].ig_object.edge_liked_by.count;
		totalLikes += sum;
	}
	
	for (i = 0; i < likesArray.length; i ++) {
		likesArray[i] = Math.round(likesArray[i] / totalLikes * 10000) / 100;
	}
	
	console.log(totalLikes);
	console.log(likesArray);
	
	return likesArray;
}

export function mappingLabels(igProcessingData) {
	var i, j, strCategories, strTags, strDescription, node, mappingArray, count;
	var friendsLabels, selfiesLabels, gadgetCategories, gadgetTags, gadgetDescription,
		foodCategories, foodDescription, petCategories, petTags, 
		petDescription, activitiesCategories, fashionTags, fashionDescription;
	
	mappingArray = [[], [], [], [], [], [], [], []];
	friendsLabels = ["people_many", "people_group", "people_crowd"];
	selfiesLabels = ["people_", "people_portrait"];
	gadgetCategories = ["trans_bicycle", "trans_car", "trans_bus"];
	gadgetTags = ["electronics", "computer", "laptop", "car", "bicycle"];
	gadgetDescription = ["phone", "cellphone", "computer", "monitor", "laptop", "keyboard", "car", "bicycle", "motorcycle", "remote"];
	foodCategories = ["food_", "food_bread", "food_fastfood", "food_grilled", "food_pizza"];
	foodDescription = ["food", "food_grilled", "food_pizza"];
	petCategories = ["animal_", "animal_bird", "animal_cat", "animal_dog", "animal_horse", "animal_panda"];
	petTags = ["animal_"];
	petDescription = ["animal_"];
	activitiesCategories = ["indoor_", "indoor_churchwindow", "indoor_court", "indoor_doorwindows", "indoor_marketstore", "indoor_room", "indoor_venue",
							"outdoor_", "outdoor_city", "outdoor_field", "outdoor_grass", "outdoor_house", "outdoor_mountain", "outdoor_oceanbeach", "outdoor_playground", "outdoor_railway", "outdoor_road", "outdoor_sportsfield", "outdoor_stonerock", "outdoor_street", "outdoor_water", "outdoor_waterside",
							"building_", "building_arch", "building_brickwall", "building_church", "building_corner", "building_doorwindows", "building_pillar", "building_stair", "building_street"];
	fashionTags = ["accessory", "clothing", "footwear", "shoes", "wearing", "dressed", "dress", "cosmetic", "spectacles", "sunglasses"];
	fashionDescription = ["lotion", "clothing", "clothes", "footwear", "shoes", "wearing", "bag", "dress", "hat", "spectacles", "sunglasses"];
	
	var ctr = 0;
	
	for (node of igProcessingData) {
		strCategories = node.vision.categories;
		strTags = node.vision.tags;
		strDescription = node.vision.description;
		count = 0;
		
		if (strTags == undefined) {
			strTags = [];
		} 
		
		if (strDescription == undefined) {
			strDescription = [];
		} else {
			strDescription = strDescription.tags;
		}
		//Friends mapping
		i = 0;
		
		while (i < strCategories.length && friendsLabels.indexOf(strCategories[i].name) == -1) {
			i ++;
		}
		
		if (i < strCategories.length) {
			mappingArray[0].push(node);
			//continue;
			if (occurences[0][strCategories[i].name] == undefined) {
				occurences[0][strCategories[i].name] = [];
			} else {
				occurences[0][strCategories[i].name].push(node.ig_url);
			}
			count ++;
		} 
		
		//Selfies mapping
		i = 0;
		
		while (i < strCategories.length && selfiesLabels.indexOf(strCategories[i].name) == -1) {
			i ++;
		}
		
		if (i < strCategories.length) {
			mappingArray[1].push(node);
			//continue;
			if (occurences[1][strCategories[i].name] == undefined) {
				occurences[1][strCategories[i].name] = [];
			} else {
				occurences[1][strCategories[i].name].push(node.ig_url);
			}
			count ++;
		} 
		
		//Gadget mapping
		i = 0;
		
		while (i < strCategories.length && gadgetCategories.indexOf(strCategories[i].name) == -1) {
			i ++;
		}
		
		if (i < strCategories.length) {
			mappingArray[2].push(node);
			//continue;
			if (occurences[2][strCategories[i].name] == undefined) {
				occurences[2][strCategories[i].name] = [];
			} else {
				occurences[2][strCategories[i].name].push(node.ig_url);
			}
			count ++;
		} else {
			i = 0;
		
			while (i < strTags.length && gadgetTags.indexOf(strTags[i].name) == -1) {
				i ++;
			}
			
			if (i < strTags.length) {
				mappingArray[2].push(node);
				//continue;
				if (occurences[2][strTags[i].name] == undefined) {
					occurences[2][strTags[i].name] = [];
				} else {
					occurences[2][strTags[i].name].push(node.ig_url);
				}
				count ++;
			} else {
				i = 0;
		
				while (i < strDescription.length && gadgetDescription.indexOf(strDescription[i]) == -1) {
					i ++;
				}
				
				if (i < strDescription.length) {
					mappingArray[2].push(node);
					//continue;
					if (occurences[2][strDescription[i]] == undefined) {
						occurences[2][strDescription[i]] = [];
					} else {
						occurences[2][strDescription[i]].push(node.ig_url);
					}
					count ++;
				}
			}
		}
		
		//Food mapping
		i = 0;
		
		while (i < strCategories.length && foodCategories.indexOf(strCategories[i].name) == -1) {
			i ++;
		}
		
		if (i < strCategories.length) {
			mappingArray[3].push(node);
			//continue;
			if (occurences[3][strCategories[i].name] == undefined) {
				occurences[3][strCategories[i].name] = [];
			} else {
				occurences[3][strCategories[i].name].push(node.ig_url);
			}
			count ++;
		} else {
			i = 0;
		
			while (i < strDescription.length && foodDescription.indexOf(strDescription[i]) == -1) {
				i ++;
			}
			
			if (i < strDescription.length) {
				mappingArray[3].push(node);
				//continue;
				if (occurences[3][strDescription[i]] == undefined) {
					occurences[3][strDescription[i]] = [];
				} else {
					occurences[3][strDescription[i]].push(node.ig_url);
				}
				count ++;
			} 
		}
		
		//Pet mapping
		i = 0;
		
		while (i < strCategories.length && petCategories.indexOf(strCategories[i].name) == -1) {
			i ++;
		}
		
		if (i < strCategories.length) {
			mappingArray[4].push(node);
			//continue;
			if (occurences[4][strCategories[i].name] == undefined) {
				occurences[4][strCategories[i].name] = [];
			} else {
				occurences[4][strCategories[i].name].push(node.ig_url);
			}
			count ++;
		} else {
			i = 0;
		
			while (i < strTags.length && petTags.indexOf(strTags[i].name) == -1) {
				i ++;
			}
			
			if (i < strTags.length) {
				mappingArray[4].push(node);
				//continue;
				if (occurences[4][strTags[i].name] == undefined) {
					occurences[4][strTags[i].name] = [];
				} else {
					occurences[4][strTags[i].name].push(node.ig_url);
				}
				count ++;
			} else {
				i = 0;
		
				while (i < strDescription.length && petDescription.indexOf(strDescription[i]) == -1) {
					i ++;
				}
				
				if (i < strDescription.length) {
					mappingArray[4].push(node);
					//continue;
					if (occurences[4][strDescription[i]] == undefined) {
						occurences[4][strDescription[i]] = [];
					} else {
						occurences[4][strDescription[i]].push(node.ig_url);
					}
					count ++;
				}
			}
		}
		
		//Fashion mapping
		i = 0;
	
		while (i < strTags.length && fashionTags.indexOf(strTags[i].name) == -1) {
			i ++;
		}
		
		if (i < strTags.length) {
			mappingArray[5].push(node);
			//continue;
			if (occurences[5][strTags[i].name] == undefined) {
				occurences[5][strTags[i].name] = [];
			} else {
				occurences[5][strTags[i].name].push(node.ig_url);
			}
			count ++;
		} else {
			i = 0;
	
			while (i < strDescription.length && fashionDescription.indexOf(strDescription[i]) == -1) {
				i ++;
			}
			
			if (i < strDescription.length) {
				mappingArray[5].push(node);
				//continue;
				if (occurences[5][strDescription[i]] == undefined) {
					occurences[5][strDescription[i]] = [];
				} else {
					occurences[5][strDescription[i]].push(node.ig_url);
				}
				count ++;
			}
		}
		
		//Activities mapping
		i = 0;
		
		while (i < strCategories.length && activitiesCategories.indexOf(strCategories[i].name) == -1) {
			i ++;
		}
		
		if (i < strCategories.length) {
			mappingArray[6].push(node);
			//continue;
			if (occurences[6][strCategories[i].name] == undefined) {
				occurences[6][strCategories[i].name] = [];
			} else {
				occurences[6][strCategories[i].name].push(node.ig_url);
			}
			count ++;
		}
		
		if (count == 0) {
			mappingArray[7].push(node);
			if (occurences[7] == undefined) {
				occurences[7] = [];
			} else {
				occurences[7].push(node.ig_url);
			}
		}		
	}
	
	//console.log(mappingArray);
	console.log(occurences);
	console.log(ctr);
	return mappingArray;
}

export function mappingGoogleLabels(igProcessingData) {
	var i, j, k, l, strLabels, node, mappingArrayGoogle, count, array1, array2;
	var friendsLabels, selfiesLabels, gadgetLabels, foodLabels, petLabels, activitiesLabels, fashionLabels;
	
	mappingArrayGoogle = [[], [], [], [], [], [], [], []];
	friendsLabels = ["friendship", "family", "social group", "people", "crowd", "team", "community", "fun", "event", "party", "tradition", "ceremony"];
	selfiesLabels = ["person", "selfie", "face", "portrait"];
	gadgetLabels = ["car", "motor vehicle", "motorcycle", "motorcycling", "land vehicle", "automotive design", "sports car", 
					"auto show", "electronic device", "technology", "audio equipment", "gadget", "mobile phone", "communication device", 
					"smartphone", "hardware", "portable communications device", "electronics", "feature phone", "headphones", "laptop", 
					"computer keyboard", "netbook", "computer", "computer hardware", "display device", "personal computer", "input device", 
					"bicycle", "bicycle wheel", "mountain biking", "mountain bike", "road bicycle", "scooter", "moped", "mode of transport",
					"racing", "wheel", "motorcycle accessories", "rim", "auto part", "exhaust system", "automotive lighting", "superbike racing"];
	foodLabels = ["dish", "food", "cuisine", "meal", "lunch", "tableware", "brunch", "breakfast", "seafood", "fish", "cookware and bakeware", 
				  "rice", "side dish", "recipe", "baked goods", "junk food", "fried food", "snack", "chocolate", "confectionery", "vegetarian food", 
				  "potato chip", "convenience food"];
	petLabels = ["dog", "dog like mammal", "puppy", "fur", "whiskers", "companion dog", "cat", "cat like mammal", "mammal", "wildlife", "marsupial", 
				 "terrestrial animal", "marine mammal", "marine biology", "fauna", "invertebrate", "insect", "spider", "tarantula", "bird", "organism"];
	activitiesLabels = ["vacation", "recreation", "adventure", "tree", "sky", "outdoor recreation", "town", "evening", "city", "travel", "christmas", 
						"winter", "building", "property", "urban area", "house", "neighbourhood", "residential area", "landmark", "cityscape", 
						"tourist attraction", "skyline", "snow", "water", "nature", "wilderness", "lake", "mount scenery", "national park", "woodland", 
						"autumn", "outdoor structure", "sea", "ocean", "island", "walkway", "park", "metropolis", "grass", "vegetation", "architecture", 
						"hiking", "horizon", "plain", "field", "landscape", "fun", "event", "party", "mountainous landforms", "tourism", "street", 
						"world", "sport venue", "structure", "stadium", "arena", "crowd", "atmosphere", "competition event", "stage", "concert", 
						"entertainment", "rock concert", "performance", "singing", "event", "performing arts", "theatre", "scene", "public event", 
						"music venue", "night", "midnight", "guitarist", "audience", "light", "festival", "christmas lights"];
	fashionLabels = ["clothing", "footwear", "shoe", "leggings", "jeans", "trousers", "sleeve", "design", "outerwear", "button", "coat", "jacket", 
					 "boot", "gown", "dress", "fashion model", "model", "formal wear", "jewellery", "necklace", "chain", "earrings", "boutique", 
					 "undergarment", "lingerie", "brassiere", "nail care", "manicure", "finger", "nail", "sunglasses", "shorts", "trunk", "costume", 
					 "shoulder", "suit", "denim", "blazer", "fashion accessory", "headgear", "tartan", "beanie", "cap", "beauty", "leg", "long hair", 
					 "eyebrow", "face", "blond", "human hair color", "hair coloring", "eyelash", "eye liner", "makeover", "robe", "day dress", "handbag", 
					 "bag", "tuxedo", "hairstyle", "lotion", "cosmetics", "skin care", "eye shadow", "eyelash extensions", "makeup artist", "lip gloss",
					 "cosplay", "hair accessory"];
	
		
	try {
		for (node of igProcessingData) {
			strLabels = node.google.responses[0].labelAnnotations;
			count = 0;
			
			i = 0;
			
			while (i < strLabels.length && !friendsLabels.includes(strLabels[i].description)) {
				i ++;
			}
			
			if (i < strLabels.length) {
				mappingArrayGoogle[0].push(node);
				if (occurences[0][strLabels[i].description] == undefined) {
					occurences[0][strLabels[i].description] = [];
				} else {
					occurences[0][strLabels[i].description].push(node.ig_url);
				}
				count ++;
			}
			
			i = 0;
			
			while (i < strLabels.length && !selfiesLabels.includes(strLabels[i].description)) {
				i ++;
			}
			
			if (i < strLabels.length) {
				mappingArrayGoogle[1].push(node);
				if (occurences[1][strLabels[i].description] == undefined) {
					occurences[1][strLabels[i].description] = [];
				} else {
					occurences[1][strLabels[i].description].push(node.ig_url);
				}
				count ++;
			}
				
			i = 0;
			
			while (i < strLabels.length && !gadgetLabels.includes(strLabels[i].description)) {
				i ++;
			}
			
			if (i < strLabels.length) {
				mappingArrayGoogle[2].push(node);
				if (occurences[2][strLabels[i].description] == undefined) {
					occurences[2][strLabels[i].description] = [];
				} else {
					occurences[2][strLabels[i].description].push(node.ig_url);
				}
				count ++;
			}
			
			i = 0;
			
			while (i < strLabels.length && !foodLabels.includes(strLabels[i].description)) {
				i ++;
			}
			
			if (i < strLabels.length) {
				mappingArrayGoogle[3].push(node);
				if (occurences[3][strLabels[i].description] == undefined) {
					occurences[3][strLabels[i].description] = [];
				} else {
					occurences[3][strLabels[i].description].push(node.ig_url);
				}
				count ++;
			}
			
			i = 0;
			
			while (i < strLabels.length && !petLabels.includes(strLabels[i].description)) {
				i ++;
			}
			
			if (i < strLabels.length) {
				mappingArrayGoogle[4].push(node);
				if (occurences[4][strLabels[i].description] == undefined) {
					occurences[4][strLabels[i].description] = [];
				} else {
					occurences[4][strLabels[i].description].push(node.ig_url);
				}
				count ++;
			}
				
			i = 0;
			
			while (i < strLabels.length && !fashionLabels.includes(strLabels[i].description)) {
				i ++;
			}
			
			if (i < strLabels.length) {
				mappingArrayGoogle[5].push(node);
				if (occurences[5][strLabels[i].description] == undefined) {
					occurences[5][strLabels[i].description] = [];
				} else {
					occurences[5][strLabels[i].description].push(node.ig_url);
				}
				count ++;
			}
			
			i = 0;
			
			while (i < strLabels.length && !activitiesLabels.includes(strLabels[i].description)) {
				i ++;
			}
			
			if (i < strLabels.length) {
				mappingArrayGoogle[6].push(node);
				if (occurences[6][strLabels[i].description] == undefined) {
					occurences[6][strLabels[i].description] = [];
				} else {
					occurences[6][strLabels[i].description].push(node.ig_url);
				}
				count ++;
			}
				
			if (count == 0) {
				mappingArrayGoogle[7].push(node);
				if (occurences[7] == undefined) {
					occurences[7] = [];
				} else {
					occurences[7].push(node.ig_url);
				}
			}
		}
	} catch (e) {}
	
	console.log(mappingArray);
	console.log(mappingArrayGoogle);
	
	for (i = 0; i < mappingArray.length; i ++) {
		array1 = mappingArray[i];
		array2 = mappingArrayGoogle[i];
		
		for (j = 0; j < array2.length; j ++) {
			k = 0;

			while (k < array1.length && array2[j].ig_id != array1[k].ig_id) {
				k ++;
			}
			
			if (k == array1.length) {
				mappingArray[i].push(array2[j])
			}
		}
	}
	
	console.log(mappingArray);
	return mappingArray;
}

export function getMappingArray() {
	return mappingArray;
}

export function getLikesArray() {
	return likesArray;
}

export function getLikesArray2() {
	return likesArray2;
}

export function getHashtag() {
	return hashtag;
}

export function getHashtag2() {
	return hashtag2;
}

export function getIGProcessingMS() {
	return processing;
}

export function getIGMedia() {
	return media;
}

export function getIGMedia2() {
	return media2;
}

export function getCompleteFiltered(){
    return filterByYearMonthDay(media);
}
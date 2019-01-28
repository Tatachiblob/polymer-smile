import { getIGProcessing } from './dataRetrieve.js';
import { getFullIGMedia, getIGMediaNew } from './dataRetrieve.js';
import { getIGProcessingGoogle, getGoogleProcessingRange } from './dataRetrieve.js';

var text = '';
var start = Math.round(new Date(sessionStorage.getItem('startDate')).getTime() / 1000), end = Math.round(new Date(sessionStorage.getItem('endDate')).getTime() / 1000);
var igProcessing = getGoogleProcessingRange(start, end, sessionStorage.getItem("hashtagInput"));
$(document).ready(function(){
	filterByYear();
	var data = getLabels(igProcessing);

	var chart = Highcharts.chart('word-cloud', {
        chart: {
            //height: 480,
        },
		series: [{
			type: 'wordcloud',
            turboThreshold: 100000,
			data: data,
			name: 'Occurrences',
			cursor: 'pointer',
			point: {
				events: {
					click: function() {
						//alert ('Category: '+ this.name +', value: '+ this.weight);	
						var urls = findLabels(this.name);
						var images = '<div class="row">';
						
						for (var i = 0; i < urls.length; i ++) {
							images += '<div class="col-sm-2 padding-10"><img src="' + urls[i] + '" height="90" width="90"></div>';
							if ((i + 1) % 6 == 0) {
								images += '</div><div class="row">';
							}
						}
						
						document.getElementById("title").innerHTML = this.name + " Label Images";
						document.getElementById("pics").innerHTML = images + '</div>';
						$('#myModal').modal('show');
					}
				}
			}
		}],
		title: {
			text: 'Wordcloud of the Top 30 Labels'
		},
        boost: {
            useGPUTranslations: true
        },
        animationLimit: 1
	});
	
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "consumer-analysis" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "post-event" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary") {
		console.log(chart.series[0].points);
		
		/*
		Wordcloud from labels indicates the words associated with the images, 
		and the usual words are chart.series[0].points[0].name, _, _, _, and _ with the number of occurences
		being chart.series[0].points[0].weight, _, _, _, and _.
		*/
		var i, wordcloud, wordsArray;
		
		wordsArray = chart.series[0].points.slice(0, 5);
		//wordcloud = "<b>Wordcloud from labels</b> indicates the words associated with the images, and the usual words are ";
		wordcloud = "<b>Wordcloud from labels</b><br><table class='table'><thead><tr><th>Label</th><th>Occurences</th></tr></thead><tbody>";
		
		for (i = 0; i < wordsArray.length; i ++) {
			/*if (i === 0) {
				sessionStorage.setItem("labelName", wordsArray[i].name);
				sessionStorage.setItem("labelValue", wordsArray[i].weight);
			}*/
			wordcloud += "<tr><td>" + wordsArray[i].name + "</td><td>" + wordsArray[i].weight + "</td></tr>";
		}
		wordcloud += "</tbody></table>";
		/*
		for (i = 0; i < wordsArray.length; i ++) {
			if (wordsArray.length - 1 == i) {
				wordcloud += "and " + wordsArray[i].name;
			} else {
				wordcloud += wordsArray[i].name + ", ";
			}
		}
		
		wordcloud += " with the number of occurences being ";
		
		for (i = 0; i < wordsArray.length; i ++) {
			if (wordsArray.length - 1 == i) {
				wordcloud += "and " + wordsArray[i].weight + ".";
			} else {
				wordcloud += wordsArray[i].weight + ", ";
			}
		}
		*/

		//console.log(sessionStorage.getItem("labelName"));
		//console.log(sessionStorage.getItem("labelValue"));
		try {
            document.getElementById("wordcloud-labels").innerHTML = wordcloud;
        } catch (e) {}
	}
});

function findLabels(labelName){
	labelName = labelName.toLowerCase();
	var igWord = [];
	for(let media of igProcessing){
		if(media.hasOwnProperty('google')){
			if(media.google.responses[0].hasOwnProperty('labelAnnotations')){
				var google = media.google.responses[0].labelAnnotations;
				for(let label of google){
					if(label.hasOwnProperty('description')){
						var tempWord = label.description;
						tempWord = tempWord.toLowerCase();
						if(tempWord.indexOf(labelName) !== -1){
							console.log('included inside the word.');
							if(igWord.indexOf(media.ig_url) === -1)
								igWord.push(media.ig_url);
						}
					}
				}
			}
		}
	}
	return igWord;
}

function getLabels(igProcessing){
	var textLabel = "";
	var i = 0;
	for(let media of igProcessing){
		if(media.hasOwnProperty('google')){
			if(media.google.responses[0].hasOwnProperty('labelAnnotations')){
				var google = media.google.responses[0].labelAnnotations;
				for(let label of google){
					if(label.hasOwnProperty('description')){
						textLabel += label.description + " ";
					}
				}
			}
		}
		i++;
	}
	return getTopFrequency(textLabel);
}

function getTopFrequency(string) {
    var tempObj = {}, obj = [];
    var cleanString = string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""),
        cleanString = cleanString.trim(),
        words = cleanString.split(' '),
        frequencies = {},
        word, frequency, i;

    for( i=0; i<words.length; i++ ) {
        word = words[i];
        frequencies[word] = frequencies[word] || 0;
        frequencies[word]++;
    }
    delete frequencies[""];

    var sorted = Object.keys(frequencies).sort(function(a,b){return frequencies[b]-frequencies[a]});
    for(var i = 0; i < sorted.length && i <= 30; i++){
        tempObj.name = sorted[i];
        tempObj.weight = frequencies[sorted[i]];
        obj.push(tempObj);
        tempObj = {};
    }
/*
    var tableHtml = "";
    for(var i = 0; i < obj.length; i++){
        tableHtml += '<tr><th scopr="row"></th><td>' + obj[i].name + '</td><td>' + obj[i].weight + '</td></tr>';
    }

    $("#textCaptionTable").html(tableHtml);
*/
    return obj;
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
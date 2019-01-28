import { getIGMediaNew, getIGHistory, getSpecificRange} from './dataRetrieve.js';

var text = '';
var name = "";
var chart;
var currHashtag = sessionStorage.getItem("hashtagInput");
var start = Math.round(new Date(sessionStorage.getItem('startDate')).getTime() / 1000), end = Math.round(new Date(sessionStorage.getItem('endDate')).getTime() / 1000);
var igProcessing = getSpecificRange(start, end,currHashtag);
$(document).ready(function(){
    initializeWordcloud(igProcessing, name, currHashtag);
	comparisonReport(name);
	
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "comparison-report") {
		currHashtag = getIGHistory()[1].search_hashtag;
		igProcessing = getIGMediaNew(currHashtag);
		name += 2;
		
		initializeWordcloud(igProcessing, name, currHashtag);
		comparisonReport(name);
	}
	
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "engagement-report" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary") {
		//console.log(chart.series[0].points);
		
		/*
		Wordcloud from labels indicates the words associated with the images, 
		and the usual words are chart.series[0].points[0].name, _, _, _, and _ with the number of occurences
		being chart.series[0].points[0].weight, _, _, _, and _.
		*/
		var i, wordcloud, wordsArray;
		
		wordsArray = chart.series[0].points.slice(0, 5);
		//wordcloud = "<b>Wordcloud from related hashtags</b> indicates the words associated with the current hashtag, and the usual words are ";
		
		/*for (i = 0; i < wordsArray.length; i ++) {
            if (i === 0) {
                sessionStorage.setItem("relatedHashtagName", wordsArray[i].name);
            }
			if (wordsArray.length - 1 == i) {
				wordcloud += "and " + wordsArray[i].name;
			} else {
				wordcloud += wordsArray[i].name + ", ";
			}
		}
		
		wordcloud += " with the number of occurences being ";
		
		for (i = 0; i < wordsArray.length; i ++) {
            if (i === 0) {
                sessionStorage.setItem("relatedHashtagValue", wordsArray[i].weight);
            }
			if (wordsArray.length - 1 == i) {
				wordcloud += "and " + wordsArray[i].weight + ".";
			} else {
				wordcloud += wordsArray[i].weight + ", ";
			}
		}*/

        wordcloud = "<b>Wordcloud from related hashtags</b><br><table class='table'><thead><tr><th>Label</th><th>Occurences</th></tr></thead><tbody>";

        for (i = 0; i < wordsArray.length; i ++) {
            /*if (i === 0) {
                sessionStorage.setItem("labelName", wordsArray[i].name);
                sessionStorage.setItem("labelValue", wordsArray[i].weight);
            }*/
            wordcloud += "<tr><td>" + wordsArray[i].name + "</td><td>" + wordsArray[i].weight + "</td></tr>";
        }
        wordcloud += "</tbody></table>";

        //console.log(sessionStorage.getItem("relatedHashtagName"));
        //console.log(sessionStorage.getItem("relatedHashtagValue"));
		try {
            document.getElementById("wordcloud-related-hashtags").innerHTML = wordcloud;
        } catch (e) {}
	}
});

function comparisonReport(name) {
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "comparison-report") {
		var i, wordsArray, wordcloud;
		
		wordcloud = "Related hashtags are:<ul>";
		wordsArray = chart.series[0].points.slice(0, 5);
		
		for (i = 0; i < wordsArray.length; i ++) {
			wordcloud += "<li>" + wordsArray[i].name; + "</li>";
		}
		
		document.getElementById("wordcloud-related-hashtags" + name).innerHTML = wordcloud;
	}
}
function initializeWordcloud(igProcessing, name, currHashtag) {
	var data = getLabels(igProcessing, currHashtag);

    chart = Highcharts.chart('word-cloud-related-hashtags' + name, {
        chart: {
            //height: 400,
        },
        series: [{
            type: 'wordcloud',
            data: data,
            name: 'Occurrences',
            cursor: 'pointer',
            point: {
                events: {
                    click: function() {
                        //alert ('Category: '+ this.name +', value: '+ this.weight);
                        var urls = findLabels(this.name, igProcessing);
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
            },
            turboThreshold: 0
        }],
        title: {
            text: 'Wordcloud of the Top 30 Linked Hashtags'
        }
    });
}

function findLabels(labelName, igProcessing){
    labelName = labelName.toLowerCase();
    var igWord = [];
	var filterYear;
    for(let a of igProcessing){
		filterYear = new Date((a.ig_object.taken_at_timestamp) * 1000);
		if (filterYear.getFullYear() == sessionStorage.getItem("year")) {
			for(let caption of a.ig_object.edge_media_to_caption.edges){
				var tempHashtag = findHashtags(caption.node.text);
				if(tempHashtag.indexOf(labelName) !== -1){
					if(igWord.indexOf(a.ig_object.display_url) === -1)
						igWord.push(a.ig_object.display_url);
				}
			}
		}
    }

    for(let media of igProcessing){
        if(media.hasOwnProperty('google')){
            if(media.google.responses[0].hasOwnProperty('labelAnnotations')){
                var google = media.google.responses[0].labelAnnotations;
                for(let label of google){
                    if(label.hasOwnProperty('description')){
                        var tempWord = label.description;
                        if(tempWord.indexOf(labelName) !== -1){
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

function getLabels(igProcessing, currHashtag){
    var hashtagArr = [];
    var hashtag = "";
    var curHashtag = '#' + currHashtag;
	var filterYear;
    for(let a of igProcessing){
		//filterYear = new Date((a.ig_object.taken_at_timestamp) * 1000);
		//if (filterYear.getFullYear() == sessionStorage.getItem("year")) {
			for(let caption of a.ig_object.edge_media_to_caption.edges){
				var text = caption.node.text;
				for(let b of findHashtags(text, curHashtag)){
				    hashtagArr.push(b);
                }
				//if(hashtagArr.length > 200)
					//break;
			}
			//if(hashtagArr.length > 200)
				//break;
		//}
    }
    for(let t of hashtagArr)
        hashtag += t + ' ';
    return getTopHashtags(hashtagArr);
}

function findHashtags(searchText, curHashtag) {
    var regexp = /\B\#\w\w+\b/g
    var result = searchText.match(regexp);
    if (result) {
		for(var i = 0; i < result.length; i++) {
            result[i] = result[i].toLowerCase();
            if(result[i] === curHashtag){
                result.splice(i, 1);
            }
        }
        return result;
    }
    else {
        return "";
    }
}

function getTopHashtags(hashtagArr){
    var frequency = {};  // array of frequency.
    var max = 0;  // holds the max frequency.
    var result;   // holds the max frequency element.
    for(var v in hashtagArr) {
        frequency[hashtagArr[v]]=(frequency[hashtagArr[v]] || 0)+1; // increment frequency.
        if(frequency[hashtagArr[v]] > max) { // is this frequency > max so far ?
            max = frequency[hashtagArr[v]];  // update max.
            result = hashtagArr[v];          // update result.
        }
    }
    var tempObj = {};
    hashtagArr = [];
    var sorted = Object.keys(frequency).sort(function(a,b){return frequency[b]-frequency[a]});
    for(var i = 0; i < sorted.length && i <= 30; i++){
        tempObj.name = sorted[i];
        tempObj.weight = frequency[sorted[i]];
        hashtagArr.push(tempObj);
        tempObj = {};
    }

    var tableHtml = "";
    for(var i = 0; i < hashtagArr.length; i++){
        tableHtml += '<tr><th scopr="row"></th><td>' + hashtagArr[i].name + '</td><td>' + hashtagArr[i].weight + '</td></tr>';
    }

    $("#hashtagTable").html(tableHtml);

    return hashtagArr;
}
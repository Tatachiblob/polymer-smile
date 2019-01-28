import { getIGMediaNew, getIGHistory, getSpecificRange } from './dataRetrieve.js';

var text = '';
var name = "";
var chart;
var currHashtag = sessionStorage.getItem("hashtagInput");
var start = Math.round(new Date(sessionStorage.getItem('startDate')).getTime() / 1000), end = Math.round(new Date(sessionStorage.getItem('endDate')).getTime() / 1000);
console.log(sessionStorage.getItem('startDate'));
console.log(sessionStorage.getItem('endDate'));
var igProcessing = getSpecificRange(start, end,currHashtag);
$(document).ready(function(){
    initializeWordcloud(igProcessing, name);
	comparisonReport(name);
	
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "comparison-report") {
		currHashtag = getIGHistory()[1].search_hashtag;
		igProcessing = getIGMediaNew(currHashtag);
		name += 2;
		
		initializeWordcloud(igProcessing, name);
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
		//wordcloud = "<b>Wordcloud from text captions</b> indicates the words often used with the images, and the usual words are ";
		
		/*for (i = 0; i < wordsArray.length; i ++) {
		    if (i === 0) {
		        console.log(wordsArray[i].name);
		        //sessionStorage.setItem("captionName", wordsArray[i].name);
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
                console.log(wordsArray[i].weight);
		        //sessionStorage.setItem("captionValue", wordsArray[i].weight);
            }
			if (wordsArray.length - 1 == i) {
				wordcloud += "and " + wordsArray[i].weight + ".";
			} else {
				wordcloud += wordsArray[i].weight + ", ";
			}
		}*/

        wordcloud = "<b>Wordcloud from caption</b><br><table class='table'><thead><tr><th>Label</th><th>Occurences</th></tr></thead><tbody>";

        for (i = 0; i < wordsArray.length; i ++) {
            /*if (i === 0) {
                sessionStorage.setItem("labelName", wordsArray[i].name);
                sessionStorage.setItem("labelValue", wordsArray[i].weight);
            }*/
            wordcloud += "<tr><td>" + wordsArray[i].name + "</td><td>" + wordsArray[i].weight + "</td></tr>";
        }
        wordcloud += "</tbody></table>";

        //console.log(sessionStorage.getItem("captionName"));
        //console.log(sessionStorage.getItem("captionValue"));
		try {
            document.getElementById("wordcloud-caption").innerHTML = wordcloud;
        } catch (e) {}
	}
});

function comparisonReport(name) {
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "comparison-report") {
		var i, wordsArray, wordcloud;
		
		wordcloud = "Common words are:<ul>";
		wordsArray = chart.series[0].points.slice(0, 5);
		
		for (i = 0; i < wordsArray.length; i ++) {
			wordcloud += "<li>" + wordsArray[i].name; + "</li>";
		}
		
		document.getElementById("wordcloud-caption" + name).innerHTML = wordcloud + "</ul>";
	}
}

function initializeWordcloud(igProcessing, name) {
	var data = getLabels(igProcessing);

    chart = Highcharts.chart('word-cloud-caption' + name, {
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
            }
        }],
        title: {
            text: 'Wordcloud of the Top 30 Words from Text Captions'
        }
    });
}

function findLabels(labelName, igProcessing){
    labelName = labelName.toLowerCase();
    var igWord = [];
	var filterYear;
    for(let a of igProcessing){
		//filterYear = new Date((a.ig_object.taken_at_timestamp) * 1000);
		//if (filterYear.getFullYear() == sessionStorage.getItem("year")) {
			for(let caption of a.ig_object.edge_media_to_caption.edges){
				var regexp = new RegExp('#([^\\s]*)','g');
				var text = caption.node.text.replace(regexp, '').toLowerCase();
				if(text.indexOf(labelName) !== -1){
					if(igWord.indexOf(a.ig_object.display_url) === -1)
						igWord.push(a.ig_object.display_url);
				}
			}
		//}
    }
    return igWord;
}

function getLabels(igProcessing){
    var textArr = [];
    var textLabel = "";
	var filterYear;
    var regexp = new RegExp('#([^\\s]*)','g');
    for(let a of igProcessing){
		//filterYear = new Date((a.ig_object.taken_at_timestamp) * 1000);
		//if (filterYear.getFullYear() == sessionStorage.getItem("year")) {
			for(let caption of a.ig_object.edge_media_to_caption.edges){
				var text = caption.node.text.replace(regexp, '');
				text = text.replace(/[^\w\s]/gi, '');
				text = text.replace(/\n/g, '');
				text = text.trim();
				text = text.toLocaleLowerCase();
				if (text)
					text = removeStoppingWords(text);
				if(text !== "")
				    textArr.push(text);

				//if(textArr.length > 200)
				//	break;
			}
			//if(textArr.length > 200)
			//	break;
		//}
    }
    //textLabel = textLabel.replace(/[^\w\s]/gi, '');
	for(let t of textArr) {
        textLabel += t +' ';
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
    var tableHtml = "";
    for(var i = 0; i < obj.length; i++){
        if(i == 0){
            sessionStorage.setItem("captionName", obj[i].name);
            sessionStorage.setItem("captionValue", obj[i].weight);
        }
        tableHtml += '<tr><th scopr="row"></th><td>' + obj[i].name + '</td><td>' + obj[i].weight + '</td></tr>';
    }

    $("#textCaptionTable").html(tableHtml);
    //console.log(sessionStorage.getItem("captionName"));
    //console.log(sessionStorage.getItem("captionValue"));
    return obj;
}

function removeStoppingWords(words) {
    var x;
    var y;
    var word;
    var stop_word;
    var regex_str;
    var regex;
    var cleansed_string = words;
    var stop_words = new Array(
        'a',
        'aku',
        'about',
        'above',
        'across',
        'after',
        'again',
        'against',
        'all',
        'almost',
        'alone',
        'along',
        'already',
        'also',
        'although',
        'always',
        'among',
        'an',
        'am',
        'ako',
        'akin',
        'aking',
        'and',
        'ang',
        'another',
        'any',
        'anybody',
        'anyone',
        'anything',
        'anywhere',
        'are',
        'area',
        'areas',
        'around',
        'as',
        'ask',
        'asked',
        'asking',
        'asks',
        'at',
        'ay',
        'away',
        'b',
        'back',
        'backed',
        'backing',
        'backs',
        'be',
        'became',
        'because',
        'become',
        'becomes',
        'been',
        'before',
        'began',
        'behind',
        'being',
        'beings',
        'best',
        'better',
        'between',
        'big',
        'both',
        'but',
        'by',
        'c',
        'came',
        'can',
        'cannot',
        'case',
        'cases',
        'certain',
        'certainly',
        'clear',
        'clearly',
        'come',
        'could',
        'd',
        'de',
        'did',
        'differ',
        'different',
        'differently',
        'din',
        'do',
        'dont',
        'does',
        'done',
        'down',
        'down',
        'downed',
        'downing',
        'downs',
        'during',
        'e',
        'each',
        'early',
        'either',
        'end',
        'ended',
        'ending',
        'ends',
        'enough',
        'even',
        'evenly',
        'ever',
        'every',
        'everybody',
        'everyone',
        'everything',
        'everywhere',
        'f',
        'face',
        'faces',
        'fact',
        'facts',
        'far',
        'felt',
        'few',
        'find',
        'finds',
        'first',
        'for',
        'four',
        'from',
        'full',
        'fully',
        'further',
        'furthered',
        'furthering',
        'furthers',
        'g',
        'gave',
        'general',
        'generally',
        'get',
        'gets',
        'give',
        'given',
        'gives',
        'go',
        'going',
        'good',
        'goods',
        'got',
        'great',
        'greater',
        'greatest',
        'group',
        'grouped',
        'grouping',
        'groups',
        'h',
        'had',
        'has',
        'have',
        'having',
        'he',
        'her',
        'here',
        'herself',
        'high',
        'high',
        'high',
        'higher',
        'highest',
        'him',
        'himself',
        'his',
        'how',
        'however',
        'i',
        'if',
        'im',
        'important',
        'in',
        'interest',
        'interested',
        'interesting',
        'interests',
        'into',
        'is',
        'it',
        'its',
        'itself',
        'j',
        'just',
        'k',
        'keep',
        'keeps',
        'kind',
        'knew',
        'know',
        'known',
        'knows',
        'l',
        'large',
        'largely',
        'last',
        'later',
        'latest',
        'least',
        'less',
        'let',
        'lets',
        'like',
        'likely',
        'long',
        'longer',
        'longest',
        'm',
        'made',
        'make',
        'making',
        'man',
        'many',
        'may',
        'me',
        'member',
        'members',
        'men',
        'mga',
        'might',
        'more',
        'most',
        'mostly',
        'mr',
        'mrs',
        'much',
        'must',
        'my',
        'myself',
        'n',
        'na',
        'necessary',
        'need',
        'needed',
        'needing',
        'needs',
        'never',
        'new',
        'new',
        'newer',
        'newest',
        'next',
        'niya',
        'nya',
        'ng',
        'no',
        'nobody',
        'non',
        'noone',
        'not',
        'nothing',
        'now',
        'nowhere',
        'number',
        'numbers',
        'o',
        'of',
        'off',
        'often',
        'old',
        'older',
        'oldest',
        'on',
        'once',
        'one',
        'only',
        'open',
        'opened',
        'opening',
        'opens',
        'or',
        'order',
        'ordered',
        'ordering',
        'orders',
        'other',
        'others',
        'our',
        'out',
        'over',
        'p',
        'part',
        'parted',
        'parting',
        'parts',
        'per',
        'perhaps',
        'place',
        'places',
        'point',
        'pointed',
        'pointing',
        'points',
        'possible',
        'present',
        'presented',
        'presenting',
        'presents',
        'problem',
        'problems',
        'put',
        'puts',
        'q',
        'quite',
        'r',
        'rather',
        'really',
        'right',
        'right',
        'room',
        'rooms',
        's',
        'sa',
        'said',
        'same',
        'saw',
        'say',
        'says',
        'second',
        'seconds',
        'see',
        'seem',
        'seemed',
        'seeming',
        'seems',
        'sees',
        'several',
        'shall',
        'she',
        'should',
        'show',
        'showed',
        'showing',
        'shows',
        'side',
        'sides',
        'since',
        'small',
        'smaller',
        'smallest',
        'so',
        'some',
        'somebody',
        'someone',
        'something',
        'somewhere',
        'state',
        'states',
        'still',
        'still',
        'such',
        'sure',
        't',
        'take',
        'taken',
        'than',
        'that',
        'the',
        'their',
        'them',
        'then',
        'there',
        'therefore',
        'these',
        'they',
        'thing',
        'things',
        'think',
        'thinks',
        'this',
        'those',
        'though',
        'thought',
        'thoughts',
        'three',
        'through',
        'thus',
        'to',
        'today',
        'together',
        'too',
        'took',
        'toward',
        'turn',
        'turned',
        'turning',
        'turns',
        'two',
        'u',
        'under',
        'until',
        'up',
        'upon',
        'us',
        'use',
        'used',
        'uses',
        'v',
        'very',
        'w',
        'want',
        'wanted',
        'wanting',
        'wants',
        'was',
        'way',
        'ways',
        'we',
        'well',
        'wells',
        'went',
        'were',
        'what',
        'when',
        'where',
        'whether',
        'which',
        'while',
        'who',
        'whole',
        'whose',
        'why',
        'will',
        'with',
        'within',
        'without',
        'work',
        'worked',
        'working',
        'works',
        'would',
        'x',
        'y',
        'year',
        'years',
        'yet',
        'you',
        'young',
        'younger',
        'youngest',
        'your',
        'yours',
        'z',
        "ako",
        "sa",
        "akin",
        "ko",
        "aking",
        "sarili",
        "kami",
        "atin",
        "ang",
        "aming",
        "amin",
        "ating",
        "ka",
        "iyong",
        "iyo",
        "inyong",
        "siya",
        "kanya",
        "mismo",
        "ito","nito","kanyang","sila","nila","kanila","kanilang","kung","ano","alin","sino",
        "kanino","na","mga","iyon","am","ay","maging","naging","mayroon","may","nagkaroon","pagkakaroon",
        "gumawa","ginagawa","ginawa","paggawa","ibig","dapat","maaari","marapat","kong","ikaw","tayo","hindi",
        "namin","gusto","nais","niyang","nilang","niya","huwag","ginawang","gagawin","maaaring","sabihin","narito",
        "kapag","ni","nasaan","bakit","paano","kailangan","walang","katiyakan","isang","at","pero","o","dahil","bilang",
        "hanggang","habang","ng","pamamagitan","para","tungkol","laban","pagitan","panahon","bago","pagkatapos","itaas",
        "ibaba","mula","pataas","pababa","palabas","ibabaw","ilalim","muli","pa","minsan","dito","doon","saan","lahat",
        "anumang","kapwa","bawat","ilan","karamihan","iba","tulad","lamang","pareho","kaya","kaysa","masyado","napaka",
        "isa","bababa","kulang","marami","ngayon","kailanman","sabi","nabanggit","din","kumuha","pumunta","pumupunta",
        "ilagay","makita","nakita","katulad","mahusay","likod","kahit","paraan","noon","gayunman","dalawa","tatlo","apat","lima","una","pangalawa"
    )

    // Split out all the individual words in the phrase
    words = cleansed_string.match(/[^\s]+|\s+[^\s+]$/g)

    // Review all the words
    for(x=0; x < words.length; x++) {
        // For each word, check all the stop words
        for(y=0; y < stop_words.length; y++) {
            // Get the current word
            word = words[x].replace(/\s+|[^a-z]+/ig, "");   // Trim the word and remove non-alpha

            // Get the stop word
            stop_word = stop_words[y];

            // If the word matches the stop word, remove it from the keywords
            if(word.toLowerCase() == stop_word) {
                // Build the regex
                regex_str = "^\\s*"+stop_word+"\\s*$";      // Only word
                regex_str += "|^\\s*"+stop_word+"\\s+";     // First word
                regex_str += "|\\s+"+stop_word+"\\s*$";     // Last word
                regex_str += "|\\s+"+stop_word+"\\s+";      // Word somewhere in the middle
                regex = new RegExp(regex_str, "ig");

                // Remove the word from the keywords
                cleansed_string = cleansed_string.replace(regex, " ");
            }
        }
    }
    return cleansed_string.replace(/^\s+|\s+$/g, "");
}


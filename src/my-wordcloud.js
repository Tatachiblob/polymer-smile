import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@vaadin/vaadin-grid';
import 'highcharts/highcharts.js';
import 'highcharts/modules/wordcloud.js';
import './bootstrap-style.js';
import './shared-styles.js';


class MyWordcloud extends PolymerElement {
	static get template() {
		return html`
		<style include="bootstrap-style"></style>
		<style include="shared-styles">
			:host {
				display: block;
				padding: 10px;
			}
			
			table {
			  	height: 500px;
			  	overflow-y: scroll;
			}
			
			.table-wrapper-scroll-y {
				display: block;
				max-height: 200px;
				overflow-y: auto;
				-ms-overflow-style: -ms-autohiding-scrollbar;
			}
		</style>
		
		<iron-ajax
			id="wordcloudCaptionHashtagAjax"
			url="{{ajaxUrl}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse"
			debounce-duration="300">
		</iron-ajax>
		
		<div class="row">
			<div class="col-md-5 col-md-offset-7">
				<div class="card">
					<div class="row">
						<div class="col-md-9">
							<paper-input label="Wordcloud Count Limit" type="number" error-message="Numbers only!" value="{{wordLimit}}"></paper-input>
						</div>
						<div class="col-md-3" style="margin-top: 10px;">
							<paper-button raised on-click="__wordcloudLimit">OK</paper-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="card">
			<div class="card">
				<div id="wordcloudCaption"></div>
			</div>
			<div class="card">
				<div id="wordcloudHashtag"></div>
			</div>
			<div class="card">
				<div class="row">
					<div class="col-md-6">
						<div class="table-wrapper-scroll-y">
							<table class="table table-bordered">
								<thead class="thead-dark">
									<tr>
										<th scope="col">#</th>
										<th scope="col">Caption</th>
										<th scope="col">Count</th>
									</tr>
								</thead>
								<tbody>
									<template is="dom-repeat" items="{{topCaption}}">
										<tr>
											<th scope="row">{{__displayIndex(index)}}</th>
											<td>{{item.name}}</td>
											<td>{{item.weight}}</td>
										</tr>
									</template>
								</tbody>
							</table>
						</div>
					</div>
					<div class="col-md-6">
						<div class="table-wrapper-scroll-y">
							<table class="table table-bordered">
								<thead class="thead-dark">
									<tr>
										<th scope="col">#</th>
										<th scope="col">Hashtag</th>
										<th scope="col">Count</th>
									</tr>
								</thead>
								<tbody>
									<template is="dom-repeat" items="{{topHashtag}}">
										<tr>
											<th scope="row">{{__displayIndex(index)}}</th>
											<td>{{item.name}}</td>
											<td>{{item.weight}}</td>
										</tr>
									</template>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		`;
	}
	
	static get properties() {
		return {
			hashtag: {
				type: String
			},
			mediaIdArr: Array,
			ajaxUrl: String,
			topCaption: Array,
			topHashtag: Array,
			wordcloudData: Array,
			wordLimit: {
				type: Number,
				value: 30,
			}
		}
	}
	
	generateWordcloudRequest(){
		this.ajaxUrl = this.__createUrl();
		this.$.wordcloudCaptionHashtagAjax.generateRequest();
	}

	__wordcloudLimit(){
		this.wordLimit = Math.abs(this.wordLimit);
		// console.log(this.data);
		this.__renderWordcloud(this.data);
	}
	
	__handleResponse(event, res){
		//console.log(this.ajaxUrl);
		this.data = res.response._embedded;
		this.__renderWordcloud(res.response._embedded);
	}
	
	__renderWordcloud(data){
		
		Highcharts.chart(this.$.wordcloudCaption, {
			series: [{
				type: 'wordcloud',
				turboThreshold: 100000,
				data: this.__getLabels(data),
				name: 'Occurrences',
				cursor: 'pointer',
				point: {
					events: {
						click: function(e){
							let p = e.point;
							this.dispatchEvent(new CustomEvent('modal1', {detail: {title: "Images with Caption containing " + p.options.name, imgs: p.options.url}}));
						}.bind(this)
					}
				}
			}],
			
			title: {
				text: "Wordcloud of the Top " + this.wordLimit + " Words from Text Captions"
			}
		});
		
		Highcharts.chart(this.$.wordcloudHashtag, {
			series: [{
				type: 'wordcloud',
				data: this.__getHashtagLabels(data),
				name: 'Occurrences',
				cursor: 'pointer',
				point: {
					events: {
						click: function(e){
							let p = e.point;
							this.dispatchEvent(new CustomEvent('modal1', {detail: {title: "Images with Hashtag containing " + p.options.name, imgs: p.options.url}}));
						}.bind(this)
					}
				}
			}],
			title: {
				text: 'Wordcloud of the Top ' + this.wordLimit + ' Linked Hashtags'
			}
		});
	}
	
	__getLabels(igProcessing){
		let textArr = [];
		let anotherTextArr = [];
		let textLabel = "";
		let temp = {};
		
		let regexp = new RegExp('#([^\\s]*)','g');
		for(let a of igProcessing){
			for(let caption of a.ig_object.edge_media_to_caption.edges){
				let text = caption.node.text.replace(regexp, '');
				text = text.replace(/[^\w\s]/gi, '');
				text = text.replace(/\n/g, '');
				text = text.trim();
				text = text.toLocaleLowerCase();
				if (text)
					text = this.__removeStoppingWords(text);
				if(text !== ""){
					temp.text = text
					temp.url = a.ig_object.display_url;
					temp = {};
					textArr.push(text);
					anotherTextArr.push(temp);
				}
			}
		}
		for(let t of textArr) {
			textLabel += t +' ';
		}
		
		let result = this.__getTopFrequency(textLabel);
		
		for(let r = 0; r < result.length; r++){
			for(let cc of anotherTextArr){
				if(cc.text != null){
					if(cc.text.indexOf(result[r].name) >= 0){
						result[r].url.push(cc.url);
					}
				}
			}
		}
		
		return result;
	}
	
	__getHashtagLabels(igProcessing){
		let hashtagArr = [];
		let anotherHashtagArr = [];
		let hashtag = "";
		let curHashtag = '#' + this.hashtag;
		let temp = {};
		
		for(let a of igProcessing){
			for(let caption of a.ig_object.edge_media_to_caption.edges){
				var text = caption.node.text;
				for(let b of this.__findHashtags(text)){
					temp.hashtag = b;
					temp.url = a.ig_object.display_url;
					hashtagArr.push(b);
					anotherHashtagArr.push(temp);
					temp = {};
				}
			}
		}
		
		for(let t of hashtagArr)
			hashtag += t + ' ';
		
		let result = this.__getTopHashtags(hashtagArr);
		
		let c = anotherHashtagArr.filter(function(objFromA) {
			return result.find(function(objFromB) {
				return objFromA.hashtag === objFromB.name
			})
		});
		
		for(let r = 0; r < result.length; r++){
			for(let cc of c){
				if(cc.hashtag == result[r].name){
					result[r].url.push(cc.url);
				}
			}
		}
		
		return result;
	}
	
	__getTopFrequency(string){
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
		for(var i = 0; i < sorted.length && i < this.wordLimit; i++){
			tempObj.name = sorted[i];
			tempObj.weight = frequencies[sorted[i]];
			tempObj.url = [];
			obj.push(tempObj);
			tempObj = {};
		}

		console.log(obj);
		this.topCaption = obj;
		return obj;
	}
	
	__findHashtags(searchText){
		const regexp = /\B\#\w\w+\b/g
		let result = searchText.match(regexp);
		if (result) {
			for(let i = 0; i < result.length; i++) {
				result[i] = result[i].toLowerCase();
				if(result[i] === this.hashtag){
					result.splice(i, 1);
				}
			}
			return result;
		}
		else {
			return "";
		}
	}
	
	__getTopHashtags(hashtagArr){
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
		for(var i = 0; i < sorted.length && i < this.wordLimit; i++){
			tempObj.name = sorted[i];
			tempObj.weight = frequency[sorted[i]];
			tempObj.url = [];
			hashtagArr.push(tempObj);
			tempObj = {};
		}

		console.log(hashtagArr);
		this.topHashtag = hashtagArr;
		return hashtagArr;
	}
		
	__createUrl(){
		return "http://localhost:8080/smile/ig_media?filter={'hashtag':'" + this.hashtag + "'}&filter={'ig_object.id':{'$in':" + JSON.stringify(this.mediaIdArr) + "}}&keys={'ig_object.taken_at_timestamp':1}&keys={'ig_object.edge_media_to_caption.edges':1}&keys={'ig_object.display_url':1}&pagesize=1000";
	}

	__displayIndex(index){
		return index + 1;
	}
	
	__removeStoppingWords(words){
		var x;
		var y;
		var word;
		var stop_word;
		var regex_str;
		var regex;
		var cleansed_string = words;
		let stop_words = new Array(
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
}

window.customElements.define('my-wordcloud', MyWordcloud);
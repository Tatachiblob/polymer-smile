import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import 'highcharts/highcharts.js';
import './shared-styles.js';

class MyPieChart extends PolymerElement {
	static get template() {
		return html`
		<style include="shared-styles">
        :host {
			display: block;
			padding: 10px;
		}
		</style>
		
		<iron-ajax
			id="pieAjax"
			url="{{ajaxUrl}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse"
			debounce-duration="300">
		</iron-ajax>
		
		<iron-ajax
			id="pieAjax2"
			url="{{ajaxUrl2}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse2"
			debounce-duration="300">
		</iron-ajax>
		
		<div class="card">
			<div id="pieChart"></div>
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
			ajaxUrl2: String,
			emotionImageIDs: Object,
			mapped: Boolean,
			occurences: Array,
			finalArray: Array
		}
	}
	
	constructor() {
		super();
		this.mapped = true;
		this.occurences = [[], [], [], [], [], [], []];
		this.finalArray = [[], [], [], [], [], [], [], []];
	}

	generatePieRequest(){
		this.ajaxUrl = this.__createUrl();
		this.$.pieAjax.generateRequest();
	}
	
	__handleResponse(event, res){
		//console.log(res.response);
		
		this.finalArray = this.__mappingLabels(res.response._embedded);
		console.log(this.finalArray);
		
		this.ajaxUrl2 = this.__createUrl2();
		this.$.pieAjax2.generateRequest();
		
		//this.__renderPieChart(res.response._embedded);
	}
	
	__handleResponse2(event, res){
		//console.log(res.response);
		console.log(res.response._embedded);
		this.finalArray = this.__mappingGoogleLabels(res.response._embedded, this.finalArray);
		
		this.__renderPieChart(res.response._embedded);
	}
	
	__renderPieChart(data){
			Highcharts.chart(this.$.pieChart, {
				chart: {
					height: 400,
				},
				title: {
					text: 'Image Categories'
				},

				xAxis: {
					categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
				},

				series: [{
					type: 'pie',
					name: 'Posts',
					allowPointSelect: true,
					keys: ['name', 'y', 'selected', 'sliced'],
					data: [['Friends', this.finalArray[0].length],
						   ['Selfies', this.finalArray[1].length],
						   ['Gadget', this.finalArray[2].length],
						   ['Food', this.finalArray[3].length],
						   ['Pet', this.finalArray[4].length],
						   ['Fashion', this.finalArray[5].length],
						   ['Scene/Activity', this.finalArray[6].length],
						   ['Others', this.finalArray[7].length]],
					showInLegend: true,
					point:{
						events:{
							click: function(e) {
								let p = e.point;
								console.log(p);
								console.log(this.finalArray);
								/*var imagesArray = getCategoryImages(this.index);
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
								
								document.getElementById("title").innerHTML = this.name + " Category Images";
								document.getElementById("pics").innerHTML = images + '</div>';
								$('#myModal').modal('show');*/
							}.bind(this)
						}
					}
				}]
			});
	}
	
	__callModal(title, data){
		this.dispatchEvent(new CustomEvent('modal1', {detail: {title: title, imgs: data}}));
	}
	
	__mappingLabels(igProcessingData) {
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
		
		//this.occurences = [[], [], [], [], [], [], []];
		console.log(igProcessingData);
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
				if (this.occurences[0][strCategories[i].name] == undefined) {
					this.occurences[0][strCategories[i].name] = [];
				} else {
					this.occurences[0][strCategories[i].name].push(node.ig_url);
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
				if (this.occurences[1][strCategories[i].name] == undefined) {
					this.occurences[1][strCategories[i].name] = [];
				} else {
					this.occurences[1][strCategories[i].name].push(node.ig_url);
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
				if (this.occurences[2][strCategories[i].name] == undefined) {
					this.occurences[2][strCategories[i].name] = [];
				} else {
					this.occurences[2][strCategories[i].name].push(node.ig_url);
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
					if (this.occurences[2][strTags[i].name] == undefined) {
						this.occurences[2][strTags[i].name] = [];
					} else {
						this.occurences[2][strTags[i].name].push(node.ig_url);
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
						if (this.occurences[2][strDescription[i]] == undefined) {
							this.occurences[2][strDescription[i]] = [];
						} else {
							this.occurences[2][strDescription[i]].push(node.ig_url);
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
				if (this.occurences[3][strCategories[i].name] == undefined) {
					this.occurences[3][strCategories[i].name] = [];
				} else {
					this.occurences[3][strCategories[i].name].push(node.ig_url);
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
					if (this.occurences[3][strDescription[i]] == undefined) {
						this.occurences[3][strDescription[i]] = [];
					} else {
						this.occurences[3][strDescription[i]].push(node.ig_url);
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
				if (this.occurences[4][strCategories[i].name] == undefined) {
					this.occurences[4][strCategories[i].name] = [];
				} else {
					this.occurences[4][strCategories[i].name].push(node.ig_url);
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
					if (this.occurences[4][strTags[i].name] == undefined) {
						this.occurences[4][strTags[i].name] = [];
					} else {
						this.occurences[4][strTags[i].name].push(node.ig_url);
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
						if (this.occurences[4][strDescription[i]] == undefined) {
							this.occurences[4][strDescription[i]] = [];
						} else {
							this.occurences[4][strDescription[i]].push(node.ig_url);
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
				if (this.occurences[5][strTags[i].name] == undefined) {
					this.occurences[5][strTags[i].name] = [];
				} else {
					this.occurences[5][strTags[i].name].push(node.ig_url);
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
					if (this.occurences[5][strDescription[i]] == undefined) {
						this.occurences[5][strDescription[i]] = [];
					} else {
						this.occurences[5][strDescription[i]].push(node.ig_url);
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
				if (this.occurences[6][strCategories[i].name] == undefined) {
					this.occurences[6][strCategories[i].name] = [];
				} else {
					this.occurences[6][strCategories[i].name].push(node.ig_url);
				}
				count ++;
			}
			
			if (count == 0) {
				mappingArray[7].push(node);
				if (this.occurences[7] == undefined) {
					this.occurences[7] = [];
				} else {
					this.occurences[7].push(node.ig_url);
				}
			}		
		}
		
		return mappingArray;
	}
	
	__mappingGoogleLabels(igProcessingData, mappingArray) {
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
					if (this.occurences[0][strLabels[i].description] == undefined) {
						this.occurences[0][strLabels[i].description] = [];
					} else {
						this.occurences[0][strLabels[i].description].push(node.ig_url);
					}
					count ++;
				}
				
				i = 0;
				
				while (i < strLabels.length && !selfiesLabels.includes(strLabels[i].description)) {
					i ++;
				}
				
				if (i < strLabels.length) {
					mappingArrayGoogle[1].push(node);
					if (this.occurences[1][strLabels[i].description] == undefined) {
						this.occurences[1][strLabels[i].description] = [];
					} else {
						this.occurences[1][strLabels[i].description].push(node.ig_url);
					}
					count ++;
				}
					
				i = 0;
				
				while (i < strLabels.length && !gadgetLabels.includes(strLabels[i].description)) {
					i ++;
				}
				
				if (i < strLabels.length) {
					mappingArrayGoogle[2].push(node);
					if (this.occurences[2][strLabels[i].description] == undefined) {
						this.occurences[2][strLabels[i].description] = [];
					} else {
						this.occurences[2][strLabels[i].description].push(node.ig_url);
					}
					count ++;
				}
				
				i = 0;
				
				while (i < strLabels.length && !foodLabels.includes(strLabels[i].description)) {
					i ++;
				}
				
				if (i < strLabels.length) {
					mappingArrayGoogle[3].push(node);
					if (this.occurences[3][strLabels[i].description] == undefined) {
						this.occurences[3][strLabels[i].description] = [];
					} else {
						this.occurences[3][strLabels[i].description].push(node.ig_url);
					}
					count ++;
				}
				
				i = 0;
				
				while (i < strLabels.length && !petLabels.includes(strLabels[i].description)) {
					i ++;
				}
				
				if (i < strLabels.length) {
					mappingArrayGoogle[4].push(node);
					if (this.occurences[4][strLabels[i].description] == undefined) {
						this.occurences[4][strLabels[i].description] = [];
					} else {
						this.occurences[4][strLabels[i].description].push(node.ig_url);
					}
					count ++;
				}
					
				i = 0;
				
				while (i < strLabels.length && !fashionLabels.includes(strLabels[i].description)) {
					i ++;
				}
				
				if (i < strLabels.length) {
					mappingArrayGoogle[5].push(node);
					if (this.occurences[5][strLabels[i].description] == undefined) {
						this.occurences[5][strLabels[i].description] = [];
					} else {
						this.occurences[5][strLabels[i].description].push(node.ig_url);
					}
					count ++;
				}
				
				i = 0;
				
				while (i < strLabels.length && !activitiesLabels.includes(strLabels[i].description)) {
					i ++;
				}
				
				if (i < strLabels.length) {
					mappingArrayGoogle[6].push(node);
					if (this.occurences[6][strLabels[i].description] == undefined) {
						this.occurences[6][strLabels[i].description] = [];
					} else {
						this.occurences[6][strLabels[i].description].push(node.ig_url);
					}
					count ++;
				}
					
				if (count == 0) {
					mappingArrayGoogle[7].push(node);
					if (this.occurences[7] == undefined) {
						this.occurences[7] = [];
					} else {
						this.occurences[7].push(node.ig_url);
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

				//console.log(array2[j].ig_id);
				
				while (k < array1.length && array2[j].ig_id != array1[k].ig_id) {
					//console.log(array1[k].ig_id);
					k ++;
				}
				
				if (k == array1.length) {
					mappingArray[i].push(array2[j])
				}
			}
		}
		//console.log(this.occurences);
		//console.log(mappingArray);
		return mappingArray;
	}
	
	__createUrl(){
		return "http://localhost:8080/smile/ig_processing_ms?filter={'hashtag':'" + this.hashtag + "'}&filter={'ig_id':{'$in':" + JSON.stringify(this.mediaIdArr) + "}}&pagesize=1000&keys={'vision':1}&keys={'ig_url':1}&keys={'ig_id':1}"
	}
	
	__createUrl2(){
		return "http://localhost:8080/smile/ig_processing_google?filter={'hashtag':'" + this.hashtag + "'}&filter={'ig_id':{'$in':" + JSON.stringify(this.mediaIdArr) + "}}&pagesize=1000&keys={'google':1}&keys={'ig_url':1}&keys={'ig_id':1}"
	}
}

window.customElements.define('my-piechart', MyPieChart);
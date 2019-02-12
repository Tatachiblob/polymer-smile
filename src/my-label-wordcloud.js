import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@vaadin/vaadin-grid';
import 'highcharts/highcharts.js';
import 'highcharts/modules/wordcloud.js';
import './bootstrap-style.js';
import './shared-styles.js';

class MyLabelWordcloud extends PolymerElement{
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
            id="wordcloudLabelAjax"
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
            <div class="card"><div id="wordcloudLabel"></div></div>
            <div class="card">
                <div class="table-wrapper-scroll-y">
                    <table class="table table-bordered">
                        <thead class="thead-dark">
						    <tr>
							    <th scope="col">#</th>
								<th scope="col">Label</th>
								<th scope="col">Count</th>
							</tr>
						</thead>
						<tbody>
						    <template is="dom-repeat" items="{{topLabels}}">
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
        `;

    }

    static get properties() {
        return {
            hashtag: {
                type: String
            },
            mediaIdArr: Array,
            ajaxUrl: String,
            topLabels: Array,
            wordcloudData: Array,
            wordLimit: {
                type: Number,
                value: 30,
            }
        }
    }

    generateLabelWordcloudRequest(){
        this.ajaxUrl = this.__createUrl();
        this.$.wordcloudLabelAjax.generateRequest();
    }

    __wordcloudLimit(){
        this.wordLimit = Math.abs(this.wordLimit);
        // console.log(this.data);
        this.__renderWordcloud(this.wordcloudData);
    }

    __handleResponse(event, res){
        //console.log(this.ajaxUrl);
        this.wordcloudData = res.response._embedded;
        this.__renderWordcloud(res.response._embedded);
    }

    __renderWordcloud(data){
        Highcharts.chart(this.$.wordcloudLabel, {
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
                text: "Wordcloud of the Top " + this.wordLimit + " Labels"
            }
        });
    }

    __getLabels(igProcessing){
        let textLabel = "";
        let anotherLabelArr = [];
        let temp = {};
        for(let media of igProcessing){
            if(media.hasOwnProperty('google')){
                if(media.google.responses[0].hasOwnProperty('labelAnnotations')){
                    var google = media.google.responses[0].labelAnnotations;
                    for(let label of google){
                        if(label.hasOwnProperty('description')){
                            textLabel += label.description + " ";
                            temp.textLabel = label.description;
                            temp.url = media.ig_url;
                            anotherLabelArr.push(temp);
                            temp = {};
                        }
                    }
                }
            }
        }

        let result = this.__getTopFrequency(textLabel);
        let c = anotherLabelArr.filter(function(objFromA) {
            return result.find(function(objFromB) {
                return objFromA.textLabel === objFromB.name
            })
        });
        for(let r = 0; r < result.length; r++){
            for(let cc of c){
                if(cc.textLabel == result[r].name){
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

        this.topLabels = obj;
        return obj;
    }

    __createUrl(){
        return "http://localhost:8080/smile/ig_processing_google?filter={'hashtag':'" + this.hashtag + "'}&filter={'ig_id':{'$in':" + JSON.stringify(this.mediaIdArr) + "}}&keys={'google': 1}&keys={'ig_url': 1}&pagesize=1000";
    }

    __displayIndex(index){
        return index + 1;
    }

}

window.customElements.define('my-label-wordcloud', MyLabelWordcloud);
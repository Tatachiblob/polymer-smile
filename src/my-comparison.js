import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@fooloomanzoo/datetime-picker/datetime-picker.js';
import './my-linechart';
import './my-wordcloud';
import './shared-styles.js';
import './bootstrap-style.js';
import './font-awesome.js';
import './style.js';

class MyComparison extends PolymerElement {
    static get template(){
        return html`
        <style include="bootstrap-style"></style>
		<style include="style"></style>
		<style include="shared-styles"></style>
		
		<iron-ajax
			id="mediaAjax"
			url="{{ajaxUrl}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse"
			debounce-duration="300">
		</iron-ajax>
		
		<iron-ajax
			id="hashtagAjax"
			url="http://localhost:8080/smile/ig_media/_aggrs/group_hashtag"
			method="GET"
			handle-as="json"
			on-response="__handleHashtagResponse"
			debounce-duration="300">
		</iron-ajax>
		
		<div class="col-md-6">
		    <div class="card" style="margin: 12px; margin-top: 24px">
		        <div class="row">
                    <div class="col-md-4">
                        <paper-dropdown-menu label="Select Hashtag" noink no-animations value={{hashtag}} vertical-offset="60">
                            <paper-listbox slot="dropdown-content" class="dropdown-content">
                                <dom-repeat items="[[availHashtags]]" as="hash">
                                    <template>
                                    <paper-item>[[hash._id]]</paper-item>
                                    </template>
                                </dom-repeat>
                            </paper-listbox>
                        </paper-dropdown-menu>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        Start Time: <datetime-picker date="{{sDate}}" value="{{startDate}}" default="{{defaultStart}}"></datetime-picker>
                    </div>
                    <div class="col-md-1"></div>
                    <div class="col-md-1"></div>
                    <div class="col-md-3">
                        End Time: <datetime-picker date="{{eDate}}" value="{{endDate}}" default="{{defaultEnd}}"></datetime-picker>
                    </div>
                </div>
                <br />
		        <paper-button raised on-click="__handleClick">Get Data</paper-button>
		    </div>    
		    <my-linechart id="linechart" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}}></my-linechart>
		    <my-wordcloud-table id="wordcloud" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}}></my-wordcloud-table>
		</div>
        `;
    }

    ready() {
        super.ready();
        this.$.hashtagAjax.generateRequest();
    }

    static get properties(){
        return {
            hashtag: String,
            mediaIdArr: {
                type: Array,
                value: function(){return [];}
            },
            defaultStart: {
                type: Date,
                value: function(){
                    //return new Date(new Date().getFullYear(), 0, 1);
                    return new Date((new Date().getFullYear()-1), 0, 1);
                },
            },
            defaultEnd: {
                type: Date,
                value: function(){
                    //return new Date(new Date().getFullYear(), 11, 31);
                    return new Date((new Date().getFullYear()-1), 11, 31);
                },
            },
            startDate: Number,
            formattedStartDate: {
                type: Number,
                computed: '__dateFormatter(startDate)'
            },
            endDate: Number,
            formattedEndDate: {
                type: Number,
                computed: '__dateFormatter(endDate)'
            },
            availHashtags: Array,
            ajaxUrl: String
        }
    }

    __handleClick(){
        this.ajaxUrl = "http://localhost:8080/smile/ig_media?filter={'hashtag':'" + this.hashtag + "'}&filter={'ig_object.taken_at_timestamp':{'$gte':" + this.formattedStartDate + "}}&filter={'ig_object.taken_at_timestamp':{'$lte':" + this.formattedEndDate + "}}&keys={'ig_object.id':1}&keys={'ig_object.display_url':1}&keys={'ig_object.edge_liked_by':1}&pagesize=1000";
        this.$.mediaAjax.generateRequest();
    }

    __handleResponse(event, res){
        this.mediaIdArr = [];
        res = res.response._embedded;
        for(let node of res)
            this.push('mediaIdArr', node.ig_object.id);

        this.__generateElementRequest();
    }

    __generateElementRequest(){
        this.$.linechart.generateLinechartRequest();
        this.$.wordcloud.generateWordcloudRequest();
    }

    __dateFormatter(date){
        return ((date - (date % 1000)) / 1000);
    }

    __handleHashtagResponse(event, res){
        this.availHashtags = res.response._embedded;
    }
}

window.customElements.define('my-comparison', MyComparison);
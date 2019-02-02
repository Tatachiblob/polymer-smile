import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';
import './my-date-selector';
import './my-linechart';
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
		
		<div class="col-md-6">
		    <div class="card" style="margin: 12px; margin-top: 24px">
		        <my-date-selector id="myDateSelector"></my-date-selector>
		        <paper-button raised on-click="__handleClick">Get Data</paper-button>
		        
		        <my-linechart id="linechart" hashtag={{selectedHashtag}} media-Id-Arr={{mediaIdArr}}></my-linechart>
		    </div>
		</div>
        `;
    }

    static get properties(){
        return {
            selectedHashtag: String,
            mediaIdArr: {
                type: Array,
                value: function(){return [];}
            },
            ajaxUrl: String
        }
    }

    __handleClick(){
        this.selectedHashtag = this.$.myDateSelector.hashtag;
        this.ajaxUrl = "http://localhost:8080/smile/ig_media?filter={'hashtag':'" + this.selectedHashtag + "'}&filter={'ig_object.taken_at_timestamp':{'$gte':" + this.$.myDateSelector.formattedStartDate + "}}&filter={'ig_object.taken_at_timestamp':{'$lte':" + this.$.myDateSelector.formattedEndDate + "}}&keys={'ig_object.id':1}&keys={'ig_object.display_url':1}&keys={'ig_object.edge_liked_by':1}&pagesize=1000";
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
    }
}

window.customElements.define('my-comparison', MyComparison);
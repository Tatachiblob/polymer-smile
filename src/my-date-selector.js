import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import './shared-styles.js';
import './bootstrap-style.js';
import './font-awesome.js';
import './style.js';

class MyDateSelector extends PolymerElement {
    static get template(){
        return html`
        <style include="bootstrap-style"></style>
		<style include="style"></style>
		<style include="shared-styles">
		:host {
			display: block;
			padding: 10px;
		}
		</style>
		
		<iron-ajax
			id="hashtagAjax"
			url="http://localhost:8080/smile/ig_media/_aggrs/group_hashtag"
			method="GET"
			handle-as="json"
			on-response="__handleHashtagResponse"
			debounce-duration="300">
		</iron-ajax>
		
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
			<div class="col-md-3">
			    End Time: <datetime-picker date="{{eDate}}" value="{{endDate}}" default="{{defaultEnd}}"></datetime-picker>
			</div>
        </div>
        `;
    }

    ready() {
        super.ready();
        this.$.hashtagAjax.generateRequest();
    }

    static get properties(){
        return{
            hashtag: String,
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
            availHashtags: Array
        }
    }

    getProperties(){

    }

    __dateFormatter(date){
        return ((date - (date % 1000)) / 1000);
    }

    __handleHashtagResponse(event, res){
        this.availHashtags = res.response._embedded;
    }
}

window.customElements.define('my-date-selector', MyDateSelector);
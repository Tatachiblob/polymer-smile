import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@fooloomanzoo/datetime-picker/datetime-picker.js';
import './shared-styles.js';

class MyDate extends PolymerElement {
    static get template() {
        return html`
		<style include="shared-styles">
        :host {
			display: block;
			padding: 10px;
		}
		</style>
		
		<div class="card">
			<h1>Select Date Range</h1>
			<datetime-picker value="{{startDate}}" default="{{defaultStart}}"></datetime-picker>
			<!--<p>Start Date: {{startDate}}</p>-->
			<p>Formatted Start Date: {{formattedStartDate}}</p>
			<datetime-picker value="{{endDate}}" default="{{defaultEnd}}"></datetime-picker>
			<!--<p>End Date: {{endDate}}</p>-->
			<p>Formatted End Date: {{formattedEndDate}}</p>
		</div>
		`;
    }

    static get properties(){
        return{
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
            }
        }
    }

    __dateFormatter(date){
        //console.log((startDate - (startDate % 1000)) / 1000);
        return ((date - (date % 1000)) / 1000);
    }

    getStartDate(){ return this.formattedStartDate;}
    getEndDate(){return this.formattedEndDate;}
}

window.customElements.define('my-date', MyDate);

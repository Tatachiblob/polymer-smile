import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import './shared-styles.js';


class MyFullcalendar extends PolymerElement {
	static get template() {
		return html`
		<style include="shared-styles">
        :host {
			display: block;
			padding: 10px;
		}
		</style>
	
		
		<div class="card">
			<div id="eventCalendar"></div>
			<scheduler-component></scheduler-component>
		</div>
		`;
	}
	
	ready(){
		super.ready();
		
		console.log("my-fullcalendar is ready.");
		//console.log(fullCalendar());
		//this.$.eventCalendar.fullCalendar({});
	}
}

window.customElements.define('my-fullcalendar', MyFullcalendar);
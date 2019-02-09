import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import 'highcharts/highcharts.js'
import './shared-styles.js';
import './bootstrap-style.js';

class MyColumnChart extends PolymerElement {
    static get template() {
        return html`
		<style include="bootstrap-style"></style>
		<style include="shared-styles">
			:host {
				display: block;
				padding: 10px;
			}
		</style>
		
		<div class="card">
			<div id="columnChart"></div>
		</div>
		`;


    }

    ready() {
    }

    static get properties(){
        return{
            expected: Number,
            actual: Number
        }
    }

}

window.customElements.define('my-column-chart', MyColumnChart);
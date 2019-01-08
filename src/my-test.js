import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import 'highcharts/highcharts.js';
import './shared-styles.js';

class MyTest extends PolymerElement {
	static get template() {
		return html`
		<style include="shared-styles">
        :host {
			display: block;
			padding: 10px;
		}
		</style>
		
		<div id="container"></div>
		
		<button id="addSeries" on-click="add">Add Series</button>
		<button id="remove" on-click="remove">Remove All Series</button>
		`;
	}
	
	ready(){
		super.ready();
		
		let chart = new Highcharts.chart(this.$.container, {
			
			chart: {
				type: 'column'
			},
			credits: {
				enabled: false
			},
			yAxis: {
				max: 10
			},
			series: [{
				data: this.randomData()
			}]
			
		});
	}
	
	add(){
		let chart = Highcharts.chart(this.$.container, {});
		chart.addSeries({
            type: 'column',
            data: this.randomData()
        });
	}
	
	remove(){
		let chart = Highcharts.chart(this.$.container, {});
		chart.destroy();
		this.add();
	}
	
	randomData(){
		var len = 6;
        var dataArray = [];
        for(var i = 0; i < len; i++) {
            // Push a random integer between 0 and 10 into the array
            dataArray.push(Math.floor(Math.random() * (10 - 0 + 1)) + 0);
        }
        return dataArray;
	}
}

window.customElements.define('my-test', MyTest);
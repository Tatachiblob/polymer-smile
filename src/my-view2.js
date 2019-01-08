import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class MyView2 extends PolymerElement {
	static get template() {
		return html`
		<style include="shared-styles">
        :host {
			display: block;
			padding: 10px;
		}
		</style>
		
		<iron-ajax
			id="mediaAjax"
			url="{{ajaxUrl}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse"
			debounce-duration="300">
		</iron-ajax>
		
		<div class="card">
			
		</div>
		`;
	}
	
	static get properties(){
		return{
			mediaIdArr: Array
		}
	}
	
	printTest(){
		console.log("Elemeny of my-view2:");
		console.log(this.mediaIdArr);
	}
}

window.customElements.define('my-view2', MyView2);

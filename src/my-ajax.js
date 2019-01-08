import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import "../node_modules/google-chart-polymer-3/google-chart.js";
import '@polymer/iron-ajax/iron-ajax.js';
import './shared-styles.js';

class MyAjax extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
	  
	  <p>{{data}}</p>

      <iron-ajax
        auto
        url="https://jsonplaceholder.typicode.com/posts"
        handle-as="json"
        on-response="handleResponse"
        debounce-duration="300">
      </iron-ajax>
    `;
  }
  
  static get properties(){
	  return{
		  data:{
			  type: String
		  }
	  }
  }
  
  handleResponse(event, res) {
	  console.log(res.response);
	  this.data = res.response[0].body;
  }
}

window.customElements.define('my-ajax', MyAjax);

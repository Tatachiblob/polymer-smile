import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-textarea';
import './shared-styles';

class MyInisghtInput extends PolymerElement {
    static get template() {
        return html`
        <style include="shared-styles">
            :host {
                display: block;
                padding: 10px 20px;
            }
         </style>
         
         <div class="card">
            <h1>Insights</h1>
            <paper-textarea rows="5" max-rows="5" value="{{textValue}}" label="Input your insights" always-float-label></paper-textarea>
         </div>
        `;
    }

    static get properties(){
        return{
            textValue: String
        }
    }

}

window.customElements.define('my-insight-input', MyInisghtInput);

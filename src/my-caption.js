import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import './shared-styles.js';

class MyCaption extends PolymerElement {
    static get template() {
        return html`
        <style include="shared-styles">
        :host {
			display: block;
			padding: 10px;
		}
		div.item {
            vertical-align: top;
            display: inline-block;
            text-align: center;
            width: 120px;
        }
        .caption {
            display: block;
        }
		</style>
		
		<div class="item">
		    <img style="width: 50px; height: 50px;" src="../images/m1.png"/>
		    <span class="caption">Low Density</span>
		</div>
		<div class="item">
		    <img style="width: 50px; height: 50px;" src="../images/m2.png"/>
		    <span class="caption">Mid Density</span>
		</div>
		<div class="item">
		    <img style="width: 50px; height: 50px;" src="../images/m3.png"/>
		    <span class="caption">High Density</span>
		</div>
        `;
    }

    static get properties(){
        return {
            imgSrc: String,
            caption: String
        }
    }

}

window.customElements.define('my-caption', MyCaption);
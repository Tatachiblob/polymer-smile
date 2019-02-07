import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import './bootstrap-style.js';

class MyContent extends PolymerElement {
    static get template() {
        return html`
        <style include="bootstrap-style"></style>
		<style include="shared-styles">
			:host {
				display: block;
				padding: 10px;
			}
		</style>
		
		
        `;
    }

    ready() {}

    static get properties(){
        return{

        }
    }

}

window.customElements.define('my-content', MyContent);
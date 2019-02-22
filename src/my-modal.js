import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import {} from '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';
import './shared-styles.js';

class MyModal extends PolymerElement {
	static get template() {
		return html`
		<style include="granite-bootstrap"></style>
		<style include="shared-styles">
			:host {
				display: block;
				padding: 10px;
			}
		</style>
		
		<paper-dialog id="dialog">
			<h2 style="margin-top:20px;">{{title}} - [[imgs.length]] image/s</h2> 
			<paper-dialog-scrollable>
				<template is="dom-repeat" items="[[imgs]]" as="imgSrc">
					<iron-image style="width:150px; height:150px; background-color: lightgray;"
						sizing="cover" preload fade src="{{imgSrc}}" alt="Image cannot be loaded"></iron-image>
				</template>
			</paper-dialog-scrollable>
			<div class="buttons">
				<paper-button dialog-dismiss>Close</paper-button>
			</div>
		</paper-dialog>
		
		<paper-dialog id="dialog2">
			<h1>{{title}}</h1>
			<paper-dialog-scrollable>
				<template is="dom-repeat" items="[[imgs]]" as="img">
					<h2>[[img.desc]] - [[img.ig.length]] image/s</h2>
					<template is="dom-repeat" items="[[img.ig]]" as="ig">
						<iron-image style="width:150px; height:150px; background-color: lightgray;"
							sizing="cover" preload fade src="{{ig.ig_url}}" alt="Image cannot be loaded"></iron-image>
					</template>
				</template>
			</paper-dialog-scrollable>
			<div class="buttons">
				<paper-button dialog-dismiss>Close</paper-button>
			</div>
		</paper-dialog>
		`;
	}
	
	static get properties() {
		return {
			title: String,
			imgs: Array
		}
	}
	
	callModal(title, data){
		this.title = title;
		this.imgs = data;
		
		this.$.dialog.open();
	}
	
	callModal2(title, data){
		this.title = title;
		this.imgs = data;
		
		console.log(data);
		
		this.$.dialog2.open();
	}
}

window.customElements.define('my-modal', MyModal);
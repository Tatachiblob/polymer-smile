import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import './my-column-chart';
import './shared-styles.js';
import './bootstrap-style.js';

class MyExpectedActual extends PolymerElement {
    static get template() {
        return html`
		<iron-ajax
			id="eventAjaxCall"
			url="{{eventAjax}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse"
			debounce-duration="300">
		</iron-ajax>
		<iron-ajax
			id="mediaAjaxCall"
			url="{{mediaAjax}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse2"
			debounce-duration="300">
		</iron-ajax>
		`;
    }

    static get properties(){
        return{
            eventOid: String,
            eventName: String,
            eventAjax: String,
            mediaAjax: String,
            eventHashtag: String,
            expectedLikes: Number,
            actualLikes: {
                type: Number,
                value: 0
            },
            expectedCount: Number,
            actualCount: Number,
            startTimestamp: Number,
            endTimestamp: Number
        }
    }

    callEventAjax(eventOid) {
        this.eventOid = eventOid;
        this.eventAjax = 'http://localhost:8080/smile/event_calendar/' + this.eventOid;

        this.$.eventAjaxCall.generateRequest();
    }


    __handleResponse(event, res){
        res = res.response;

        this.eventName = res.event_name;
        this.eventHashtag = res.hashtags;
        this.expectedLikes = parseInt(res.expected_likes.toString());
        this.expectedCount = parseInt(res.expected_volume.toString());
        this.startTimestamp = res.start_period;
        this.endTimestamp = res.end_period;
        this.eventHashtag = res.hashtags;

        this.mediaAjax = "http://localhost:8080/smile/ig_media?filter={'hashtag':'" + this.eventHashtag + "'}&filter={'ig_object.taken_at_timestamp':{'$gte':" + this.startTimestamp + "}}&filter={'ig_object.taken_at_timestamp':{'$lte':" + this.endTimestamp + "}}&keys={'ig_object.id':1}&keys={'ig_object.display_url':1}&keys={'ig_object.edge_liked_by':1}&pagesize=1000";
        this.dispatchEvent(new CustomEvent('eventTitle', {detail: {eventTitle: this.eventName}}));
        this.$.mediaAjaxCall.generateRequest();
    }

    __handleResponse2(event, res){
        // console.log(res.response);
        res = res.response;

        console.log("Expected Count: " + this.expectedCount);
        console.log("Expected Likes: " + this.expectedLikes);
        this.actualCount = res._embedded.length;
        for(let node of res._embedded){
            this.actualLikes += node.ig_object.edge_liked_by.count;
        }
        // console.log("Actual Count: " + this.actualCount);
        // console.log("Actual Likes: " + this.actualLikes);

        let detail = {};
        detail.startTimestamp = this.startTimestamp;
        detail.endTimestamp = this.endTimestamp;
        detail.eventHashtag = this.eventHashtag;
        detail.expectedLikes = this.expectedLikes;
        detail.expectedCount = this.expectedCount;
        detail.actualLikes = this.actualLikes;
        detail.actualCount = this.actualCount;

        this.dispatchEvent(new CustomEvent('eventDetails', {detail: detail}));
    }
}

window.customElements.define('my-expected-actual', MyExpectedActual);
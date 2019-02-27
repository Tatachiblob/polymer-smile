import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import './my-linechart';
import './my-wordcloud';
import './my-genderchart';
import './my-histogram';
import './my-piechart';

class MyChartCollection extends PolymerElement {
    static get template(){
        return html`
        <iron-ajax
			id="mediaAjax"
			url="{{ajaxUrl}}"
			method="GET"
			handle-as="json"
			on-response="__handleResponse"
			debounce-duration="300">
		</iron-ajax>
		
		<my-linechart id="linechart" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}}></my-linechart>
		<my-piechart id="piechart" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}}></my-piechart>
		<my-wordcloud id="wordcloud" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}}></my-wordcloud>
		<my-genderchart id="gender" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}}></my-genderchart>
		<my-histogram id="age" hashtag={{hashtag}} media-Id-Arr={{mediaIdArr}}></my-histogram>
        `;
    }

    static get properties(){
        return{
            hashtag: String,
            startDate: Number,
            endDate: Number,
            ajaxUrl: String,
            mediaIdArr: {
                type: Array,
                value: function(){return [];}
            },
            availHashtags: Array
        }
    }

    ready(){
        super.ready();
        this.startDate = this.__dateFormatter(this.startDate);
        this.endDate = this.__dateFormatter(this.endDate);
        this.ajaxUrl = this.__createUrl(this.hashtag, this.startDate, this.endDate);
        this.generateMediaIdRequest();
    }

    getChartObjects(){
        let chartObjs = {};
        chartObjs.lineChart = this.$.linechart.getLineChart();
        chartObjs.pieChart = this.$.piechart.getPieChart();
        chartObjs.captionWordcloud = this.$.wordcloud.getCaptionWordcloud();
        chartObjs.hashtagWordcloud = this.$.wordcloud.getHashtagWordcloud();
        chartObjs.genderChart = this.$.gender.getGenderChart();
        chartObjs.histogram = this.$.age.getHistogram();
        return chartObjs;
    }

    generateMediaIdRequest(){
        this.$.mediaAjax.generateRequest();
    }

    __handleResponse(event, res){
        this.mediaIdArr = [];
        res = res.response._embedded;
        for(let node of res)
            this.push('mediaIdArr', node.ig_object.id);

        this.__generateElementRequest();
    }

    __generateElementRequest(){
        this.$.linechart.generateLinechartRequest();
        this.$.wordcloud.generateWordcloudRequest();
        this.$.gender.generateGenderRequest();
        this.$.age.generateAgeRequest();
        this.$.piechart.generatePieRequest();
    }

    __dateFormatter(date){
        return ((date - (date % 1000)) / 1000);
    }

    __createUrl(hashtag, startDate, endDate){
        return "http://localhost:8080/smile/ig_media?filter={'hashtag':'" + hashtag + "'}&filter={'ig_object.taken_at_timestamp':{'$gte':" + startDate + "}}&filter={'ig_object.taken_at_timestamp':{'$lte':" + endDate + "}}&keys={'ig_object.id':1}&keys={'ig_object.display_url':1}&keys={'ig_object.taken_at_timestamp':1}&keys={'ig_object.edge_liked_by':1}&pagesize=1000"
    }

}

window.customElements.define('my-chart-collection', MyChartCollection);
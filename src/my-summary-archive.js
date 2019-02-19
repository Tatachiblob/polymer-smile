import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';
import './shared-styles';
import './bootstrap-style';

class MySummaryArchive extends PolymerElement {
    static get template() {
        return html`
		<style include="bootstrap-style"></style>
		<style include="shared-styles">
			:host {
				display: block;
				padding: 10px;
			}
			
			table {
			  	overflow-y: scroll;
			}
			
			.table-wrapper-scroll-y {
				display: block;
				max-height: 435px;
				overflow-y: auto;
				-ms-overflow-style: -ms-autohiding-scrollbar;
			}
		</style>

		<div class="card">
			<li>{{basicSummary.imgs}}</li>
			<li>{{basicSummary.likes}}</li>
			<li>{{basicSummary.brands}}</li>
			<li>{{basicSummary.comments}}</li>
				
			<center><b>Volume Trend: Top Months with Most Number of Images</b></center><br>
			<div class="table-wrapper-scroll-y">
				<table class='table table-bordered'>
					<thead class='thead-dark'>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Month</th>
							<th scope='col'>No. of Images</th>
						</tr>
					</thead>
					<tbody>
						<template is="dom-repeat" items="{{__convertToArray(lineSummary)}}">
							<tr>
								<th scope="row">{{item.index}}</th>
								<td>{{item.firstCol}}</td>
								<td>{{item.secondCol}}</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div><br>
				
			<center><b>Image Categories: Top Categories with Most Likes</b></center><br>
			<div class="table-wrapper-scroll-y">
				<table class='table table-bordered'>
					<thead class='thead-dark'>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Category</th>
							<th scope='col'>Likes Percentage</th>
						</tr>
					</thead>
					<tbody>
						<template is="dom-repeat" items="{{__convertToArray(barSummary)}}">
							<tr>
								<th scope="row">{{item.index}}</th>
								<td>{{item.firstCol}}</td>
								<td>{{item.secondCol}}</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
				
			<center><b>Age Facial Recognition: Top Ages that Post Images Frequently</b></center><br>
			<div class="table-wrapper-scroll-y">
				<table class='table table-bordered'>
					<thead class='thead-dark'>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Age Range</th>
							<th scope='col'>No. of Images</th>
						</tr>
					</thead>
					<tbody>
						<template is="dom-repeat" items="{{__convertToArray(ageSummary)}}">
							<tr>
								<th scope="row">{{item.index}}</th>
								<td>{{item.firstCol}}</td>
								<td>{{item.secondCol}}</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div><br>
			
			<center><b>Gender Facial Recognition: Gender Percentages</b></center><br>
			<div class="table-wrapper-scroll-y">
				<table class='table table-bordered'>
					<thead class='thead-dark'>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Gender</th>
							<th scope='col'>Percentage</th>
						</tr>
					</thead>
					<tbody>
						<template is="dom-repeat" items="{{__convertToArray(genderSummary)}}">
							<tr>
								<th scope="row">{{item.index}}</th>
								<td>{{item.firstCol}}</td>
								<td>{{item.secondCol}}</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
			
			<center><b>Facial Emotion Recognition: Top Emotions in Images Collected</b></center><br>
			<div class="table-wrapper-scroll-y">
				<table class='table table-bordered'>
					<thead class='thead-dark'>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Emotion</th>
							<th scope='col'>Percentage</th>
						</tr>
					</thead>
					<tbody>
						<template is="dom-repeat" items="{{__convertToArray(emoSummary)}}">
							<tr>
								<th scope="row">{{item.index}}</th>
								<td>{{item.firstCol}}</td>
								<td>{{item.secondCol}}</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
			
			<center><b>Images Posted per Day: Top Days with Most Number of Images</b></center><br>
			<div class="table-wrapper-scroll-y">
				<table class='table table-bordered'>
					<thead class='thead-dark'>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Date</th>
							<th scope='col'>No. of Images</th>
						</tr>
					</thead>
					<tbody>
						<template is="dom-repeat" items="[[__convertToArray(heatSummary)]]">
							<tr>
								<th scope="row">{{item.index}}</th>
								<td>{{item.firstCol}}</td>
								<td>{{item.secondCol}}</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
		`;
    }

    ready() {
        super.ready();
    }

    __convertToArray(obj) {
        console.log(obj);
        return Object.keys(obj).map(function(key) {
            return {
                index: parseInt(key) + 1,
                firstCol: obj[key].firstCol,
                secondCol: obj[key].secondCol
            };
        });
    }

    static get properties(){
        return{
            hashtag: String,
            basicSummary: Object,
            lineSummary: Array,
            genderSummary: Array,
            barSummary: Array,
            ageSummary: Array,
            emoSummary: Array,
            heatSummary: Array
        }
    }

    setStats(generalSummary){
        this.hashtag = generalSummary.hashtag;
        this.basicSummary = generalSummary.basicSummary;
        this.lineSummary = generalSummary.lineSummary;
        this.genderSummary = generalSummary.genderSummary;
        this.barSummary = generalSummary.barSummary;
        this.ageSummary = generalSummary.ageSummary;
        this.emoSummary = generalSummary.emoSummary;
        this.heatSummary = generalSummary.heatSummary;
    }

}

window.customElements.define('my-summary-archive', MySummaryArchive);
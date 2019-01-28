import { getLikesArray, getLikesArray2 } from './mapper.js';
import { getCompleteFiltered } from './mapper.js';
import { getSpecificRange } from './dataRetrieve.js';
import { getDbPath } from './dbPath.js';
var mediaArray;
var likesCount = 0;
var volumeCount = 0;
var expectedLikes;
var expectedCount;
var panelRowHtml = "";

var start, end, hashtag;

var curUrl = new URL(window.location.href);
var eventOid = curUrl.searchParams.get('event').toString();

var existingHashtags = retrieveAvailableHashtags();
countStuff();

var likesGraph = new Highcharts.chart('LikesGraph', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Total Volume of Likes'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: [
            ''
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of likes'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Expected',
        data: [expectedLikes]

    }, {
        name: 'Actual',
        data: [likesCount]

    }]
});

var volGraph = new Highcharts.chart('VolumeGraph', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Total Volume of Posts'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: [
            ''
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of posts'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Expected',
        data: [expectedCount]

    }, {
        name: 'Actual',
        data: [volumeCount]

    }]
});

function retrieveAvailableHashtags(){
    var url = getDbPath() + '/smile/event_calendar';
    var hash = [];
    $.ajax({
        async: false,
        type: "GET",
        url: url,
        contentType: "application/json",
        error: function(jqXHR, textStatus, errorThrown){},
        success: function(data){
            for(let a of data._embedded){
                hash.push(a.hashtags);
            }
        }
    });
    return hash;
}

function retrieveEventExpected(){
    console.log("mama mo url: " + eventOid);
    var url = getDbPath() + '/smile/event_calendar/' + eventOid;
    $.ajax({
        async: false,
        type: "GET",
        url: url,
        contentType: "application/json",
        error: function(jqXHR, textStatus, errorThrown){},
        success: function(data){
            expectedLikes = parseInt(data.expected_likes.toString());
            expectedCount = parseInt(data.expected_volume.toString());
            start = data.start_period;
            end = data.end_period;
            hashtag = data.hashtags;
            if(data.hasOwnProperty("insights"))
                $('#expActInsights').val(data.insights);
        }
    });
    console.log("FINISH EXPECT " + expectedLikes + " " + expectedCount);
}

/*
function populateDropdown(){
    var options = "";
    for(var i = 0 ; i < existingHashtags.length; i++){
        options += "<option value=" + existingHashtags[i] + ">" + existingHashtags[i] + "</option>";
    }
    $("#eventDropdown").html(options);
}
*/

function countStuff(){
    retrieveEventExpected();
    mediaArray = getSpecificRange(start, end, hashtag);
    sessionStorage.setItem("startTimestamp", start);
    sessionStorage.setItem("endTimestamp", end);
    sessionStorage.setItem("hashtagReport", hashtag);
    sessionStorage.setItem("eventOid", eventOid);
    for(let node of mediaArray){
        likesCount += node.ig_object.edge_liked_by.count;
    }
    volumeCount = mediaArray.length;
    console.log("FINISH COUNTING " + likesCount + " " + volumeCount);

    if(likesCount <= expectedLikes){
        panelRowHtml = '<div class="row"><div class="col-md-6"><div class="col-md-12 span_4" role="alert"><div class="col_2 alert alert-danger"><strong>Oh snap!</strong> Your expected Likes is less than the actual Likes.</div></div></div>';
    }else{
        panelRowHtml = '<div class="row"><div class="col-md-6"><div class="col-md-12 span_4" role="alert"><div class="col_2 alert alert-success"><strong>Well done!</strong> You reached the target Likes!</div></div></div>';
    }
    if(volumeCount <= expectedCount){
        panelRowHtml += '<div class="col-md-6"><div class="col-md-12 span_4" role="alert"><div class="col_2 alert alert-danger"><strong>Oh snap!</strong> Your expected Volume of Posts is less than the actual Posts.</div></div></div></div>';
    }else{
        panelRowHtml += '<div class="col-md-6"><div class="col-md-12 span_4" role="alert"><div class="col_2 alert alert-success"><strong>Well done!</strong> You reached the target Volume of Posts!</div></div></div></div>';
    }
    $('#panelRow').html(panelRowHtml);
}
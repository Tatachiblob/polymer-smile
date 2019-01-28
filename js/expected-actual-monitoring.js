import { getDbPath } from './dbPath.js';

console.log("working");

var curUrl = new URL(window.location.href);
var eventOid = curUrl.searchParams.get('event');

var events = [];
var url = getDbPath() + "/smile/event_calendar/" + eventOid;
console.log(url);

$.ajax({
    async: false,
    type: "GET",
    url: url,
    dataType: "json",
    success: function (response) {
        events = response;
    },
    error: function (request, status, error) {}
});
$('#more-details').html('<label id="more-details" class="control-label"><h3>Expected vs Actual Report for ' + events.event_name + ' event</h3></label>');
sessionStorage.setItem('expectedReportTitle', "Expected vs Actual Report for " + events.event_name + ' event');
sessionStorage.setItem('databasePath', getDbPath());
var i = 0;
var eventname = events.event_name;
var event = "";
console.log(events);
if (eventname == null) {
    eventname = events.event_name;
}


event = events.event_name;

console.log(event);
console.log(event.hasOwnProperty("expected_volume"));

if (events.hasOwnProperty("expected_volume")) {
    console.log("working");
    /*
    document.getElementById("expected-total-dataset").innerHTML = "The total number of images scraped is " + events.expected_volume + ".";
    document.getElementById("expected-total-likes").innerHTML = "The images altogether have " + events.expected_likes + " likes.";
    */
}


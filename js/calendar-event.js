import { getDbPath } from './dbPath.js';

$(document).ready(function(){
    $('#calendar_events').fullCalendar({
        height: 480,
        width: 550,
        events: getEvents(),
		displayEventTime: false,
        eventRender: function(eventObj, $el) {
            $el.popover({
                title: eventObj.title,
                content: "#" + eventObj.hashtag + ".\n" + eventObj.desc,
                trigger: 'hover',
                placement: 'top',
                container: 'body'
            });
        },
    });

	//$('input[name="daterange"]').val(moment().format('MMMM/D/YYYY') + " - " + moment().format('MMMM/D/YYYY'));

	$(function() {
	  $('input[name="daterange"]').daterangepicker({
          timePicker: true,
          opens: 'right',
          locale: {
              format: 'M/DD/Y hh:mm A'
          }
	  }, function(start, end, label) {
		//console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
	  });
	});

	$('#createCalendarEvent').click(function(){
		createCalendarEvent();
	});
});

function createCalendarEvent(){

	var url = getDbPath() + '/smile/event_calendar';
	var eventName = $('#event').val();
	var start = Math.round((new Date($('#pickdate').val().split('-')[0])).getTime() / 1000);
	var end = Math.round((new Date($('#pickdate').val().split('-')[1])).getTime() / 1000);
	var eventDesc = $('#txtarea1').val();
	var hashtags = $('#hashtag').val();

	var restBody = {
		'event_name': eventName,
		'start_period': start,
		'end_period': end,
		'event_desc': eventDesc,
		'hashtags': hashtags,
		'is_seen': false
	};

	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(restBody),
		contentType: "application/json",
		error: function(jqXHR, textStatus, errorThrown){
			//console.log(jqXHR);
			if(jqXHR.status == 417){
				//console.log('event name duplication error');
				alert('Event name already in use. Please user a different event name.');
			}else if(jqXHR.status == 201){
				alert('Event Created!');
				window.location.href = "/smile/threshold-target";
			}
		},
		success: function(data){
			alert('Event Created!');
			window.location.href = "/smile/threshold-target";
		}
	});
}

function getEvents(){
    var events = [], tempEvent = {};
    var url = getDbPath() + '/smile/event_calendar';
    console.log(url);
    $.ajax({
        async: false,
        type: "GET",
        url: url,
        dataType: "json",
        success: function (response) {
            console.log(response._embedded);
            console.log(response._embedded.length);
            for(let a of response._embedded){
                tempEvent.title = a.event_name;
                tempEvent.desc = a.event_desc;
                tempEvent.hashtag = a.hashtags;
                tempEvent.start = formatDate(a.start_period);
                tempEvent.end = formatDate(a.end_period) + "T23:59:00";
                console.log('Title: ' + a.event_name);
                console.log("Start: " + tempEvent.start);
                console.log("End: " + tempEvent.end);
                events.push(tempEvent);
                tempEvent = {};
            }
        },
        error: function (request, status, error) {}
    });
    console.log(events);
    return events;
}

function formatDate(date) {
    var d = new Date(date * 1000),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
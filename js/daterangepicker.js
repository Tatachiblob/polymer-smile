import { getDbPath } from './dbPath.js';

try {
	document.getElementById("pickdate").onkeydown = function search() {
		if(event.key === 'Enter') {
			var ele = document.getElementById("pickdate");
			//console.log(ele);
			var aDate = moment(ele.value, "YYYY", true);
			var isValid = aDate.isValid();
			
			if (isValid) {
				var year = aDate.year();
				
				sessionStorage.setItem("year", year);
				sessionStorage.setItem("startDate", moment().year(year).startOf('year').format('MMMM D, YYYY'));
				
				if (year != moment().format('YYYY')) {
					sessionStorage.setItem("endDate", moment().year(year).endOf('year').format('MMMM D, YYYY'));
				} else {
					sessionStorage.setItem("endDate", moment().format('MMMM D, YYYY'));
				}
				
				location.reload();
			} else {
				alert("Year is invalid.");
			}   
		}
	}
} catch (e) {}

var currPage = window.location.href.slice(window.location.href.lastIndexOf("/") + 1);

if (currPage == "marketing-proposal") {
	$(function() {
	  $('input[name="datetimes"]').daterangepicker({
		timePicker: true,
		startDate: moment().startOf('hour'),
		endDate: moment().startOf('hour').add(32, 'hour'),
		locale: {
		  format: 'M/DD/Y hh:mm A'
		}
	  });
	});
} else if (currPage == "consumer-analysis" || currPage == "post-event" || currPage == "comparison-report") {
	$("#datetoday").html("as of ");
	
    var start, end, year;
	
	function formatDate(date) {
		var d = new Date(date * 1000),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}

	var events = [], tempEvent = {};
	var url = getDbPath() + '/smile/event_calendar';
	
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
				events.push(tempEvent);
				tempEvent = {};
			}
		},
		error: function (request, status, error) {}
	});
	console.log(events[0]);
	
	var startEventDate = new Date(events[0].start);
	var endEventDate = new Date(events[0].end.substring(0, events[0].end.indexOf("T")));
	var momentStartEventDate = moment(startEventDate);
	var momentEndEventDate = moment(endEventDate);
	
	/*
	console.log(startEventDate);
	console.log(endEventDate);
	console.log(momentStartEventDate <= moment() && moment() <= momentEndEventDate);
	*/
	var currDay = new Date(2018, 10, 5);
	
	//if (startEventDate <= currDay && currDay <= endEventDate) {
	console.log(momentStartEventDate <= moment());
	console.log(moment() <= momentEndEventDate);
	console.log(momentEndEventDate);
	
	if (momentStartEventDate <= moment() && moment() <= momentEndEventDate) {
		sessionStorage.setItem("hashtagEvent", events[0].hashtag);
		oonsole.log(sessionStorage.getItem("hashtagEvent"));
		var checker = sessionStorage.getItem("checker");
		console.log(checker);
		if (checker == null) {
			checker = 1;
			sessionStorage.setItem("checker", checker);
			start = momentStartEventDate;
			end = momentEndEventDate;
		} else {
			start = sessionStorage.getItem("startDate");
			end = sessionStorage.getItem("endDate");
		}
	} else {
		start = sessionStorage.getItem("startDate");
		end = sessionStorage.getItem("endDate");
	}
	
	year = sessionStorage.getItem("year");
	console.log(start);
	console.log(end);
	console.log(moment());
	console.log(year);
	
	if (year == null) {
		year = moment().year();
		sessionStorage.setItem("year", moment().year());
	}
	
	if (start == null && end == null) {
		start = moment(moment().year(year).startOf('year'));
		end = moment();
	} else {
		start = moment(start);
		end = moment(end);
	}

    sessionStorage.setItem("startDate", start);
    sessionStorage.setItem("endDate", end);

	    console.log(start);
	console.log(end);
	console.log(start.format('MMMM D, YYYY'));
	console.log(end.format('MMMM D, YYYY'));
	console.log(year);
	
	$('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    
	function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
		
		sessionStorage.setItem("startDate", start);
		sessionStorage.setItem("endDate", end);
		sessionStorage.setItem("year", start.format("YYYY"));
		
		window.location.reload();
    }
	
    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    //cb(start, end);
} else {
	/*console.log(sessionStorage.getItem("year"));
	if (sessionStorage.getItem("year") == null) {
		sessionStorage.setItem("year", moment().year());
	}

	$('#pickdate').val(sessionStorage.getItem("year"));

	$('.date-own').datepicker({
		startDate:'-4y', //Today's Date
		endDate:new Date(),
		minViewMode: 2,
		format: 'yyyy'
	});*/
	
	var start, end, year;
	
	start = sessionStorage.getItem("startDate");
	end = sessionStorage.getItem("endDate");
	year = sessionStorage.getItem("year");
	
	if (year == null) {
		year = moment().year();
		sessionStorage.setItem("year", moment().year());
	}
	
	if (start == null && end == null) {
		start = moment(moment().year(year).startOf('year'));
		end = moment();
	} else {
		start = moment(start);
		end = moment(end);
	}

    sessionStorage.setItem("startDate", start);
    sessionStorage.setItem("endDate", end);

	console.log(start);
	console.log(end);
	console.log(start.format('MMMM D, YYYY'));
	console.log(end.format('MMMM D, YYYY'));
	console.log(year);
	
	$('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    
	function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
		
		sessionStorage.setItem("startDate", start);
		sessionStorage.setItem("endDate", end);
		sessionStorage.setItem("year", start.format("YYYY"));
		
		window.location.reload();
    }
	
    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

}
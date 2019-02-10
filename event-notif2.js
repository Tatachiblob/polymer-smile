$(document).ready(function(){
    console.log("event-notif2");
    getEventsThatEnded();
    // $('#calendar_events').fullCalendar({
    //     height: 480,
    //     width: 550,
    //     events: getEvents(),
    //     displayEventTime: false,
    //     eventRender: function(eventObj, $el) {
    //         $el.popover({
    //             title: eventObj.title,
    //             content: "#" + eventObj.hashtag + "." + eventObj.desc,
    //             trigger: 'hover',
    //             placement: 'top',
    //             container: 'body'
    //         });
    //     },
    // });
});

function getEvents(){
    var events = [], tempEvent = {};
    var url = 'http://localhost:8080/smile/event_calendar';
    $.ajax({
        async: false,
        type: "GET",
        url: url,
        dataType: "json",
        success: function (response) {
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
    //console.log(events);
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

function getEventsThatEnded(){
    var finishedEvents = "";
    var tempId, eventName, isSeen, endDay, newCtr = 0;
    var curDate = Math.floor(Date.now() / 1000);
    var url = 'http://localhost:8080/smile/event_calendar?filter={"end_period":{"$lte":' + curDate + '}}&sort=-end_period';
    $.ajax({
        async: false,
        type: "GET",
        url: url,
        dataType: "json",
        success: function (response) {
            response = response._embedded;
            for(let a of response){
                tempId = a._id.$oid;
                eventName = a.event_name;
                isSeen = a.is_seen;
                endDay = timeSince(a.end_period);
                if(isSeen)
                    finishedEvents += '<li class="avatar"><a href="/smile/expected-actual?event=' + tempId + '"><img src="images/instagram_hashtag.png" alt=""><div class="text">Event finished ' + eventName + '</div><small>' + endDay + '</small></a></li>';
                else {
                    finishedEvents += '<li class="avatar"><a href="/smile/expected-actual?event=' + tempId + '"><img src="images/instagram_hashtag.png" alt=""><div class="text">Event finished ' + eventName + '</div><small>' + endDay + '</small><span class="label label-info" style="margin-top: 10px;">NEW</span></a></li>';
                    newCtr++;
                }
            }
            $('#notif-dropdowns').html(finishedEvents);
            $('#notif-count').text(newCtr);
        },
        error: function (request, status, error) {}
    });
}

function timeSince(stamp) {
    var timeStamp = new Date(stamp * 1000);
    var day, month, year;
    var now = new Date(),
        secondsPast = (now.getTime() - timeStamp.getTime() ) / 1000;
    if(secondsPast < 60){
        return parseInt(secondsPast) + ' seconds ago';
    }
    if(secondsPast < 3600){
        if(parseInt(secondsPast/60) == 1)
            return "1 minute ago"
        return parseInt(secondsPast/60) + ' minutes ago';
    }
    if(secondsPast <= 86400){
        if(parseInt(secondsPast/3600) == 1)
            return "1 hour ago"
        return parseInt(secondsPast/3600) + ' hours ago';
    }
    if(secondsPast > 86400){
        day = timeStamp.getDate();
        month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
        year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
        return day + " " + month + year;
    }
}
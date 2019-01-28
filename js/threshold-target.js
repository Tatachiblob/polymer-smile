import { getDbPath } from './dbPath.js';

var events = [];
$(document).ready(function(){
    getEvents();
    $('#eventDropdown').on('change', function(){
        for(let e of events){
            console.log($('#eventDropdown').val());
            if(e._id.$oid == $('#eventDropdown').val()){
                $('#eventName').text('Event Name: ' + e.event_name);
                if(e.event_desc)
                    $('#eventDesc').text('Event Description: ' + e.event_desc);
                else
                    $('#eventDesc').text('Event Description: No Descriptions Provided');
                $('#eventPeriod').text('Event Period: ' + formatDate(e.start_period) + " ~ " + formatDate(e.end_period) );
                $('#eventHashtag').text('Event Hashtag: #' + e.hashtags );
            }
        }
    });

    $('#addThreshold').click(function(){
        var volume = $('#inputExpectedVolImages').val(), likes = $('#inputExpectedVolLikes').val();
        var oid = $('#eventDropdown').val();
        var data = {};
        data.expected_volume = volume;
        data.expected_likes = likes;
        var patchUrl = getDbPath() + '/smile/event_calendar/' + oid;
        $.ajax({
            async: false,
            type: "PATCH",
            url: patchUrl,
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(data),
            complete: function (xhr, status) {
                console.log(xhr);
                console.log(status);
                if(xhr.status == 200) {
                    alert('Threshold Target successfully created!');
                    window.location.href = "/smile/expected-actual?event=" + oid;
                }
            }
        });
    });
});

function getEvents(){
    var url = getDbPath() + '/smile/event_calendar';
    $.ajax({
        async: false,
        type: "GET",
        url: url,
        dataType: "json",
        success: function (response) {
            events = response._embedded;
        },
        error: function (request, status, error) {}
    });

    var dropdown = '';
    for(let e of events)
        dropdown += '<option value="' + e._id.$oid + '">' + e.event_name + '</option>';
    $('#eventDropdown').html(dropdown);

    for(let e of events){
        if(e._id.$oid == $('#eventDropdown').val()){
            $('#eventName').text('Event Name: ' + e.event_name);
            if(e.event_desc)
                $('#eventDesc').text('Event Description: ' + e.event_desc);
            else
                $('#eventDesc').text('Event Description: No Descriptions Provided');
            $('#eventPeriod').text('Event Period: ' + formatDate(e.start_period) + " ~ " + formatDate(e.end_period) );
            $('#eventHashtag').text('Event Hashtag: #' + e.hashtags );

            sessionStorage.setItem("event", $('#eventDropdown').val());
        }
    }
}

function formatDate(date) {
    var d = new Date(date * 1000),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/');
}
import { getDbPath } from './dbPath.js';

$(document).ready(function(){
    console.log('ready');
    var curUrl = new URL(window.location.href);
    var marketOid = curUrl.searchParams.get('oid').toString();
    var restUrl = getDbPath() + "/smile/marketing_reports/" + marketOid;
    console.log(restUrl);
    $.ajax({
        async: false,
        url: restUrl,
        type: "GET",
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
            $('#more-details').html('<label class="control-label"><h3>' + data.type + ' Proposal of ' + data.event_name + '</h3><h5 style="text-align: center">As of ' + formatAMPM(data.created_timestamp.$numberLong) + '</h5></label>');
            $('#label1').text(data.type + " Name");
            $('#label2').text(data.type + " Description");
            $('#label3').text(data.type + " Duration");
            $('#eventName').val(data.event_name);
            $('#eventDesc').val(data.event_desc);
            $('#eventdaterange').val(formatUnix(data.start_period) + " - " + formatUnix(data.end_period));
            $('#eventHashtags').val(data.suggested_hashtag);
            $('#eventColorShade').val(data.color_shade);
            $('#eventLocation').val(data.location);
            $('#otherComments').val(data.other_comments);
            $('#preparedBy').val(data.prepared_by);
            $('#approvedBy').val(data.approved_by);
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });

    $('#printAgain').click(function(){
        var restorepage = $('body').html();
        var printcontent = $('#forPrinting').clone();
        $('body').empty().html(printcontent);
        window.print();
        $('body').html(restorepage);

        $.ajax({
            async: false,
            url: restUrl,
            type: "GET",
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                $('#more-details').html('<label class="control-label"><h3>Marketing Proposal of ' + data.event_name + '</h3><h5 style="text-align: center">As of ' + formatAMPM(data.created_timestamp.$numberLong) + '</h5></label>');
                $('#eventName').val(data.event_name);
                $('#eventDesc').val(data.event_desc);
                $('#eventdaterange').val(formatUnix(data.start_period) + " - " + formatUnix(data.end_period));
                $('#eventHashtags').val(data.suggested_hashtag);
                $('#eventColorShade').val(data.color_shade);
                $('#eventLocation').val(data.location);
                $('#otherComments').val(data.other_comments);
            },
            error: function(jqXHR, textStatus, errorThrown) {}
        });
    });

});

function formatAMPM(longUnix) {
    var date = new Date(parseInt(longUnix));
    console.log(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + strTime;
}

function formatUnix(timestamp){
    var a = new Date(timestamp * 1000);
    var year = a.getFullYear();
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var hours = a.getHours();
    var minutes = a.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var time = year + '/' + month + '/' + date + ' ' + strTime ;
    return time;
}
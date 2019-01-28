import { getDbPath } from './dbPath.js';

$('#createNewEvent').click(function(){
    if(marketChecker()){
        var url = getDbPath() + '/smile/marketing_reports';
        console.log($('#eventName').val());
        console.log($('#eventdaterange').val());
        console.log($('#eventColorShade').val());
        console.log($('#eventLocation').val());

        var marketingReport = {};
        var start = Math.round((new Date($('#eventdaterange').val().split('-')[0])).getTime() / 1000);
        var end = Math.round((new Date($('#eventdaterange').val().split('-')[1])).getTime() / 1000);
        marketingReport.event_name = $('#eventName').val();
        marketingReport.event_desc = $('#eventDesc').val();
        marketingReport.start_period = start;
        marketingReport.end_period = end;
        marketingReport.suggested_hashtag = $('#eventHashtags').val();
        marketingReport.color_shade = $('#eventColorShade').val();
        marketingReport.location = $('#eventLocation').val();
        marketingReport.other_comments = $('#otherComments').val();
        if($('#preparedBy').val())
            marketingReport.prepared_by = $('#preparedBy').val();
        else
            marketingReport.prepared_by = "";
        if($('#approvedBy').val())
            marketingReport.approved_by = $('#approvedBy').val();
        else
            marketingReport.approved_by = "";
        marketingReport.type= $('#proposalType').val();
        marketingReport.data_start_time = Math.round(new Date(new Date().getFullYear(), 0, 1).getTime() / 1000);
        marketingReport.data_end_time = Math.round(new Date().getTime() / 1000);
        marketingReport.created_timestamp = new Date().getTime();

        $.ajax({
            async: false,
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(marketingReport),
            success: function(result){
                alert('Marketing Proposal Template Created!');
                window.location.href = "/smile/calendar-event";
            },
            error: function(jqXHR, textStatus, errorThrown){
                if(jqXHR.status == 417){
                    //console.log('event name duplication error');
                    alert('Please choose another Event Name.');
                    window.location.href = "/smile/marketing-proposal"
                }else if(jqXHR.status == 201){
                    alert('Marketing Proposal Template Created!');
                    window.location.href = "/smile/calendar-event";
                }
            }
        });
        //console.log(marketingReport);
    }
    console.log('clicked');
});

function marketChecker(){
    var msg = "";
    if(!$('#eventName').val()) msg += 'Please enter the Event Name.\n';
    if(!$('#eventdaterange').val()) msg += 'Please enter the Event Duration.\n';
    if(!$('#eventColorShade').val()) msg += 'Please enter the Color scheme.\n';
    if(!$('#eventLocation').val()) msg += 'Please enter the Event\'s main location.';

    if(msg){
        alert(msg);
        return false
    }else{
        return true
    }
}
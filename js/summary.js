import { getDbPath } from './dbPath.js';

$('#printBtn').click(function(){
    if($('#summaryName').val()){
        console.log("val: " + $('#summaryName').val());
        //console.log("There is value: " + sessionStorage.getItem("hashtagInput"));
        var start = Math.round(new Date(sessionStorage.getItem('startDate')).getTime() / 1000), end = Math.round(new Date(sessionStorage.getItem('endDate')).getTime() / 1000);
        var url = getDbPath() + "/smile/summary_report";
        var body = {
            "summaryReportName": $('#summaryName').val(),
            "hashtag": sessionStorage.getItem("hashtagInput"),
            "start": start,
            "end": end,
            "html": $('#forPrintingSummary').html(),
            "insights": $('#generalInsights').val(),
            "created_at": new Date().getTime()
        };

        $.ajax({
            async: false,
            url: url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(body),
            success: function(result){
                printPage();
                alert('Summary Report Created!');
                window.location.href = "/smile/marketing-proposal";
            },
            error: function(jqXHR, textStatus, errorThrown){
                if(jqXHR.status == 417){
                    //console.log('event name duplication error');
                    alert('Please choose another Report Name.');
                    window.location.href = "/smile/summary"
                }else if(jqXHR.status == 201){
                    printPage();
                    alert('Summary Report Created!');
                    window.location.href = "/smile/marketing-proposal";
                }
            }
        });

        console.log(body);
    }else{
        //console.log("There is no value");
        alert("Please enter the report's name.");
    }
});

function printPage() {
    var restorepage = $('body').html();
    var printcontent = $('#forPrintingSummary').clone();
    $('body').empty().html(printcontent);
    window.print();
    $('body').html(restorepage);
}
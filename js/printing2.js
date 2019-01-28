function printPage2(id) {
    saveIntoDb();
    var restorepage = $('body').html();
    var printcontent = $('#' + id).clone();
    $('body').empty().html(printcontent);
    window.print();
    $('body').html(restorepage);
    document.getElementById("more-details").innerHTML = '<label id="more-details" class="control-label"><h3>'+ sessionStorage.getItem("expectedReportTitle") +'</h3></label>';
}

function printPage3(id) {
    //saveIntoDb();
    var restorepage = $('body').html();
    var printcontent = $('#' + id).clone();
    $('body').empty().html(printcontent);
    window.print();
    $('body').html(restorepage);
    document.getElementById("more-details").innerHTML = '<label id="more-details" class="control-label"><h3>'+ sessionStorage.getItem("expectedReportTitle") +'</h3></label>';
}

function saveIntoDb(){
    var reportTitle = sessionStorage.getItem("expectedReportTitle");
    var createdDate = Math.round(new Date().getTime() / 1000);
    var start = parseInt(sessionStorage.getItem("startTimestamp")), end = parseInt(sessionStorage.getItem("endTimestamp")), hashtagReport = sessionStorage.getItem("hashtagReport"), eventOid = sessionStorage.getItem("eventOid");

    var restUrl = sessionStorage.getItem('databasePath') + "/smile/expected_actual_reports";
    var restBody = {
        "report_title": reportTitle,
        "created_date": createdDate,
        "start_period": start,
        "end_period": end,
        "hashtag": hashtagReport,
        "event_oid":eventOid,
        "insights": $('#expActInsights').val()
    };

    $.ajax({
        async: true,
        type: "POST",
        url: restUrl,
        data: JSON.stringify(restBody),
        contentType: "application/json",
        complete: function (xhr, status) {
            console.log(xhr);
            console.log(status);
        }
    });

    console.log(restUrl);
    console.log(restBody);
}
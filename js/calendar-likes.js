import { getIGMediaNew } from './dataRetrieve.js';

var igMedia = {};
var calendarDates;

$(document).ready(function(){
    igMedia = getIGMediaNew(sessionStorage.getItem("hashtagInput"));
    calendarDates = formatChartData(igMedia);
    console.log(calendarDates);

    var calendarConfig = {
        type: 'calendar',
        title: {
            text: 'Number of Likes Heat Map',
            fontColor: '#333333',
            fontFamily: 'verdana',
            fontSize: 18,
            fontWeight: 'normal',
            textAlign: 'center',
            x: '10%',
            y: '9%',
            width: '60%',
        },
        options: {
            year: {
                text: '2018',
                visible: false
            },
            rows: 2,
            palette: ['none','#3F51B5'],
            scale: {
                x: '75%',
                y: '15%',
                height: 10,
                width: '30%'
            },
            month: {
                item: {
                    fontColor: 'gray',
                    fontSize: 9
                },
                outline: {
                    borderColor: '#BDBDBD',
                    active: {
                        borderColor: '#BDBDBD'
                    }
                }
            },
            weekday: {
                values: ['','Mon','','Wed','','Fri',''],
                item:{
                    fontColor: 'gray',
                    fontSize:9
                }
            },
            day: {
                inactive: {
                    backgroundColor: '#F5F5F5'
                }
            },
            values: calendarDates//[["2018-10-02",2,"A"],["2018-10-01",6,"A"],["2018-09-30",6,"A"],["2018-09-29",7,"A"],["2018-09-28",7,"A"],["2018-09-27",6,"A"],["2018-09-26",8,"A"],["2018-09-25",5,"A"],["2018-09-24",9,"A"],["2018-09-23",3,"A"],["2018-09-22",3,"A"],["2018-09-21",4,"A"],["2018-09-20",6,"A"],["2018-09-19",9,"A"],["2018-09-18",5,"A"],["2018-09-17",12,"A"],["2018-09-15",2,"A"]]
        },
        plot: {
            tooltip: {
                text: '%data-day:<br><br>%v pictures<br>uploaded.',
                alpha: 0.8,
                backgroundColor: '#212121',
                borderColor: '#212121',
                borderRadius: 3,
                fontColor: 'white',
                fontFamily: 'Georgia',
                fontSize: 12,
                offsetY: -10,
                textAlign: 'center',
                textAlpha: 1
            }
        },
        plotarea: {
            marginTop: '30%',
            marginBottom:'10%'
        }
    };

    zingchart.loadModules('calendar', function(){
        zingchart.render({
            id : 'calendar-likes',
            data : calendarConfig,
            height: 400,
            width: '100%'
        });
    });
});

function formatChartData(igMedia){
    //console.log(igMedia)
    var chartData = [];
    var groupByDate = new Map();
    /*for (let searchHistory of igMedia.search_history){
        for(let igMedia of searchHistory.nodes){
            chartData.push(igMedia);
        }
    }*/
	for (let node of igMedia){
		chartData.push(node);
	}

    for(let a of chartData){
        if(groupByDate.has(timeConverter(a.ig_object.taken_at_timestamp))){
            //console.log("IF");
            var tempA = groupByDate.get(timeConverter(a.ig_object.taken_at_timestamp));
            tempA.push(a);

            groupByDate.set(timeConverter(a.ig_object.taken_at_timestamp), tempA);
        }
        else{
            //console.log("ELSE");
            groupByDate.set(timeConverter(a.ig_object.taken_at_timestamp), [a]);
        }
    }

    var formattedData = [];
    for (var key of groupByDate.keys()) {
        var temp = [];
        temp.push(key);
        temp.push(groupByDate.get(key).length);
        temp.push(groupByDate.get(key).length);
        formattedData.push(temp);
    }
    //console.log(formattedData);
    return formattedData;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = year + '-' + month + '-' + date;
    time = time.replace(/\b(\d{1})\b/g, '0$1');
    return time;
}

var updateChart = function(p) {
    console.log(p);

    var media = getIGMediaNew(sessionStorage.getItem("hashtagInput"));
    //var media = getIGMedia(sessionStorage.getItem("hashtagInput"));
    var dateURLArray = [];

    var i, j;
	/*
    for (i = 0; i < media.search_history.length; i ++) {
        for (j = 0; j < media.search_history[i].nodes.length; j ++) {
            if (timeConverter(media.search_history[i].nodes[j].taken_at_timestamp) == p["data-day"]) {
                dateURLArray.push(media.search_history[i].nodes[j].display_url);
            }
        }
    }*/
    for (i = 0; i < media.length; i ++) {
		if (timeConverter(media[i].ig_object.taken_at_timestamp) == p["data-day"]) {
			dateURLArray.push(media[i].ig_object.display_url);
		}
    }

    var imagesArray = dateURLArray;
    var i;
    var images = '<div class="row">';

    for (i = 0; i < imagesArray.length; i ++) {
        images += '<div class="col-md-2 col-xs-4 col-sm-4 padding-10"><img src="' + imagesArray[i] + '" height="90" width="90"></div>';

        if ((i + 1) % 6 == 0) {
            images += '</div><div class="row">';
        }
    }

    document.getElementById("title").innerHTML = " Category Images";
    document.getElementById("pics").innerHTML = images + '</div>';
    $('#myModal').modal('show');
}

zingchart.bind('calendar-chart','node_click',updateChart);
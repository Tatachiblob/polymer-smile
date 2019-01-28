import { 
	getIGMedia, 
	getIGMedia2, 
	getHashtag,
	getHashtag2
} from './mapper.js';
import { getDbPath } from './dbPath.js';

var igMedia = {};
var igMedia2 = {};
var calendarDates;
var calendarDates2;
var calendarConfig;
var calendarConfig2;

$(document).ready(function(){
	igMedia = getIGMedia();
	calendarDates = formatChartData(igMedia);
	//console.log(calendarDates);
	
	initializeCalendarConfig(calendarDates);
	
	zingchart.loadModules('calendar', function(){   
	  zingchart.render({ 
		id : 'calendar-chart', 
		data : calendarConfig, 
		height: '100%',
		width: '100%'
	  });
	});
	
	zingchart.bind('calendar-chart','node_click',updateChart);
	
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "comparison-report") {
		igMedia = getIGMedia2();
		calendarDates = formatChartData(igMedia);
		
		initializeCalendarConfig(calendarDates);
	
		zingchart.loadModules('calendar', function(){   
		  zingchart.render({ 
			id : 'calendar-chart2', 
			data : calendarConfig, 
			height: '100%',
			width: '100%'
		  });
		});
		
		zingchart.bind('calendar-chart2','node_click',updateChart);
	}
	
	//only returns two days as of now
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "engagement-report" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary") {
		//console.log(calendarConfig.options.values);
		//Images Posted Heat Map lays out the number of posts made each day, and the most posts were on 2018-10-13 and 2018-10-14 
		//with 16 and 9 images posted respectively.
		
		var i, j, calendarProcessing, calendarArray, currMax, indices, calendar;
		
		calendarArray = [];
		indices = [];
		//calendar = "<b>Instagram Images Posted Heat Map</b> lays out the number of posts made each day, and the most posts were on ";
		calendarProcessing = calendarConfig.options.values;
		
		for (i = 0; i < calendarProcessing.length; i ++) {
			calendarArray.push(calendarProcessing[i][1]);
		}
		
		for (i = 1; i <= 3; i ++) {
			currMax = calendarArray.indexOf(Math.max(...calendarArray));
			indices.push(currMax);
			calendarArray[currMax] = -1;
		}
		//console.log(calendarProcessing[indices[0]]);
		//sessionStorage.setItem("calendarDate", calendarProcessing[indices[0]][0]);
		//sessionStorage.setItem("calendarValue", calendarProcessing[indices[0]][1]);
		//calendar += calendarProcessing[indices[0]][0] + " and " + calendarProcessing[indices[1]][0] + " with " + calendarProcessing[indices[0]][1] + " and " + calendarProcessing[indices[1]][1] + " images posted respectively.";

		calendar = "<b>Images Posted per Day</b><br><table class='table'><thead><tr><th>Date</th><th>No. of Images</th></tr></thead><tbody>";

		for (i = 0; i < 3; i ++) {
			calendar += "<tr><td>" + calendarProcessing[indices[i]][0] + "</td><td>" + calendarProcessing[indices[i]][1] + "</td></tr>";
		}
		//console.log(sessionStorage.getItem("calendarDate"));
		//console.log(sessionStorage.getItem("calendarValue"));
		try {
            document.getElementById("calendar").innerHTML = calendar;
		} catch (e) {}
	}
});

function initializeCalendarConfig(calendarDates) {
	calendarConfig = {
	  type: 'calendar',
	  title: {
		text: 'Instagram Images Posted Heat Map',
          paddingLeft: "0px",
		fontColor: '#333333',
		fontFamily: 'Helvetica',
		fontSize: 18,
		fontWeight: 'normal',
		textAlign: 'left',
		x: '10%',
		y: '9%',
		width: '60%',
	  },
		subtitle: {
			text: "No. of Images: ",
            textAlign: 'left',
            paddingLeft: "700px"
		},
	  options: {
		year: {
		  text: sessionStorage.getItem('year'),
		  //visible: false
		},
		rows: 2,
		palette: ['none','#3F51B5'],
		scale: {
            // label: { // Styles the indicator labels.
            //     // backgroundColor: '#ffe6e6',
            //     // fontColor:'red',
            //     // fontFamily: 'Georgia',
            //     // fontSize: 12
				// title: "No. of Images"
            // },
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
		  text: '%data-day:<br><br>%v pictures<br>uploaded.<br><br>Events on this day: %data-info0',
		  alpha: 0.8,
		  backgroundColor: '#212121',
		  borderColor: '#212121',
		  borderRadius: 3,
		  fontColor: 'white',
		  fontFamily: 'Lucida Grande',
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
}

function initializeCalendarConfig2(calendarDates2) {
	calendarConfig2 = {
	  type: 'calendar',
	  title: {
		text: 'Images Posted Heat Map',
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
		  text: '' + sessionStorage.getItem("year"),
		  visible: false
		},
		rows: 1,
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
		values: calendarDates2//[["2018-10-02",2,"A"],["2018-10-01",6,"A"],["2018-09-30",6,"A"],["2018-09-29",7,"A"],["2018-09-28",7,"A"],["2018-09-27",6,"A"],["2018-09-26",8,"A"],["2018-09-25",5,"A"],["2018-09-24",9,"A"],["2018-09-23",3,"A"],["2018-09-22",3,"A"],["2018-09-21",4,"A"],["2018-09-20",6,"A"],["2018-09-19",9,"A"],["2018-09-18",5,"A"],["2018-09-17",12,"A"],["2018-09-15",2,"A"]]
	  },
	  plot: {
		tooltip: {
		  text: '%data-day:<br><br>%v pictures<br>uploaded.<br>',
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
}

function formatChartData(igMedia){
	//console.log(igMedia);
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
	//console.log(chartData);
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
	var events = getEvent();
	console.log(events);
	for (var key of groupByDate.keys()) {
		var temp = [];
		temp.push(key);
		temp.push(groupByDate.get(key).length);
		var eName = "";
		for(let e of events){
			if((e.dateRange).includes(key)){
				eName += e.eventName + ", ";
			}
		}
		temp.push(eName.substring(0, eName.length - 2));
		formattedData.push(temp);
	}
	return formattedData;
}

function getEvent(){
	var url = getDbPath() + '/smile/event_calendar?filter={"hashtags":"' + sessionStorage.getItem('hashtagInput') + '"}&np', events = [], temp = {};
	var getDateArray = function(start, end) {
		var arr = new Array();
		var dt = new Date(start);
		var de = new Date(end);
		while (dt <= de) {
			arr.push(formatDate2(new Date(dt)));
			dt.setDate(dt.getDate() + 1);
		}
		return arr;
	}
	
	$.ajax({
		async: false,
		type: "GET",
		url: url,
		contentType: "application/json",
		error: function(jqXHR, textStatus, errorThrown){},
		success: function(data){
			console.log(data);
			for(let a of data){
				temp.eventName = a.event_name, temp.eventDesc = a.event_desc;
				temp.dateRange = getDateArray(formatDate(a.start_period), formatDate(a.end_period));
				events.push(temp);
				temp = {};
			}
		}
	});
	return events;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function formatDate2(d) {
	var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
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
	//console.log(p);
	
	var media = getIGMedia();
	var dateURLArray = [];
	
	var i, j;
	
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
	
	document.getElementById("title").innerHTML = " Images Uploaded on " + p["data-day"];
	document.getElementById("pics").innerHTML = images + '</div>';
	$('#myModal').modal('show');
}
import { 
	getEmotionImages,
	getIGProcessingMS
} from './mapper.js';

var emotionImageIDs = {
    "anger": [],
    "contempt": [],
    "disgust": [],
    "fear": [],
    "happiness": [],
    "neutral": [],
    "sadness": [],
    "surprise": []
};

$(document).ready(function(){
    var igProcessing = getIGProcessingMS();

    var emotionData = calcEmotion(igProcessing);

    var emoChartConfig =
        {
            "type":"hbar",
            "font-family":"Arial",
            "title":{
                "text":"Facial Emotion Recognition",
                "font-family":"verdana",
                "font-weight": "normal",
                "background-color":"none",
                "font-color":"#333333",
                "font-size":"18px"
            },
            "labels":[
                // {
                // 	"text":"DAYS",
                // 	"font-size":"12px",
                // 	"font-color":"#9d9d9d",
                // 	"x":"11.5%",
                // 	"y":"10%"
                // },
                {
                    "text":"PERCENTAGE",
                    "font-size":"12px",
                    "font-color":"#9d9d9d",
                    "x":"15%",
                    "y":"10%"
                },
                {
                    "text":"EMOTION",
                    "font-size":"12px",
                    "font-color":"#9d9d9d",
                    "x":"5%",
                    "y":"10%"
                }
            ],
            "arrows":[
                {
                    "backgroundColor":"#CCCCCC",
                    "direction":"bottom",
                    "borderWidth": 0,
                    "to":{
                        "x": "3%",
                        "y": "27%"
                    },
                    "from":{
                        "x": "3%",
                        "y": "79%"
                    }
                }
            ],
            "shapes":[
                {
                    "type":"circle",
                    "x": 45,
                    "y": 99,
                    "backgroundColor": "white",
                    "borderColor":"#6FA6DF",
                    "borderWidth":3,
                    "size": 14
                },
                {
                    "type":"circle",
                    "x": 40,
                    "y": 95,
                    "backgroundColor": "#6FA6DF",
                    "size": 2
                },
                {
                    "type":"circle",
                    "x": 50,
                    "y": 95,
                    "backgroundColor": "#6FA6DF",
                    "size": 2
                },
                {
                    "type":"pie",
                    "background-color":"#5297b6",
                    "size":8,
                    "x":45,
                    "y":100,
                    "angle-start":0,
                    "angle-end":180,
                },
                {
                    "type":"pie",
                    "background-color":"#fff",
                    "size":6,
                    "x":45,
                    "y":100,
                    "angle-start":0,
                    "angle-end":180,
                },
                {
                    "type":"circle",
                    "x": 45,
                    "y": 433,
                    "backgroundColor": "white",
                    "borderColor":"#FA8452",
                    "borderWidth":3,
                    "size": 14
                },
                {
                    "type":"circle",
                    "x": 40,
                    "y": 429,
                    "backgroundColor": "#FA8452",
                    "size": 2
                },
                {
                    "type":"circle",
                    "x": 50,
                    "y": 429,
                    "backgroundColor": "#FA8452",
                    "size": 2
                },
                {
                    "type":"pie",
                    "background-color":"#FA8452",
                    "size":8,
                    "x":45,
                    "y":439,
                    "angle-start":170,
                    "angle-end":10,
                },
                {
                    "type":"pie",
                    "background-color":"#fff",
                    "size":5,
                    "x":45,
                    "y":440,
                    "angle-start":170,
                    "angle-end":10,
                }
            ],
            "plot":{
                "bars-overlap":"100%",
                "borderRadius":8,
                "hover-state":{
                    "visible":false
                },
                "animation": {
                    "delay": 300,
                    "effect": 3,
                    "speed": "500",
                    "method": "0",
                    "sequence": "3"
                }
            },
            "plotarea":{
                "margin":"60px 60px 20px 140px",
                "backgroundColor":'transparent'
            },
            "scale-x":{
                "line-color":"none",
                "labels":["Anger","Contempt","Disgust","Fear","Sadness","Neutral","Surprise","Joy"],
                "values":["anger","contempt","disgust","fear","sadness","neutral","surprise","happiness"],
                "tick":{
                    "visible":false
                },
                "guide":{
                    "visible":false
                },
                "item":{
                    "font-size":"14px",
                    "padding-right":"20px",
                    "auto-align":true,
                    "rules":[
                        {
                            "rule":"%i==0",
                            "font-color":"#FA8452"
                        },
                        {
                            "rule":"%i==1",
                            "font-color":"#FCAE48"
                        },
                        {
                            "rule":"%i==2",
                            "font-color":"#FCCC65"
                        },
                        {
                            "rule":"%i==3",
                            "font-color":"#FCCC65"
                        },
                        {
                            "rule":"%i==4",
                            "font-color":"#6FA6DF"
                        },
                        {
                            "rule":"%i==5",
                            "font-color":"#A0BE4A"
                        },
                        {
                            "rule":"%i==6",
                            "font-color":"#A0BE4A"
                        },
                        {
                            "rule":"%i==7",
                            "font-color":"#A0BE4A"
                        }
                    ]
                }
            },
            "scale-y":{
                "visible":false,
                "guide":{
                    "visible":false
                }
            },
            "series":[
                {
                    "values":[100,100,100,100,100,100,100,100],
                    "bar-width":"100%",
                    "background-color":"#f2f2f2",
                    "border-color": "#e8e3e3",
                    "border-width":2,
                    "fill-angle":90,
                    "tooltip":{
                        "visible":false
                    }
                },
                {
                    "values":[emotionData.anger,
                        emotionData.contempt,
                        emotionData.disgust,
                        emotionData.fear,
                        emotionData.sadness,
                        emotionData.neutral,
                        emotionData.surprise,
                        emotionData.happiness],
                    "bar-width":"32px",
                    "max-trackers":0,
                    "value-box":{
                        "placement":"top-out",
                        "text":"%v",
                        "decimals":0,
                        "font-color":"#A4A4A4",
                        "font-size":"14px",
                        "alpha":0.6
                    },
                    "rules":[
                        {
                            "rule":"%i==0",
                            "background-color":"#ff0000"
                        },
                        {
                            "rule":"%i==1",
                            "background-color":"#FA8452"
                        },
                        {
                            "rule":"%i==2",
                            "background-color":"#FCAE48"
                        },
                        {
                            "rule":"%i==3",
                            "background-color":"#FCCC65"
                        },
                        {
                            "rule":"%i==4",
                            "background-color":"#6FA6DF"
                        },
                        {
                            "rule":"%i==5",
                            "background-color":"#A0BE4A"
                        },
                        {
                            "rule":"%i==6",
                            "background-color":"#A0BE4A"
                        },
                        {
                            "rule":"%i==7",
                            "background-color":"#A0BE4A"
                        }
                    ]
                }
            ]
        };

    zingchart.render({
        id : 'emo-chart',
        data : emoChartConfig,
        //width: 725
    });
	
	console.log(emoChartConfig["scale-x"].labels);
	console.log(emoChartConfig.series[1].values);
	
	if (window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "consumer-analysis" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "post-event" || window.location.href.slice(window.location.href.lastIndexOf("/") + 1) == "summary") {
		var currMax, indexOfMax, x, x2, i, numOfImages, ageRanges, xArray, x2Array;
		
		xArray = [];
		x2Array = [];
		numOfImages = emoChartConfig.series[1].values;
		
		//ageRanges = "<b>Facial Emotion Recognition</b> displays that the usual emotions expressed in the images are ";
		ageRanges = "<b>Facial Emotion Recognition</b><br><table class='table'><thead><tr><th>Emotion</th><th>Percentage</th></tr></thead><tbody>";
		
		for (i = 1; i <= 3; i ++) {
			currMax = Math.max(...numOfImages);
			indexOfMax = numOfImages.indexOf(currMax);
			numOfImages[indexOfMax] = 0;
			
			try {
				x = emoChartConfig["scale-x"].labels[indexOfMax].toLowerCase();
			} catch (err) {}
			
			x2 = Math.round(currMax);
			
			xArray.push(x);
			x2Array.push(x2);
		}
		
		/*Facial Emotion Recognition expresses that the usual
		emotions expressed in the images are joy, sadness and neutral, with the 
		number of photos being 79, 20 and 1 respectively.*/
		
		for (i = 0; i < xArray.length; i ++) {
		    /*if (i === 0) {
		        sessionStorage.setItem("emotionName", xArray[i]);
		        sessionStorage.setItem("emotionValue", x2Array[i]);
            }*/
			ageRanges += "<tr><td>" + xArray[i] + "</td><td>" + x2Array[i] + "</td></tr>";
		}
		ageRanges += "</tbody></table>";
		/*
		for (i = 0; i < xArray.length; i ++) {
			if (xArray.length - 1 == i) {
				ageRanges += "and " + xArray[i];
			} else {
				ageRanges += xArray[i] + ", ";
			}
		}
			
		ageRanges += " with the percentage of photos being ";
	
		for (i = 0; i < x2Array.length; i ++) {
			if (xArray.length - 1 == i) {
				ageRanges += "and " + x2Array[i] + "% respectively.";
			} else {
				ageRanges += x2Array[i] + "%, ";
			}
		}
		*/

		//console.log(sessionStorage.getItem("emotionName"));
		//console.log(sessionStorage.getItem("emotionValue"));
		try {
            document.getElementById("emotion").innerHTML = ageRanges;
        } catch (e) {}
	}
});

function calcEmotion(ig){
    var totalFaces = 0;
    var totalEmotion = {
        "anger": 0,
        "contempt": 0,
        "disgust": 0,
        "fear": 0,
        "happiness": 0,
        "neutral": 0,
        "sadness": 0,
        "surprise": 0
    };

    for(let picture of ig){
        var msFace = picture.face;
        var bool = true;
        for(let face of msFace){
            var emotion = face.faceAttributes.emotion;
            totalFaces++;
            totalEmotion.anger += emotion.anger;
            totalEmotion.contempt += emotion.contempt;
            totalEmotion.disgust += emotion.disgust;
            totalEmotion.fear += emotion.fear;
            totalEmotion.happiness += emotion.happiness;
            totalEmotion.neutral += emotion.neutral;
            totalEmotion.sadness += emotion.sadness;
            totalEmotion.surprise += emotion.surprise;

            if (bool) {
                for (var emo in emotion) {
                    if (emotion[emo] != 0) {
                        emotionImageIDs[emo].push(picture.ig_id);
                    }
                }
                bool = false;
            }
        }
    }

    //console.log("Before Calc");
    //console.log(totalEmotion);

    totalEmotion.anger = (totalEmotion.anger / totalFaces) * 100;
    totalEmotion.contempt = (totalEmotion.contempt / totalFaces) * 100;
    totalEmotion.disgust = (totalEmotion.disgust / totalFaces) * 100;
    totalEmotion.fear = (totalEmotion.fear / totalFaces) * 100;
    totalEmotion.happiness = (totalEmotion.happiness / totalFaces) * 100;
    totalEmotion.neutral = (totalEmotion.neutral / totalFaces) * 100;
    totalEmotion.sadness = (totalEmotion.sadness / totalFaces) * 100;
    totalEmotion.surprise = (totalEmotion.surprise / totalFaces) * 100;

    //console.log("After calc");
    //console.log(totalEmotion);

    //console.log("Total faces: " + totalFaces);

    return totalEmotion;
}
var updateChart = function(p) {

    var imagesArray = getEmotionImages(emotionImageIDs[p.scaleval]);
    var i;
    var images = '<div class="row">';

    for (i = 0; i < imagesArray.length; i ++) {
        images += '<div class="col-md-2 col-xs-4 col-sm-4 padding-10"><img src="' + imagesArray[i] + '" height="90" width="90"></div>';

        if ((i + 1) % 6 == 0) {
            images += '</div><div class="row">';
        }
    }

    document.getElementById("title").innerHTML = p.scaletext + " Category Images";
    document.getElementById("pics").innerHTML = images + '</div>';
    $('#myModal').modal('show');
};

zingchart.bind('emo-chart','node_click',updateChart);


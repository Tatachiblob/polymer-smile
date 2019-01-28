var originalConfig =     {
    "type":"ring",
    "title":{
        "text":"Drilldown Pie"
    },
    "plot":{
        "detach":false,
        "cursor":"hande",
        "shadow":8,
        "tooltip":{
            "visible":false
        },
        "animation":{
            "delay":10,
            "effect":"2",
            "speed":"ANIMATION_FAST",
            "method":"1",
            "sequence":"3",
            "attributes":{

            }
        },
        "value-box":{
            "color":"#FFF",
            "text":"%t",
            "font-weight":"none",
            "font-size":14
        }
    },
    "series":[
        {
            "values":[69],
            "background-color":"#7cb5ec",
            "text":"Friends<br>",
            "data-id":"vt"
        },
        {
            "values":[15],
            "background-color":"#434348",
            "text":"Selfies<br>",
            "data-id":"sp"
        },
        {
            "values":[13],
            "background-color":"#90ed7d",
            "text":"Food<br>",
            "data-id":"st"
        },
        {
            "values":[20],
            "background-color":"#f7a35c",
            "text":"Gadget<br>",
            "data-id":"dt"
        },
        {
            "values":[69],
            "background-color":"#8085e9",
            "text":"Captioned Photo<br>",
            "data-id":"st"
        },
        {
            "values":[31],
            "background-color":"#f15c80",
            "text":"Scene/<br>Activity",
            "data-id":"st"
        },
        {
            "values":[29],
            "background-color":"#e4d354",
            "text":"Pet<br>",
            "data-id":"dm"
        },
        {
            "values":[16],
            "background-color":"#2b908f",
            "text":"Fashion<br>",
            "data-id":"dm"
        }
    ]
}

zingchart.render({
    id : 'drilldown-donut-chart',
    data : originalConfig,
    height: 450,
    width: '100%'
});



/************************
 *  Secondary Charts
 * *********************/
var drilldownConfig = {
    "type":"bar",
    "title":{
        "text":"Security Tools"
    },
    "plotarea": {
        "margin":"dynamic"
    },
    "plot":{
        "animation":{
            "delay":10,
            "effect":"4",
            "speed":"1200",
            "method":"1",
            "sequence":"3"
        },
        "tooltip":{
            "text": "Quantity: %v",
            "shadow":true,
            "shadowAlpha":.5,
            "shadowBlur":2,
            "shadowDistance":3,
            "shadowColor":"#c4c4c4",
            "borderWidth":0,
            "font-size":18
        }
    },
    "series":[
        {
            "values":[35,15,25,10],
            "styles":["#1565C0","#42A5F5","#1E88E5","#90CAF9"]
        }
    ],
    "scale-x":{
        "line-color":"#555",
        "tick":{
            "line-color":"#555"
        },
        "values":["Firewall","Cache-control","Link-access","HTTP-Comp"],
        "item":{
            "max-chars":9,
            "color":"#555",
            "font-size":12
        },
        "label":{
            "text":"Type",
            "color":"#555",
            "font-weight":"none",
            "font-size":16
        }
    },
    "scale-y":{
        "line-color":"#555",
        "tick":{
            "line-color":"#555"
        },
        "item":{
            "color":"#555",
            "font-size":12
        },
        "guide":{
            "visible":false
        },
        "label":{
            "text":"Quantity",
            "color":"#555",
            "font-weight":"none",
            "font-size":16
        }
    },
    "shapes":[
        {
            'x':20,
            'y':20,
            'size':10,
            'angle':-90,
            'type':'triangle',
            'background-color':'#C4C4C4',
            'padding':5,
            'cursor':'hand',
            'id': 'backwards'
        }
    ]
};

/**
 * Create associative array to manage drilldown config
 */
var drilldownDataStructure = [];
drilldownDataStructure["vt"] = {
    "data":[10,25,35],
    "scale-labels":["Grid-component","Map-tool","Web-charting"],
    "title":"Visualization Tools",
    "colors":["#EF5350","#E53935","#C62828"]
};
drilldownDataStructure["sp"] = {
    "data":[15,5,35,20],
    "scale-labels":["Speed-test","Error-tracking","Load-testing","User-monitoring"],
    "title":"Site Performance",
    "colors":["#26A69A","#80CBC4","#00695C","#00897B"]
};
drilldownDataStructure["dt"] = {
    "data":[20,8,35,20],
    "scale-labels":["IDE","File-Management","Image-Generation","QA-testing"],
    "title":"Dev Tools",
    "colors":['#26C6DA','#80DEEA','#00838F','#00ACC1']
};
drilldownDataStructure["st"] = {
    "data":[35,15,25,10],
    "scale-labels":["Firewall","Cache-control","Link-access","HTTP-Comp"],
    "title":"Security Tools",
    "colors":["#1565C0","#42A5F5","#1E88E5","#90CAF9"]
};
drilldownDataStructure["dm"] = {
    "data":[10,25,35],
    "scale-labels":["Relational","Non-relational","Cluster"],
    "title":"Data Management",
    "colors":["#5E35B1","#4527A0","#7E57C2"]
};


/*
 * Built in zingchart API event used to capture node click events.
 * Starting from this scope you will handle drilldown functionality.
 */
zingchart.node_click = function(p) {
    var plotIndex = p.plotindex;
    var scaleText = p.scaletext;

    // You could use this data to help construct drilldown graphs check it out...
    //console.log(p);
    if (drilldownDataStructure[p['data-id']]) {
        drilldownConfig['title']['text'] = drilldownDataStructure[p['data-id']]['title'];
        drilldownConfig['scale-x']['values'] = drilldownDataStructure[p['data-id']]['scale-labels'];
        drilldownConfig['series'][0]['values'] = drilldownDataStructure[p['data-id']]['data'];
        drilldownConfig['series'][0]['styles'] = drilldownDataStructure[p['data-id']]['colors'];
        zingchart.exec('drilldown-donut-chart', 'destroy');
        zingchart.render({
            id : 'drilldown1',
            data : drilldownConfig,
            height: 450,
            width: '100%'
        });
    }
}

/*
 * Handle history buttons. You can assign
 * shapes id's and based on id you can go
 * 'forward' or 'backwards'. You could
 * also handle this with HTML and register
 * click events to those DOM elements.
 */
zingchart.shape_click = function(p) {
    var shapeId = p.shapeid;
    //console.log(p);

    switch(shapeId) {
        case 'forwards':
        case 'backwards':
        case 'default':
            zingchart.exec('drilldown1', 'destroy');
            zingchart.render({
                id : 'drilldown-donut-chart',
                data : originalConfig,
                height: 450,
                width: '100%'
            });
            break;
    }
}
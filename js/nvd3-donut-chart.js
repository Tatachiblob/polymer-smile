//Donut chart example
nv.addGraph(function() {
    var chart = nv.models.pieChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .showLabels(true)     //Display pie labels
        .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
        .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
        .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
        .donutRatio(0.35)     //Configure how big you want the donut hole size to be.
    ;

    d3.select("#donut-chart svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 310 310")
        .datum(exampleData())
        .transition().duration(350)
        .call(chart);

    return chart;
});

//Pie chart example data. Note how there is only a single array of key-value pairs.
function exampleData() {
    return  [
        {
            "label": "Friends",
            "value" : 29.765957771107
        } ,
        {
            "label": "Selfies",
            "value" : 0
        } ,
        {
            "label": "Food",
            "value" : 32.807804682612
        } ,
        {
            "label": "Gadget",
            "value" : 196.45946739256
        } ,
        {
            "label": "Captioned Photo",
            "value" : 0.19434030906893
        } ,
        {
            "label": "Scene/Activity",
            "value" : 98.079782601442
        } ,
        {
            "label": "Pet",
            "value" : 13.925743130903
        } ,
        {
            "label": "Fashion",
            "value" : 5.1387322875705
        }
    ];
}

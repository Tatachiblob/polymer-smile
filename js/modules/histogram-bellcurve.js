/*
 Highcharts JS v6.2.0 (2018-10-17)

 (c) 2010-2017 Highsoft AS
 Author: Sebastian Domas

 License: www.highcharts.com/license
 */
(function(c){"object"===typeof module&&module.exports?module.exports=c:"function"===typeof define&&define.amd?define(function(){return c}):c(Highcharts)})(function(c){var k=function(a){var c=a.each,f=a.Series,h=a.addEvent;return{init:function(){f.prototype.init.apply(this,arguments);this.initialised=!1;this.baseSeries=null;this.eventRemovers=[];this.addEvents()},setDerivedData:a.noop,setBaseSeries:function(){var l=this.chart,a=this.options.baseSeries;this.baseSeries=a&&(l.series[a]||l.get(a))||null},
    addEvents:function(){var a=this,c;c=h(this.chart,"afterLinkSeries",function(){a.setBaseSeries();a.baseSeries&&!a.initialised&&(a.setDerivedData(),a.addBaseSeriesEvents(),a.initialised=!0)});this.eventRemovers.push(c)},addBaseSeriesEvents:function(){var a=this,c,d;c=h(a.baseSeries,"updatedData",function(){a.setDerivedData()});d=h(a.baseSeries,"destroy",function(){a.baseSeries=null;a.initialised=!1});a.eventRemovers.push(c,d)},destroy:function(){c(this.eventRemovers,function(a){a()});f.prototype.destroy.apply(this,
        arguments)}}}(c);(function(a,c){function f(a){return function(n){for(var b=1;a[b]<=n;)b++;return a[--b]}}var h=a.each,l=a.objectEach,g=a.seriesType,d=a.correctFloat,t=a.isNumber,r=a.arrayMax,p=a.arrayMin,b=a.merge,u=a.map,e={"square-root":function(a){return Math.round(Math.sqrt(a.options.data.length))},sturges:function(a){return Math.ceil(Math.log(a.options.data.length)*Math.LOG2E)},rice:function(a){return Math.ceil(2*Math.pow(a.options.data.length,1/3))}};g("histogram","column",{binsNumber:"square-root",
    binWidth:void 0,pointPadding:0,groupPadding:0,grouping:!1,pointPlacement:"between",tooltip:{headerFormat:"",pointFormat:'\x3cspan style\x3d"font-size:10px"\x3e{point.x} - {point.x2}\x3c/span\x3e\x3cbr/\x3e\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name} \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e'}},b(c,{setDerivedData:function(){var a=this.derivedData(this.baseSeries.yData,this.binsNumber(),this.options.binWidth);this.setData(a,!1)},derivedData:function(a,b,c){var n=r(a),
    e=p(a),q=[],m={},g=[],k;c=this.binWidth=d(t(c)?c||1:(n-e)/b);for(b=e;b<n;b=d(b+c))q.push(b),m[b]=0;0!==m[e]&&(q.push(d(e)),m[d(e)]=0);k=f(u(q,function(a){return parseFloat(a)}));h(a,function(a){a=d(k(a));m[a]++});l(m,function(a,b){g.push({x:Number(b),y:a,x2:d(Number(b)+c)})});g.sort(function(a,b){return a.x-b.x});return g},binsNumber:function(){var a=this.options.binsNumber,b=e[a]||"function"===typeof a&&a;return Math.ceil(b&&b(this.baseSeries)||(t(a)?a:e["square-root"](this.baseSeries)))}}))})(c,
    k);(function(a,c){function f(a){var b=a.length;a=p(a,function(a,b){return a+b},0);return 0<b&&a/b}function h(a,c){var b=a.length;c=k(c)?c:f(a);a=p(a,function(a,b){b-=c;return a+b*b},0);return 1<b&&Math.sqrt(a/(b-1))}function l(a,c,e){a-=c;return Math.exp(-(a*a)/(2*e*e))/(e*Math.sqrt(2*Math.PI))}var g=a.seriesType,d=a.correctFloat,k=a.isNumber,r=a.merge,p=a.reduce;g("bellcurve","areaspline",{intervals:3,pointsInInterval:3,marker:{enabled:!1}},r(c,{setMean:function(){this.mean=d(f(this.baseSeries.yData))},
    setStandardDeviation:function(){this.standardDeviation=d(h(this.baseSeries.yData,this.mean))},setDerivedData:function(){1<this.baseSeries.yData.length&&(this.setMean(),this.setStandardDeviation(),this.setData(this.derivedData(this.mean,this.standardDeviation),!1))},derivedData:function(a,c){var b=this.options.intervals,d=this.options.pointsInInterval,f=a-b*c,b=b*d*2+1,d=c/d,h=[],g;for(g=0;g<b;g++)h.push([f,l(f,a,c)]),f+=d;return h}}))})(c,k)});
//# sourceMappingURL=histogram-bellcurve.js.map

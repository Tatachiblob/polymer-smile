import { 
	getMappingArray, 
	getCategoryImages 
} from './mapper.js';

$(document).ready(function() {
	var mappingArray = getMappingArray();
	
	Highcharts.chart('pie-chart', {
        chart: {
            height: 400,
        },
		title: {
			text: 'Image Categories'
		},

		xAxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		},

		series: [{
			type: 'pie',
			name: 'Posts',
			allowPointSelect: true,
			keys: ['name', 'y', 'selected', 'sliced'],
			data: [['Friends', mappingArray[0].length],
				   ['Selfies', mappingArray[1].length],
				   ['Gadget', mappingArray[2].length],
				   ['Food', mappingArray[3].length],
				   ['Pet', mappingArray[4].length],
				   ['Fashion', mappingArray[5].length],
				   ['Scene/Activity', mappingArray[6].length],
				   ['Others', mappingArray[7].length]],
			showInLegend: true,
			point:{
				events:{
					click: function(e) {
						var imagesArray = getCategoryImages(this.index);
						console.log(imagesArray);
						var i, tempstring, images = "", node;

						for (node of Object.keys(imagesArray)) {
							let image = imagesArray[node];
							
							if (image.length > 0) {
								tempstring = '<div class="row">';
								
								for (i = 0; i < image.length; i ++) {
									tempstring += '<div class="col-md-2 col-xs-4 col-sm-4 padding-10"><img src="' + image[i] + '" height="90" width="90"></div>';
								
									if ((i + 1) % 6 == 0) {
										tempstring += '</div><div class="row">';
									}
								}
								
								tempstring += '</div>';
								images += node + " - " + image.length + "<br>" + tempstring;
							}
						}
						
						document.getElementById("title").innerHTML = this.name + " Category Images";
						document.getElementById("pics").innerHTML = images + '</div>';
						$('#myModal').modal('show');
					}
				}
			}
		}]
		
		
	});
});
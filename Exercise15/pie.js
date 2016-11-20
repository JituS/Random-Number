var data = [100, 100, 200, 200, 100, 200, 100];
var WIDTH = HEIGHT = 500;
var radius = WIDTH / 2;

var arc = d3.arc()
	.outerRadius(radius - 10)
	.startAngle(function(d){
		return d.startAngle/2;
	})
	.endAngle(function(d){
		return d.endAngle/2;
	})
	.innerRadius(0);

var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

var pie = d3.pie().sort(null).value(function(d){return d;});

function visualize() {	
	var svg = d3.select('#container').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT)
		.append('g')
		.attr('transform', 'translate(' + 0 +  ',' + (HEIGHT / 2) + ')');;
	var arcs = pie(data);
	svg.selectAll('path').data(arcs).enter()
		.append('path')
		.attr('d', arc)
		.attr('fill', function(d, i){return colorScale(i)})
}

window.onload = visualize;

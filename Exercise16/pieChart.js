var data = [100, 100, 200, 200, 100, 200, 100];
var WIDTH = HEIGHT = 500;
var radius = WIDTH / 2;

var arc = d3.arc()
	.outerRadius(radius - 10)
	.innerRadius((radius - 10)/2);

var colorScale = d3.scaleOrdinal(d3.schemeCategory20);

var pie = d3.pie().sort(null).value(function(d){return d;});

function visualize() {	
	var svg = d3.select('#container').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT)
		.append('g')
		.attr('transform', 'translate(' + (WIDTH / 2) +  ',' + (HEIGHT / 2) + ')');;
	var arcs = pie(data);
	svg.selectAll('path').data(arcs).enter()
		.append('path')
		.attr('d', arc)
		.attr('fill', function(d, i){return colorScale(i)})
}

window.onload = visualize;
var data = [], width = 900, height = 700, margin = 100;

[5, 9, 7, 5, 3, , 4, 2, 3, 2].forEach(function(d, i){
	if(d) data.push({x: i, y: d});
});

var xScale = d3.scaleLinear().range([100, 600]).domain([0, 1]);
var yScale = d3.scaleLinear().range([500, 0]).domain([0, 1]);

var translate = function (x, y) {
	return "translate(" + x + "," + y + ")";
};

function drawAxis() {
	var _xAxis = d3.axisBottom(xScale).ticks(10).tickSize(-500);
	d3.select('svg').append('g')
		.attr('transform', translate(0, height - margin))
		.call(_xAxis)
		.classed('xAxis', true);
	var _yAxis = d3.axisLeft(yScale).ticks(10).tickSize(-500);
	d3.select('svg').append('g')
		.classed('tick', true)
		.attr('transform', translate(margin, margin))
		.call(_yAxis)
		.classed('yAxis', true);
}

var appendCircle = function(svg){
	svg.selectAll('circle').data(data, function(d, i){return d}).enter()
		.append('circle')
		.attr('cx', function(d){return xScale(d.x/10)})
		.attr('cy', function(d){return yScale(d.y/10) + margin})
		.attr('r', 5)
};
var appendSinCircle = function(svg){
	svg.selectAll('circle').data(data, function(d, i){return d}).enter()
		.append('circle')
		.attr('cx', function(d){return xScale(d.x/10)})
		.attr('cy', function(d){return yScale((Math.sin(d.x) + 5)/10) + margin;})
		.attr('r', 5)
};

var line = d3.line()
	.x(function(number, index){
		return xScale(number.x/10);
	})
	.y(function(number, index){
		return yScale(number.y/10) + margin;
	});

var sinLine = d3.line()
	.y(function(number, index){
		return yScale((Math.sin(number.x) + 5)/10) + margin;
	})
	.x(function(number, index){
		return xScale(number.x/10);
	});

function visualize() {
	var svg = d3.select('#container')
		.append('svg')
		.attr('width', width)
		.attr('height', height);
	drawAxis();
	svg.append('path')
		.attr('d', line(data))
		.attr('stroke', 'black')
		.attr('fill', 'none');
	appendCircle(svg);
	svg.append('path')
		.attr('d', sinLine(data))
		.attr('stroke', 'black')
		.attr('fill', 'none');

	appendSinCircle(svg);
}

window.onload = visualize;
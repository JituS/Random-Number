var WIDTH = 700, 
	HEIGHT = 700, 
	TOP_MARGIN = 50, 
	LEFT_MARGIN = 30;

var data = d3.range(10)

var xScale = d3.scaleLinear().range([LEFT_MARGIN, WIDTH - TOP_MARGIN]).domain([0, 10]);
var yScale = d3.scaleLinear().range([HEIGHT - 2*TOP_MARGIN, TOP_MARGIN]).domain([0, 1]);

var translate = function (x, y) {
	return "translate(" + x + "," + y + ")";
};

function drawAxis(svg) {
	console.log(svg)
	var _xAxis = d3.axisBottom(xScale).ticks(10)
	svg.append('g')
		.attr('transform', translate(0, HEIGHT - 2*TOP_MARGIN))
		.call(_xAxis)
		.classed('xAxis', true);
	var _yAxis = d3.axisLeft(yScale).ticks(10)
	svg.append('g')
		.classed('tick', true)
		.attr('transform', translate(LEFT_MARGIN, 0))
		.call(_yAxis)
		.classed('yAxis', true);
}

function appendCircle(svg, data){
	svg.selectAll('circle').data(data, function(number){return number}).enter()
		.append('circle')
		.attr('cx', function(d){return xScale(d)})
		.attr('cy', function(d){return yScale(((Math.sin(3 * d)+1)/2))})
		.attr('r', 5);
}

function lineFunction(curveFunction){
	return d3.line()
		.x(function(number, index){
			return xScale(number);
		})
		.y(function(number, index){
			return yScale(((Math.sin(3 * number)+1)/2));
		})
		.curve(curveFunction)
}

function drawChart(curveObj, tension) {
	var svg = d3.select('#container')
		.append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);
	drawAxis(svg);
	svg.append('path')
		.attr('d', function(d){ return lineFunction(curveObj.curve.tension(tension))(data)})
		.attr('stroke', 'black')
		.attr('fill', 'none')
		.classed('normalLine', true);
	appendCircle(svg, data);
}

function visualize() {
	drawChart({ curve: d3.curveCardinal, title: 'd3.curveLinear' }, 1)
}

window.onload = visualize;
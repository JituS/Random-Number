var WIDTH = 700, 
	HEIGHT = 700, 
	TOP_MARGIN = 50, 
	LEFT_MARGIN = 50;

var data = d3.range(11).map(function(e){return {x:e, y:e}})
var xScale = d3.scaleLinear().range([LEFT_MARGIN + 1, WIDTH - TOP_MARGIN]).domain([0, 10]);
var yScale = d3.scaleLinear().range([HEIGHT - (2*TOP_MARGIN), TOP_MARGIN]).domain([0, 10]);

var translate = function (x, y) {
	return "translate(" + x + "," + y + ")";
};

function drawAxis(svg) {
	var _xAxis = d3.axisBottom(xScale).ticks(10).tickFormat(function(d){return d3.format('.1f')(d/10)})
	svg.append('g')
		.attr('transform', translate(0, HEIGHT - 2*TOP_MARGIN))
		.call(_xAxis)
		.classed('xAxis', true);
	var _yAxis = d3.axisLeft(yScale).ticks(10).tickFormat(function(d){return d3.format('.1f')(d/10)})
	svg.append('g')
		.classed('tick', true)
		.attr('transform', translate(LEFT_MARGIN, 0))
		.call(_yAxis)
		.classed('yAxis', true);
}

var areaFunction = function(curveObject){
	return d3.area()
		.x(function(number, index){
			return xScale(number.x);
		})
		.y1(function(number, index){
			return yScale(3 * Math.sin(number.y)+5);
		})
		.y0(HEIGHT-2*TOP_MARGIN)
		.curve(curveObject);	
};

var lineFunction = function(curveObject) {
	return d3.line()
		.x(function(number, index){
			return xScale(number.x);
		})
		.y(function(number, index){
			return yScale(3 * Math.sin(number.y)+5);
		})
		.curve(curveObject);	
};

function drawLineChart(svg, data, curveObject) {
	svg.append('path')
		.attr('d', lineFunction(curveObject.curve)(data))
		.attr('stroke', 'black')
		.attr('fill', 'none')
		.classed('normalLine', true);
	appendCircle(svg, data);
}

function appendCircle(svg, data){
	svg.selectAll('circle').data(data, function(number){return number}).enter()
		.append('circle')
		.attr('cx', function(d){return xScale(d.x)})
		.attr('cy', function(d){return yScale(3 * Math.sin(d.y)+5);})
		.attr('r', 5);
}

function drawAreaChart(svg, data, curveObject) {
	svg.append('path').data([data])
		.attr('d', areaFunction(curveObject.curve))
		.attr('stroke', 'black')
		.attr('stroke-width', '0')
		.attr('fill', 'steelBlue')	
		.attr('opacity', .2)
}


function addText(svg, data, curveObject) {
	svg.append('text')
		.attr("x", WIDTH/2.5)
	    .attr("y", 25)
	    .text(curveObject.title);
}

var chartType = [drawAreaChart, drawLineChart, appendCircle, addText];

function drawChart(curveType) {
	curveType = (curveType) ? curveType  : { curve: d3.curveCardinal, title: 'Curve Linear' };
	var svg = d3.select('#container')
		.append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);
	drawAxis(svg);
	chartType.forEach(function(eachType) {
		eachType(svg, data, curveType);
	});
}

window.onload = function(){
	drawChart();
}
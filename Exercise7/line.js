var WIDTH = 500, 
	HEIGHT = 500, 
	TOP_MARGIN = 50, 
	LEFT_MARGIN = 30;

var givenData = [5, 9, 7, 5, 3, undefined, 4, 2, 3, 2], normalData = [], sinData = []

givenData.forEach(function(d, i){
	if(d) normalData.push({x: i, y: d});
});

sinData = givenData.map(function(each, i){
	return i;
})

var xScale = d3.scaleLinear().range([LEFT_MARGIN, WIDTH - TOP_MARGIN]).domain([0, 1]);
var yScale = d3.scaleLinear().range([HEIGHT - 2*TOP_MARGIN, TOP_MARGIN]).domain([0, 1]);

var translate = function (x, y) {
	return "translate(" + x + "," + y + ")";
};

function drawAxis(svg) {
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

var lineFunction = function(curveFunction){
	return d3.line()
		.x(function(number, index){
			return xScale(number.x/10);
		})
		.y(function(number, index){
			return yScale(number.y/10);
		})
		.curve(curveFunction)
}; 

var sinlineFunction = function(curveFunction){
	return d3.line()
		.y(function(number, index){
			return yScale((Math.sin(number) + 5)/10);
		})
		.x(function(number, index){
			return xScale(number/10);
		})
		.curve(curveFunction)
};

var drawLine = function(svg, data, curveObj) {
	svg.append('path')
		.attr('d', lineFunction(curveObj.curve)(data))
		.attr('stroke', 'black')
		.attr('fill', 'none')
		.classed('normalLine', true);
};

var drawSinLine = function(svg, data, curveObj) {
	svg.append('path')
		.attr('d', sinlineFunction(curveObj.curve)(data))
		.attr('stroke', 'black')
		.attr('fill', 'none')
		.classed('sineLine', true);
};

var appendText = function(svg, text) {
	svg.append('text')
		.attr("x", WIDTH/3)
	    .attr("y", 25)
	    .text(text);
}

var actions = [drawLine, drawSinLine, appendText];

function drawChart(curveObj) {
	var svg = d3.select('#container')
		.append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT)
	drawAxis(svg);
	drawLine(svg, normalData, curveObj);
	drawSinLine(svg, sinData, curveObj);
	appendText(svg, curveObj.title);
	return svg;
}

function visualize() {
	var w = window.WIDTH;
	document.querySelector('#container').setAttribute('width', w);
	drawChart({ curve: d3.curveLinear, title: 'Curve Linear' })
}

window.onload = visualize;
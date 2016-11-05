const WIDTH = 1000
	, HEIGHT = 700
	, MARGIN = 30
	, INNER_WIDTH = WIDTH - 2 * MARGIN
	, INNER_HEIGHT = HEIGHT - 2 * MARGIN
	, maxLimit = 100;

var _xScale, _yScale, _xAxis, _yAxis, interval, currentChart, randomNumbers = [];

var translate = function (x, y) {
	return "translate(" + x + "," + y + ")";
};

var populateRandomNumbers = function(){
	for(var i = 0; i <50; i++){
		randomNumbers[i] = Math.floor(Math.random() * maxLimit);
	};	
};

var updateRandomNumbers = function() {
	var newValue = Math.floor(Math.random() * maxLimit);
	randomNumbers.shift();
	randomNumbers.push(newValue);
};

var createChart = function () {
	var svg = d3.select('.container').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);
	_xScale = d3.scaleLinear()
		.range([0, INNER_WIDTH]);
	_yScale = d3.scaleLinear()
		.range([INNER_HEIGHT, 0]);
	drawAxis([0, 10], [0, 10]);
	var g = svg.append('g')
		.attr('transform', translate(MARGIN, MARGIN))
		.classed('chart', true);
};

var updateCircles = function() {
	var circles = d3.selectAll('circle').data(randomNumbers);
	circles
		.attr('cx', function (number, index) { return _xScale(index + 1)})
		.attr('cy', function (number) {return _yScale(number)});

	circles.transition().duration(220)
		.ease(d3.easeLinear)
		.attr('cx', function(number, index){return _xScale(index)});
	circles.selectAll('circle').exit().remove();
};

var circleChart = function() {
	d3.select('.chart').selectAll('circle').data(randomNumbers)
		.enter().append('circle')
		.attr('r', 2)
		.attr('cx', function (number, index) { return _xScale(index + 1)})
		.attr('cy', function (number) {return _yScale(number)});
	updateChart(updateCircles);
};

var updateBars = function(rect) {
	var rect = g.selectAll('rect').data(randomNumbers);
	rect.attr('height', function(number){return INNER_HEIGHT - _yScale(number)})
		.attr('x', function(number, index){return _xScale(index + 1)})
		.attr('y', function(number){return _yScale(number)});

	rect.transition().duration(220)
		.ease(d3.easeLinear)
		.attr('x', function(number, index){return _xScale(index)});
	rect.exit().remove();
};

var barGraph = function() {
	var rect = d3.select('.chart').selectAll('rect').data(randomNumbers).enter().append('rect');
	rect.attr('width', 2)
		.attr('height', function(number){return INNER_HEIGHT - _yScale(number)})
		.attr('x', function(number, index){return _xScale(index + 1)})
		.attr('y', function(number){return _yScale(number)});
	updateChart(updateBars);
};

var line = d3.line()
	.x(function (number, index) {
		return _xScale(index +1);
	})
	.y(function (number) {
		return _yScale(number)
	});

var updateLineChart = function() {
	d3.select('.line').remove();
	d3.select('.chart').append('path')
		.classed('line', true)
		.attr('d', line(randomNumbers))
		.transition().duration(220)
		.ease(d3.easeLinear)
		.attr("transform", "translate(" + _xScale(-1) + ")");
};

var lineChart = function() {
	d3.select('.chart').append('path')
		.attr('d', line(randomNumbers))
		.classed('line', true);
	updateChart(updateLineChart);
};

var updateChart = function(chartForUpdateFn) {
	interval = setInterval(function(){
		updateRandomNumbers();
		chartForUpdateFn();
	}, 250);
};

var drawAxis = function () {
	_xScale.domain([0, randomNumbers.length]);
	_xAxis = d3.axisBottom(_xScale).ticks(10);
	d3.select('svg').append('g')
		.attr('transform', translate(MARGIN, HEIGHT - MARGIN))
		.call(_xAxis)
		.classed('xAxis', true);
	_yScale.domain([0, maxLimit]);
	_yAxis = d3.axisLeft(_yScale).ticks(Math.floor(maxLimit / 10));
	d3.select('svg').append('g')
		.attr('transform', translate(MARGIN, MARGIN))
		.call(_yAxis)
		.classed('yAxis', true);
};

var removeElements = function(elements){
	for(var i = 0; i < elements.length; i++){
		d3.select(elements[i]).remove();
	};
};

var drawGrid = function() {
	d3.select('svg').selectAll('.xAxis .tick')
		.append('line')
		.attr('x1', 0)
		.attr('y1', 0)
		.attr('x2', 0)
		.attr('y2', -INNER_HEIGHT - MARGIN)
		.classed('grid', true);
	d3.select('svg').selectAll('.yAxis .tick')
		.append('line')
		.attr('x1', 0)
		.attr('y1', 0)
		.attr('x2', INNER_WIDTH + MARGIN)
		.attr('y2', 0)
		.classed('grid', true);
};

var drawGraph = function (graphTypeFn) {
	currentChart = graphTypeFn;
	document.querySelector('#toggle').textContent = "Pause";
	clearInterval(interval);
	removeElements(['.xAxis', '.yAxis', '.chart']);
	drawAxis();
	g = d3.select('svg').append('g')
		.attr('transform', translate(MARGIN, MARGIN))
		.classed('chart', true);
	drawGrid();
	graphTypeFn();
};

var toggle = function() {
	var toggleButton = document.querySelector('#toggle');
	if(toggleButton.textContent == "Pause") {
		clearInterval(interval);
		toggleButton.textContent = "Play";
	}else{
		drawGraph(currentChart);
		toggleButton.textContent = "Pause";
	}
}

window.onload = function(){
	populateRandomNumbers();
	createChart();
	drawGraph(barGraph);
};

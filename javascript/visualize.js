const WIDTH = 1000
	, HEIGHT = 700
	, MARGIN = 30
	, INNER_WIDTH = WIDTH - 2 * MARGIN
	, INNER_HEIGHT = HEIGHT - 2 * MARGIN
	, yRange = 100;

var _allQuotes, _xScale, _yScale, _xAxis, _yAxis, interval;

var translate = function (x, y) {
	return "translate(" + x + "," + y + ")";
};

var randomNumbers = [];

var populateRandomNumbers = function(){
	for(var i = 0; i < 100; i++){
		randomNumbers[i] = Math.floor(Math.random() * yRange);
	};	
}

var createChart = function () {
	var svg = d3.select('.container').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);
	_xScale = d3.scaleLinear()
		.range([0, INNER_WIDTH]);
	_yScale = d3.scaleLinear()
		.range([INNER_HEIGHT, 0]);
	drawxAxis([0, 10], [0, 10]);
	var g = svg.append('g')
		.attr('transform', translate(MARGIN, MARGIN))
		.classed('chart', true);
};

var drawxAxis = function (xDomain, yDomain) {
	_xScale.domain(xDomain);
	_xAxis = d3.axisBottom(_xScale).ticks(10);
	d3.select('svg').append('g')
		.attr('transform', translate(MARGIN, HEIGHT - MARGIN))
		.call(_xAxis)
		.classed('xAxis', true);
	_yScale.domain(yDomain);
	_yAxis = d3.axisLeft(_yScale).ticks(Math.floor(yRange / 10));
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

var circleChart = function(g) {
	g.selectAll('circle').data(randomNumbers)
		.enter().append('circle')
		.attr('r', 2)

	g.selectAll('circle')
		.attr('cx', function (number, index) { return _xScale(index + 1)})
		.attr('cy', function (number) {return _yScale(number)});
	g.selectAll('circle').exit().remove();
}

var barGraph = function(g) {
	g.selectAll('rect').data(randomNumbers).enter()
		.append('rect')
		.attr('width', 2)
		.attr('height', function(number){return INNER_HEIGHT - _yScale(number)})
		.attr('x', function(number, index){return _xScale(index + 1)})
		.attr('y', function(number){return _yScale(number)});
};

var lineChart = function(g) {
	var line = d3.line()
		.x(function (number, index) {
			return _xScale(index + 1);
		})
		.y(function (number) {
			return _yScale(number)
		});

	g.append('path')
		.attr('d', line(randomNumbers))
		.classed('line', true)
}

var getGraphSpace = function (chartType) {
	var newValue = Math.floor(Math.random() * yRange);
	randomNumbers.shift();
	randomNumbers.push(newValue);
	removeElements(['.xAxis', '.yAxis', '.chart']);
	drawxAxis([1, randomNumbers.length], [0, yRange])

	g = d3.select('svg').append('g')
		.attr('transform', translate(MARGIN, MARGIN))
		.classed('chart', true);

	chartType(g);
};

var getChart = function(chartType) {
	clearInterval(interval);
	interval = setInterval(getGraphSpace, 250, chartType);
}

window.onload = function(){
	populateRandomNumbers();
	createChart();
}

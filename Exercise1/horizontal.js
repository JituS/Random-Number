var data = [], color;
var generateData = function(generate, limit){
	for (var i = 0; i < limit; i++) {
		data.push(generate());
	}
};

var generateRandom = function(){
	var index = 0;
	return function(){
		return {number: Math.floor(Math.random() * 100), id: ++index};
	}
};

var createColorScale = function() {
	color = d3.scaleLinear()
		.domain([0, 100])
		.range([d3.rgb("#0294C9"), d3.rgb('#021CC9')]);
};

var loadChart = function() {
	var divs = d3.select('.container').selectAll('div').data(data, function(d, i){return d.id});
	divs.enter()
		.append('div')
		.text(function(d){return d.number})
		.style('width', function(d){return d.number * 10 + 'px';})
		.style('background-color', function(d){return color(d.number)})
	divs.exit().remove();
};

window.onload = function(){
	var generator = generateRandom();
	generateData(generator, 10);
	createColorScale();
	loadChart();
	setInterval(function(){
		data.shift();
		generateData(generator, 1);
		loadChart();
	}, 1000)
}
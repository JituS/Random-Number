var appendCircle = function(svg){
	svg.selectAll('circle').data(normalData, function(d, i){return d}).enter()
		.append('circle')
		.attr('cx', function(d){return xScale(d.x/10)})
		.attr('cy', function(d){return yScale(d.y/10)})
		.attr('r', 5)
};
var appendSinCircle = function(svg){
	svg.selectAll('circle').data(sinData, function(d, i){return d}).enter()
		.append('circle')
		.attr('cx', function(d){return xScale(d/10)})
		.attr('cy', function(d){return yScale((Math.sin(d) + 5)/10);})
		.attr('r', 5)
};

function appendCircles() {
	var svg = d3.select('#container svg');
	curveArray.forEach(function(each){
		var svg = drawLineChart(each);
		appendCircle(svg);
		appendSinCircle(svg);
	});
}

window.onload = appendCircles;

var curveArray = [ 
	{ curve: d3.curveLinear, title: 'Curve Linear' },
	{ curve: d3.curveLinearClosed, title: 'Curve Linear Closed' },
	{ curve: d3.curveStepAfter, title: 'Curve Step After' },
	{ curve: d3.curveBasis, title: 'Curve Basis' },
	{ curve: d3.curveBundle, title: 'Curve Bundle' },
	{ curve: d3.curveCardinalClosed,title: 'Curve Cardinal Closed' },
	{ curve: d3.curveCardinal, title: 'Curve Cardinal' },
	{ curve: d3.curveCatmullRom, title: 'Curve CatmullRom' }
];

var appendCircle = function(svg, normalData){
	svg.selectAll('circle').data(normalData, function(d, i){return d}).enter()
		.append('circle')
		.attr('cx', function(d){return xScale(d.x/10)})
		.attr('cy', function(d){return yScale(d.y/10)})
		.attr('r', 5)
};

var appendSinCircle = function(svg, sinData){
	svg.selectAll('circle').data(sinData, function(d, i){return d}).enter()
		.append('circle')
		.attr('cx', function(d){return xScale(d/10)})
		.attr('cy', function(d){return yScale((Math.sin(d) + 5)/10);})
		.attr('r', 5)
};

function appendCircles() {
	var svg = d3.select('#container svg');
	curveArray.forEach(function(each){
		var svg = drawChart(each);
		appendCircle(svg, normalData);
		appendSinCircle(svg, sinData);
	});
}

window.onload = appendCircles;

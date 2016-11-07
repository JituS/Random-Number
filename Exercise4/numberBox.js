function visualize() {
	var data = [0,1,2,3,4,5,6,7,8,9,10];
	var svg = d3.select('#numberSize')
		.style('width', '1000px')
		.style('height', '300px');

	var scale = d3.scaleLinear()
		.range([12, 120])
		.domain([0, 10]);

	svg.selectAll('div').data(data).enter()
		.append('div')
		.style('font-size', function(d, i){return scale(d) + 'px'})
		.text(function(d, i){return d;})
}

window.onload = visualize;
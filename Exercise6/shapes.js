var shapeSize = 100, padding = 50;

var shapes = [{type: 'line', attrs: {'x1': 0, 'y1': shapeSize, 'x2': shapeSize, 'y2': 0}},
			  {type:'circle', attrs: { 'cx': shapeSize/2, 'cy': shapeSize/2, 'r': shapeSize/2 }},
			  {type: 'rect', attrs: {'width': shapeSize, 'height': shapeSize, 'rx': 7, 'ry': 7}},
			  {type: 'polygon', attrs: {'points': shapeSize/2 + ',0 0,' + shapeSize + ' ' + shapeSize + ',' + shapeSize}}];

var appendG = function(i) {
	return d3.select('.container')
		.append('g')
		.attr('width', shapeSize + 50)
		.attr('height', shapeSize + 50)
		.attr('transform', translate((i * (padding + shapeSize)), 5));
}

var translate = function (x, y) {
	return "translate(" + x + "," + y + ")";
};

var drawShapes = function(){
	d3.select('#shapes').append('svg')
		.classed('container', true)
		.attr('width', (shapes.length * (shapeSize + padding)))
		.attr('height', shapeSize * 2);

	for (var i = 0; i < shapes.length; i++) {
		var g = appendG(i);
		var shape = g.selectAll(shapes[i].type)
			.data([shapes[i].attrs])
			.enter()
			.append(shapes[i].type);
		var attributes = Object.keys(shapes[i].attrs);
		attributes.forEach(function(eachAttr){
			shape.attr(eachAttr, function(d){ return d[eachAttr] });
		});
	};
};

window.onload = drawShapes;
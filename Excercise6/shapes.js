var size = 100, padding = 50;
var shapes = [{type: 'line', attrs: {"x1": 0, "y1": size, "x2": size, "y2": 0}},
			  {type:'circle', attrs: { "cx": size/2, "cy": size/2, "r": size/2 }},
			  {type: 'rect', attrs: {"width": size, "height": size, "rx": 7, "ry": 7}},
			  {type: 'polygon', attrs: {"points": size/2 + ",0 0," + size + " " + size + "," + size}}];

var appendSvg = function() {
	return d3.select("#shapes")
		.append("svg")
		.attr("width", size)
		.style("padding", padding/2)
		.attr("height", size);
}

var drawShapes = function(){
	for (var i = 0; i < shapes.length; i++) {
		var svgShape = appendSvg();
		var shape = svgShape.selectAll(shapes[i].type)
			.data([shapes[i].attrs])
			.enter()
			.append(shapes[i].type);
		var attributes = Object.keys(shapes[i].attrs);
		for (var j = 0; j < attributes.length; j++) {
			shape.attr(attributes[j], 
				function(d){ return d[attributes[j]]
			});
		};
	};
};

window.onload = drawShapes;
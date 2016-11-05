var colorScale, data = [
	{name:'ramesh',subject:'maths',score:87},
	{name:'suresh',subject:'maths',score:45},
	{name:'pokemon',subject:'english',score:65},
	{name:'mary',subject:'kannada',score:44},
	{name:'riya',subject:'science',score:72},
	{name:'katie',subject:'social studies',score:82},
	{name:'katie',subject:'maths',score:98},
	{name:'ramesh',subject:'bengali',score:25},
	{name:'suresh',subject:'science',score:55},
	{name:'riya',subject:'tamil',score:75},
	{name:'pokemon',subject:'sports',score:95},
	{name:'pokemon',subject:'social studies',score:32}
];

var unique = function(){
	var newData = [];
	for (var i = 0; i < data.length; i++) {
		if(newData.indexOf(data[i].subject) == -1){
			newData.push(data[i].subject);
		}
	}
	return newData;
}

var createColorScale = function() {
	colorScale = d3.scaleOrdinal(d3.schemeCategory10);
};

var sortName = function() {
	d3.selectAll('.container div').sort(function(a, b){
		return a.name.localeCompare(b.name)
	});
};

var sortScore = function() {
	d3.selectAll('.container div').sort(function(a, b){
		return a.subject.localeCompare(b.subject)
	});
};

var sortSubject = function() {
	d3.selectAll('.container div').sort(function(a, b){
		return a.score - b.score;
	})
	.transition().duration(1500)
    .style('top', function(d, i) {
        return 60 + ((i*30)) + "px";
    })
};

var visualize = function() {
	var divs = d3.select('.container').selectAll('div').data(data);
	divs.enter()
		.append('div')
		.text(function(d){return d.name + ' ' + d.score})
		.style('width', function(d){return d.score * 5 + 'px'})
		.style('height', '20px')
		.style('text-align', 'center')
		.style('background-color', function(d){return colorScale(d.subject)})

	var legand = d3.select('.legand').selectAll('div').data(unique(data));
	legand.enter().append('div')
		.style('background-color', function(d){return colorScale(d)})
		.text(function(d){return d})
};

window.onload = function(){
	createColorScale();
	visualize();
};

var data = [1,2,3,4,5,6,7,8,9,10];

function appendRow(scale, title) {
	var table = d3.select('#tableContent table');
	table = table.append('tr')
	table.append('td').text(title).classed('title', true);
	table.selectAll('td').data(data, function(d){return d}).enter()
		.append('td')
		.text(function(d){return scale(d)});
}

function logN(d){
	return d3.format(".4f")(d3.scaleLog()(d));
}

function logNRounded(d){
	return d3.format("d")(d3.scaleLog()(d));
}

function visualize() {
	var table = d3.select('#tableContent').append('table');
	appendRow(d3.scaleLinear(), 'Title');
	appendRow(d3.scaleLinear(), 'n');
	appendRow(d3.scalePow().exponent(2), 'n Square');
	appendRow(logN, 'Log(n)');
	appendRow(logNRounded, 'Log(n) Rounded');
	return table;
}

window.onload = visualize;
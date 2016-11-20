var tensionScale = d3.scaleLinear().range([-2, 1]).domain(d3.extent(d3.range(5)));

function drawLineCharts() {
	d3.range(5).forEach(function(tension){
		drawChart({ curve: d3.curveCardinal, title: 'Curve Linear' }, tensionScale(tension))
	});
}
window.onload = drawLineCharts;

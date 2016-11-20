var curveArray = [ 
	{ curve: d3.curveLinearClosed, title: 'Curve Linear Closed' },
	{ curve: d3.curveStepAfter, title: 'Curve Step After' },
	{ curve: d3.curveBasisOpen, title: 'Curve Basis' },
	{ curve: d3.curveCardinalClosed,title: 'Curve Cardinal Closed' },
	{ curve: d3.curveBasis, title: 'Curve Basis' },
];
function visualize() {
	curveArray.forEach(function(curve){
		drawChart(curve);
	});
}
window.onload = visualize;
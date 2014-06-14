// start slingin' some d3 here.
// Create function to genenrate  random data pointts (positsions)
// D3 functions
// Create dots
// make them show up
//  d3 to the rescue  here
//  These will deal with relationship between dots and data
//  enter
//  update
//  exit
//
var gameOptions = {
  width: 1900,
  height: 1500,
  numPoints: 10,
  scalingFactor: 1000
};



var board = d3.select('body')
  .append('svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height);

var _getNewPoints = function(numPoints) {
  var dataArray = [];
  numPoints = numPoints || gameOptions.numPoints;
  for (var i = 0; i < numPoints; i++) {
    dataArray.push({x: Math.random() * gameOptions.scalingFactor,
      y: Math.random() * gameOptions.scalingFactor});
  }
	return dataArray;
};


var updateDots = function(coords)   {
  coords = coords || _getNewPoints();
  // BIND DATA
  var enemies = board.selectAll('circle').data(coords);

  // UPDATE
  enemies.attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    })
    .attr('r', 10);

  // ENTER
  enemies.enter().append('circle')
    .attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    })
    .attr('r', 10);
  // debugger;
  setTimeout(updateDots, 1000);
};

updateDots();










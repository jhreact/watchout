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
  scalingFactor: 1000
};

var _getFakeData = function () {
  var dataArray = [];
  for (var i = 0; i < 100; i++) {
    dataArray.push({x: Math.random() * gameOptions.scalingFactor,
      y: Math.random() * gameOptions.scalingFactor});
  }
	return dataArray;
};



var board = d3.select('body')
  .append('svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height);


var update = function(coords)   {
  var enemies = board.selectAll('circle').data(coords)
  enemies.enter().append('circle')
    .attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    })
    .attr('r', 10);
};

update(_getFakeData());










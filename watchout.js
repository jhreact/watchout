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
  //
  var enemies = board.selectAll('circle.enemy').data(coords);

  // enemies.transition().duration(1000).attr('r', 10);

  // UPDATE
  enemies.transition().duration(1000).attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    });
    // .transition()
    // .duration(750);

  // ENTER
  enemies.enter().append('circle')
    .attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    })
    .attr('r', 10)
    .attr('fill', 'blue')
    .attr('class', 'enemy');

  // debugger;
  setTimeout(updateDots, 1000);
};

updateDots();


var intersects = function(player, enemy) {
  console.log("Calling intersects!!!");
  console.log(player);
  var xDist = player.cx - enemy.cx;
  var yDist = player.cy - enemy.cy;
  var dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  // console.log(xDist, yDist, dist);
  return dist < player.r + enemy.r;
};

var detectCollisions = function(player) {
  // var enemies = d3.selectAll('circle.enemy').some(function(enemy, enemyIdx, enemies) {
  console.log(player.event.x);
  var enemies = d3.selectAll('circle.enemy');
  enemies.some(function(enemy, enemyID) {
    // enemy = d3.select(this);
    // console.log(enemy);
  });
  // console.log(enemies);
  // enemies.some(function(enemy, enemyIdx, enemies) {
  //   // console.log("ENEMY?");
  //   // console.log(enemy);
  //   if (intersects(d3.select('.playerDot')[0][0], enemy)) {
  //     alert('WE HIT! BATTLESTATIONS!');
  //   }
  //
};

var dragMove = function(d) {
  var mouse = d3.select(this);
  mouse.attr('cx', d3.event.x)
    .attr('cy', d3.event.y);
  detectCollisions(mouse);
};

var drag = d3.behavior.drag()
  .on('drag', dragMove);

var player = board.append('circle')
  .attr('class', 'playerDot')
  .attr('fill', 'red')
  .attr('cx', Math.random() * window.innerWidth)
  .attr('cy', Math.random() * window.innerHeight)
  .attr('r', 10)
  .call(drag);

// d3.select('.playerDot').call(drag);








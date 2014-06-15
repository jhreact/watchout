// TODO:
// * add/update score
// * make transition animations happen independently
//   * may fix lack of detection enroute
var gameOptions = {
  width: window.innerWidth,
  height: window.innerHeight,
  numPoints: 50,
  duration: 1500,
  scalingFactor: 1000
};

gameStats = {
	currentScore: 0,
	highScore: 0,
	collisions: 0
}

var board = d3.select('body').append('svg')
      .attr('width', gameOptions.width)
      .attr('height', gameOptions.height);

//update the score
var updateScore = function() {
	return d3.select('.current').text("Score: " + gameStats.currentScore.toString());
};

//update the high score
var updateHighScore = function() {
	if (gameStats.score > gameStats.bestScore) {
		gameStats.bestScore = gameStats.score;
	}
	return d3.select('.high').text("High score: " + gameStats.highScore.toString());
};

var generateCoordinates = function(numPoints) {
  var dataArray = [];
  numPoints = numPoints || gameOptions.numPoints;
  for (var i = 0; i < numPoints; i++) {
    dataArray.push({x: Math.random() * gameOptions.width,
      y: Math.random() * gameOptions.height});
  }
	return dataArray;
};

var enemies = board.selectAll('circle.enemy').data(generateCoordinates())
  .enter().append('circle')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', 10)
  .attr('fill', 'blue')
  .attr('class', 'enemy');

var move = function(coords) {
  coords = coords || generateCoordinates();
  enemies.data(coords)
    .transition()
    .duration(gameOptions.duration)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
  detectCollisions();
  updateScore();
  updateHighScore();
};

setInterval(move, 1000);


var dragMove = function(d) {
  d3.select(this)
    .attr('cx', d3.event.x)
    .attr('cy', d3.event.y);
  detectCollisions();
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


var intersects = function(x1, y1, r1, x2, y2, r2) {
  var xDist = x1 - x2;
  var yDist = y1 - y2;
  var dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
  return dist < r1 + r2;
};

// So, detects collisions, but only gets called when dragging mouse, or (I
// beleve) at the endpoint of a transition. Need to figure out how to do the
// calculations *during* the transition, though that'll probably be
// computationally intensive
var detectCollisions = function() {
  var collision = false;
  enemies.each(function() {
    var enemy = d3.select(this);
    var enemyX = enemy[0][0].cx.animVal.value;
    var enemyY = enemy[0][0].cy.animVal.value;
    var enemyR = enemy[0][0].r.animVal.value;
    var playerX = player[0][0].cx.animVal.value;
    var playerY = player[0][0].cy.animVal.value;
    var playerR = player[0][0].r.animVal.value;
    if (intersects(enemyX, enemyY, enemyR, playerX, playerY, playerR)) {
      alert("BAM SON!");
    }
  });
};

var increaseScore = function() {
  gameStats.currentScore++;
  updateScore();
};
setInterval(increaseScore, 50);



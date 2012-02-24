// global context
Maze = {};

Maze.SIZE = 20;
Maze.DIM = { 'width': Math.floor(800/Maze.SIZE), 'height': Math.floor(640/Maze.SIZE) };

$(function () {

	var canvas = $('#c').get(0);
	var ctx = canvas.getContext('2d');
	
	var player = new Maze.Player(Math.floor(Maze.DIM.width/2), Math.floor(Maze.DIM.height/2));
	var level = new Maze.Level();
	
	if (window.location.hash) {
		Maze.seed = Math.seedrandom(window.location.hash.substring(1));
	}
	else {
		Maze.seed = Math.seedrandom(Date.now());
		window.location.hash = '#' + Maze.seed;
	}
	
	console.log('seed: ' + Maze.seed);
	
	
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) { fn.call(); };
	
	function gameLoop() {
		ctx.fillStyle = '#18BEFB';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		player.draw(ctx);
		level.draw(ctx);
		
		//setTimeout(gameLoop, 1000/30);
	}

	$('body').keydown(function (event) {
		switch (event.keyCode) {
			case 37: // left
				player.move(-1, 0, level);
				requestAnimationFrame(gameLoop);
				break;
			case 38: // up
				player.move(0, -1, level);
				requestAnimationFrame(gameLoop);
				break;
			case 39: // right
				player.move(1, 0, level);
				requestAnimationFrame(gameLoop);
				break;
			case 40: // down
				player.move(0, 1, level);
				requestAnimationFrame(gameLoop);
				break;
		}
	});

	player.move(0, 0, level);
	gameLoop();
}) ;
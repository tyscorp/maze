// global context
Maze = {};
Maze.DIM = { 'width': 50, 'height': 40 };

$(function () {

	var canvas = $('#c').get(0);
	var ctx = canvas.getContext('2d');
	
	var player = new Maze.Player(25, 20);
	var level = new Maze.Level();
	
	if (window.location.hash) {
		Math.seedrandom(window.location.hash.substring(1));
	}
	else {
		var seed = Math.seedrandom();
		//window.location.hash = '#' + seed;
	}
	
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
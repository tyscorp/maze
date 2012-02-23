// global context
Maze = {};

$(function () {

	var canvas = $('#c').get(0);
	var ctx = canvas.getContext('2d');
	
	var player = new Maze.Player(5, 5);
	//var level = new Maze.Level();
	
	function gameLoop() {
		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		//level.update(player);
	
		player.draw(ctx);
		//level.draw(ctx);
		
		//setTimeout(gameLoop, 1000/30);
	}

	$('body').keydown(function (event) {
		switch (event.keyCode) {
			case 37: // left
				player.move(-1, 0);
				gameLoop();
				break;
			case 38: // up
				player.move(0, -1);
				gameLoop();
				break;
			case 39: // right
				player.move(1, 0);
				gameLoop();
				break;
			case 40: // down
				player.move(0, 1);
				gameLoop();
				break;
		}
	});

	gameLoop();
	
}) ;
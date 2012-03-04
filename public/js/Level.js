//level

Maze.Level = (function () {
	var darkness;
	var walls;
	
	var Level = function () {	
		darkness = new Maze.Darkness();
		walls = new Maze.Walls();
		darkness.reveal(walls.exit.x, walls.exit.y);
	};
	
	Level.prototype.draw = function (ctx) {
		walls.draw(ctx);
		darkness.draw(ctx);
	};
	
	Level.prototype.processCollision = function (x, y, dir) {
		var newPos = walls.processCollision(x, y, dir);
		
		darkness.processCollision(newPos.x, newPos.y, walls.getArray()[newPos.x][newPos.y]);
		
		return newPos;
	};
	
	return Level;
})();
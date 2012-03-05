//level

Maze.Level = (function () {
	var darkness;
	var walls;
	
	var Level = function () {	
		darkness = new Maze.Darkness();
		walls = new Maze.Walls();
		darkness.reveal(walls.exit1.x, walls.exit1.y);
		darkness.reveal(walls.exit2.x, walls.exit2.y);
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
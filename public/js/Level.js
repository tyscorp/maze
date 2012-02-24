//level

Maze.Level = (function () {
	var darkness;
	var walls;
	
	var Level = function () {	
		darkness = new Maze.Darkness();
		walls = new Maze.Walls();
	};
	
	Level.prototype.draw = function (ctx) {
		walls.draw(ctx);
		darkness.draw(ctx);
	};
	
	Level.prototype.processCollision = function (x, y) {
		var collided = walls.processCollision(x, y);
		
		if (!collided) {
			darkness.processCollision(x, y);
		}
		
		return collided;
	};
	
	return Level;
})();
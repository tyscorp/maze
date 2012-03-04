Maze.Player = (function () {

	var Player = function (x, y) {
		this.x = x;
		this.y = y;
	};

	Player.prototype.move = function (dir, level) {
		var newPos = level.processCollision(this.x, this.y, dir);
		
		this.x = newPos.x;
		this.y = newPos.y;
		
		if (this.x === 0 || this.x === Maze.DIM.width - 1 || this.y === 0 || this.y === Maze.DIM.height - 1) {
			return true;
		}
		
		return false;
	}
	
	Player.prototype.getPos = function () {
		return { x: this.x,
			y: this.y
		};
	}

	Player.prototype.draw = function (ctx) {
		ctx.fillStyle = '#000000';
		ctx.fillRect(this.x * Maze.SIZE + 4, this.y * Maze.SIZE + 4, Maze.SIZE - 8, Maze.SIZE - 8);
	}
	
	return Player;
	
})();

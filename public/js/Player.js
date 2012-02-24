Maze.Player = (function () {

	var SIZE = 30;

	var Player = function (x, y) {
		this.x = x;
		this.y = y;
	};

	Player.prototype.move = function (x, y, level) {
		var origX = this.x;
		var origY = this.y;
		
		this.x += x;
		this.y += y;

		if (this.x < 0) {
			this.x = 0;
		}
		else if (this.x > Maze.DIM.width - 1) {
			this.x = Maze.DIM.width - 1;
		}
		else if (this.y < 0) {
			this.y = 0;
		}
		else if (this.y > Maze.DIM.height - 1) {
			this.y = Maze.DIM.width - 1;
		}
		
		if (level.processCollision(this.x, this.y)) {
			this.x = origX;
			this.y = origY;
		}
	}
	
	Player.prototype.getPos = function () {
		return {'x': this.x,
			'y': this.y
		};
	}

	Player.prototype.draw = function (ctx) {
		ctx.fillStyle = '#000000';
		ctx.fillRect(this.x * SIZE + 2, this.y * SIZE + 2, SIZE - 4, SIZE - 4);
	}
	
	return Player;
	
})();

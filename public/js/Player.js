Maze.Player = (function () {

	var size = 106;

	var Player = function (x, y) {
		this.x = x;
		this.y = y;
	};

	Player.prototype.move = function (x, y) {
		this.x += x;
		this.y += y;
	}

	Player.prototype.draw = function (ctx) {
		ctx.fillStyle = '#000000';
		ctx.fillRect(this.x * size + 2, this.y * size + 2, size - 4, size - 4);
	}
	
	return Player;
	
})();

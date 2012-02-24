//level

Level = (function () {
	var darkness;
	//var walls;
	
	var Level = function () {	
		darkness = new Darkness();
		//walls = new Walls();
	};
	
	Level.prototype.draw = function (ctx) {
		//background colour
		ctx.fillStyle = '#18BEFB';		//light bluish colour, I think similar to old maze.
		ctx.fillRect(0, 0, 800, 600);
		//walls.draw(ctx);
		darkness.draw(ctx);
	}
	
	return Level;
})();
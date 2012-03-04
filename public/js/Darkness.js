//DARKNESS

Maze.Darkness = (function () {
	var darkArray = [];
	//darkArray.length = 35;
	
	var Darkness = function () {	
		for (var x = 0; x < Maze.DIM.width; x++)
		{
			darkArray[x] = [];
			//darkArray[y].length = 50;
			for (var y = 0; y < Maze.DIM.height; y++)
			{
				darkArray[x][y] = true;
			}
		}
	};
	
	Darkness.prototype.getArray = function () {
		return darkArray;				
	};
	
	Darkness.prototype.processCollision = function (x, y, walls) {
		darkArray[x][y] = false;
		
	/*	if (!(walls & Maze.DIR.LEFT)) {
			darkArray[x - 1][y] = false;
		}
		if (!(walls & Maze.DIR.UP)) {
			darkArray[x][y - 1] = false;
		}
		if (!(walls & Maze.DIR.RIGHT)) {
			darkArray[x + 1][y] = false;
		}
		if (!(walls & Maze.DIR.DOWN)) {
			darkArray[x][y + 1] = false;
		}*/
		
	};
	
	Darkness.prototype.draw = function (ctx) {
		ctx.fillStyle = '#000000';
		
		for (var x = 0; x < Maze.DIM.width; x++)
		{
			for (var y = 0; y < Maze.DIM.height; y++)
			{
				if (darkArray[x][y] === true)
				{
					ctx.fillRect(x * Maze.SIZE, y * Maze.SIZE, Maze.SIZE, Maze.SIZE);
				}
			}
		}

	};
	
	Darkness.prototype.reveal = function (x, y) {
		darkArray[x][y] = false;
	};
	
	return Darkness;
})();
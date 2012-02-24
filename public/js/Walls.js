//WALLS

Maze.Walls = (function () {
	var wallsArray = [];
	var exit = (function () {
		var side = Math.floor(Math.random()*4);
		// ...
	})();
	
	var Walls = function () {
		// generate border
		
		for (var x = 0; x < Maze.DIM.width; x++)
		{
			wallsArray[x] = [];
			wallsArray[x][0] = true;
			wallsArray[x][Maze.DIM.height - 1] = true;
			
		}
		
		for (var y = 0; y < Maze.DIM.height; y++)
		{
			wallsArray[0][y] = true;
			wallsArray[Maze.DIM.width - 1][y] = true;
		}
	};
	
	Walls.prototype.getArray = function () {
		return wallsArray;				
	};
	
	Walls.prototype.processCollision = function (x, y) {
		return wallsArray[x][y];
	};
	
	Walls.prototype.draw = function (ctx) {
		ctx.fillStyle = '#000000';
		
		for (var x = 0; x < 50; x++)
		{
			for (var y = 0; y < 40; y++)
			{
				if (wallsArray[x][y] === true)
				{
					ctx.fillRect(x * 16, y * 16, 16, 16);
				}
			}
		}

	};
	
	return Walls;
})();
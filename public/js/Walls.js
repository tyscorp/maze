//WALLS

Maze.Walls = (function () {
	var wallsArray = [];
	var exit = (function () {
		var side = Math.floor(Math.random()*4);
		var pos = {};
		
		switch (side) {
			case 0: // left
				pos.x = 0;
				pos.y = Math.floor(Math.random()*Maze.DIM.height);
				break;
				
			case 1: // up
				pos.x = Math.floor(Math.random()*Maze.DIM.width);
				pos.y = 0;
				break;
				
			case 2: // right
				pos.x = Maze.DIM.width - 1;
				pos.y = Math.floor(Math.random()*Maze.DIM.height);
				break;
				
			case 3: // down
				pos.x = Math.floor(Math.random()*Maze.DIM.width);
				pos.y = Maze.DIM.height - 1;
				break;
		}
		
		return pos;
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
		
		wallsArray[exit.x, exit.y] = false;
	};
	
	Walls.prototype.getArray = function () {
		return wallsArray;				
	};
	
	Walls.prototype.processCollision = function (x, y) {
		return wallsArray[x][y];
	};
	
	Walls.prototype.draw = function (ctx) {
		ctx.fillStyle = '#000000';
		
		for (var x = 0; x < Maze.DIM.width; x++)
		{
			for (var y = 0; y < Maze.DIM.height; y++)
			{
				if (wallsArray[x][y] === true)
				{
					ctx.fillRect(x * Maze.SIZE, y * Maze.SIZE, Maze.SIZE, Maze.SIZE);
				}
			}
		}

	};
	
	return Walls;
})();
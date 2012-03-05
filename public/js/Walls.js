//WALLS

Maze.Walls = (function () {

	var Walls = function () {
		// create array
		this.wallsArray = [];
		
		// fill maze with walls
		for (var x = 0; x < Maze.DIM.width; x++)
		{
			this.wallsArray[x] = [];
			
			for (var y = 0; y < Maze.DIM.height; y++)
			{
				this.wallsArray[x][y] = Maze.DIR.ALL;
			}
		}
		
		// generate maze
		this.generate(Math.floor(Maze.DIM.width/2), Math.floor(Maze.DIM.height/2));
		
		
		for (var x = 1; x < Maze.DIM.width - 1; x++)
		{
			// Top wall
			this.wallsArray[x][1] |= Maze.DIR.UP;
			
			// Bottom wall
			this.wallsArray[x][Maze.DIM.height - 2] |= Maze.DIR.DOWN;		
		}
		
		for (var y = 1; y < Maze.DIM.height - 1; y++)
		{
			// Left wall
			this.wallsArray[1][y] |= Maze.DIR.LEFT;
			
			//Right wall
			this.wallsArray[Maze.DIM.width - 2][y] |= Maze.DIR.RIGHT;
		}
		
		this.createExits();
	};
	
	Walls.prototype.getArray = function () {
		return this.wallsArray;				
	};
	
	Walls.prototype.processCollision = function (x, y, dir) {
		
		var newPos = { x: x, y: y };
		
		if (!(this.wallsArray[x][y] & dir)) {
			switch (dir) {
				case Maze.DIR.LEFT:
					newPos.x--;
					break;
				case Maze.DIR.UP:
					newPos.y--;
					break;
				case Maze.DIR.RIGHT:
					newPos.x++;
					break;
				case Maze.DIR.DOWN:
					newPos.y++;
					break;
			}
		}
		
		return newPos;
	};
	
	Walls.prototype.draw = function (ctx) {
		ctx.fillStyle = 'orange';
		for (var x = 0; x < Maze.DIM.width; x++)
		{
			for (var y = 0; y < Maze.DIM.height; y++)
			{
				if (this.wallsArray[x][y] & Maze.DIR.LEFT) {
					ctx.fillRect(x * Maze.SIZE, y * Maze.SIZE, 1, Maze.SIZE);
				}
				if (this.wallsArray[x][y] & Maze.DIR.UP) {
					ctx.fillRect(x * Maze.SIZE, y * Maze.SIZE, Maze.SIZE, 1);
				}
				if (this.wallsArray[x][y] & Maze.DIR.RIGHT) {
					ctx.fillRect(x * Maze.SIZE + Maze.SIZE - 1, y * Maze.SIZE, 1, Maze.SIZE);
				}
				if (this.wallsArray[x][y] & Maze.DIR.DOWN) {
					ctx.fillRect(x * Maze.SIZE, y * Maze.SIZE + Maze.SIZE - 1, Maze.SIZE, 1);
				}
			}
		}
	};
	
	var visited = 0;
	var total = (Maze.DIM.width - 2) * (Maze.DIM.height - 2) - 1;
	var stack = [];
	
	// this implementation is dfs.
	Walls.prototype.generate = function (x, y) {
		Math.seedrandom(Maze.seed);
		var current = { x: x, y: y };
	
		while (visited < total) {
			
			var neighbours = [];
			var dirs = [];
			
			if (current.x - 1 > 0 && this.wallsArray[current.x - 1][current.y] === Maze.DIR.ALL) {
				neighbours.push({ x: current.x - 1, y: current.y });
				dirs.push(Maze.DIR.LEFT);
			}
			if (current.y - 1 > 0 && this.wallsArray[current.x][current.y - 1] === Maze.DIR.ALL) {
				neighbours.push({ x: current.x, y: current.y - 1 });
				dirs.push(Maze.DIR.UP);
			}
			if (current.x + 1 <= Maze.DIM.width - 2 && this.wallsArray[current.x + 1][current.y] === Maze.DIR.ALL) {
				neighbours.push({ x: current.x + 1, y: current.y });
				dirs.push(Maze.DIR.RIGHT);
			}
			if (current.y + 1 <= Maze.DIM.height - 2 && this.wallsArray[current.x][current.y + 1] === Maze.DIR.ALL) {
				neighbours.push({ x: current.x, y: current.y + 1 });
				dirs.push(Maze.DIR.DOWN);
			}
			
			if (neighbours.length > 0) {
				var rand = Math.floor(Math.random()*neighbours.length);
				var newCell = neighbours[rand];
				
				switch (dirs[rand]) {
					case Maze.DIR.LEFT:
						this.wallsArray[current.x][current.y] -= Maze.DIR.LEFT;
						this.wallsArray[newCell.x][newCell.y] -= Maze.DIR.RIGHT;
						break;
					case Maze.DIR.UP:
						this.wallsArray[current.x][current.y] -= Maze.DIR.UP;
						this.wallsArray[newCell.x][newCell.y] -= Maze.DIR.DOWN;
						break;
					case Maze.DIR.RIGHT:
						this.wallsArray[current.x][current.y] -= Maze.DIR.RIGHT;
						this.wallsArray[newCell.x][newCell.y] -= Maze.DIR.LEFT;
						break;
					case Maze.DIR.DOWN:
						this.wallsArray[current.x][current.y] -= Maze.DIR.DOWN;
						this.wallsArray[newCell.x][newCell.y] -= Maze.DIR.UP;
						break;
				}
				
				stack.push(current);
				current = newCell;
				visited++;
			}
			else {
				current = stack.shift();
			}
		}
	};
	
	Walls.prototype.createExits = function () {
		Math.seedrandom(Maze.seed);

		var side = Math.floor(Math.random()*4);
		var side2;
		var derp = function (side) {
			var exit = {};
			
			switch (side) {
				case 0: // left
					exit.x = 0;
					exit.y = 1 + Math.floor(Math.random() * (Maze.DIM.height - 2));
					this.wallsArray[exit.x + 1][exit.y] -= Maze.DIR.LEFT;
					side2 = 2;
					break;
					
				case 1: // up
					exit.x = 1 + Math.floor(Math.random() * (Maze.DIM.width - 2));
					exit.y = 0;
					this.wallsArray[exit.x][exit.y + 1] -= Maze.DIR.UP;
					side2 = 3;
					break;
					
				case 2: // right
					exit.x = Maze.DIM.width - 1;
					exit.y = 1 + Math.floor(Math.random() * (Maze.DIM.height - 2));
					this.wallsArray[exit.x - 1][exit.y] -= Maze.DIR.RIGHT;
					side2 = 0;
					break;
					
				case 3: // down
					exit.x = 1 + Math.floor(Math.random() * (Maze.DIM.width - 2));
					exit.y = Maze.DIM.height - 1;
					this.wallsArray[exit.x][exit.y - 1] -= Maze.DIR.DOWN;
					side2 = 1;
					break;
			}
			
			return exit;
		}.bind(this);
	
		this.exit1 = derp(side);
		this.exit2 = derp(side2);
		
		
		this.wallsArray[this.exit1.x][this.exit1.y] = Maze.DIR.NONE;
		this.wallsArray[this.exit2.x][this.exit2.y] = Maze.DIR.NONE;
	};
	
	return Walls;
})();

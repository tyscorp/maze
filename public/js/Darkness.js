//DARKNESS

Darkness = (function () {
	var darkArray = [];
	//darkArray.length = 35;
	
	var Darkness = function () {	
		for(var y = 0; y < 35; y++)
		{
			darkArray[y] = [];
			//darkArray[y].length = 50;
			for(var x = 0; x < 50; x++)
			{
				darkArray[y][x] = {"x":x, "y":y, "visible":true}
			}
		}
	};
	
	Darkness.prototype.getArray = function () {
		return darkArray;				
	}
	
	Darkness.prototype.processCollision = function (x, y) {
		//something might be wrong here, like the coordinates are not on the same scale or something
		if(darkArray[y][x].visible == true)
		{
			darkArray[y][x].visible = false;
		}
		//else gy sucks
	}
	
	Darkness.prototype.draw = function (ctx) {
		ctx.fillStyle = '#000000';
		for(var y = 0; y < 35; y++)
		{
			for(var x = 0; x < 50; x++)
			{
				if(darkArray[y][x].visible == true)
				{
					ctx.fillRect(darkArray[y][x].x * 16, darkArray[y][x].y * 16, 16, 16);
				}
			}
		}

	}
	
	return Darkness;
})();
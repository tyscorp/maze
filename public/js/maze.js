// global context
Maze = {};

Maze.SIZE = 20;
Maze.DIM = { width: Math.floor(800/Maze.SIZE), height: Math.floor(640/Maze.SIZE) };
Maze.DIR = {
	NONE: 0,
	LEFT: 1,
	UP: 2,
	RIGHT: 4,
	DOWN: 8
};

Maze.DIR.ALL = Maze.DIR.LEFT | Maze.DIR.UP | Maze.DIR.RIGHT | Maze.DIR.DOWN;

$(function () {

	var canvas = $('#c').get(0);
	var ctx = canvas.getContext('2d');
	
	var STATE = {
		LOADING: 0,
		START: 1,
		INGAME: 2,
		END: 3
	};
	
	var state = STATE.LOADING;
	
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = 'css/font.css';
	document.getElementsByTagName('head')[0].appendChild(link);

	// Trick from http://stackoverflow.com/questions/2635814/
	var image = new Image();
	image.src = link.href;
	image.onerror = function () {
		state = STATE.START;
		setTimeout(function () { requestAnimationFrame(draw) }, 100);
	};
	
	// if that fails
	setTimeout(function () {
		if(state === STATE.LOADING) {
			state = STATE.START;
			requestAnimationFrame(draw);
		}
	}, 3000);

	
	// set random seed
	if (window.location.hash) {
		Maze.seed = window.location.hash.substring(1);
	}
	else {
		Maze.seed = Date.now();
		window.location.hash = '#' + Maze.seed;
	}
	
	$('#samemaze').attr('href', '/#' + Maze.seed);
	
	$('#samemaze').click(function () {
		window.location.reload()
	});
	
	var player = new Maze.Player(Math.floor(Maze.DIM.width/2), Math.floor(Maze.DIM.height/2));
	var level = new Maze.Level();

	var startTime;
	
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) { fn.call(); };
	
	function draw() {
		
		ctx.fillStyle = (state === STATE.LOADING ? 'black' : '#18BEFB');
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		switch (state) {
			case STATE.START:
				ctx.fillStyle = '#000000';
				ctx.font = '48pt fixedsys';
				ctx.fillText('maze', 330, 300);
				break;
				
			case STATE.INGAME:
				player.draw(ctx);
				level.draw(ctx);
				break;
				
			case STATE.END:
				ctx.fillStyle = '#000000';
				ctx.font = '48pt fixedsys';
				ctx.fillText('that was maze.', 160, 300);
				break;
		}
		
	}

	$('body').click(function (event) {
		if (state === STATE.START) {
			// start game
			state = STATE.INGAME;
			startTime = Date.now();
			player.move(-1, level);
			requestAnimationFrame(draw);
		}
	});
	
	$('body').keydown(function (event) {
		if (state === STATE.START) {
			// start game
			state = STATE.INGAME;
			startTime = Date.now();
			player.move(-1, level);
			requestAnimationFrame(draw);
		}
		else if (state === STATE.INGAME) {
			var dir;
			
			switch (event.keyCode) {
				case 37: // left
					dir = Maze.DIR.LEFT;
					break;
				case 38: // up
					dir = Maze.DIR.UP;
					break;
				case 39: // right
					dir = Maze.DIR.RIGHT;
					break;
				case 40: // down
					dir = Maze.DIR.DOWN;
					break;
			}
			
			if (player.move(dir, level)) {
				state = STATE.END;
				$('#win').css('display', 'block');
				$.get("/win/?seed=" + Maze.seed + "&time=" + (Date.now() - startTime));
				
			}
			requestAnimationFrame(draw);
		}
	});
	
	
	
	requestAnimationFrame(draw);
});

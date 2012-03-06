/**
 * Module dependencies.
 */
var express = require('express');
var fs = require('fs');
var exec = require('child_process').exec;

var app = module.exports = express.createServer();

var wins = JSON.parse(fs.readFileSync('data.json'));

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Routes

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/update/sfjhkasryigd', function (req, res) {
	console.log('Updating...');
	exec('git stash; git pull', function (error, stdout, stderr) {
		console.log(stdout);
		res.send(stdout.replace(/\n/, '<br />'));
	});
});

app.get('/win/', function (req, res) {
	console.log('[' + (new Date()).toISOString() + '] ' + (req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : req.connection.remoteAddress) + ' won! seed: ' + req.query.seed + ' time: ' + req.query.time);
	wins.push({ timestamp: (new Date()).toISOString(), ip: req.connection.remoteAddress, seed: req.query.seed, time: req.query.time });
	res.send('');
	fs.writeFile('data.json', JSON.stringify(wins));
});


app.listen(3003);


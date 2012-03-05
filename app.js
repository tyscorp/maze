/**
 * Module dependencies.
 */
var express = require('express');
var exec = require('child_process').exec;

var app = module.exports = express.createServer();

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

app.get('/update', function (req, res) {
	exec('git stash; git pull', function (error, stdout, stderr) {
		console.log(stdout);
		res.send(stdout.replace(/\n/, '<br />'));
	});
	console.log('Updating...');
});

app.get('/win', function (req, res) {
	console.log('win');
});


app.listen(3003);


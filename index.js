var express = require('express');
var path = require('path');

// Start server
var app = express();
var port = process.env.PORT || 80;

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
	res.redirect('/reviews');
});

app.get(['/reviews', '/reviews/*'], function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function() {
	console.log('Example app listening on port ' + port + '!');
});

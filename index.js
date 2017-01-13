var express = require('express');
var path = require('path');
var args = require('command-line-args');

// Start server
{
    var app = express();
	var port = args({name:'port', defaultValue: 80}).port;

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
}
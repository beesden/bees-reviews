var express = require('express');
var path = require('path');

var app = express();
var port = 3005;

app.use(express.static('/app'));
app.use(express.static('/view'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function() {
    console.log('Example app listening on port ' + port + '!');
});
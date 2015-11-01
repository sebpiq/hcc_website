/*var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello Node.js!\n');
    if ('host' in req.headers) {
        var host = req.headers['host'];
        res.write('Vhost is ' + host.split(':')[0] + '\n');
    } else {
        res.write('No vhost specified\n');
    }
    res.end();
}).listen(process.env.PORT);
*/
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World and more!');
});

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

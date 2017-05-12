/*

    Liam Workman
    server.js
    A very basic node.js server with one api endpoint '/api', which parses and returns a local json
    file 'events.json'

*/

var express = require('express');
var app = express();
var fs = require('fs');
var path = require("path");

app.get('/api', function(req, res) {
  fs.readFile('events.json','utf8',function(err,data){
    res.setHeader('content-type','application/json');
    res.send(data);
  })
});

app.use(express.static(__dirname + '/client/build'));

app.listen(3001);

console.log('Listening on port 3001...');
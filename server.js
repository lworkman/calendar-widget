var express = require('express');
var app = express();
var fs = require('fs');
app.get('/api', function(req, res) {
  fs.readFile('events.json','utf8',function(err,data){
    res.setHeader('content-type','application/json');
    res.send(data);
  })
});
app.listen(3001);
console.log('Listening on port 3001...');
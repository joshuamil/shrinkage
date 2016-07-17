var express = require('express'),
    bb = require('express-busboy'),
    marked = require('marked'),
    fs = require('fs'),
    methods = require('./bin/methods.js'),
    config = require('./conf/conf.json').config;

var app = express();


// Configure Busboy
bb.extend(app, {
  upload: true,
  path: './tmp/',
  allowedPath: /./
});


// Set variables from the configuration file
var port = config.port || "8080";


// Route for the front-end of the service
app.get('/', function (req, res) {

  fs.readFile('./html/header.html','utf8',function(err,header){
    fs.readFile('./html/footer.html','utf8',function(err,footer){
      fs.readFile('./README.md', 'utf8', function (err,data) {
        if (err) {
          res.send("Cannot render README.md file.");
        }
        var html = header;
            html += marked(data,{});
            html += footer;
        res.send(html);
      });
    });
  });

});


// Route for handling post requests
app.post('/svc', function (req, res){
  methods.processRequest(req, res);
});


// Startup the app
app.listen(port, function () {
  console.log('Service listening on port: ' + port);
});

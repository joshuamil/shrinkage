var express = require('express'),
    bb = require('express-busboy'),
    pug = require('pug'),
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
app.get('/svc', function (req, res) {
  var html = pug.renderFile('./html/welcome.html',{});
  res.send(html);
});


// Route for handling post requests
app.post('/svc', function (req, res){
  methods.processRequest(req, res);
});


// Startup the app
app.listen(port, function () {
  console.log('Service listening on port: ' + port);
});

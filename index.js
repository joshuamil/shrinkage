var express = require('express'),
    bb = require('express-busboy'),
    pug = require('pug'),
    sharp = require('sharp'),
    path = require('path'),
    actions = require('./conf/actions.json').actions,
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

  var act = req.body.action || "default";

  // Get configuration using the specified action
  for(var key in actions){
    if(actions.hasOwnProperty(key)){
      if(actions[key].hasOwnProperty("name") && actions[key]["name"] === act){
        cfg = actions[key];
        break;
      }
    }
  }

  var fmt = cfg.format || "png";
  var name = req.body.filename || "output." + fmt;
  var image = sharp(req.files.image.file);
  var level = cfg.level || 7;
  var size = cfg.size || "";

  image
    .metadata()
    .then(function(metadata) {

      if(size === ""){
        size.w = metadata.wdith;
        size.h = metadata.height;
      }

      return image
        .resize(size.w,size.h)
        .toFormat(fmt)
        .compressionLevel(level)
        .toFile('./tmp/' + name);
    })
    .then(function(data) {
      console.log(data);
      res.sendFile(path.join(__dirname, 'tmp', name));
    });

});


// Startup the app
app.listen(port, function () {
  console.log('Service listening on port: ' + port);
});

var sharp = require('sharp'),
    path = require('path'),
    lodash = require('lodash'),
    actions = require(__dirname + '/../conf/actions.json').actions,
    config = require(__dirname + '/../conf/conf.json').config;

var self = module.exports = {

  processRequest: function(req, res){

    var options = {};

    // Set the action for this request
    options.act = req.body.action || "default";

    // Get configuration using the specified action
    var cfg = lodash.filter(actions, { 'name': '' + options.act })[0];

    if(!cfg){
      var cfg = lodash.filter(actions, { 'name': 'default' })[0];
    }

    // Set options for image manipulation
    options.fmt = cfg.format || "png";
    options.name = req.body.filename || "output." + options.fmt;
    options.level = cfg.level || 7;
    options.size = cfg.size || "";
    options.crop = "sharp.gravity." + cfg.crop || false;
    options.extract = cfg.extract || false;
    options.rotate = cfg.rotate || false;
    options.invert = cfg.invert || false;
    options.flip = cfg.flip || false;
    options.flop = cfg.flop || false;
    options.quality = cfg.quality || false;

    // Set the image object
    var image = sharp(req.files.image.file);

    // Process the image
    image
      .metadata()
      .then(
        function(metadata) {

          // Resize the image
          if(options.size !== "" && !options.extract){
            image = image.resize(options.size.w,options.size.h)
          }

          // Crop the image
          if(options.crop && options.crop !== false){
            image = image.crop(sharp.strategy.entropy);
          }

          // Rotate the image
          if(options.rotate && options.rotate !== false){
            image = image.rotate(options.rotate);
          }

          // Invert the image
          if(options.invert){
            image = image.negate();
          }

          // Mirror the image vertically
          if(options.flip){
            image = image.flip();
          }

          // Mirror the image horizontally
          if(options.flop){
            image = image.flop();
          }

          // Mirror the image horizontally
          if(options.quality){
            image = image.quality(options.quality);
          }

          // Extract a portion of the image
          if(options.extract){
            image = image
              .extract({
                left: options.extract.left,
                top: options.extract.top,
                width: options.size.w,
                height: options.size.h
              });
          }

          // Apply final changes to the image object
          return image
            .toFormat(options.fmt)
            .compressionLevel(options.level)
            .toFile('./tmp/' + options.name);

        },

        function(err){
          res.send("Error occurred: " + err);
        }
      )
      .then(function(data) {
        res.sendFile(path.join(__dirname, '../tmp', options.name));
      });

  }

};

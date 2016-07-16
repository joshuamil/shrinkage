var sharp = require('sharp'),
    path = require('path'),
    actions = require(__dirname + '/../conf/actions.json').actions,
    config = require(__dirname + '/../conf/conf.json').config;

var self = module.exports = {

  processRequest: function(req, res){

    var options = {};
    var cfg = {};

    options.act = req.body.action || "default";

    // Get configuration using the specified action
    for(var key in actions){
      if(actions.hasOwnProperty(key)){
        if(actions[key].hasOwnProperty("name") && actions[key]["name"] === options.act){
          cfg = actions[key];
          break;
        }
      }
    }

    options.fmt = cfg.format || "png";
    options.name = req.body.filename || "output." + options.fmt;
    options.level = cfg.level || 7;
    options.size = cfg.size || "";

    var image = sharp(req.files.image.file);

    image
      .metadata()
      .then(
        function(metadata) {

          if(options.size === ""){
            size.w = metadata.wdith;
            size.h = metadata.height;
          }

          switch(options.act){

            case "thumbnail":
              self.processThumbnail(image, options);
              break;

            case "icon":
              self.processIcon(image, options);
              break;

            case "avatar":
              self.processAvatar(image, options);
              break;

            case "hero":
              self.processHero(image, options);
              break;

            case "default":
              self.processDefault(image, options);
              break;

            default:
              self.processDefault(image, options);

          }


        },

        function(err){
          res.send("Error occurred: " + err);
        }
      )
      .then(function(data) {
        res.sendFile(path.join(__dirname, '../tmp', options.name));
      });

  },


  /* Process thumbnail images */
  processThumbnail: function(image, options){
    return image
      .resize(options.size.w,options.size.h)
      .toFormat(options.fmt)
      .compressionLevel(options.level)
      .toFile('./tmp/' + options.name);
  },

  /* Process icon images */
  processIcon: function(image, options){
    return image
      .resize(options.size.w,options.size.h)
      .toFormat(options.fmt)
      .compressionLevel(options.level)
      .toFile('./tmp/' + options.name);
  },

  /* Process avatar images */
  processAvatar: function(image, options){
    return image
      .resize(options.size.w,options.size.h)
      .toFormat(options.fmt)
      .compressionLevel(options.level)
      .toFile('./tmp/' + options.name);
  },

  /* Process hero images */
  processHero: function(image, options){
    return image
      .resize(options.size.w,options.size.h)
      .toFormat(options.fmt)
      .compressionLevel(options.level)
      .toFile('./tmp/' + options.name);
  },

  /* Process image */
  processDefault: function(image, options){
    return image
      .resize(options.size.w,options.size.h)
      .toFormat(options.fmt)
      .compressionLevel(options.level)
      .toFile('./tmp/' + options.name);
  }

};

/*
 *  OAS-tools module 0.0.0, built on: 2017-03-30
 * Copyright (C) 2017 Ignacio Peluaga Lozada (ISA Group)
 * https://github.com/ignpelloz
 *  https://github.com/isa-group/project-oas-tools
 */

'use strict';

/**
 * Module dependecies.
 */
var jsyaml = require('js-yaml');
var fs = require('fs');
var path = require('path');
var winston = require('winston');


/*
 * Export functions and Objects
 */
var config = {
  setConfigurations: _setConfigurations  //eslint-disable-line
};

module.exports = config;

module.exports.setProperty = function(propertyName, newValue) {
  this[propertyName] = newValue;
};


/**
 * Implement the functions
 */
function _setConfigurations(options, encoding) { //eslint-disable-line

  if (!options) {
    throw new Error("Configurations parameter is required");
  } else if (typeof options == 'string') {
    try {
      var configString = fs.readFileSync(options, encoding); // eslint-disable-line
      var newConfigurations = jsyaml.safeLoad(configString)[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'];
    } catch (err) {
      console.log("The specified configuration file wasn't found at " + options + ".  Default configurations will be set"); // eslint-disable-line
      config.setConfigurations(path.join(__dirname, 'configs.yaml'), 'utf8');
    }
  } else {
    newConfigurations = options;
  }

  for (var c in newConfigurations) {
    this.setProperty(c, newConfigurations[c]);   //eslint-disable-line
    if (c == 'loglevel') { //loglevel changes, then new logger is needed
      createNewLogger(); // eslint-disable-line
    }
  }
}

/**
 * Setup default configurations
 */
config.setConfigurations(path.join(__dirname, 'configs.yaml'), 'utf8');

function consoleLogger(customLevels, customFormat) {
  module.exports.logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.Console({
        level: config.loglevel,
        handleExceptions: true,
        json: false,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.splat(),
          customFormat
        )
      })
    ],
    exitOnError: false
  });
}

function createNewLogger() {
  var customFormat = winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);

  /**
   * Configure here your custom levels.
   */
  var customLevels = {
    levels: {
      error: 7,
      warning: 8,
      custom: 9,
      info: 12,
      debug: 13
    },
    colors: {
      error: 'red',
      warning: 'yellow',
      custom: 'magenta',
      info: 'white',
      debug: 'blue'
    }
  };

  if (config.logfile != undefined) {
    module.exports.logger = winston.createLogger({
      levels: customLevels.levels,
      transports: [
        new winston.transports.File({
          level: config.loglevel,
          filename: config.logfile,
          handleExceptions: true,
          maxsize: 5242880, //5MB
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.splat(),
            customFormat
          )
        }),
        new winston.transports.Console({
          level: config.loglevel,
          handleExceptions: true,
          json: false,
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.splat(),
            customFormat
          )
        })
      ],
      exitOnError: false
    });
  } else {
    consoleLogger(customLevels, customFormat);
  }

  winston.addColors(customLevels.colors);
}

createNewLogger();

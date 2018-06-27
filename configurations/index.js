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

  var configString = fs.readFileSync(options, encoding);
  var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
  var newConfigurations = jsyaml.safeLoad(configString)[env];

  for (var c in newConfigurations) {
    this.setProperty(c, newConfigurations[c]);   //eslint-disable-line
  }
}

/**
 * Setup default configurations
 */
config.setConfigurations(path.join(__dirname, 'configs.yaml'), 'utf8');

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

winston.emitErrs = true;

function consoleLogger() {
  module.exports.logger = new winston.Logger({
    levels: customLevels.levels,
    colors: customLevels.colors,
    transports: [
      new winston.transports.Console({
        level: config.loglevel,
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp: true
      })
    ],
    exitOnError: false
  });
}

if (config.logfile != undefined) {
  module.exports.logger = new winston.Logger({
    levels: customLevels.levels,
    colors: customLevels.colors,
    transports: [
      new winston.transports.File({
        level: config.loglevel,
        filename: config.logfile,
        handleExceptions: true,
        json: false,
        maxsize: 5242880, //5MB
        colorize: false
      }),
      new winston.transports.Console({
        level: config.loglevel,
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp: true
      })
    ],
    exitOnError: false
  });
} else {
  consoleLogger();
}

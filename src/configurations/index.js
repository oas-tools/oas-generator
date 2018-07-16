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

const customFormat = winston.format.printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
})

function consoleLogger() {
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
  consoleLogger();
}

winston.addColors(customLevels.colors);

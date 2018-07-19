#!/usr/bin/env node

var program = require('commander');
var generate = require('./generate');

program
  .arguments('<file>')
  .option('-n, --projectName <projectName>', 'Name for the generated folder')
  .option('-z, --generateZip', 'Generate a zip and delete the folder')
  .action(function(file, cmd) {
    generate.generateServer(file, cmd);
  })
  .parse(process.argv);
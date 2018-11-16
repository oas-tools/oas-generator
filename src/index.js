#!/usr/bin/env node

var program = require('commander');
var generate = require('./generate');

program
  .name('oas-generator')
  .usage('<OAS v3 file in YAML or JSON>')
  .arguments('<file>')
  .option('-n, --projectName <projectName>', 'Name for the generated folder')
  .option('-z, --generateZip', 'Generate a zip and delete the folder')
  .option('-j, --json', 'Generate oas-doc file as JSON (default is YAML)')
  .action(function(file, cmd) {
    generate.generateServer(file, cmd);
  })
  .parse(process.argv);

if (process.argv.length < 3) {
  program.help();
}

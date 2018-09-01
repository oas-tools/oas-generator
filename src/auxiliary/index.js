'use strict';

var fs = require('fs'),
    http = require('http'),
    path = require('path');

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var oasTools = require('oas-tools');
var jsyaml = require('js-yaml');
var serverPort = 8080;

var spec = fs.readFileSync(path.join(__dirname, '/api/oas-doc.yaml'), 'utf8');
var oasDoc = jsyaml.safeLoad(spec);

var options_object = {
  controllers: path.join(__dirname, './controllers'),
  loglevel: 'info',
  strict: false,
  router: true,
  validator: true,
  docs: true
};

oasTools.configure(options_object);

if (oasDoc.servers) {
  var localServer = oasDoc.servers.find((server) => server.url.substr(0, 16) === 'http://localhost');
  if (!localServer) {
    console.log("No localhost server found in spec file, added for testing purposes");
    var foundServer = oasDoc.servers[0];
    console.log(foundServer.url.split('/').slice(3));
    var basePath = '/' + foundServer.url.split('/').slice(3).join('/');
    oasDoc.servers.push({
      url: 'http://localhost:' + serverPort + basePath
    });
  }
} else {
  console.log("No servers found in spec file, added localhost server for testing purposes");
  oasDoc.servers = [
    {
      url: 'http://localhost:' + serverPort
    }
  ]
}

oasTools.initialize(oasDoc, app, function() {
  http.createServer(app).listen(serverPort, function() {
    console.log("App running at http://localhost:" + serverPort);
    console.log("________________________________________________________________");
    if (options_object.docs !== false) {
      console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
      console.log("________________________________________________________________");
    }
  });
});

app.get('/info', function(req, res) {
  res.send({
    info: "This API was generated using oas-generator!",
    name: oasDoc.info.title
  });
});

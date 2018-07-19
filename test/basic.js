'use strict'

const chai = require('chai');
const generate = require('./../src/generate.js');
const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
chai.should();

const options_object = {
    loglevel: 'none'
};

describe('Server generation', () => {
    before(() => {
        generate.configure(options_object);
    });
    it('Folder is created', () => {
        var file = 'test/oai-spec.yaml';
        var cmd = {
            projectName: 'testServer'
        };
        if (fs.existsSync(path.join(__dirname, '..', 'testServer'))) {
            rimraf.sync(path.join(__dirname, '..', 'testServer'));
        }
        generate.generateServer(file, cmd);
        const folder = fs.existsSync(path.join(__dirname, '..', 'testServer'));
        folder.should.equal(true);
        rimraf.sync(path.join(__dirname, '..', 'testServer'));
    });
});

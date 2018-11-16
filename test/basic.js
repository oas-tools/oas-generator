'use strict'

const chai = require('chai');
const generate = require('./../src/generate.js');
const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const sinon = require('sinon');
chai.should();

const options_object = {
    loglevel: 'none'
};
const file = 'test/oai-spec.yaml';
const cmd = {
    projectName: 'testServer'
};

describe('Server generation with a specified name', () => {
    before(() => {
        generate.configure(options_object);
        if (fs.existsSync(path.join(__dirname, '..', cmd.projectName))) {
            rimraf.sync(path.join(__dirname, '..', cmd.projectName));
        }
        generate.generateServer(file, cmd);
    });

    after(() => {
        rimraf.sync(path.join(__dirname, '..', cmd.projectName));
    });

    it('Main folder is created', () => {
        fs.existsSync(path.join(__dirname, '..', cmd.projectName)).should.equal(true);
    });

    it('Correct folders are created', () => {
        fs.existsSync(path.join(__dirname, '..', cmd.projectName, '.oas-generator')).should.equal(true);
        fs.existsSync(path.join(__dirname, '..', cmd.projectName, 'api')).should.equal(true);
        fs.existsSync(path.join(__dirname, '..', cmd.projectName, 'controllers')).should.equal(true);
    });

    it('Each folder contains all necessary files', () => {
        const oasGeneratorFolder = fs.readdirSync(path.join(__dirname, '..', cmd.projectName, '.oas-generator'));
        oasGeneratorFolder.length.should.equal(1);
        oasGeneratorFolder.includes('VERSION').should.equal(true);
        const apiFolder = fs.readdirSync(path.join(__dirname, '..', cmd.projectName, 'api'));
        apiFolder.length.should.equal(1);
        apiFolder.includes('oas-doc.yaml').should.equal(true);
        const controllersFolder = fs.readdirSync(path.join(__dirname, '..', cmd.projectName, 'controllers'));
        controllersFolder.length.should.equal(4);
        controllersFolder.includes('petsController.js').should.equal(true);
        controllersFolder.includes('petsControllerService.js').should.equal(true);
        controllersFolder.includes('petspetIdController.js').should.equal(true);
        controllersFolder.includes('petspetIdControllerService.js').should.equal(true);
    });

    it('Correct files are created', () => {
        fs.existsSync(path.join(__dirname, '..', cmd.projectName, 'index.js')).should.equal(true);
        fs.existsSync(path.join(__dirname, '..', cmd.projectName, 'package.json')).should.equal(true);
        fs.existsSync(path.join(__dirname, '..', cmd.projectName, 'README.md')).should.equal(true);
    });
});

describe('Server generation with a specified name and JSON oas-doc file', () => {
    before(() => {
        generate.configure(options_object);
        if (fs.existsSync(path.join(__dirname, '..', cmd.projectName))) {
            rimraf.sync(path.join(__dirname, '..', cmd.projectName));
        }
        const newCmd = cmd;
        newCmd.json = true;
        generate.generateServer(file, newCmd);
    });

    after(() => {
        rimraf.sync(path.join(__dirname, '..', cmd.projectName));
    });

    it('Main folder is created', () => {
        fs.existsSync(path.join(__dirname, '..', cmd.projectName)).should.equal(true);
    });

    it('Correct folders are created', () => {
        fs.existsSync(path.join(__dirname, '..', cmd.projectName, '.oas-generator')).should.equal(true);
        fs.existsSync(path.join(__dirname, '..', cmd.projectName, 'api')).should.equal(true);
        fs.existsSync(path.join(__dirname, '..', cmd.projectName, 'controllers')).should.equal(true);
    });

    it('Each folder contains all necessary files', () => {
        const oasGeneratorFolder = fs.readdirSync(path.join(__dirname, '..', cmd.projectName, '.oas-generator'));
        oasGeneratorFolder.length.should.equal(1);
        oasGeneratorFolder.includes('VERSION').should.equal(true);
        const apiFolder = fs.readdirSync(path.join(__dirname, '..', cmd.projectName, 'api'));
        apiFolder.length.should.equal(1);
        apiFolder.includes('oas-doc.json').should.equal(true);
        const controllersFolder = fs.readdirSync(path.join(__dirname, '..', cmd.projectName, 'controllers'));
        controllersFolder.length.should.equal(4);
        controllersFolder.includes('petsController.js').should.equal(true);
        controllersFolder.includes('petsControllerService.js').should.equal(true);
        controllersFolder.includes('petspetIdController.js').should.equal(true);
        controllersFolder.includes('petspetIdControllerService.js').should.equal(true);
    });

    it('Correct files are created', () => {
        fs.existsSync(path.join(__dirname, '..', cmd.projectName, 'index.js')).should.equal(true);
        fs.existsSync(path.join(__dirname, '..', cmd.projectName, 'package.json')).should.equal(true);
        fs.existsSync(path.join(__dirname, '..', cmd.projectName, 'README.md')).should.equal(true);
    });
});

describe('Server generation without a specified name', () => {
    before(() => {
        generate.configure(options_object);
        if (fs.existsSync(path.join(__dirname, '..', 'nodejs-server-generated'))) {
            rimraf.sync(path.join(__dirname, '..', 'nodejs-server-generated'));
        }
        generate.generateServer(file, {});
    });

    after(() => {
        rimraf.sync(path.join(__dirname, '..', 'nodejs-server-generated'));
    });

    it('Main folder is created', () => {
        fs.existsSync(path.join(__dirname, '..', 'nodejs-server-generated')).should.equal(true);
    });

    it('Correct folders are created', () => {
        fs.existsSync(path.join(__dirname, '..', 'nodejs-server-generated/.oas-generator')).should.equal(true);
        fs.existsSync(path.join(__dirname, '..', 'nodejs-server-generated/api')).should.equal(true);
        fs.existsSync(path.join(__dirname, '..', 'nodejs-server-generated/controllers')).should.equal(true);
    });

    it('Each folder contains all necessary files', () => {
        const oasGeneratorFolder = fs.readdirSync(path.join(__dirname, '..', 'nodejs-server-generated/.oas-generator'));
        oasGeneratorFolder.length.should.equal(1);
        oasGeneratorFolder.includes('VERSION').should.equal(true);
        const apiFolder = fs.readdirSync(path.join(__dirname, '..', 'nodejs-server-generated/api'));
        apiFolder.length.should.equal(1);
        apiFolder.includes('oas-doc.yaml').should.equal(true);
        const controllersFolder = fs.readdirSync(path.join(__dirname, '..', 'nodejs-server-generated/controllers'));
        controllersFolder.length.should.equal(4);
        controllersFolder.includes('petsController.js').should.equal(true);
        controllersFolder.includes('petsControllerService.js').should.equal(true);
        controllersFolder.includes('petspetIdController.js').should.equal(true);
        controllersFolder.includes('petspetIdControllerService.js').should.equal(true);
    });

    it('Correct files are created', () => {
        fs.existsSync(path.join(__dirname, '..', 'nodejs-server-generated/index.js')).should.equal(true);
        fs.existsSync(path.join(__dirname, '..', 'nodejs-server-generated/package.json')).should.equal(true);
        fs.existsSync(path.join(__dirname, '..', 'nodejs-server-generated/README.md')).should.equal(true);
    });
});

describe('Server generation without input file', () => {
    before(() => {
        generate.configure(options_object);
    });

    it('An error is thrown', () => {
        const spy = sinon.spy(console, 'log');
        generate.generateServer(null, cmd);
        spy.calledWith('You must select an input specification file!').should.equal(true);
        spy.restore();
    });
});

describe('Compressed server generation', () => {
    before((done) => {
        generate.configure(options_object);
        if (fs.existsSync(path.join(__dirname, '..', cmd.projectName))) {
            rimraf.sync(path.join(__dirname, '..', cmd.projectName));
        }
        if (fs.existsSync(path.join(__dirname, '..', cmd.projectName + '.zip'))) {
            rimraf.sync(path.join(__dirname, '..', cmd.projectName + '.zip'));
        }
        const newCmd = cmd;
        newCmd.generateZip = true;
        generate.generateServer(file, newCmd);
        // This timeout waits for the ZIP file to be created
        setTimeout(done, 1500);
    });

    after(() => {
        rimraf.sync(path.join(__dirname, '..', cmd.projectName + '.zip'));
    });

    it('A ZIP file is created', function() {
        fs.existsSync(path.join(__dirname, '..', cmd.projectName + '.zip')).should.equal(true);
    });

    it('The folder is removed', () => {
        fs.existsSync(path.join(__dirname, '..', cmd.projectName)).should.equal(false);
    });
});

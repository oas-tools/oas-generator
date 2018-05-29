# oas-generator

NodeJS API scaffolding based on OpenAPI Specifications (v3) compatible with servers generated with swagger tool suite

## 1\. Install oas-generator

```bash
npm install oas-generator -g
```

## 2\. Use oas-generator command

### 2.1\. Help

```bash
$ oas-generator -help

Usage: index [options] <file>

  Options:

    -n, --proyectName <proyectName>  Name for the generated folder
    -z, --delete                     Indicate whether the generated folder must be deleted after compression
    -h, --help                       output usage information
```

### 2.2 Examples

Generate a NodeJS project: The following command wil create the code of a NodeJS application and place its code in a folder by the name 'generatedServer'.

```bash
oas-generator$ oas-generator specs/docker-engine.yaml -n generatedServer
```

Once the folder is created locate into it. Install dependencies and run it by doing npm start:

```bash
oas-generator$ cd generatedServer
oas-generator/generatedServer$ npm start
```

Your app is running on port 8080.
You can try the url [http://www.localhost:8080/v1.33/volumes](http://www.localhost:8080/v1.33/volumes)

## Latest release

The version 0.0.0 is the latest stable version of oas-generator component. see [release note](https://github.com/isa-group/oas-generator/releases/tag/0.0.0) for details.

For running:

- Download latest version from [0.0.0](https://github.com/isa-group/oas-generator/releases/tag/0.0.0)

  ## Copyright notice

**oas-generator** is open-source software available under the GNU General Public License (GPL) version 3 (GPL v3).

All including documentation and code are copyrighted and the copyright is owned by [ISA Group](http://www.isa.us.es), [University of Sevilla](http://www.us.es), unauthorized reproduction or distribution of this copyrighted work is illegal. For commercial licensing terms, please [contact](./extra/contact.md) for any inquiry.

For technical inquiry please contact to [engineering team](./extra/about.md).

## Latest release

[![Build Status](https://travis-ci.org/isa-group/oas-generator.svg?branch=master)](https://travis-ci.org/http://github.com/isa-group/oas-generator)

The version 0.0.0 is the latest stable version of oas-generator component. see [release note](http://github.com/isa-group/oas-generator/releases/tag/0.0.0) for details.

For running:

- Download latest version from [0.0.0](http://github.com/isa-group/oas-generator/releases/tag/0.0.0)

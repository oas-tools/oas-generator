# oas-generator

[![Build Status](https://travis-ci.org/isa-group/oas-generator.svg?branch=master)](https://travis-ci.org/isa-group/oas-generator)

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
$ oas-generator specs/docker-engine.yaml -n generatedServer
```

Once the folder is created locate into it. Install dependencies and run it by doing npm start:

```bash
$ cd generatedServer
$ npm start
```

Your app is running on port 8080.
You can try the url [http://localhost:8080/v1.33/volumes](http://localhost:8080/v1.33/volumes)


## License

Copyright 2018, [ISA Group](http://www.isa.us.es), [University of Sevilla](http://www.us.es)

[![ISA Group](http://www.isa.us.es/2.0/assets/img/theme/logo2.png)](http://www.isa.us.es)

Licensed under the **Apache License, Version 2.0** (the "[License](./LICENSE)"); you may not use this file except in compliance with the License. You may obtain a copy of the License at apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

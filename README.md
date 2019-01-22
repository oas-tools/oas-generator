# oas-generator

[![Build Status](https://travis-ci.org/isa-group/oas-generator.svg?branch=master)](https://travis-ci.org/isa-group/oas-generator)
[![dependencies Status](https://david-dm.org/isa-group/oas-generator/status.svg)](https://david-dm.org/isa-group/oas-generator)
[![codecov](https://codecov.io/gh/isa-group/oas-generator/branch/master/graph/badge.svg)](https://codecov.io/gh/isa-group/oas-generator)
[![Known Vulnerabilities](https://snyk.io/test/npm/oas-generator/badge.svg)](https://snyk.io/test/npm/oas-generator)
[![Greenkeeper badge](https://badges.greenkeeper.io/isa-group/oas-generator.svg)](https://greenkeeper.io/)

[![NPM](https://nodei.co/npm/oas-generator.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/oas-generator/)

This module provides NodeJS RESTfull APIs scaffolding based OpenAPI 3.x specs using [oas-tools](https://github.com/isa-group/oas-tools) and [express](https://github.com/expressjs/express). It is compatible with servers generated with the swagger-tool suite to help in the transition from pre-existing servers based on 2.x specs.

We have a 2 min. tutorial:

<a href="https://youtu.be/OZhtoXP2Gi4" alt="oas-generator introduction (v2.0.6) - Click to Watch!"><img src="https://i.imgur.com/fcqaWCq.jpg" align="center" width="300" alt="oas-generator introduction (v2.0.6) - Click to Watch!"></a>


## 1\. Install oas-generator

```bash
npm install oas-generator -g
```

## 2\. Use oas-generator command

### 2.1\. Help

```bash
$ oas-generator --help

Usage:  oas-generator <OAS v3 file in YAML or JSON>

  Options:

    -n, --projectName <projectName>  Name for the generated folder
    -z, --generateZip                Indicate whether the generated folder must be deleted after compression
    -h, --help                       output usage information
```

### 2.2 Examples

Generate a NodeJS project: The following command wil create the code of a NodeJS application based on the OpenAPI Spec 3.x `docker-engine.yaml` and place its code in a folder by the name `generatedServer`.

```bash
$ oas-generator specs/docker-engine.yaml -n generatedServer
```

Once the folder is created locate into it. Install dependencies and run it by doing npm start:

```bash
$ cd generatedServer
$ npm start
```

Now your app is running on port 8080.
You can try the url [http://localhost:8080/v1.33/volumes](http://localhost:8080/v1.33/volumes)

In the folder `controllers` there will be a set of js files with the templates for each method specified in the spec that should be completed to have a fully working API.

Happy coding! 


## License

Copyright 2018, [ISA Group](http://www.isa.us.es), [University of Sevilla](http://www.us.es)

For technical inquiry please contact to [engineering team](./extra/team.md).

[![ISA Group](http://www.isa.us.es/2.0/assets/img/theme/logo2.png)](http://www.isa.us.es)

Licensed under the **Apache License, Version 2.0** (the "[License](./LICENSE)"); you may not use this file except in compliance with the License. You may obtain a copy of the License at apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

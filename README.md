# DEPRECATED - last-release-apm
----
----
----

**DEPRECATION NOTICE: This project has been deprecated. See [@semantic-release/apm-config](https://github.com/semantic-release/apm-config).**

----
----
----

**fully automated package publishing** with [semantic-release](https://github.com/semantic-release/semantic-release) for [Atom](https://atom.io/) packages.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

[![Dependency Status][david-image]][david-url]
[![devDependency Status][david-dev-image]][david-dev-url]

[![semantic-release][semantic-image]][semantic-url]
[![ESLint][standard-image]][standard-url]
[![Commitizen friendly][commitizen-image]][commitizen-url]

## Install and configure

```bash
$ npm install --save-dev last-release-apm
```

Add the following to the `package.json`

```json
"release": {
  "getLastRelease": "last-release-apm"
}
```

This tells [semantic-release plugins](https://github.com/semantic-release/semantic-release#plugins)
to use this package to fetch the latest version from [Atom registry](https://atom.io/packages).

## MIT License

Copyright (c) 2016 Arnaud Dezandee

[npm-image]: https://img.shields.io/npm/v/last-release-apm.svg?style=flat
[npm-url]: https://www.npmjs.com/package/last-release-apm
[travis-image]: https://img.shields.io/travis/Adezandee/last-release-apm.svg?style=flat
[travis-url]: https://travis-ci.org/Adezandee/last-release-apm
[coveralls-image]: https://img.shields.io/coveralls/Adezandee/last-release-apm.svg?style=flat
[coveralls-url]: https://coveralls.io/r/Adezandee/last-release-apm?branch=master

[david-image]: https://img.shields.io/david/Adezandee/last-release-apm.svg?style=flat
[david-dev-image]: https://img.shields.io/david/dev/Adezandee/last-release-apm.svg?style=flat
[david-url]: https://david-dm.org/Adezandee/last-release-apm
[david-dev-url]: https://david-dm.org/Adezandee/last-release-apm#info=devDependencies

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg?style=flat
[standard-url]: https://github.com/airbnb/javascript
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat
[commitizen-url]: http://commitizen.github.io/cz-cli/

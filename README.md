# knx-datapoints

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads per month][npm-downloads-month-image]][npm-url]
[![NPM downloads total][npm-downloads-total-image]][npm-url]
[![MIT License][license-image]][license-url]
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A library to encode and decode knx datapoint types as described in the KNX Specifications v2.1

So far not all but the most common datapoint types are supported.  
The supported datapoint types are documented in the [dpt overview table](docs/DPTS.md).

[Changelog](CHANGELOG.md)

## Usage

```bash
npm install --save knx-datapoints
```

```javascript
const knxDatapoints = require('knx-datapoint');

// Encode a value
knxDatapoints.encode('1.001', true); // Buffer<01>

// Decode a buffer
knxDatapoints.decode('1.001', Buffer.from('01', 'hex')); // true

// Check if a dpt is valid
knxDatapoints.isValid('1.001') // true
knxDatapoints.isValid('255.000') // false

// Check if a dpt is supported
knxDatapoints.isSupported('1.001') // true
knxDatapoints.isSupported('241.800') // false
```

You can read further information in the [usage documentation](docs/USAGE.md)

## Contribute

- Always write tests and make sure all tests run fine
- Always lint
- Try to cover all of your code in tests

```bash
npm install

# testing
npm test

# linting
npm run lint

# check coverage
npm run coverage
```

## License

knx-datapoints is freely distributable under the terms of the [MIT license][license-url].

[npm-url]: https://npmjs.org/package/knx-datapoints
[npm-version-image]: https://img.shields.io/npm/v/knx-datapoints.svg
[npm-downloads-month-image]: https://img.shields.io/npm/dm/knx-datapoints.svg
[npm-downloads-total-image]: https://img.shields.io/npm/dt/knx-datapoints.svg

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/Rafelder/knx-datapoints/blob/master/LICENSE

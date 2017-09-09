const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt5
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @param {Object} [options]
 * @param {number} [options.decimals=2]
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 1
 */
function decode (dpt, encoded, options) {
  checkBuffer(encoded, 1)

  let decimals = 2

  if (options !== null && typeof options === 'object') {
    if (Object.prototype.hasOwnProperty.call(options, 'decimals')) {
      decimals = Number(options.decimals)
    }
  }

  const byte1 = encoded.readUInt8(0)

  switch (dpt) {
    case '5.001':
      return parseFloat((byte1 / 2.55).toFixed(decimals))

    case '5.003':
      return parseFloat(((byte1 / 255) * 360).toFixed(decimals))

    case '5.004':
    case '5.006':
    case '5.010':
      return byte1
  }
}

/**
 * encodes dpt5
 *
 * @param {string} dpt
 * @param {number} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */
function encode (dpt, decoded) {
  let value = Number(decoded)

  switch (dpt) {
    case '5.001':
      if (value > 100 || value < 0) {
        throw new RangeError(`Value out of range (expected 0-100, got ${value})`)
      }
      value = Math.round(value * 2.55)
      return Buffer.alloc(1, value)

    case '5.003':
      if (value > 360 || value < 0) {
        throw new RangeError(`Value out of range (expected 0-360, got ${value})`)
      }
      value = Math.round((value / 360) * 255)
      return Buffer.alloc(1, value)

    case '5.004':
    case '5.006':
    case '5.010':
      if (value > 255 || value < 0) {
        throw new RangeError(`Value out of range (expected 0-255, got ${value})`)
      }
      return Buffer.alloc(1, value)
  }
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 8
  },
  1: {
    name: 'DPT_Scaling',
    encode,
    decode,
    use: Usage.GENERAL
  },
  3: {
    name: 'DPT_Angle',
    encode,
    decode,
    use: Usage.GENERAL
  },
  4: {
    name: 'DPT_Percent_U8',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  5: {
    name: 'DPT_DecimalFactor',
    encode,
    decode,
    use: Usage.GENERAL
  },
  6: {
    name: 'DPT_Tariff',
    encode,
    decode,
    use: Usage.GENERAL
  },
  10: {
    name: 'DPT_Value_1_Ucount',
    encode,
    decode,
    use: Usage.GENERAL
  }
}

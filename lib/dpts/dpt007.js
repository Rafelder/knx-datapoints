const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt7
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 2
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 2)

  const value = encoded.readUInt16BE(0)

  switch (dpt) {
    case '7.001':
    case '7.002':
    case '7.005':
    case '7.006':
    case '7.007':
    case '7.011':
    case '7.012':
    case '7.013':
      return value

    case '7.003':
      return value / 100

    case '7.004':
      return value / 10
  }
}

/**
 * encodes dpt7
 *
 * @param {string} dpt
 * @param {number} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 * @throws {RangeError} Will throw an error if <dpt> is invalid
 */
function encode (dpt, decoded) {
  let value = Number(decoded)
  const buffer = Buffer.alloc(2, 0)

  switch (dpt) {
    case '7.001':
    case '7.002':
    case '7.005':
    case '7.006':
    case '7.007':
    case '7.011':
    case '7.012':
    case '7.013':
      if (value < 0 || value > 65535) {
        throw new RangeError(`Value out of range (expected 0-65535, got ${value})`)
      }
      buffer.writeUInt8(value >> 8, 0)
      buffer.writeUInt8(value & 0xFF, 1)
      return buffer

    case '7.003':
      if (value < 0 || value > 655.35) {
        throw new RangeError(`Value out of range (expected 0-655.35, got${value})`)
      }
      value *= 100
      buffer.writeUInt8(value >> 8, 0)
      buffer.writeUInt8(value & 0xFF, 1)
      return buffer

    case '7.004':
      if (value < 0 || value > 6553.5) {
        throw new RangeError(`Value out of range (expected 0-6553.5, got ${value})`)
      }
      value *= 10
      buffer.writeUInt8(value >> 8, 0)
      buffer.writeUInt8(value & 0xFF, 1)
      return buffer
  }
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 16
  },
  1: {
    name: 'DPT_Value_2_Ucount',
    encode,
    decode,
    use: Usage.GENERAL
  },
  2: {
    name: 'DPT_TimePeriodMsec',
    encode,
    decode,
    use: Usage.GENERAL
  },
  3: {
    name: 'DPT_TimePeriod10Msec',
    encode,
    decode,
    use: Usage.GENERAL
  },
  4: {
    name: 'DPT_TimePeriod100Msec',
    encode,
    decode,
    use: Usage.GENERAL
  },
  5: {
    name: 'DPT_TimePeriodSec',
    encode,
    decode,
    use: Usage.GENERAL
  },
  6: {
    name: 'DPT_TimePeriodMin',
    encode,
    decode,
    use: Usage.GENERAL
  },
  7: {
    name: 'DPT_TimePeriodHrs',
    encode,
    decode,
    use: Usage.GENERAL
  },
  10: {
    name: 'DPT_PropDataType',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  11: {
    name: 'DPT_Length_mm',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  12: {
    name: 'DPT_UElCurrentmA',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  13: {
    name: 'DPT_Brightness',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  }
}

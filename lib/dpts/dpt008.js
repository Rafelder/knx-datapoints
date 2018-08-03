const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt8
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

  const value = encoded.readInt16BE(0)

  switch (dpt) {
    case '8.001':
    case '8.002':
    case '8.005':
    case '8.006':
    case '8.007':
    case '8.011':
      return value

    case '8.003':
    case '8.010':
      return value * 10

    case '8.004':
      return value * 100
  }
}

/**
 * encodes dpt8
 *
 * @param {string} dpt
 * @param {number} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */
function encode (dpt, decoded) {
  let value = Number(decoded)
  const buffer = Buffer.alloc(2, 0)

  switch (dpt) {
    case '8.001':
    case '8.002':
    case '8.005':
    case '8.006':
    case '8.007':
    case '8.011':
      if (value < -32768 || value > 32767) {
        throw new RangeError(`Value out of range (expected -32768-32767, got ${value})`)
      }
      buffer.writeInt16BE(value)
      return buffer

    case '8.003':
    case '8.010':
      if (value < -327.68 || value > 327.67) {
        throw new RangeError(`Value out of range (expected -327.68-327.67, got ${value})`)
      }
      value = Math.round(value) / 10
      buffer.writeInt16BE(value)
      return buffer

    case '8.004':
      if (value < -3276.8 || value > 3276.7) {
        throw new RangeError(`Value out of range (expected -3276.8-3276.7, got ${value})`)
      }
      value = Math.round(value) / 100
      buffer.writeInt16BE(value)
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
    name: 'DPT_Value_2_Count',
    encode,
    decode,
    use: Usage.GENERAL
  },
  2: {
    name: 'DPT_DeltaTimeMsec',
    encode,
    decode,
    use: Usage.GENERAL
  },
  3: {
    name: 'DPT_DeltaTime10Msec',
    encode,
    decode,
    use: Usage.GENERAL
  },
  4: {
    name: 'DPT_DeltaTime100Msec',
    encode,
    decode,
    use: Usage.GENERAL
  },
  5: {
    name: 'DPT_DeltaTimeSec',
    encode,
    decode,
    use: Usage.GENERAL
  },
  6: {
    name: 'DPT_DeltaTimeMin',
    encode,
    decode,
    use: Usage.GENERAL
  },
  7: {
    name: 'DPT_DeltaTimeHrs',
    encode,
    decode,
    use: Usage.GENERAL
  },
  10: {
    name: 'DPT_Percent_V16',
    encode,
    decode,
    use: Usage.GENERAL
  },
  11: {
    name: 'DPT_Rotation_Angle',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  }
}

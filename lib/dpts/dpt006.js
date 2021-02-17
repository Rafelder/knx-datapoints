const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt6
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 1
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 1)

  return encoded.readInt8(0)
}

/**
 * encodes dpt6
 *
 * @param {string} dpt
 * @param {number} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */
function encode (dpt, decoded) {
  const value = Number(decoded)

  if (value < -128 || value > 127) {
    throw new RangeError(`Value out of range (expected -128-127, got ${value})`)
  }

  const buffer = Buffer.alloc(1, 0)
  buffer.writeInt8(value, 0)
  return buffer
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 8
  },
  1: {
    name: 'DPT_Percent_V8',
    encode,
    decode,
    use: Usage.GENERAL
  },
  10: {
    name: 'DPT_Value_1_Count',
    encode,
    decode,
    use: Usage.GENERAL
  },
  20: {
    name: 'DPT_Status_Mode3',
    use: Usage.FUNCTIONAL
  }
}

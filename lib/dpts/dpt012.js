const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt12
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 4
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 4)

  return encoded.readUInt32BE(0)
}

/**
 * encodes dpt12
 *
 * @param {string} dpt
 * @param {number} [decoded]
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */
function encode (dpt, decoded) {
  const value = Number(decoded)

  if (value < 0 || value > 4294967295) {
    throw new RangeError(`Value out of range (expected 0-4294967295, got ${value})`)
  }

  const buffer = Buffer.alloc(4, 0)
  buffer.writeUInt32BE(value, 0)
  return buffer
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 32
  },
  1: {
    name: 'DPT_Value_4_Ucount',
    encode,
    decode,
    use: Usage.GENERAL
  }
}

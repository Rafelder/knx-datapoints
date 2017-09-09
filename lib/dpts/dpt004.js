const { checkBuffer, normalizeDpt } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt4
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {string}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 1
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 1)

  const byte1 = encoded.readUInt8(0)

  switch (normalizeDpt(dpt)) {
    case '4.001':
      return String.fromCharCode(byte1 & 0x7F)

    case '4.002':
      return String.fromCharCode(byte1 & 0xFF)
  }
}

/**
 * encodes dpt4
 *
 * @param {string} dpt
 * @param {string} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if the charcode of the first character of <decoded> is out of range
 */
function encode (dpt, decoded) {
  const chars = String(decoded)
  const charCode = chars.charCodeAt(0) || 0

  switch (normalizeDpt(dpt)) {
    case '4.001':
      if (charCode > 127) {
        throw new RangeError(`Charcode out of range (expected 0-127, got ${charCode})`)
      }
      return Buffer.alloc(1, charCode & 0x7F)

    case '4.002':
      if (charCode > 255) {
        throw new RangeError(`Charcode out of range (expected 0-255 got ${charCode})`)
      }
      return Buffer.alloc(1, charCode)
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
    name: 'DPT_Char_ASCII',
    encode,
    decode,
    use: Usage.GENERAL
  },
  2: {
    name: 'DPT_Char_8859_1',
    encode,
    decode,
    use: Usage.GENERAL
  }
}

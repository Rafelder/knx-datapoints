const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt16
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {string}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not in range from 0 to 14
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 0, 14)

  let str = ''

  for (let i = 0; i < encoded.byteLength; i++) {
    const charCode = encoded.readUInt8(i)

    switch (dpt) {
      case '16.000':
        str += String.fromCharCode(charCode & 0x7F)
        break

      case '16.001':
        str += String.fromCharCode(charCode)
        break
    }
  }

  // Remove trailing NULL characters
  // eslint-disable-next-line no-control-regex
  str = str.replace(/\u0000+$/, '')
  return str
}

/**
 * encodes dpt16
 *
 * @param {string} dpt
 * @param {string} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if any charcode of the first 14 characters of <decoded> is out of range
 */
function encode (dpt, decoded) {
  const chars = String(decoded)
  const buffer = Buffer.alloc(14, 0)

  for (let i = 0, j = Math.min(chars.length, 14); i < j; i++) {
    const charCode = chars.charCodeAt(i)

    switch (dpt) {
      case '16.000':
        if (charCode > 127) {
          throw new RangeError(`Charcode out of range (expected 0-127, got ${charCode})`)
        }
        buffer.writeUInt8(charCode, i)
        break

      case '16.001':
        if (charCode > 255) {
          throw new RangeError(`Charcode out of range (expected 0-255, got ${charCode})`)
        }
        buffer.writeUInt8(charCode, i)
        break
    }
  }

  return buffer
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 112
  },
  0: {
    name: 'DPT_String_ASCII',
    encode,
    decode,
    use: Usage.GENERAL
  },
  1: {
    name: 'DPT_String_8859_1',
    encode,
    decode,
    use: Usage.GENERAL
  }
}

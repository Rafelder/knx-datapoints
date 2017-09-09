const { Usage } = require('../constants')

/**
 * decodes dpt24
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {string}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 */
function decode (dpt, encoded) {
  let str = ''

  for (let i = 0; i < encoded.byteLength; i++) {
    const charCode = encoded.readUInt8(i)

    // stop at NULL char
    if (charCode === 0) {
      break
    }

    str += String.fromCharCode(charCode)
  }

  return str
}

/**
 * encodes dpt24
 *
 * @param {string} dpt
 * @param {string} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if any charcode of the characters of <decoded> is out of range
 */
function encode (dpt, decoded) {
  const chars = String(decoded)
  const charCodes = []

  for (let i = 0; i < chars.length; i++) {
    const charCode = chars.charCodeAt(i)

    if (charCode > 255) {
      throw new RangeError(`Charcode out of range (expected 0-255, got ${charCode})`)
    }

    charCodes.push(charCode)
  }

  // append NULL char
  charCodes.push(0)

  return Buffer.from(charCodes)
}

/**
 * dpt definitions
 */
module.exports = {
  1: {
    name: 'DPT_VarString_8859_1',
    encode,
    decode,
    use: Usage.GENERAL
  }
}

const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt232
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {{ r: number, g: number, b: number }}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 3
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 3)

  const r = encoded.readUInt8(0)
  const g = encoded.readUInt8(1)
  const b = encoded.readUInt8(2)
  return { r, g, b }
}

/**
 * encodes dpt232
 *
 * @param {string} dpt
 * @param {Object} [decoded]
 * @param {number} [decoded.r=0]
 * @param {number} [decoded.g=0]
 * @param {number} [decoded.b=0]
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded.r> is out of range
 * @throws {RangeError} Will throw an error if <decoded.g> is out of range
 * @throws {RangeError} Will throw an error if <decoded.b> is out of range
 */
function encode (dpt, decoded) {
  let r = 0
  let g = 0
  let b = 0

  if (decoded !== null && typeof decoded === 'object') {
    r = Number(decoded.r)
    g = Number(decoded.g)
    b = Number(decoded.b)

    if (r < 0 || r > 255) {
      throw new RangeError(`Color red is out of range (expected 0-255, got ${r})`)
    }

    if (g < 0 || g > 255) {
      throw new RangeError(`Color green is out of range (expected 0-255, got ${g})`)
    }

    if (b < 0 || b > 255) {
      throw new RangeError(`Color blue is out of range (expected 0-255, got ${b})`)
    }
  } else if (typeof decoded !== 'undefined') {
    throw new TypeError('Invalid type (expected object)')
  }

  return Buffer.from([r, g, b])
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 24
  },
  600: {
    name: 'DPT_Colour_RGB',
    encode,
    decode,
    use: Usage.GENERAL
  }
}

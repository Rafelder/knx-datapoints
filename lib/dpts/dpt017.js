const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt17
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

  const byte1 = encoded.readUInt8(0)
  const sceneNumber = byte1 & 0x3F
  return sceneNumber
}

/**
 * encodes dpt17
 *
 * @param {string} dpt
 * @param {number} [decoded]
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */
function encode (dpt, decoded) {
  const sceneNumber = Number(decoded)
  if (sceneNumber < 0 || sceneNumber > 63) {
    throw new RangeError(`Scenenumber out of range (expected 0-63, got ${sceneNumber})`)
  }
  return Buffer.alloc(1, sceneNumber & 0x3F)
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 8
  },
  1: {
    name: 'DPT_SceneNumber',
    encode,
    decode,
    use: Usage.GENERAL
  }
}

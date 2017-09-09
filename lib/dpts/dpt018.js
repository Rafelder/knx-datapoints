const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt18
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {{ control: boolean, sceneNumber: number }}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 1
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 1)

  const byte1 = encoded.readUInt8(0)
  const control = !!(byte1 & 0x80)
  const sceneNumber = byte1 & 0x3F
  return { control, sceneNumber }
}

/**
 * encodes dpt18
 *
 * @param {string} dpt
 * @param {Object} [decoded]
 * @param {boolean} [decoded.control=false]
 * @param {number} [decoded.sceneNumber=0]
 * @return {Buffer}
 *
 * @throws {TypeError} Will throw an error if <decoded> is not an object
 * @throws {RangeError} Will throw an error if <decoded.sceneNumber> is out of range
 */
function encode (dpt, decoded) {
  let control = false
  let sceneNumber = 0

  if (decoded !== null && typeof decoded === 'object') {
    control = !!decoded.control

    sceneNumber = Number(decoded.sceneNumber)
    if (sceneNumber < 0 || sceneNumber > 63) {
      throw new RangeError(`Scenenumber out of range (expected 0-63, got ${sceneNumber})`)
    }
  } else if (typeof decoded !== 'undefined') {
    throw new TypeError('Invalid type (expected object)')
  }

  const controlEncoded = control ? 0x80 : 0x0
  const sceneNumberEncoded = sceneNumber & 0x3F
  return Buffer.alloc(1, controlEncoded | sceneNumberEncoded)
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 8
  },
  1: {
    name: 'DPT_SceneControl',
    encode,
    decode,
    use: Usage.GENERAL
  }
}

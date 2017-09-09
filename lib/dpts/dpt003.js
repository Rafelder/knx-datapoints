const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt3
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {{ direction: boolean, intervals: number }}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 1
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 1)

  const byte1 = encoded.readUInt8(0)
  const direction = !!(byte1 & 0x8)
  let intervals = byte1 & 0x7
  if (intervals) {
    intervals = Math.pow(2, (intervals - 1))
  }
  return { direction, intervals }
}

/**
 * encodes dpt3
 *
 * @param {string} dpt
 * @param {Object} [decoded]
 * @param {boolean} [decoded.direction=false]
 * @param {number} [decoded.intervals=0]
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if the <decoded.intervals> is invalid
 */
function encode (dpt, decoded) {
  let direction = false
  let intervals = 0

  if (decoded !== null && typeof decoded === 'object') {
    if (Object.prototype.hasOwnProperty.call(decoded, 'direction')) {
      direction = !!decoded.direction
    }

    if (Object.prototype.hasOwnProperty.call(decoded, 'intervals')) {
      intervals = Number(decoded.intervals)
      if ([0, 1, 2, 4, 8, 16, 32, 64].indexOf(intervals) === -1) {
        throw new RangeError(`Invalid intervals (expected 0, 1, 2, 4, 8, 16, 32, 64, got ${decoded.intervals})`)
      }
    }
  }

  const directionEncoded = direction ? 0x8 : 0x0
  const intervalsEncoded = intervals !== 0 ? (Math.log(intervals) / Math.log(2)) + 1 : 0x0
  return Buffer.alloc(1, directionEncoded | intervalsEncoded)
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 4
  },
  7: {
    name: 'DPT_Control_Dimming',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  8: {
    name: 'DPT_Control_Blinds',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  }
}

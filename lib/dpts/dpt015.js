const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt15
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {{ digits: number[], error: boolean, permission: boolean, readDirection: boolean, encryption: boolean, index: number }}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 4
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 4)

  const byte4 = encoded.readUInt8(0)
  const byte3 = encoded.readUInt8(1)
  const byte2 = encoded.readUInt8(2)
  const byte1 = encoded.readUInt8(3)

  const digits = [
    byte4 >> 4,
    byte4 & 0xF,
    byte3 >> 4,
    byte3 & 0xF,
    byte2 >> 4,
    byte2 & 0xF
  ]

  const error = !!(byte4 & 0x80)
  const permission = !!(byte1 & 0x40)
  const readDirection = !!(byte1 & 0x20)
  const encryption = !!(byte1 & 0x10)
  const index = byte1 & 0xF

  return {
    digits,
    error,
    permission,
    readDirection,
    encryption,
    index
  }
}

/**
 * encodes dpt15
 *
 * @param {string} dpt
 * @param {Object} [decoded]
 * @param {number[]} [decoded.digits]
 * @param {boolean} [decoded.error=false]
 * @param {boolean} [decoded.permission=false]
 * @param {boolean} [decoded.readDirection=false]
 * @param {boolean} [decoded.encryption=false]
 * @param {number} [decoded.index=0]
 * @return {Buffer}
 *
 * @throws {TypeError} Will throw an error if <decoded> is not an object
 * @throws {RangeError} Will throw an error if the length of <decoded.digits> is out of range
 * @throws {RangeError} Will throw an error if the any digit of <decoded.digits> is out of range
 * @throws {RangeError} Will throw an error if <decoded.diindexgits> is out of range
 */
function encode (dpt, decoded) {
  let digits = []
  let error = false
  let permission = false
  let readDirection = false
  let encryption = false
  let index = 0

  if (decoded !== null && typeof decoded === 'object') {
    if (Array.isArray(decoded.digits)) {
      if (decoded.digits.length > 6) {
        throw new RangeError(`Value out of range (expected 0-6, got ${decoded.digits.length})`)
      }

      decoded.digits.forEach((digit) => {
        if (digit < 0 || digit > 9) {
          throw new RangeError(`Value out of range (expected 0-9, got ${digit})`)
        }
      })

      digits = decoded.digits
    } else if (typeof decoded.digits !== 'undefined') {
      throw new TypeError('Invalid type (expected array)')
    }

    error = !!decoded.error
    permission = !!decoded.permission
    readDirection = !!decoded.readDirection
    encryption = !!decoded.encryption

    index = Number(decoded.index)
    if (index < 0 || index > 15) {
      throw new RangeError(`Value out of range (expected 0-15, got ${index})`)
    }
  } else if (typeof decoded !== 'undefined') {
    throw new TypeError('Invalid type (expected object)')
  }

  const buffer = Buffer.alloc(4, 0)
  let lsb = 0x0
  lsb |= index
  lsb |= (encryption ? 0x10 : 0x0)
  lsb |= (readDirection ? 0x20 : 0x0)
  lsb |= (permission ? 0x40 : 0x0)
  lsb |= (error ? 0x80 : 0x0)
  buffer.writeUInt8(lsb, 3)

  const digitsReversed = digits.reverse()
  for (let i = 0, offset = 2; i < digitsReversed.length; i += 2, offset--) {
    const byte = (digitsReversed[i + 1] << 4) | digitsReversed[i]
    buffer.writeInt8(byte, offset)
  }

  return buffer
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 32
  },
  0: {
    name: 'DPT_Access_Data',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  }
}

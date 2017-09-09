const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt10
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {{ date: Date, dayOfWeek: number }}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 3
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 3)

  const byte3 = encoded.readUInt8(0)
  const byte2 = encoded.readUInt8(1)
  const byte1 = encoded.readUInt8(2)

  let dayOfWeek = (byte3 & 0xE0) >> 5

  // Convert day of week from knx to JavaScript (7 => 0, 0 => null)
  if (dayOfWeek === 7) {
    dayOfWeek = 0
  } else if (dayOfWeek === 0) {
    dayOfWeek = null
  }

  const date = new Date()
  date.setHours(byte3 & 0x1F)
  date.setMinutes(byte2 & 0x3F)
  date.setSeconds(byte1 & 0x3F)

  return { date, dayOfWeek }
}

/**
 * encodes dpt10
 *
 * @param {string} dpt
 * @param {Object} [decoded]
 * @param {Date} [decoded.date]
 * @param {number} [decoded.dayOfWeek]
 * @return {Buffer}
 *
 * @throws {TypeError} Will throw an error if <decoded> is not an object
 * @throws {TypeError} Will throw an error if <decoded.date> is not a Date
 * @throws {RangeError} Will throw an error if <decoded.dayOfWeek> is out of range
 */
function encode (dpt, decoded) {
  let date = new Date()
  let dayOfWeek = date.getDay()

  if (decoded !== null && typeof decoded === 'object') {
    if (decoded.dayOfWeek === null) {
      dayOfWeek = null
    }

    if (decoded.date instanceof Date) {
      date = decoded.date
    } else if (typeof decoded.date !== 'undefined') {
      throw new TypeError('Invalid type (expected Date)')
    }

    if (typeof decoded.dayOfWeek === 'number') {
      if (decoded.dayOfWeek < 0 || decoded.dayOfWeek > 6) {
        throw new RangeError(`Value out of range (expected 0-6, got ${decoded.dayOfWeek})`)
      }
      dayOfWeek = decoded.dayOfWeek
    }
  } else if (typeof decoded !== 'undefined') {
    throw new TypeError('Invalid type (expected object)')
  }

  // Convert day of week from JavaScript to knx (0 => 7, null => 0)
  if (dayOfWeek === 0) {
    dayOfWeek = 7
  } else if (dayOfWeek === null) {
    dayOfWeek = 0
  }

  const buffer = Buffer.alloc(3, 0)
  buffer.writeUInt8((dayOfWeek << 5) | date.getHours(), 0)
  buffer.writeUInt8(date.getMinutes(), 1)
  buffer.writeUInt8(date.getSeconds(), 2)
  return buffer
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 24
  },
  1: {
    name: 'DPT_TimeOfDay',
    encode,
    decode,
    use: Usage.GENERAL
  }
}

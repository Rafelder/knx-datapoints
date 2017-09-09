const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt19
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {{ year: number, month: number, dayOfMonth: number, dayOfWeek: number, hourOfDay: number,
    minutes: number, seconds: number, f: boolean, wd: boolean, nwd: boolean, ny: boolean,
    nd: boolean, ndow: boolean, nt: boolean, suti: boolean, clq: boolean }}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 8
 * @throws {RangeError} Will throw an error if hours of day are 24 and minutes/seconds are not 0
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 8)

  const byte8 = encoded.readUInt8(0)
  const byte7 = encoded.readUInt8(1)
  const byte6 = encoded.readUInt8(2)
  const byte5 = encoded.readUInt8(3)
  const byte4 = encoded.readUInt8(4)
  const byte3 = encoded.readUInt8(5)
  const byte2 = encoded.readUInt8(6)
  const byte1 = encoded.readUInt8(7)

  let year = byte8
  let month = byte7 & 0xF
  const dayOfMonth = byte6 & 0x1F
  let dayOfWeek = byte5 >> 5
  const hourOfDay = byte5 & 0x1F
  const minutes = byte4 & 0x3F
  const seconds = byte3 & 0x3F
  const f = !!(byte2 & 0x80)
  const wd = !!(byte2 & 0x40)
  const nwd = !!(byte2 & 0x20)
  const ny = !!(byte2 & 0x10)
  const nd = !!(byte2 & 0x8)
  const ndow = !!(byte2 & 0x4)
  const nt = !!(byte2 & 0x2)
  const suti = !!(byte2 & 0x1)
  const clq = !!(byte1 & 0x80)

  year += 1900

  // Convert month from knx to JavaScript (12 => 11, 11 => 10, ...)
  month -= 1

  // Convert day of week from knx to JavaScript (7 => 0, 0 => undefined)
  if (dayOfWeek === 7) {
    dayOfWeek = 0
  } else if (dayOfWeek === 0) {
    dayOfWeek = undefined
  }

  // Check minutes and seconds if hours equals 24
  if (hourOfDay === 24 && (minutes !== 0 || seconds !== 0)) {
    throw new RangeError('Invalid time (hour of day is 24, but minutes or seconds are not 0)')
  }

  return {
    year,
    month,
    dayOfMonth,
    dayOfWeek,
    hourOfDay,
    minutes,
    seconds,
    f,
    wd,
    nwd,
    ny,
    nd,
    ndow,
    nt,
    suti,
    clq
  }
}

/**
 * encodes dpt19
 *
 * @param {string} dpt
 * @param {Object} [decoded]
 * @param {number} [decoded.year]
 * @param {number} [decoded.month]
 * @param {number} [decoded.dayOfMonth]
 * @param {number} [decoded.dayOfWeek]
 * @param {number} [decoded.hourOfDay]
 * @param {number} [decoded.minutes]
 * @param {number} [decoded.seconds]
 * @param {boolean} [decoded.f]
 * @param {boolean} [decoded.wd]
 * @param {boolean} [decoded.nwd]
 * @param {boolean} [decoded.ny]
 * @param {boolean} [decoded.nd]
 * @param {boolean} [decoded.ndow]
 * @param {boolean} [decoded.nt]
 * @param {boolean} [decoded.suti]
 * @param {boolean} [decoded.clq]
 * @return {Buffer}
 *
 * @throws {TypeError} Will throw an error if <decoded> is not an object
 * @throws {RangeError} Will throw an error if <decoded.year> is out of range
 * @throws {RangeError} Will throw an error if <decoded.month> is out of range
 * @throws {RangeError} Will throw an error if <decoded.dayOfMonth> is out of range
 * @throws {RangeError} Will throw an error if <decoded.dayOfWeek> is out of range
 * @throws {RangeError} Will throw an error if <decoded.hourOfDay> is out of range
 * @throws {RangeError} Will throw an error if <decoded.minutes> is out of range
 * @throws {RangeError} Will throw an error if <decoded.seconds> is out of range
 */
function encode (dpt, decoded) {
  const now = new Date()

  let year = now.getFullYear()
  let month = now.getMonth()
  let dayOfMonth = now.getDate()
  let dayOfWeek = now.getDay()
  let hourOfDay = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()
  let f = false
  let wd = false
  let nwd = false
  let ny = false
  let nd = false
  let ndow = false
  let nt = false
  let suti = false
  let clq = false

  if (decoded !== null && typeof decoded === 'object') {
    if (Object.prototype.hasOwnProperty.call(decoded, 'year')) {
      year = Number(decoded.year)
      if (year > 2155 || year < 1900) {
        throw new RangeError(`Year out of range (expected 1900-2155, got ${year})`)
      }
    }

    if (Object.prototype.hasOwnProperty.call(decoded, 'month')) {
      month = Number(decoded.month)
      if (month > 11 || month < 0) {
        throw new RangeError(`Month out of range (expected 0-11, got ${month})`)
      }
    }

    if (Object.prototype.hasOwnProperty.call(decoded, 'dayOfMonth')) {
      dayOfMonth = Number(decoded.dayOfMonth)
      if (dayOfMonth > 31 || dayOfMonth < 1) {
        throw new RangeError(`Day of month out of range (expected 1-31 or null, got ${dayOfMonth})`)
      }
    }

    if (Object.prototype.hasOwnProperty.call(decoded, 'dayOfWeek')) {
      if (typeof decoded.dayOfWeek === 'undefined') {
        dayOfWeek = undefined
      } else {
        dayOfWeek = Number(decoded.dayOfWeek)
        if (dayOfWeek > 6 || dayOfWeek < 0) {
          throw new RangeError(`Day of week out of range (expected 0-6, got ${dayOfWeek})`)
        }
      }
    }

    if (Object.prototype.hasOwnProperty.call(decoded, 'hourOfDay')) {
      hourOfDay = Number(decoded.hourOfDay)
      if (hourOfDay > 24 || hourOfDay < 0) {
        throw new RangeError(`Hour of day out of range (expected 0-24, got ${hourOfDay})`)
      }
    }

    if (Object.prototype.hasOwnProperty.call(decoded, 'minutes')) {
      minutes = Number(decoded.minutes)
      if (minutes > 59 || minutes < 0) {
        throw new RangeError(`Minutes out of range (expected 0-59, got ${minutes})`)
      }
    }

    if (Object.prototype.hasOwnProperty.call(decoded, 'seconds')) {
      seconds = Number(decoded.seconds)
      if (seconds > 59 || seconds < 0) {
        throw new RangeError(`Seconds out of range (expected 0-59, got ${seconds})`)
      }
    }

    f = !!decoded.f
    wd = !!decoded.wd
    nwd = !!decoded.nwd
    ny = !!decoded.ny
    nd = !!decoded.nd
    ndow = !!decoded.ndow
    nt = !!decoded.nt
    suti = !!decoded.suti
    clq = !!decoded.clq
  }

  // Check minutes and seconds if hours equals 24 (only if nt = false (valid time))
  if (nt === false && hourOfDay === 24 && (minutes !== 0 || seconds !== 0)) {
    throw new RangeError('Invalid time (hour of day is 24 and nt is false (valid time), but minutes or seconds are not 0)')
  }

  year -= 1900

  // Convert month from JavaScript to knx (0 => 1, 1 => 2, ...)
  month += 1

  // Convert day of week from JavaScript to knx (0 => 7, undefined => 0)
  if (typeof dayOfWeek === 'undefined') {
    dayOfWeek = 0
  } else if (dayOfWeek === 0) {
    dayOfWeek = 7
  }

  const buffer = Buffer.alloc(8, 0)
  buffer.writeUInt8(year, 0)
  buffer.writeUInt8(month, 1)
  buffer.writeUInt8(dayOfMonth, 2)
  buffer.writeUInt8((dayOfWeek << 5) | hourOfDay, 3)
  buffer.writeUInt8(minutes, 4)
  buffer.writeUInt8(seconds, 5)
  buffer.writeUInt8((f << 7) | (wd << 6) | (nwd << 5) | (ny << 4) | (nd << 3) | (ndow << 2) | (nt << 1) | suti, 6)
  buffer.writeUInt8(clq << 7, 7)
  return buffer
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 64
  },
  1: {
    name: 'DPT_DateTime',
    encode,
    decode,
    use: Usage.GENERAL
  }
}

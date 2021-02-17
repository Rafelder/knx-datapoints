const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt13
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 4
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 4)

  const value = encoded.readInt32BE()

  return value
}

/**
 * encodes dpt13
 *
 * @param {string} dpt
 * @param {number} [decoded]
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */
function encode (dpt, decoded) {
  const value = Number(decoded)

  if (value < -2147483648 || value > 2147483647) {
    throw new RangeError(`Value out of range (expected -2147483648-2147483647, got ${value})`)
  }

  const buffer = Buffer.alloc(4, 0)
  buffer.writeInt32BE(value, 0)
  return buffer
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 32
  },
  1: {
    name: 'DPT_Value_4_Count',
    encode,
    decode,
    use: Usage.GENERAL
  },
  2: {
    name: 'DPT_FlowRate_m3',
    encode,
    decode,
    use: Usage.GENERAL
  },
  10: {
    name: 'DPT_ActiveEnergy',
    encode,
    decode,
    use: Usage.GENERAL
  },
  11: {
    name: 'DPT_ApparantEnergy',
    encode,
    decode,
    use: Usage.GENERAL
  },
  12: {
    name: 'DPT_ReactiveEnergy',
    encode,
    decode,
    use: Usage.GENERAL
  },
  13: {
    name: 'DPT_ActiveEnergy_kWh',
    encode,
    decode,
    use: Usage.GENERAL
  },
  14: {
    name: 'DPT_ApparantEnergy_kVAh',
    encode,
    decode,
    use: Usage.GENERAL
  },
  15: {
    name: 'DPT_ReactiveEnergy_kVARh',
    encode,
    decode,
    use: Usage.GENERAL
  },
  100: {
    name: 'DPT_LongDeltaTimeSec',
    encode,
    decode,
    use: Usage.GENERAL
  }
}

const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt9
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @param {Object} [options]
 * @param {number} [options.decimals=2]
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 2
 */
function decode (dpt, encoded, options) {
  checkBuffer(encoded, 2)

  let decimals = 2

  if (options !== null && typeof options === 'object') {
    if (Object.prototype.hasOwnProperty.call(options, 'decimals')) {
      decimals = Number(options.decimals)
    }
  }

  const int = encoded.readUInt16BE(0)

  const sign = !!(int & 0x8000)
  const exp = (int & 0x7800) >> 11
  let mant = int & 0x7FF

  if (sign) {
    mant = -(~(mant - 1) & 0x07FF)
  }

  const value = (0.01 * mant) * Math.pow(2, exp)
  return parseFloat(value.toFixed(decimals))
}

/**
 * encodes dpt9
 *
 * @param {string} dpt
 * @param {number} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */
function encode (dpt, decoded) {
  let value = Number(decoded)

  switch (dpt) {
    case '9.001':
      if (value < -273 || value > 670760.96) {
        throw new RangeError(`Value out of range (expected -273-670760.96, got ${value})`)
      }
      break

    case '9.027':
      if (value < -459.6 || value > 670760.96) {
        throw new RangeError(`Value out of range (expected -459.6-670760.96, got${value})`)
      }
      break

    case '9.002':
    case '9.003':
    case '9.010':
    case '9.011':
    case '9.020':
    case '9.021':
    case '9.022':
    case '9.023':
    case '9.024':
    case '9.025':
    case '9.026':
      if (value < -671088.64 || value > 670760.96) {
        throw new RangeError(`Value out of range (expected -671088.64-670760.96, got${value})`)
      }
      break

    case '9.004':
    case '9.005':
    case '9.006':
    case '9.007':
    case '9.008':
    case '9.028':
      if (value < 0 || value > 670760.96) {
        throw new RangeError(`Value out of range (expected 0 - 670760.96, got${value})`)
      }
      break
  }

  let sign = 0x0
  const exp = Math.floor(Math.max((Math.log(Math.abs(value) * 100) / Math.log(2)) - 10, 0))
  let mant = (value * 100) / (1 << exp)

  if (value < 0) {
    sign = 0x1
    mant = (~(mant * -1) + 1) & 0x07FF
  }

  value = Math.round((sign << 15) | (exp << 11) | mant) & 0xFFFF

  const buffer = Buffer.alloc(2, 0)
  buffer.writeUInt8(value >> 8, 0)
  buffer.writeUInt8(value & 0xFF, 1)
  return buffer
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 16
  },
  1: {
    name: 'DPT_Value_Temp',
    encode,
    decode,
    use: Usage.GENERAL
  },
  2: {
    name: 'DPT_Value_Tempd',
    encode,
    decode,
    use: Usage.GENERAL
  },
  3: {
    name: 'DPT_Value_Tempa',
    encode,
    decode,
    use: Usage.GENERAL
  },
  4: {
    name: 'DPT_Value_Lux',
    encode,
    decode,
    use: Usage.GENERAL
  },
  5: {
    name: 'DPT_Value_Wsp',
    encode,
    decode,
    use: Usage.GENERAL
  },
  6: {
    name: 'DPT_Value_Pres',
    encode,
    decode,
    use: Usage.GENERAL
  },
  7: {
    name: 'DPT_Value_Humidity',
    encode,
    decode,
    use: Usage.GENERAL
  },
  8: {
    name: 'DPT_Value_AirQuality',
    encode,
    decode,
    use: Usage.GENERAL
  },
  10: {
    name: 'DPT_Value_Time1',
    encode,
    decode,
    use: Usage.GENERAL
  },
  11: {
    name: 'DPT_Value_Time2',
    encode,
    decode,
    use: Usage.GENERAL
  },
  20: {
    name: 'DPT_Value_Volt',
    encode,
    decode,
    use: Usage.GENERAL
  },
  21: {
    name: 'DPT_Value_Curr',
    encode,
    decode,
    use: Usage.GENERAL
  },
  22: {
    name: 'DPT_PowerDensity',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  23: {
    name: 'DPT_KelvinPerPercent',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  24: {
    name: 'DPT_Power',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  25: {
    name: 'DPT_Value_Volume_Flow',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  26: {
    name: 'DPT_Rain_Amount',
    encode,
    decode,
    use: Usage.GENERAL
  },
  27: {
    name: 'DPT_Value_Temp_F',
    encode,
    decode,
    use: Usage.GENERAL
  },
  28: {
    name: 'DPT_Value_Wsp_kmh',
    encode,
    decode,
    use: Usage.GENERAL
  }
}

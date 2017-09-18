const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt20
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
  return byte1
}

/**
 * encodes dpt20
 *
 * @param {string} dpt
 * @param {number} [decoded]
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */
function encode (dpt, decoded) {
  const value = Number(decoded)

  switch (dpt) {
    case '20.001':
    case '20.002':
    case '20.004':
    case '20.007':
    case '20.100':
    case '20.101':
      if (value < 0 || value > 3) {
        throw new RangeError(`Value out of range (expected 0-3, got ${value})`)
      }
      break
    case '20.003':
    case '20.005':
    case '20.008':
    case '20.104':
    case '20.107':
    case '20.111':
    case '20.112':
    case '20.113':
    case '20.122':
      if (value < 0 || value > 2) {
        throw new RangeError(`Value out of range (expected 0-2, got ${value})`)
      }
      break
    case '20.006':
      if ([0, 1, 10, 11, 12, 13, 14].indexOf(value) === -1) {
        throw new RangeError(`Value out of range (expected 0, 1, 10, 11, 12, 13 or 14, got ${value})`)
      }
      break
    case '20.012':
    case '20.017':
    case '20.102':
    case '20.103':
      if (value < 0 || value > 4) {
        throw new RangeError(`Value out of range (expected 0-4, got ${value})`)
      }
      break
    case '20.011':
      if (value < 0 || value > 18) {
        throw new RangeError(`Value out of range (expected 0-18, got ${value})`)
      }
      break
    case '20.013':
      if (value < 0 || value > 25) {
        throw new RangeError(`Value out of range (expected 0-25, got ${value})`)
      }
      break
    case '20.014':
      if (value < 0 || value > 12) {
        throw new RangeError(`Value out of range (expected 0-12, got ${value})`)
      }
      break
    case '20.020':
    case '20.120':
      if (value < 1 || value > 2) {
        throw new RangeError(`Value out of range (expected 1-2, got ${value})`)
      }
      break
    case '20.105':
      if (value < 0 || (value > 17 && value !== 20)) {
        throw new RangeError(`Value out of range (expected 0-17 or 20, got ${value})`)
      }
      break
    case '20.106':
      if (value < 0 || value > 5) {
        throw new RangeError(`Value out of range (expected 0-5, got ${value})`)
      }
      break
    case '20.108':
      if (value < 1 || value > 5) {
        throw new RangeError(`Value out of range (expected 1-5, got ${value})`)
      }
      break
    case '20.109':
      if (value < 1 || value > 4) {
        throw new RangeError(`Value out of range (expected 1-4, got ${value})`)
      }
      break
    case '20.110':
      if (value < 1 || value > 3) {
        throw new RangeError(`Value out of range (expected 1-3, got ${value})`)
      }
      break
    case '20.121':
      if (value < 0 || value > 1) {
        throw new RangeError(`Value out of range (expected 0-1, got ${value})`)
      }
      break
  }

  const buffer = Buffer.alloc(1, value)
  return buffer
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 8
  },
  1: {
    name: 'DPT_SCLOMode',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  2: {
    name: 'DPT_BuildingMode',
    encode,
    decode,
    use: Usage.GENERAL
  },
  3: {
    name: 'DPT_OccMode',
    encode,
    decode,
    use: Usage.GENERAL
  },
  4: {
    name: 'DPT_Priority',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  5: {
    name: 'DPT_LightApplicationMode',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  6: {
    name: 'DPT_ApplicationArea',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  7: {
    name: 'DPT_AlarmClassType',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  8: {
    name: 'DPT_PSUMode',
    encode,
    decode,
    use: Usage.SYSTEM
  },
  11: {
    name: 'DPT_ErrorClass_System',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  12: {
    name: 'DPT_ErrorClass_HVAC',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  13: {
    name: 'DPT_Time_Delay',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  14: {
    name: 'DPT_Beaufort_Wind_Force_Scale',
    encode,
    decode,
    use: Usage.GENERAL
  },
  17: {
    name: 'DPT_SensorSelect',
    encode,
    decode,
    use: Usage.GENERAL
  },
  20: {
    name: 'DPT_ActuatorConnectType',
    encode,
    decode,
    use: Usage.GENERAL
  },
  100: {
    name: 'DPT_FuelType',
    encode,
    decode,
    use: Usage.HWH
  },
  101: {
    name: 'DPT_BurnerType',
    encode,
    decode,
    use: Usage.HWH
  },
  102: {
    name: 'DPT_HVACMode',
    encode,
    decode,
    use: Usage.HVAC
  },
  103: {
    name: 'DPT_DHWMode',
    encode,
    decode,
    use: Usage.HWH
  },
  104: {
    name: 'DPT_LoadPriority',
    encode,
    decode,
    use: Usage.HVAC
  },
  105: {
    name: 'DPT_HVACContrMode',
    encode,
    decode,
    use: Usage.HVAC
  },
  106: {
    name: 'DPT_HVACEmergMode',
    encode,
    decode,
    use: Usage.HVAC
  },
  107: {
    name: 'DPT_ChangeoverMode',
    encode,
    decode,
    use: Usage.HVAC
  },
  108: {
    name: 'DPT_ValveMode',
    encode,
    decode,
    use: Usage.HVAC
  },
  109: {
    name: 'DPT_DamperMode',
    encode,
    decode,
    use: Usage.HVAC
  },
  110: {
    name: 'DPT_HeaterMode',
    encode,
    decode,
    use: Usage.HVAC
  },
  111: {
    name: 'DPT_FanMode',
    encode,
    decode,
    use: Usage.TU
  },
  112: {
    name: 'DPT_MasterSlaveMode',
    encode,
    decode,
    use: Usage.TU
  },
  113: {
    name: 'DPT_StatusRoomSetp',
    encode,
    decode,
    use: Usage.TU
  },
  120: {
    name: 'DPT_ADAType',
    encode,
    decode,
    use: Usage.HVAC
  },
  121: {
    name: 'DPT_BackupMode',
    encode,
    decode,
    use: Usage.HVAC
  },
  122: {
    name: 'DPT_StartSynchronization',
    encode,
    decode,
    use: Usage.HVAC
  }
}

const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt1
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {boolean}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 1
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 1)

  const byte1 = encoded.readUInt8(0)
  return !!(byte1 & 0x1)
}

/**
 * encodes dpt1
 *
 * @param {string} dpt
 * @param {boolean} [decoded=false]
 * @return {Buffer}
 */
function encode (dpt, decoded = false) {
  return Buffer.alloc(1, !!decoded)
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 1
  },
  1: {
    name: 'DPT_Switch',
    encode,
    decode,
    use: Usage.GENERAL
  },
  2: {
    name: 'DPT_Bool',
    encode,
    decode,
    usage: Usage.GENERAL
  },
  3: {
    name: 'DPT_Enable',
    encode,
    decode,
    usage: Usage.GENERAL
  },
  4: {
    name: 'DPT_Ramp',
    encode,
    decode,
    usage: Usage.FUNCTIONAL
  },
  5: {
    name: 'DPT_Alarm',
    encode,
    decode,
    usage: Usage.FUNCTIONAL
  },
  6: {
    name: 'DPT_BinaryValue',
    encode,
    decode,
    usage: Usage.FUNCTIONAL
  },
  7: {
    name: 'DPT_Step',
    encode,
    decode,
    usage: Usage.FUNCTIONAL
  },
  8: {
    name: 'DPT_UpDown',
    encode,
    decode,
    usage: Usage.GENERAL
  },
  9: {
    name: 'DPT_OpenClose',
    encode,
    decode,
    usage: Usage.GENERAL
  },
  10: {
    name: 'DPT_Start',
    encode,
    decode,
    usage: Usage.GENERAL
  },
  11: {
    name: 'DPT_State',
    encode,
    decode,
    usage: Usage.FUNCTIONAL
  },
  12: {
    name: 'DPT_Invert',
    encode,
    decode,
    usage: Usage.FUNCTIONAL
  },
  13: {
    name: 'DPT_DimSendStyle',
    encode,
    decode,
    usage: Usage.FUNCTIONAL
  },
  14: {
    name: 'DPT_InputSource',
    encode,
    decode,
    usage: Usage.FUNCTIONAL
  },
  15: {
    name: 'DPT_Reset',
    encode,
    decode,
    usage: Usage.GENERAL
  },
  16: {
    name: 'DPT_Ack',
    encode,
    decode,
    usage: Usage.GENERAL
  },
  17: {
    name: 'DPT_Trigger',
    encode,
    decode,
    usage: Usage.GENERAL
  },
  18: {
    name: 'DPT_Occupancy',
    encode,
    decode,
    usage: Usage.GENERAL
  },
  19: {
    name: 'DPT_Window_Door',
    encode,
    decode,
    usage: Usage.GENERAL
  },
  21: {
    name: 'DPT_LogicalFunction',
    encode,
    decode,
    usage: Usage.FUNCTIONAL
  },
  22: {
    name: 'DPT_Scene_AB',
    encode,
    decode,
    usage: Usage.FUNCTIONAL
  },
  23: {
    name: 'DPT_ShutterBlinds_Mode',
    encode,
    decode,
    usage: Usage.FUNCTIONAL
  },
  100: {
    name: 'DPT_Heat/Cool',
    encode,
    decode,
    usage: Usage.FUNCTIONAL
  }
}

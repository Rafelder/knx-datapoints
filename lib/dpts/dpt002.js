const { checkBuffer } = require('./helper')
const { Usage } = require('../constants')

/**
 * decodes dpt2
 *
 * @param {string} dpt
 * @param {Buffer} encoded
 * @return {{ control: boolean, value: boolean }}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 1
 */
function decode (dpt, encoded) {
  checkBuffer(encoded, 1)

  const byte1 = encoded.readUInt8(0)
  const control = !!(byte1 & 0x2)
  const value = !!(byte1 & 0x1)
  return { control, value }
}

/**
 * encodes dpt2
 *
 * @param {string} dpt
 * @param {Object} [decoded]
 * @param {boolean} [decoded.control=false]
 * @param {boolean} [decoded.value=false]
 * @return {Buffer}
 */
function encode (dpt, decoded) {
  let control = false
  let value = false

  if (decoded !== null && typeof decoded === 'object') {
    if (Object.prototype.hasOwnProperty.call(decoded, 'control')) {
      control = !!decoded.control
    }

    if (Object.prototype.hasOwnProperty.call(decoded, 'value')) {
      value = !!decoded.value
    }
  }

  const controlEncoded = (control ? 0x2 : 0x0)
  const valueEncoded = (value ? 0x1 : 0x0)
  return Buffer.alloc(1, (controlEncoded | valueEncoded))
}

/**
 * dpt definitions
 */
module.exports = {
  common: {
    bitlength: 2
  },
  1: {
    name: 'DPT_Switch_Control',
    encode,
    decode,
    use: Usage.GENERAL
  },
  2: {
    name: 'DPT_Bool_Control',
    encode,
    decode,
    use: Usage.GENERAL
  },
  3: {
    name: 'DPT_Enable_Control',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  4: {
    name: 'DPT_Ramp_Control',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  5: {
    name: 'DPT_Alarm_Control',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  6: {
    name: 'DPT_BinaryValue_Control',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  7: {
    name: 'DPT_Step_Control',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  8: {
    name: 'DPT_Direction1_Control',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  9: {
    name: 'DPT_Direction2_Control',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  10: {
    name: 'DPT_Start_Control',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  11: {
    name: 'DPT_State_Control',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  },
  12: {
    name: 'DPT_Invert_Control',
    encode,
    decode,
    use: Usage.FUNCTIONAL
  }
}

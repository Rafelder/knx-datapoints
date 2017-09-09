const dpts = require('./dpts')
const unsupportedDpts = require('./dpts/dptUnsupported')
const { Usage } = require('./constants')

/**
 * Decodes a value
 *
 * @param {string} dpt - Datapoint type
 * @param {Buffer} encoded - Value to decode
 * @param {Object} [options] - Options
 * @return {any} - The decoded value
 */
function decode (dpt, encoded, options) {
  const dptInfo = _getDptInfo(dpt)
  if (!dptInfo.valid) {
    throw new Error(`Invalid datapoint type ${dpt}`)
  }
  if (!dptInfo.supported) {
    throw new Error(`Unsupported datapoint type ${dpt}`)
  }
  return dptInfo.decode(dpt, encoded, options)
}

/**
 * Encodes a value
 *
 * @param {string} dpt - Datapoint type
 * @param {any} decoded - Value to encode
 * @param {Object} [options] - Options
 * @return {Buffer} - The encoded value
 */
function encode (dpt, decoded, options) {
  const dptInfo = _getDptInfo(dpt)
  if (!dptInfo.valid) {
    throw new Error(`Invalid datapoint type ${dptInfo}`)
  }
  if (!dptInfo.supported) {
    throw new Error(`Unsupported datapoint type ${dpt}`)
  }
  return dptInfo.encode(dpt, decoded, options)
}

/**
 * Check if a datapoint type is supported
 *
 * @param {string} dpt - Datapoint type
 * @return {boolean}
 */
function isDptSupported (dpt) {
  return !!_getDptInfo(dpt).supported
}

/**
 * Check if a datapoint type is valid
 *
 * @param {string} dpt Datapoint type
 * @return {boolean}
 */
function isDptValid (dpt) {
  return !!_getDptInfo(dpt).valid
}

/**
 * Dpt info
 * @typedef {Object} DptInfo
 * @property {boolean} valid - Indicates whether the datapoint type is valid
 * @property {boolean} [supported] - Indicates whether the datapoint type is supported
 * @property {string} [name] - Name
 * @property {string} [use] - Usage
 */

/**
 * Returns dpt informations
 *
 * @param {string} dpt Datapoint type
 * @return {DptInfo}
 */
function getDptInfo (dpt) {
  const dptInfo = _getDptInfo(dpt)

  return {
    valid: dptInfo.valid,
    supported: dptInfo.supported,
    name: dptInfo.name,
    use: dptInfo.use,
    bitlength: dptInfo.bitlength
  }
}

function _getDptInfo (dpt) {
  if (!/^\d{1,3}\.\d{3}$/.test(dpt)) {
    return { valid: false }
  }

  if (unsupportedDpts.includes(dpt)) {
    return { valid: true, supported: false }
  }

  const dptSplitted = dpt.split('.')
  const mainNumber = parseInt(dptSplitted[0], 10)
  const subNumber = parseInt(dptSplitted[1], 10)

  const mainDpt = dpts[mainNumber]
  if (!mainDpt) {
    return { valid: false }
  }

  const subDpt = mainDpt[subNumber]
  if (!subDpt) {
    return { valid: false }
  }

  return Object.assign({}, (mainDpt.common || {}), subDpt, {
    valid: true,
    supported: !!(subDpt.encode && subDpt.decode)
  })
}

module.exports = {
  isDptSupported,
  isDptValid,
  getDptInfo,
  decode,
  encode,
  Usage
}

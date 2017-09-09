function checkBuffer (buffer, len, maxlen) {
  if (!Buffer.isBuffer(buffer)) {
    throw new TypeError(`Invalid type (expected Buffer, got ${typeof buffer})`)
  }

  if (!maxlen) {
    if (buffer.byteLength !== len) {
      throw new Error(`Invalid buffer length (expected ${len}, got ${buffer.byteLength})`)
    }
  } else if (buffer.byteLength < len || buffer.byteLength > maxlen) {
    throw new Error(`Invalid buffer length (expected ${len}-${maxlen}, got ${buffer.byteLength})`)
  }
}

function normalizeDpt (dpt) {
  const dptSplitted = dpt.split('.')
  const mainNumber = Number(dptSplitted[0])
  const subNumber = Number(dptSplitted[1])
  const subNumberNormalized = '0'.repeat(3 - String(subNumber).length) + subNumber
  return `${mainNumber}.${subNumberNormalized}`
}

module.exports = {
  checkBuffer,
  normalizeDpt
}

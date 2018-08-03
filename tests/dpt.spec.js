const assert = require('assert')
const knxDatapoints = require('../')

suite('dptLib', () => {
  test('getDptInfo', () => {
    const dptInfo = knxDatapoints.getDptInfo('1.001')
    assert.strictEqual(dptInfo.valid, true)
    assert.strictEqual(dptInfo.supported, true)
    assert.strictEqual(dptInfo.name, 'DPT_Switch')
    assert.strictEqual(dptInfo.use, knxDatapoints.Usage.GENERAL)
  })

  test('isDptSupported', () => {
    // Everything fine
    assert.strictEqual(knxDatapoints.isDptSupported('1.001'), true)

    // Invalid dpt format
    assert.strictEqual(knxDatapoints.isDptSupported('1'), false)
    assert.strictEqual(knxDatapoints.isDptSupported('1.1'), false)
    assert.strictEqual(knxDatapoints.isDptSupported('1.0001'), false)

    // Invalid dpt
    assert.strictEqual(knxDatapoints.isDptSupported('1.999'), false)
    assert.strictEqual(knxDatapoints.isDptSupported('99.999'), false)

    // Valid dpt, but not supported
    assert.strictEqual(knxDatapoints.isDptSupported('241.800'), false)
  })
  test('isDptValid', () => {
    // Everthing fine
    assert.strictEqual(knxDatapoints.isDptValid('1.001'), true)

    // Invalid dpt format
    assert.strictEqual(knxDatapoints.isDptValid('1'), false)
    assert.strictEqual(knxDatapoints.isDptValid('1.1'), false)
    assert.strictEqual(knxDatapoints.isDptValid('1.0001'), false)

    // Invalid dpt
    assert.strictEqual(knxDatapoints.isDptValid('1.999'), false)
    assert.strictEqual(knxDatapoints.isDptValid('99.999'), false)

    // Valid dpt, but not supported
    assert.strictEqual(knxDatapoints.isDptValid('241.800'), true)
  })

  test('encode invalid', () => {
    assert.throws(() => { knxDatapoints.encode('1.999') }, Error, 'Invalid datapoint type 1.999')
    assert.throws(() => { knxDatapoints.encode('99.999') }, Error, 'Invalid datapoint type 99.999')
  })

  test('decode invalid', () => {
    assert.throws(() => { knxDatapoints.decode('1.999') }, Error, 'Invalid datapoint type 1.999')
    assert.throws(() => { knxDatapoints.decode('99.999') }, Error, 'Invalid datapoint type 99.999')
  })

  test('encode unsupported', () => {
    assert.throws(() => { knxDatapoints.encode('241.800') }, Error, 'Unsupported datapoint type 241.800')
  })

  test('decode unsupported', () => {
    assert.throws(() => { knxDatapoints.decode('241.800') }, Error, 'Unsupported datapoint type 241.800')
  })
})

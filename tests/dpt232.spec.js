const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt232', () => {
  test('decode', () => {
    assert.deepEqual(knxDatapoints.decode('232.600', Buffer.from('000000', 'hex')), { r: 0, g: 0, b: 0 })
    assert.deepEqual(knxDatapoints.decode('232.600', Buffer.from('C80000', 'hex')), { r: 200, g: 0, b: 0 })
    assert.deepEqual(knxDatapoints.decode('232.600', Buffer.from('00C800', 'hex')), { r: 0, g: 200, b: 0 })
    assert.deepEqual(knxDatapoints.decode('232.600', Buffer.from('0000C8', 'hex')), { r: 0, g: 0, b: 200 })
    assert.deepEqual(knxDatapoints.decode('232.600', Buffer.from('FFFFFF', 'hex')), { r: 255, g: 255, b: 255 })

    assert.throws(() => { knxDatapoints.decode('232.600', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('232.600', Buffer.alloc(4)) }, Error)
    assert.throws(() => { knxDatapoints.decode('232.600', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('232.600', { r: 0, g: 0, b: 0 }).equals(Buffer.from('000000', 'hex')))
    assert.ok(knxDatapoints.encode('232.600', { r: 200, g: 0, b: 0 }).equals(Buffer.from('C80000', 'hex')))
    assert.ok(knxDatapoints.encode('232.600', { r: 0, g: 200, b: 0 }).equals(Buffer.from('00C800', 'hex')))
    assert.ok(knxDatapoints.encode('232.600', { r: 0, g: 0, b: 200 }).equals(Buffer.from('0000C8', 'hex')))
    assert.ok(knxDatapoints.encode('232.600', { r: 255, g: 255, b: 255 }).equals(Buffer.from('FFFFFF', 'hex')))

    assert.throws(() => { knxDatapoints.encode('232.600', { r: -1, g: 0, b: 0 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('232.600', { r: 0, g: -1, b: 0 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('232.600', { r: 0, g: 0, b: -1 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('232.600', { r: 256, g: 0, b: 0 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('232.600', { r: 0, g: 256, b: 0 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('232.600', { r: 0, g: 0, b: 256 }) }, RangeError)

    assert.ok(knxDatapoints.encode('232.600', undefined).equals(Buffer.from('000000', 'hex')))
    assert.ok(knxDatapoints.encode('232.600', {}).equals(Buffer.from('000000', 'hex')))
    assert.throws(() => { knxDatapoints.encode('232.600', null) }, TypeError)
  })
})

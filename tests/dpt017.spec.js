const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt17', () => {
  test('decode', () => {
    assert.strictEqual(knxDatapoints.decode('17.001', Buffer.from('00', 'hex')), 0)
    assert.strictEqual(knxDatapoints.decode('17.001', Buffer.from('3F', 'hex')), 63)

    assert.throws(() => { knxDatapoints.decode('17.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('17.001', Buffer.alloc(3)) }, Error)
    assert.throws(() => { knxDatapoints.decode('17.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('17.001', 0).equals(Buffer.from('00', 'hex')))
    assert.ok(knxDatapoints.encode('17.001', 63).equals(Buffer.from('3F', 'hex')))
    assert.throws(() => { knxDatapoints.encode('17.001', -1) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('17.001', 64) }, RangeError)
  })
})

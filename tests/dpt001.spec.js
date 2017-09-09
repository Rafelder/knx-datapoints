const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt1', () => {
  test('decode', () => {
    assert.strictEqual(knxDatapoints.decode('1.001', Buffer.from('00', 'hex')), false)
    assert.strictEqual(knxDatapoints.decode('1.001', Buffer.from('01', 'hex')), true)

    assert.throws(() => { knxDatapoints.decode('1.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('1.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('1.001', false).equals(Buffer.from('00', 'hex')))
    assert.ok(knxDatapoints.encode('1.001', true).equals(Buffer.from('01', 'hex')))
  })
})

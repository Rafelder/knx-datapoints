const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt12', () => {
  test('decode', () => {
    assert.strictEqual(knxDatapoints.decode('12.001', Buffer.from('00000000', 'hex')), 0)
    assert.strictEqual(knxDatapoints.decode('12.001', Buffer.from('FFFFFFFF', 'hex')), 4294967295)

    assert.throws(() => { knxDatapoints.decode('12.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('12.001', Buffer.alloc(5)) }, Error)
    assert.throws(() => { knxDatapoints.decode('12.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('12.001', 0).equals(Buffer.from('00000000', 'hex')))
    assert.ok(knxDatapoints.encode('12.001', 4294967295).equals(Buffer.from('FFFFFFFF', 'hex')))

    assert.throws(() => knxDatapoints.encode('12.001', -1), RangeError)
    assert.throws(() => knxDatapoints.encode('12.001', 4294967296), RangeError)
  })
})

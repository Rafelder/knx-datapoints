const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt6', () => {
  test('decode', () => {
    assert.strictEqual(knxDatapoints.decode('6.001', Buffer.from('00', 'hex')), -128)
    assert.strictEqual(knxDatapoints.decode('6.001', Buffer.from('64', 'hex')), -28)
    assert.strictEqual(knxDatapoints.decode('6.001', Buffer.from('C8', 'hex')), 72)
    assert.strictEqual(knxDatapoints.decode('6.001', Buffer.from('FF', 'hex')), 127)

    assert.throws(() => { knxDatapoints.decode('6.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('6.001', Buffer.alloc(2, 0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('6.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('6.001', -128).equals(Buffer.from('00', 'hex')))
    assert.ok(knxDatapoints.encode('6.001', -28).equals(Buffer.from('64', 'hex')))
    assert.ok(knxDatapoints.encode('6.001', 72).equals(Buffer.from('C8', 'hex')))
    assert.ok(knxDatapoints.encode('6.001', 127).equals(Buffer.from('FF', 'hex')))

    assert.throws(() => { knxDatapoints.encode('6.001', -129) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('6.001', 128) }, RangeError)
  })
})

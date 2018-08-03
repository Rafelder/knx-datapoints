const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt13', () => {
  test('decode', () => {
    assert.strictEqual(knxDatapoints.decode('13.001', Buffer.from('0000000A', 'hex')), 10)
    assert.strictEqual(knxDatapoints.decode('13.001', Buffer.from('FFFFFFF6', 'hex')), -10)

    assert.throws(() => { knxDatapoints.decode('13.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('13.001', Buffer.alloc(5)) }, Error)
    assert.throws(() => { knxDatapoints.decode('13.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('13.001', 10).equals(Buffer.from('0000000A', 'hex')))
    assert.ok(knxDatapoints.encode('13.001', -10).equals(Buffer.from('FFFFFFF6', 'hex')))

    assert.throws(() => knxDatapoints.encode('13.001', -2147483649), RangeError)
    assert.throws(() => knxDatapoints.encode('13.001', 2147483648), RangeError)
  })
})

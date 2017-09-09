const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt14', () => {
  test('decode', () => {
    assert.strictEqual(knxDatapoints.decode('14.000', Buffer.from('00000000', 'hex')), 0)
    assert.strictEqual(knxDatapoints.decode('14.000', Buffer.from('447A0000', 'hex')), 1000)

    assert.throws(() => { knxDatapoints.decode('14.000', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('14.000', Buffer.alloc(5)) }, Error)
    assert.throws(() => { knxDatapoints.decode('14.000', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('14.000', 0).equals(Buffer.from('00000000', 'hex')))
    assert.ok(knxDatapoints.encode('14.000', 1000).equals(Buffer.from('447A0000', 'hex')))
  })
})

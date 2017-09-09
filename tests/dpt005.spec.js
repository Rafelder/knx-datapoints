const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt5', () => {
  test('decode', () => {
    assert.strictEqual(knxDatapoints.decode('5.001', Buffer.from('00', 'hex')), 0)
    assert.strictEqual(knxDatapoints.decode('5.001', Buffer.from('64', 'hex'), { }), 39.22)
    assert.strictEqual(knxDatapoints.decode('5.001', Buffer.from('64', 'hex'), { decimals: 2 }), 39.22)
    assert.strictEqual(knxDatapoints.decode('5.001', Buffer.from('64', 'hex'), { decimals: 3 }), 39.216)
    assert.strictEqual(knxDatapoints.decode('5.001', Buffer.from('64', 'hex'), { decimals: 4 }), 39.2157)
    assert.strictEqual(knxDatapoints.decode('5.001', Buffer.from('FF', 'hex')), 100)

    assert.strictEqual(knxDatapoints.decode('5.003', Buffer.from('00', 'hex')), 0)
    assert.strictEqual(knxDatapoints.decode('5.003', Buffer.from('64', 'hex'), { }), 141.18)
    assert.strictEqual(knxDatapoints.decode('5.003', Buffer.from('64', 'hex'), { decimals: 2 }), 141.18)
    assert.strictEqual(knxDatapoints.decode('5.003', Buffer.from('64', 'hex'), { decimals: 3 }), 141.176)
    assert.strictEqual(knxDatapoints.decode('5.003', Buffer.from('64', 'hex'), { decimals: 4 }), 141.1765)
    assert.strictEqual(knxDatapoints.decode('5.003', Buffer.from('FF', 'hex')), 360);

    ['5.004', '5.006', '5.010'].forEach((dpt) => {
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('00', 'hex')), 0)
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('64', 'hex'), { }), 100)
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('64', 'hex'), { decimals: 2 }), 100)
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('64', 'hex'), { decimals: 3 }), 100)
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('64', 'hex'), { decimals: 4 }), 100)
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('FF', 'hex')), 255)
    })

    assert.throws(() => { knxDatapoints.decode('5.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('5.001', Buffer.alloc(2, 0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('5.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('5.001', 0).equals(Buffer.from('00', 'hex')))
    assert.ok(knxDatapoints.encode('5.001', 39.22).equals(Buffer.from('64', 'hex')))
    assert.ok(knxDatapoints.encode('5.001', 39.216).equals(Buffer.from('64', 'hex')))
    assert.ok(knxDatapoints.encode('5.001', 39.2157).equals(Buffer.from('64', 'hex')))
    assert.ok(knxDatapoints.encode('5.001', 100).equals(Buffer.from('FF', 'hex')))
    assert.throws(() => { knxDatapoints.encode('5.001', -1) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('5.001', 101) }, RangeError)

    assert.ok(knxDatapoints.encode('5.003', 0).equals(Buffer.from('00', 'hex')))
    assert.ok(knxDatapoints.encode('5.003', 141.18).equals(Buffer.from('64', 'hex')))
    assert.ok(knxDatapoints.encode('5.003', 141.176).equals(Buffer.from('64', 'hex')))
    assert.ok(knxDatapoints.encode('5.003', 141.1765).equals(Buffer.from('64', 'hex')))
    assert.ok(knxDatapoints.encode('5.003', 360).equals(Buffer.from('FF', 'hex')))
    assert.throws(() => { knxDatapoints.encode('5.003', -1) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('5.003', 361) }, RangeError);

    ['5.004', '5.006', '5.010'].forEach((dpt) => {
      assert.ok(knxDatapoints.encode(dpt, 0).equals(Buffer.from('00', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, 100).equals(Buffer.from('64', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, 255).equals(Buffer.from('FF', 'hex')))
      assert.throws(() => { knxDatapoints.encode(dpt, -1) }, RangeError)
      assert.throws(() => { knxDatapoints.encode(dpt, 256) }, RangeError)
    })
  })
})

const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt8', () => {
  test('decode', () => {
    ['8.001', '8.002', '8.005', '8.006', '8.007', '8.011'].forEach((dpt) => {
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('8000', 'hex')), -32768)
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('E464', 'hex')), -7068)
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('48C8', 'hex')), 18632)
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('7FFF', 'hex')), 32767)
    });

    ['8.003', '8.010'].forEach((dpt) => {
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('FFE0', 'hex')), -320)
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('FFF9', 'hex')), -70)
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('0012', 'hex')), 180)
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('0020', 'hex')), 320)
    })

    assert.strictEqual(knxDatapoints.decode('8.004', Buffer.from('FFE0', 'hex')), -3200)
    assert.strictEqual(knxDatapoints.decode('8.004', Buffer.from('FFF9', 'hex')), -700)
    assert.strictEqual(knxDatapoints.decode('8.004', Buffer.from('0012', 'hex')), 1800)
    assert.strictEqual(knxDatapoints.decode('8.004', Buffer.from('0020', 'hex')), 3200)

    assert.throws(() => { knxDatapoints.decode('8.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('8.001', Buffer.alloc(3)) }, Error)
    assert.throws(() => { knxDatapoints.decode('8.001', undefined) }, TypeError)
  })

  test('encode', () => {
    ['8.001', '8.002', '8.005', '8.006', '8.007', '8.011'].forEach((dpt) => {
      assert.ok(knxDatapoints.encode(dpt, -32768).equals(Buffer.from('8000', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, -7068).equals(Buffer.from('E464', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, 18632).equals(Buffer.from('48C8', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, 32767).equals(Buffer.from('7FFF', 'hex')))
      assert.throws(() => { knxDatapoints.encode(dpt, -32769) }, RangeError)
      assert.throws(() => { knxDatapoints.encode(dpt, 32768) }, RangeError)
    });

    ['8.003', '8.010'].forEach((dpt) => {
      assert.ok(knxDatapoints.encode(dpt, -327.68).equals(Buffer.from('FFE0', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, -70.68).equals(Buffer.from('FFF9', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, 186.32).equals(Buffer.from('0012', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, 327.67).equals(Buffer.from('0020', 'hex')))
      assert.throws(() => { knxDatapoints.encode(dpt, -327.69) }, RangeError)
      assert.throws(() => { knxDatapoints.encode(dpt, 327.68) }, RangeError)
    })

    assert.ok(knxDatapoints.encode('8.004', -3276.8).equals(Buffer.from('FFE0', 'hex')))
    assert.ok(knxDatapoints.encode('8.004', -706.8).equals(Buffer.from('FFF9', 'hex')))
    assert.ok(knxDatapoints.encode('8.004', 1863.2).equals(Buffer.from('0012', 'hex')))
    assert.ok(knxDatapoints.encode('8.004', 3276.7).equals(Buffer.from('0020', 'hex')))
    assert.throws(() => { knxDatapoints.encode('8.004', -3276.9) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('8.004', 3276.8) }, RangeError)
  })
})

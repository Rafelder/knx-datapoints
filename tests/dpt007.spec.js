const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt7', () => {
  test('decode', () => {
    ['7.001', '7.002', '7.005', '7.006', '7.007', '7.011', '7.012', '7.013'].forEach((dpt) => {
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('0000', 'hex')), 0)
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('6464', 'hex')), 25700)
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('C8C8', 'hex')), 51400)
      assert.strictEqual(knxDatapoints.decode(dpt, Buffer.from('FFFF', 'hex')), 65535)
    })

    assert.strictEqual(knxDatapoints.decode('7.003', Buffer.from('0000', 'hex')), 0)
    assert.strictEqual(knxDatapoints.decode('7.003', Buffer.from('6464', 'hex')), 257)
    assert.strictEqual(knxDatapoints.decode('7.003', Buffer.from('C8C8', 'hex')), 514)
    assert.strictEqual(knxDatapoints.decode('7.003', Buffer.from('FFFF', 'hex')), 655.35)

    assert.strictEqual(knxDatapoints.decode('7.004', Buffer.from('0000', 'hex')), 0)
    assert.strictEqual(knxDatapoints.decode('7.004', Buffer.from('6464', 'hex')), 2570)
    assert.strictEqual(knxDatapoints.decode('7.004', Buffer.from('C8C8', 'hex')), 5140)
    assert.strictEqual(knxDatapoints.decode('7.004', Buffer.from('FFFF', 'hex')), 6553.5)

    assert.throws(() => { knxDatapoints.decode('7.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('7.001', Buffer.alloc(3)) }, Error)
    assert.throws(() => { knxDatapoints.decode('7.001', undefined) }, TypeError)
  })

  test('encode', () => {
    ['7.001', '7.002', '7.005', '7.006', '7.007', '7.011', '7.012', '7.013'].forEach((dpt) => {
      assert.ok(knxDatapoints.encode(dpt, 0).equals(Buffer.from('0000', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, 25700).equals(Buffer.from('6464', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, 51400).equals(Buffer.from('C8C8', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, 65535).equals(Buffer.from('FFFF', 'hex')))
      assert.throws(() => { knxDatapoints.encode(dpt, -1) }, RangeError)
      assert.throws(() => { knxDatapoints.encode(dpt, 65536) }, RangeError)
    })

    assert.ok(knxDatapoints.encode('7.003', 0).equals(Buffer.from('0000', 'hex')))
    assert.ok(knxDatapoints.encode('7.003', 257).equals(Buffer.from('6464', 'hex')))
    assert.ok(knxDatapoints.encode('7.003', 514).equals(Buffer.from('C8C8', 'hex')))
    assert.ok(knxDatapoints.encode('7.003', 655.35).equals(Buffer.from('FFFF', 'hex')))
    assert.throws(() => { knxDatapoints.encode('7.003', -1) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('7.003', 655.36) }, RangeError)

    assert.ok(knxDatapoints.encode('7.004', 0).equals(Buffer.from('0000', 'hex')))
    assert.ok(knxDatapoints.encode('7.004', 2570).equals(Buffer.from('6464', 'hex')))
    assert.ok(knxDatapoints.encode('7.004', 5140).equals(Buffer.from('C8C8', 'hex')))
    assert.ok(knxDatapoints.encode('7.004', 6553.5).equals(Buffer.from('FFFF', 'hex')))
    assert.throws(() => { knxDatapoints.encode('7.004', -1) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('7.004', 6553.6) }, RangeError)
  })
})

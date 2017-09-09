const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt9', () => {
  test('decode', () => {
    assert.strictEqual(knxDatapoints.decode('9.001', Buffer.from('0000', 'hex')), 0)
    assert.strictEqual(knxDatapoints.decode('9.001', Buffer.from('8A24', 'hex')), -30)
    assert.strictEqual(knxDatapoints.decode('9.001', Buffer.from('AC00', 'hex'), { }), -327.68)
    assert.strictEqual(knxDatapoints.decode('9.001', Buffer.from('AC00', 'hex'), { decimals: 1 }), -327.7)
    assert.strictEqual(knxDatapoints.decode('9.001', Buffer.from('AC00', 'hex'), { decimals: 2 }), -327.68)
    assert.strictEqual(knxDatapoints.decode('9.001', Buffer.from('6464', 'hex')), 46039.04)
    assert.strictEqual(knxDatapoints.decode('9.001', Buffer.from('C8C8', 'hex')), -9461.76)

    assert.throws(() => { knxDatapoints.decode('9.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('9.001', Buffer.alloc(3)) }, Error)
    assert.throws(() => { knxDatapoints.decode('9.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('9.001', 0).equals(Buffer.from('0000', 'hex')))
    assert.ok(knxDatapoints.encode('9.001', -30).equals(Buffer.from('8A24', 'hex')))
    assert.ok(knxDatapoints.encode('9.001', 46039.04).equals(Buffer.from('6464', 'hex')))
    assert.throws(() => { knxDatapoints.encode('9.001', -274) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('9.001', 670760.97) }, RangeError)

    assert.ok(knxDatapoints.encode('9.027', 0).equals(Buffer.from('0000', 'hex')))
    assert.ok(knxDatapoints.encode('9.027', -30).equals(Buffer.from('8A24', 'hex')))
    assert.ok(knxDatapoints.encode('9.027', -327.7).equals(Buffer.from('AC00', 'hex')))
    assert.ok(knxDatapoints.encode('9.027', -327.68).equals(Buffer.from('AC00', 'hex')))
    assert.ok(knxDatapoints.encode('9.027', 46039.04).equals(Buffer.from('6464', 'hex')))
    assert.throws(() => { knxDatapoints.encode('9.027', -459.7) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('9.027', 670760.97) }, RangeError);

    ['9.002', '9.003', '9.010', '9.011', '9.020', '9.021', '9.022', '9.023', '9.024', '9.025', '9.026'].forEach((dpt) => {
      assert.ok(knxDatapoints.encode(dpt, 0).equals(Buffer.from('0000', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, -30).equals(Buffer.from('8A24', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, -327.7).equals(Buffer.from('AC00', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, -327.68).equals(Buffer.from('AC00', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, 46039.04).equals(Buffer.from('6464', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, -9461.76).equals(Buffer.from('C8C8', 'hex')))
      assert.throws(() => { knxDatapoints.encode(dpt, -671088.65) }, RangeError)
      assert.throws(() => { knxDatapoints.encode(dpt, 670760.97) }, RangeError)
    });

    ['9.004', '9.005', '9.006', '9.007', '9.008', '9.028'].forEach((dpt) => {
      assert.ok(knxDatapoints.encode(dpt, 0).equals(Buffer.from('0000', 'hex')))
      assert.ok(knxDatapoints.encode(dpt, 46039.04).equals(Buffer.from('6464', 'hex')))
      assert.throws(() => { knxDatapoints.encode(dpt, -1) }, RangeError)
      assert.throws(() => { knxDatapoints.encode(dpt, 670760.97) }, RangeError)
    })
  })
})

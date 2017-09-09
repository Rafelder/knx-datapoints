const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt16', () => {
  test('decode', () => {
    assert.strictEqual(knxDatapoints.decode('16.000', Buffer.from('41', 'hex')), String.fromCharCode(0x41))
    assert.strictEqual(knxDatapoints.decode('16.000', Buffer.from('61', 'hex')), String.fromCharCode(0x61))
    assert.strictEqual(knxDatapoints.decode('16.000', Buffer.from('7F', 'hex')), String.fromCharCode(0x7F))
    assert.strictEqual(knxDatapoints.decode('16.000', Buffer.from('4B4E58206973204F4B0000000000', 'hex')), 'KNX is OK')

    assert.strictEqual(knxDatapoints.decode('16.001', Buffer.from('41', 'hex')), String.fromCharCode(0x41))
    assert.strictEqual(knxDatapoints.decode('16.001', Buffer.from('61', 'hex')), String.fromCharCode(0x61))
    assert.strictEqual(knxDatapoints.decode('16.001', Buffer.from('7F', 'hex')), String.fromCharCode(0x7F))
    assert.strictEqual(knxDatapoints.decode('16.001', Buffer.from('80', 'hex')), String.fromCharCode(0x80))
    assert.strictEqual(knxDatapoints.decode('16.001', Buffer.from('FF', 'hex')), String.fromCharCode(0xFF))
    assert.strictEqual(knxDatapoints.decode('16.001', Buffer.from('C800000000000000000000000000', 'hex')), String.fromCharCode(200))

    assert.throws(() => { knxDatapoints.decode('16.000', Buffer.alloc(15, 0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('16.000', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('16.000', String.fromCharCode(0x41)).equals(Buffer.from('4100000000000000000000000000', 'hex')))
    assert.ok(knxDatapoints.encode('16.000', String.fromCharCode(0x61)).equals(Buffer.from('6100000000000000000000000000', 'hex')))
    assert.ok(knxDatapoints.encode('16.000', String.fromCharCode(0x7F)).equals(Buffer.from('7F00000000000000000000000000', 'hex')))
    assert.throws(() => { knxDatapoints.encode('16.000', String.fromCharCode(0x80)) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('16.000', String.fromCharCode(0xFF)) }, RangeError)
    assert.ok(knxDatapoints.encode('16.000', 'KNX is OK').equals(Buffer.from('4B4E58206973204F4B0000000000', 'hex')))

    assert.ok(knxDatapoints.encode('16.001', String.fromCharCode(0x41)).equals(Buffer.from('4100000000000000000000000000', 'hex')))
    assert.ok(knxDatapoints.encode('16.001', String.fromCharCode(0x61)).equals(Buffer.from('6100000000000000000000000000', 'hex')))
    assert.ok(knxDatapoints.encode('16.001', String.fromCharCode(0x7F)).equals(Buffer.from('7F00000000000000000000000000', 'hex')))
    assert.ok(knxDatapoints.encode('16.001', String.fromCharCode(0x80)).equals(Buffer.from('8000000000000000000000000000', 'hex')))
    assert.ok(knxDatapoints.encode('16.001', String.fromCharCode(0xFF)).equals(Buffer.from('FF00000000000000000000000000', 'hex')))
    assert.throws(() => { knxDatapoints.encode('16.001', String.fromCharCode(0x100)) }, RangeError)
    assert.ok(knxDatapoints.encode('16.001', String.fromCharCode(200)).equals(Buffer.from('C800000000000000000000000000', 'hex')))
  })
})

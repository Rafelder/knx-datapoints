const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt4', () => {
  test('decode', () => {
    assert.strictEqual(knxDatapoints.decode('4.001', Buffer.from('41', 'hex')), String.fromCharCode(0x41))
    assert.strictEqual(knxDatapoints.decode('4.001', Buffer.from('61', 'hex')), String.fromCharCode(0x61))
    assert.strictEqual(knxDatapoints.decode('4.001', Buffer.from('7F', 'hex')), String.fromCharCode(0x7F))

    assert.strictEqual(knxDatapoints.decode('4.002', Buffer.from('41', 'hex')), String.fromCharCode(0x41))
    assert.strictEqual(knxDatapoints.decode('4.002', Buffer.from('61', 'hex')), String.fromCharCode(0x61))
    assert.strictEqual(knxDatapoints.decode('4.002', Buffer.from('7F', 'hex')), String.fromCharCode(0x7F))
    assert.strictEqual(knxDatapoints.decode('4.002', Buffer.from('80', 'hex')), String.fromCharCode(0x80))
    assert.strictEqual(knxDatapoints.decode('4.002', Buffer.from('FF', 'hex')), String.fromCharCode(0xFF))

    assert.throws(() => { knxDatapoints.decode('4.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('4.001', Buffer.alloc(2, 0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('4.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('4.001', String.fromCharCode(0x41)).equals(Buffer.from('41', 'hex')))
    assert.ok(knxDatapoints.encode('4.001', String.fromCharCode(0x61)).equals(Buffer.from('61', 'hex')))
    assert.ok(knxDatapoints.encode('4.001', String.fromCharCode(0x7F)).equals(Buffer.from('7F', 'hex')))
    assert.ok(knxDatapoints.encode('4.001', '').equals(Buffer.from('00', 'hex')))
    assert.throws(() => { knxDatapoints.encode('4.001', String.fromCharCode(0x80)) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('4.001', String.fromCharCode(0xFF)) }, RangeError)

    assert.ok(knxDatapoints.encode('4.002', String.fromCharCode(0x41)).equals(Buffer.from('41', 'hex')))
    assert.ok(knxDatapoints.encode('4.002', String.fromCharCode(0x61)).equals(Buffer.from('61', 'hex')))
    assert.ok(knxDatapoints.encode('4.002', String.fromCharCode(0x7F)).equals(Buffer.from('7F', 'hex')))
    assert.ok(knxDatapoints.encode('4.002', String.fromCharCode(0x80)).equals(Buffer.from('80', 'hex')))
    assert.ok(knxDatapoints.encode('4.002', String.fromCharCode(0xFF)).equals(Buffer.from('FF', 'hex')))
    assert.ok(knxDatapoints.encode('4.002', '').equals(Buffer.from('00', 'hex')))
    assert.throws(() => { knxDatapoints.encode('4.002', String.fromCharCode(0x100)) }, RangeError)
  })
})

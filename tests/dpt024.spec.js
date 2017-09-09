const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt24', () => {
  test('decode', () => {
    assert.strictEqual(knxDatapoints.decode('24.001', Buffer.from('4B4E58206973204F4B', 'hex')), 'KNX is OK')
    assert.strictEqual(knxDatapoints.decode('24.001', Buffer.from('4B4E58206973204F4B00', 'hex')), 'KNX is OK')
    assert.strictEqual(
      knxDatapoints.decode('24.001', Buffer.from('5468697320666F726D617420616C6C6F7773207472616E736D697373696F6E206F662076657279206C6F6E6720737472696E67732100', 'hex')),
      'This format allows transmission of very long strings!'
    )

    assert.throws(() => { knxDatapoints.decode('24.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('24.001', String.fromCharCode(0x41)).equals(Buffer.from('4100', 'hex')))
    assert.ok(knxDatapoints.encode('24.001', String.fromCharCode(0x61)).equals(Buffer.from('6100', 'hex')))
    assert.ok(knxDatapoints.encode('24.001', String.fromCharCode(0x7F)).equals(Buffer.from('7F00', 'hex')))
    assert.ok(knxDatapoints.encode('24.001', String.fromCharCode(0x80)).equals(Buffer.from('8000', 'hex')))
    assert.ok(knxDatapoints.encode('24.001', String.fromCharCode(0xFF)).equals(Buffer.from('FF00', 'hex')))
    assert.ok(knxDatapoints.encode('24.001', 'KNX is OK').equals(Buffer.from('4B4E58206973204F4B00', 'hex')))
    assert.ok(
      knxDatapoints.encode('24.001', 'This format allows transmission of very long strings!')
        .equals(Buffer.from('5468697320666F726D617420616C6C6F7773207472616E736D697373696F6E206F662076657279206C6F6E6720737472696E67732100', 'hex'))
    )
    assert.throws(() => { knxDatapoints.encode('24.001', String.fromCharCode(0x100)) }, RangeError)
  })
})

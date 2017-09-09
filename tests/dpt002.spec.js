const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt2', () => {
  test('decode', () => {
    assert.deepStrictEqual(knxDatapoints.decode('2.001', Buffer.from('00', 'hex')), { control: false, value: false })
    assert.deepStrictEqual(knxDatapoints.decode('2.001', Buffer.from('01', 'hex')), { control: false, value: true })
    assert.deepStrictEqual(knxDatapoints.decode('2.001', Buffer.from('02', 'hex')), { control: true, value: false })
    assert.deepStrictEqual(knxDatapoints.decode('2.001', Buffer.from('03', 'hex')), { control: true, value: true })

    assert.throws(() => { knxDatapoints.decode('2.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('2.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('2.001', { control: false, value: false }).equals(Buffer.from('00', 'hex')))
    assert.ok(knxDatapoints.encode('2.001', { control: false, value: true }).equals(Buffer.from('01', 'hex')))
    assert.ok(knxDatapoints.encode('2.001', { control: true, value: false }).equals(Buffer.from('02', 'hex')))
    assert.ok(knxDatapoints.encode('2.001', { control: true, value: true }).equals(Buffer.from('03', 'hex')))

    assert.ok(knxDatapoints.encode('2.001', undefined).equals(Buffer.from('00', 'hex')))
    assert.ok(knxDatapoints.encode('2.001', {}).equals(Buffer.from('00', 'hex')))
  })
})

const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt18', () => {
  test('decode', () => {
    assert.deepEqual(knxDatapoints.decode('18.001', Buffer.from('00', 'hex')), { control: false, sceneNumber: 0 })
    assert.deepEqual(knxDatapoints.decode('18.001', Buffer.from('BF', 'hex')), { control: true, sceneNumber: 63 })

    assert.throws(() => { knxDatapoints.decode('18.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('18.001', Buffer.alloc(2)) }, Error)
    assert.throws(() => { knxDatapoints.decode('18.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('18.001', { control: false, sceneNumber: 0 }).equals(Buffer.from('00', 'hex')))
    assert.ok(knxDatapoints.encode('18.001', { control: true, sceneNumber: 63 }).equals(Buffer.from('BF', 'hex')))
    assert.ok(knxDatapoints.encode('18.001', { sceneNumber: 0 }).equals(Buffer.from('00', 'hex')))
    assert.ok(knxDatapoints.encode('18.001', { sceneNumber: 63 }).equals(Buffer.from('3F', 'hex')))
    assert.ok(knxDatapoints.encode('18.001', { control: false }).equals(Buffer.from('00', 'hex')))
    assert.ok(knxDatapoints.encode('18.001', { control: true }).equals(Buffer.from('80', 'hex')))

    assert.throws(() => { knxDatapoints.encode('18.001', { sceneNumber: -1 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('18.001', { sceneNumber: 64 }) }, RangeError)

    assert.ok(knxDatapoints.encode('18.001', undefined).equals(Buffer.from('00', 'hex')))
    assert.ok(knxDatapoints.encode('18.001', {}).equals(Buffer.from('00', 'hex')))
    assert.throws(() => { knxDatapoints.encode('18.001', null) }, TypeError)
  })
})

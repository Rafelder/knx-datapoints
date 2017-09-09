const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt10', () => {
  test('decode', () => {
    let decoded

    decoded = knxDatapoints.decode('10.001', Buffer.from('000000', 'hex'))
    assert.strictEqual(decoded.dayOfWeek, null)
    assert.strictEqual(decoded.date.getHours(), 0)
    assert.strictEqual(decoded.date.getMinutes(), 0)
    assert.strictEqual(decoded.date.getSeconds(), 0)

    decoded = knxDatapoints.decode('10.001', Buffer.from('0D251B', 'hex'))
    assert.strictEqual(decoded.dayOfWeek, null)
    assert.strictEqual(decoded.date.getHours(), 13)
    assert.strictEqual(decoded.date.getMinutes(), 37)
    assert.strictEqual(decoded.date.getSeconds(), 27)

    decoded = knxDatapoints.decode('10.001', Buffer.from('661E00', 'hex'))
    assert.strictEqual(decoded.dayOfWeek, 3)
    assert.strictEqual(decoded.date.getHours(), 6)
    assert.strictEqual(decoded.date.getMinutes(), 30)
    assert.strictEqual(decoded.date.getSeconds(), 0)

    decoded = knxDatapoints.decode('10.001', Buffer.from('E61E00', 'hex'))
    assert.strictEqual(decoded.dayOfWeek, 0)
    assert.strictEqual(decoded.date.getHours(), 6)
    assert.strictEqual(decoded.date.getMinutes(), 30)
    assert.strictEqual(decoded.date.getSeconds(), 0)

    assert.throws(() => { knxDatapoints.decode('10.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('10.001', Buffer.alloc(4)) }, Error)
    assert.throws(() => { knxDatapoints.decode('10.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('10.001', { date: new Date(2016, 1, 1, 0, 0, 0), dayOfWeek: null }).equals(Buffer.from('000000', 'hex')))
    assert.ok(knxDatapoints.encode('10.001', { date: new Date(2016, 1, 1, 13, 37, 27), dayOfWeek: null }).equals(Buffer.from('0D251B', 'hex')))
    assert.ok(knxDatapoints.encode('10.001', { date: new Date(2016, 1, 1, 6, 30, 0), dayOfWeek: 3 }).equals(Buffer.from('661E00', 'hex')))
    assert.ok(knxDatapoints.encode('10.001', { date: new Date(2016, 1, 1, 6, 30, 0), dayOfWeek: 0 }).equals(Buffer.from('E61E00', 'hex')))

    const today = new Date()
    const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay()
    const expectedBuffer = Buffer.from([
      (dayOfWeek << 5) | today.getHours(),
      today.getMinutes(),
      today.getSeconds()
    ])
    const expectedBuffer0 = Buffer.from([
      today.getHours(),
      today.getMinutes(),
      today.getSeconds()
    ])
    assert.ok(knxDatapoints.encode('10.001', undefined).equals(expectedBuffer))
    assert.ok(knxDatapoints.encode('10.001', {}).equals(expectedBuffer))
    assert.ok(knxDatapoints.encode('10.001', { date: undefined }).equals(expectedBuffer))
    assert.throws(() => { knxDatapoints.encode('10.001', { date: null }) }, Error)
    assert.ok(knxDatapoints.encode('10.001', { dayOfWeek: null }).equals(expectedBuffer0))

    assert.throws(() => knxDatapoints.encode('10.001', { date: new Date(2016, 1, 1, 0, 0, 0), dayOfWeek: 7 }), RangeError)
    assert.throws(() => { knxDatapoints.encode('10.001', null) }, TypeError)
  })
})

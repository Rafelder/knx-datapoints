const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt11', () => {
  test('decode', () => {
    let decoded

    decoded = knxDatapoints.decode('11.001', Buffer.from('010100', 'hex'))
    assert.strictEqual(decoded.getFullYear(), 2000)
    assert.strictEqual(decoded.getMonth(), 1)
    assert.strictEqual(decoded.getDate(), 1)

    decoded = knxDatapoints.decode('11.001', Buffer.from('01015A', 'hex'))
    assert.strictEqual(decoded.getFullYear(), 1990)
    assert.strictEqual(decoded.getMonth(), 1)
    assert.strictEqual(decoded.getDate(), 1)

    decoded = knxDatapoints.decode('11.001', Buffer.from('050505', 'hex'))
    assert.strictEqual(decoded.getFullYear(), 2005)
    assert.strictEqual(decoded.getMonth(), 5)
    assert.strictEqual(decoded.getDate(), 5)

    assert.throws(() => { knxDatapoints.decode('11.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('11.001', Buffer.alloc(4)) }, Error)
    assert.throws(() => { knxDatapoints.decode('11.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('11.001', new Date(2000, 1, 1)).equals(Buffer.from('010100', 'hex')))
    assert.ok(knxDatapoints.encode('11.001', new Date(1990, 1, 1)).equals(Buffer.from('01015A', 'hex')))
    assert.ok(knxDatapoints.encode('11.001', new Date(2005, 5, 5)).equals(Buffer.from('050505', 'hex')))

    const today = new Date()
    const expectedBuffer = Buffer.from([
      today.getDate(),
      today.getMonth(),
      today.getFullYear() - 2000
    ])
    assert.ok(knxDatapoints.encode('11.001', undefined).equals(expectedBuffer))
    assert.throws(() => { knxDatapoints.encode('11.001', null) }, TypeError)

    assert.throws(() => { knxDatapoints.encode('11.001', new Date(1989, 1, 1)) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('11.001', new Date(2090, 1, 1)) }, RangeError)
  })
})

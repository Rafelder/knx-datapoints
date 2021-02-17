const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt11', () => {
  test('decode', () => {
    let decoded

    decoded = knxDatapoints.decode('11.001', Buffer.from('010100', 'hex'))
    assert.strictEqual(decoded.getFullYear(), 2000)
    assert.strictEqual(decoded.getMonth(), 0)
    assert.strictEqual(decoded.getDate(), 1)

    decoded = knxDatapoints.decode('11.001', Buffer.from('01015A', 'hex'))
    assert.strictEqual(decoded.getFullYear(), 1990)
    assert.strictEqual(decoded.getMonth(), 0)
    assert.strictEqual(decoded.getDate(), 1)

    decoded = knxDatapoints.decode('11.001', Buffer.from('050605', 'hex'))
    assert.strictEqual(decoded.getFullYear(), 2005)
    assert.strictEqual(decoded.getMonth(), 5)
    assert.strictEqual(decoded.getDate(), 5)

    decoded = knxDatapoints.decode('11.001', Buffer.from('010115', 'hex'))
    assert.strictEqual(decoded.getFullYear(), 2021)
    assert.strictEqual(decoded.getMonth(), 0)
    assert.strictEqual(decoded.getDate(), 1)

    assert.throws(() => { knxDatapoints.decode('11.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('11.001', Buffer.alloc(4)) }, Error)
    assert.throws(() => { knxDatapoints.decode('11.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('11.001', new Date(2000, 0, 1)).equals(Buffer.from('010100', 'hex')))
    assert.ok(knxDatapoints.encode('11.001', new Date(1990, 0, 1)).equals(Buffer.from('01015A', 'hex')))
    assert.ok(knxDatapoints.encode('11.001', new Date(2005, 4, 5)).equals(Buffer.from('050505', 'hex')))
    assert.ok(knxDatapoints.encode('11.001', new Date(2021, 0, 1)).equals(Buffer.from('010115', 'hex')))

    const today = new Date()
    const expectedBuffer = Buffer.from([
      today.getDate(),
      today.getMonth() + 1,
      today.getFullYear() - 2000
    ])
    assert.ok(knxDatapoints.encode('11.001', undefined).equals(expectedBuffer))
    assert.throws(() => { knxDatapoints.encode('11.001', null) }, TypeError)

    assert.throws(() => { knxDatapoints.encode('11.001', new Date(1989, 0, 1)) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('11.001', new Date(2090, 0, 1)) }, RangeError)
  })
})

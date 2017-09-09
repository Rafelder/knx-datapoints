const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt15', () => {
  test('decode', () => {
    assert.deepEqual(knxDatapoints.decode('15.000', Buffer.from('1234564d', 'hex')), {
      digits: [1, 2, 3, 4, 5, 6],
      error: false,
      permission: true,
      readDirection: false,
      encryption: false,
      index: 13
    })

    assert.throws(() => { knxDatapoints.decode('15.000', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('15.000', Buffer.alloc(5)) }, Error)
    assert.throws(() => { knxDatapoints.decode('15.000', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('15.000', {
      digits: [1, 2, 3, 4, 5, 6],
      error: false,
      permission: true,
      readDirection: false,
      encryption: false,
      index: 13
    }).equals(Buffer.from('1234564d', 'hex')))

    assert.ok(knxDatapoints.encode('15.000', {
      digits: [6, 5, 4, 3, 2],
      error: true,
      permission: false,
      readDirection: true,
      encryption: true,
      index: 13
    }).equals(Buffer.from('065432BD', 'hex')))

    // Digits invalid type
    assert.throws(() => knxDatapoints.encode('15.000', {
      digits: null
    }))

    // Too many digits
    assert.throws(() => knxDatapoints.encode('15.000', {
      digits: [1, 2, 3, 4, 5, 6, 7]
    }))

    // Digit out of range
    assert.throws(() => knxDatapoints.encode('15.000', {
      digits: [10]
    }))

    // Index out of range
    assert.throws(() => knxDatapoints.encode('15.000', {
      digits: [0],
      index: 16
    }))

    assert.ok(knxDatapoints.encode('15.000', undefined).equals(Buffer.from('00000000', 'hex')))
    assert.ok(knxDatapoints.encode('15.000', {}).equals(Buffer.from('00000000', 'hex')))
    assert.throws(() => { knxDatapoints.encode('15.000', null) }, TypeError)
  })
})

const assert = require('assert')
const range = require('range').range
const knxDatapoints = require('../')

suite('dpt3', () => {
  test('decode', () => {
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('00', 'hex')), { direction: false, intervals: 0 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('01', 'hex')), { direction: false, intervals: 1 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('02', 'hex')), { direction: false, intervals: 2 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('03', 'hex')), { direction: false, intervals: 4 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('04', 'hex')), { direction: false, intervals: 8 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('05', 'hex')), { direction: false, intervals: 16 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('06', 'hex')), { direction: false, intervals: 32 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('07', 'hex')), { direction: false, intervals: 64 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('08', 'hex')), { direction: true, intervals: 0 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('09', 'hex')), { direction: true, intervals: 1 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('0A', 'hex')), { direction: true, intervals: 2 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('0B', 'hex')), { direction: true, intervals: 4 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('0C', 'hex')), { direction: true, intervals: 8 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('0D', 'hex')), { direction: true, intervals: 16 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('0E', 'hex')), { direction: true, intervals: 32 })
    assert.deepStrictEqual(knxDatapoints.decode('3.007', Buffer.from('0F', 'hex')), { direction: true, intervals: 64 })

    assert.throws(() => { knxDatapoints.decode('3.007', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('3.007', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('3.007', { direction: false, intervals: 0 }).equals(Buffer.from('00', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: false, intervals: 1 }).equals(Buffer.from('01', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: false, intervals: 2 }).equals(Buffer.from('02', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: false, intervals: 4 }).equals(Buffer.from('03', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: false, intervals: 8 }).equals(Buffer.from('04', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: false, intervals: 16 }).equals(Buffer.from('05', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: false, intervals: 32 }).equals(Buffer.from('06', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: false, intervals: 64 }).equals(Buffer.from('07', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: true, intervals: 0 }).equals(Buffer.from('08', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: true, intervals: 1 }).equals(Buffer.from('09', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: true, intervals: 2 }).equals(Buffer.from('0A', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: true, intervals: 4 }).equals(Buffer.from('0B', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: true, intervals: 8 }).equals(Buffer.from('0C', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: true, intervals: 16 }).equals(Buffer.from('0D', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: true, intervals: 32 }).equals(Buffer.from('0E', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', { direction: true, intervals: 64 }).equals(Buffer.from('0F', 'hex')))

    assert.ok(knxDatapoints.encode('3.007', undefined).equals(Buffer.from('00', 'hex')))
    assert.ok(knxDatapoints.encode('3.007', {}).equals(Buffer.from('00', 'hex')));

    [-1, 3, 5, 6, 7, ...range(9, 16), ...range(17, 32), ...range(33, 64), 65].forEach((n) => {
      assert.throws(() => knxDatapoints.encode('3.007', { direction: true, intervals: n }), RangeError)
      assert.throws(() => knxDatapoints.encode('3.007', { direction: false, intervals: n }), RangeError)
    })
  })
})

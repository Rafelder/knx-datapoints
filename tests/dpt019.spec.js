const assert = require('assert')
const knxDatapoints = require('../')

suite('dpt19', () => {
  test('decode', () => {
    assert.deepStrictEqual(knxDatapoints.decode('19.001', Buffer.from('750204d0041e0000', 'hex')), {
      year: 2017,
      month: 1,
      dayOfMonth: 4,
      dayOfWeek: 6,
      hourOfDay: 16,
      minutes: 4,
      seconds: 30,
      f: false,
      wd: false,
      nwd: false,
      ny: false,
      nd: false,
      ndow: false,
      nt: false,
      suti: false,
      clq: false
    })

    assert.deepStrictEqual(knxDatapoints.decode('19.001', Buffer.from('75020410041e0000', 'hex')), {
      year: 2017,
      month: 1,
      dayOfMonth: 4,
      dayOfWeek: undefined,
      hourOfDay: 16,
      minutes: 4,
      seconds: 30,
      f: false,
      wd: false,
      nwd: false,
      ny: false,
      nd: false,
      ndow: false,
      nt: false,
      suti: false,
      clq: false
    })

    assert.deepStrictEqual(knxDatapoints.decode('19.001', Buffer.from('750204f0041e0000', 'hex')), {
      year: 2017,
      month: 1,
      dayOfMonth: 4,
      dayOfWeek: 0,
      hourOfDay: 16,
      minutes: 4,
      seconds: 30,
      f: false,
      wd: false,
      nwd: false,
      ny: false,
      nd: false,
      ndow: false,
      nt: false,
      suti: false,
      clq: false
    })

    // hour = 24, minute = 0, second = 0
    assert.deepStrictEqual(knxDatapoints.decode('19.001', Buffer.from('750204f800000000', 'hex')), {
      year: 2017,
      month: 1,
      dayOfMonth: 4,
      dayOfWeek: 0,
      hourOfDay: 24,
      minutes: 0,
      seconds: 0,
      f: false,
      wd: false,
      nwd: false,
      ny: false,
      nd: false,
      ndow: false,
      nt: false,
      suti: false,
      clq: false
    })

    // hour = 24, minute = 1, second = 0
    assert.throws(() => { knxDatapoints.decode('19.001', Buffer.from('750204f801000000', 'hex')) }, RangeError)
    // hour = 24, minute = 0, second = 1
    assert.throws(() => { knxDatapoints.decode('19.001', Buffer.from('750204f800010000', 'hex')) }, RangeError)

    assert.throws(() => { knxDatapoints.decode('19.001', Buffer.alloc(0)) }, Error)
    assert.throws(() => { knxDatapoints.decode('19.001', Buffer.alloc(9)) }, Error)
    assert.throws(() => { knxDatapoints.decode('19.001', undefined) }, TypeError)
  })

  test('encode', () => {
    assert.ok(knxDatapoints.encode('19.001', {
      year: 2017,
      month: 1,
      dayOfMonth: 4,
      dayOfWeek: 6,
      hourOfDay: 16,
      minutes: 4,
      seconds: 30,
      f: false,
      wd: false,
      nwd: false,
      ny: false,
      nd: false,
      ndow: false,
      nt: false,
      suti: false,
      clq: false
    }).equals(Buffer.from('750204d0041e0000', 'hex')))

    assert.ok(knxDatapoints.encode('19.001', {
      year: 2017,
      month: 1,
      dayOfMonth: 4,
      dayOfWeek: undefined,
      hourOfDay: 16,
      minutes: 4,
      seconds: 30,
      f: false,
      wd: false,
      nwd: false,
      ny: false,
      nd: false,
      ndow: false,
      nt: false,
      suti: false,
      clq: false
    }).equals(Buffer.from('75020410041e0000', 'hex')))

    assert.ok(knxDatapoints.encode('19.001', {
      year: 2017,
      month: 1,
      dayOfMonth: 4,
      dayOfWeek: 0,
      hourOfDay: 16,
      minutes: 4,
      seconds: 30,
      f: false,
      wd: false,
      nwd: false,
      ny: false,
      nd: false,
      ndow: false,
      nt: false,
      suti: false,
      clq: false
    }).equals(Buffer.from('750204f0041e0000', 'hex')))

    assert.throws(() => { knxDatapoints.encode('19.001', { year: 1899 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { year: 2156 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { month: -1 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { month: 12 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { dayOfMonth: 0 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { dayOfMonth: 32 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { dayOfWeek: -1 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { dayOfWeek: 7 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { hourOfDay: -1 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { hourOfDay: 25 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { minutes: -1 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { minutes: 60 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { seconds: -1 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { seconds: 60 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { nt: false, hourOfDay: 24, minutes: 1, seconds: 0 }) }, RangeError)
    assert.throws(() => { knxDatapoints.encode('19.001', { nt: false, hourOfDay: 24, minutes: 0, seconds: 1 }) }, RangeError)

    // The following asserting is risky (if the encodes don't run in the same second, the test will fail; unlikely, but possible)
    const now = new Date()
    const defaultValue = knxDatapoints.encode('19.001', {
      year: now.getFullYear(),
      month: now.getMonth(),
      dayOfMonth: now.getDate(),
      dayOfWeek: now.getDay(),
      hourOfDay: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      f: false,
      wd: false,
      nwd: false,
      ny: false,
      nd: false,
      ndow: false,
      nt: false,
      suti: false,
      clq: false
    })
    assert.ok(knxDatapoints.encode('19.001', undefined).equals(defaultValue))
    assert.ok(knxDatapoints.encode('19.001', {}).equals(defaultValue))
  })
})

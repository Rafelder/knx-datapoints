# Utils

## Check if a dpt is valid with `isValid(dpt)`
```js
knxDatapoints.isValid('1.001') // true
knxDatapoints.isValid('255.000') // false
```

## Check if a dpt is supported with `isSupported(dpt)`
```js
knxDatapoints.isSupported('1.001') // true
knxDatapoints.isSupported('241.800') // false
```

## Get dpt informations with `getDptInfo(dpt)`
```js
// Get dpt informations
knxDatapoints.getDptInfo('1.001') // { valid: true, supported: true, name: 'DPT_Switch', use: 'G', bitlength: 1 }
knxDatapoints.getDptInfo('255.000') // { valid: false }
knxDatapoints.getDptInfo('241.800') // { valid: true, supported: false }
```

Properties of the returned object:

|Property|Type|Description|Note|
|---|---|---|---|
|`valid`|boolean|Is dpt valid?||
|`supported`|boolean|Is dpt supported?|Only set when valid = true|
|`name`|string|Official name of the dpt|Only set when supported = true|
|`use`|'G' or 'FB'|Use from the knx specification ('G' = General, 'FB' = Functional)|Only set when supported = true|
|`bitlength`|number|Bitlength (Required when creating a write datagram)|Only set when supported = true; can be undefined if the bitlength is variable|


# DPT encoding / decoding

**IMPORTANT**

Many datapoints have ranges or enums for some parameters, which are **NOT** documented here.
Please read the official knx datapoint documentation for detailed information.

This is only a explanation of the API of this library.

For more examples take a look at the [tests](../tests).

## DPT 1

||Input|Output|
|---|---|---|
|**encode**|`boolean`|Buffer (1 byte)|
|**decode**|Buffer (1 byte)|`boolean`|

```js
knxDatapoints.encode('1.001', true) // Buffer[01]
knxDatapoints.encode('1.001', false) // Buffer[00]

knxDatapoints.decode('1.001', Buffer.from('01', 'hex')) // true
knxDatapoints.decode('1.001', Buffer.from('00', 'hex')) // false
```

## DPT 2

||Input|Output|
|---|---|---|
|**encode**|`{ value: boolean = false, control: boolean = false }`|Buffer (1 byte)|
|**decode**|Buffer (1 byte)|`{ value: boolean, control: boolean }`|

```js
knxDatapoints.encode('2.001', { value: true, control: true }) // Buffer[03]

knxDatapoints.decode('2.001', Buffer.from('03', 'hex')) // { value: true, control: true }
```

## DPT 3

||Input|Output|
|---|---|---|
|**encode**|`{ direction: boolean = false, intervals: number = 0 }`|Buffer (1 byte)|
|**decode**|Buffer (1 byte)|`{ direction: boolean, intervals: number }`|

```js
knxDatapoints.encode('3.007', { direction: true, intervals: 8 }) // Buffer[0C]

knxDatapoints.decode('3.007', Buffer.from('0C', 'hex')) // { direction: true, intervals: 8 }
```

## DPT 4

||Input|Output|
|---|---|---|
|**encode**|`string` (1 char)|Buffer (1 byte)|
|**decode**|Buffer (1 byte)|`string` (1 char)|

```js
knxDatapoints.encode('4.001', 'A') // Buffer[41]

knxDatapoints.decode('4.001', Buffer.from('41', 'hex')) // 'A'
```

## DPT 5

||Input|Output|Optional Parameters|
|---|---|---|---|
|**encode**|`number`|Buffer (1 byte)||
|**decode**|Buffer (1 byte)|`number`|`{ decimals: number = 2 }`|

```js
knxDatapoints.encode('5.001', 39.22) // Buffer[64]

knxDatapoints.decode('5.001', Buffer.from('64', 'hex')) // 39.22
knxDatapoints.decode('5.001', Buffer.from('64', 'hex'), { decimals: 3 }) // 39.216
```

## DPT 6

||Input|Output|
|---|---|---|
|**encode**|`number`|Buffer (1 byte)|
|**decode**|Buffer (1 byte)|`number`|

```js
knxDatapoints.encode('6.001', 72) // Buffer[48]

knxDatapoints.decode('6.001', Buffer.from('48', 'hex')) // 72
```

## DPT 7

||Input|Output|
|---|---|---|
|**encode**|`number`|Buffer (2 bytes)|
|**decode**|Buffer (2 bytes)|`number`|

```js
knxDatapoints.encode('7.001', 25700) // Buffer[6464]

knxDatapoints.decode('7.001', Buffer.from('6464', 'hex')) // 25700
```

## DPT 8

||Input|Output|
|---|---|---|
|**encode**|`number`|Buffer (2 bytes)|
|**decode**|Buffer (2 bytes)|`number`|

```js
knxDatapoints.encode('8.001', -7068) // Buffer[E464]

knxDatapoints.decode('8.001', Buffer.from('E464', 'hex')) // -7068
```

## DPT 9

||Input|Output|Optional Parameters|
|---|---|---|---|
|**encode**|`number`|Buffer (2 bytes)||
|**decode**|Buffer (2 bytes)|`number`|`{ decimals: number = 2 }`|

```js
knxDatapoints.encode('9.027', -327.68) // Buffer[AC00]

knxDatapoints.decode('9.027', Buffer.from('AC00', 'hex')) // -327.68
knxDatapoints.decode('9.027', Buffer.from('AC00', 'hex'), { decimals: 1 }) // -327.7
```

## DPT 10

||Input|Output|
|---|---|---|
|**encode**|`{ date?: Date, dayOfWeek?: number or null }`|Buffer (3 bytes)|
|**decode**|Buffer (3 bytes)|`{ date: Date, dayOfWeek: number or null }`|

**NOTE:** dayOfWeek: null = not defined, 0 = sunday  
**NOTE:** only the time part of Date is used

```js
knxDatapoints.encode('10.001', { date: new Date(2016, 1, 1, 6, 30, 0), dayOfWeek: 3 }) // Buffer[661E00]

knxDatapoints.decode('10.001', Buffer.from('661E00', 'hex')) // { date: Date<2017-02-01, 06:30:00>, dayOfWeek: 3 }
```

## DPT 11 3

||Input|Output|
|---|---|---|
|**encode**|`Date`|Buffer (3 bytes)|
|**decode**|Buffer (3 bytes)|`Date`|

**NOTE:** only the date part of Date is used

```js
knxDatapoints.encode('11.001', { date: new Date(1990, 1, 1), dayOfWeek: 3 }) // Buffer[01015A]

knxDatapoints.decode('11.001', Buffer.from('01015A', 'hex')) // Date<1990-02-01>
```

## DPT 12

||Input|Output|
|---|---|---|
|**encode**|`number`|Buffer (4 bytes)|
|**decode**|Buffer (4 bytes)|`number`|

```js
knxDatapoints.encode('12.001', 4294967295) // Buffer[FFFFFFFF]

knxDatapoints.decode('12.001', Buffer.from('FFFFFFFF', 'hex')) // 4294967295
```

## DPT 13

||Input|Output|
|---|---|---|
|**encode**|`number`|Buffer (4 bytes)|
|**decode**|Buffer (4 bytes)|`number`|

```js
knxDatapoints.encode('13.001', 10) // Buffer[0000000A]

knxDatapoints.decode('13.001', Buffer.from('0000000A', 'hex')) // 10
```

## DPT 14

||Input|Output|
|---|---|---|
|**encode**|`number`|Buffer (4 bytes)|
|**decode**|Buffer (4 bytes)|`number`|

```js
knxDatapoints.encode('14.000', 1000) // Buffer[447A0000]

knxDatapoints.decode('14.000', Buffer.from('447A0000', 'hex')) // 1000
```

## DPT 15

||Input|Output|
|---|---|---|
|**encode**|`{ digits?: number[], error?: boolean = false, permission?: boolean = false, readDirection?: boolean = false, encryption?: boolean = false, index?: number = 0 }`|Buffer (4 bytes)|
|**decode**|Buffer (4 bytes)|`{ digits: number[], error: boolean, permission: boolean, readDirection: boolean, encryption: boolean, index: number }`|

```js
knxDatapoints.encode('15.000', {
  digits: [6, 5, 4, 3, 2],
  error: true,
  permission: false,
  readDirection: true,
  encryption: true,
  index: 13
}  // Buffer[065432BD]

knxDatapoints.decode('15.000', Buffer.from('065432BD', 'hex')) // { digits: [6, 5, 4, 3, 2], error: true, permission: false, readDirection: true, encryption: true, index: 13 }
```

## DPT 16

||Input|Output|
|---|---|---|
|**encode**|`number`|Buffer (0 - 14 bytes)|
|**decode**|Buffer (0 - 14 bytes)|`number`|

```js
knxDatapoints.encode('16.000', 'KNX is OK') // Buffer[4B4E58206973204F4B0000000000]

knxDatapoints.decode('16.000', Buffer.from('4B4E58206973204F4B0000000000', 'hex')) // 'KNX is OK''
```
## DPT 17

||Input|Output|
|---|---|---|
|**encode**|`number`|Buffer (1 byte)|
|**decode**|Buffer (1 byte)|`number`|

```js
knxDatapoints.encode('17.000', 63) // Buffer[3F]

knxDatapoints.decode('17.000', Buffer.from('3F', 'hex')) // 63
```

## DPT 18

||Input|Output|
|---|---|---|
|**encode**|`{ control: boolean = false, sceneNumber: number = 0 }`|Buffer (1 byte)|
|**decode**|Buffer (1 byte)|`{ control: boolean, sceneNumber: number }`|

```js
knxDatapoints.encode('18.001', { control: true, sceneNumber: 63 }) // Buffer[BF]

knxDatapoints.decode('18.001', Buffer.from('BF', 'hex')) // { control: true, sceneNumber: 63 }
```

## DPT 19

||Input|Output|
|---|---|---|
|**encode**|`{ year: number = today, month: number = today, dayOfMonth: number = today, dayOfWeek: number = today, hourOfDay: number = now, minutes: number = now, seconds: number = now, f: boolean = false, wd: boolean = false, nwd: boolean = false, ny: boolean = false, nd: boolean = false, ndow: boolean = false, nt: boolean = false, suti: boolean = false, clq: boolean = false }`|Buffer (8 byte)|
|**decode**|Buffer (8 byte)|`{ year: number, month: number, dayOfMonth: number, dayOfWeek: number, hourOfDay: number, minutes: number, seconds: number, f: boolean, wd: boolean, nwd: boolean, ny: boolean, nd: boolean, ndow: boolean, nt: boolean, suti: boolean, clq: boolean }`|

```js
knxDatapoints.encode('19.001', { year: 2017, month: 1, dayOfMonth: 4, dayOfWeek: 6, hourOfDay: 16, minutes: 4, seconds: 30, f: false, wd: false, nwd: false, ny: false, nd: false, ndow: false, nt: false, suti: false, clq: false }) // Buffer[750204d0041e0000]

knxDatapoints.decode('19.001', Buffer.from('750204d0041e0000', 'hex')) // { year: 2017, month: 1, dayOfMonth: 4, dayOfWeek: 6, hourOfDay: 16, minutes: 4, seconds: 30, f: false, wd: false, nwd: false, ny: false, nd: false, ndow: false, nt: false, suti: false, clq: false }
```

## DPT 20

||Input|Output|
|---|---|---|
|**encode**|`number`|Buffer (1 byte)|
|**decode**|Buffer (1 byte)|`number`|

```js
knxDatapoints.encode('20.102', 1) // Buffer[01]

knxDatapoints.decode('20.102', Buffer.from('B01', 'hex')) // 1
```

## DPT 24

||Input|Output|
|---|---|---|
|**encode**|`string`|Buffer (0-n bytes)|
|**decode**|Buffer (0-n bytes)|`string`|

```js
knxDatapoints.encode('24.001', 'This format allows transmission of very long strings!') // Buffer[5468697320666F726D617420616C6C6F7773207472616E736D697373696F6E206F662076657279206C6F6E6720737472696E67732100]

knxDatapoints.decode('24.001', Buffer.from('5468697320666F726D617420616C6C6F7773207472616E736D697373696F6E206F662076657279206C6F6E6720737472696E67732100', 'hex')) // 'This format allows transmission of very long strings!'
```

## DPT 232

||Input|Output|
|---|---|---|
|**encode**|`{ r: number = 0, g: number = 0, b: number = 0 }`|Buffer (3 bytes)|
|**decode**|Buffer (3 bytes)|`{ r: number, g: number, b: number }`|

```js
knxDatapoints.encode('232.600', { r: 255, g: 255, b: 255 }) // Buffer[FFFFFF]

knxDatapoints.decode('232.600', Buffer.from('FFFFFF', 'hex')) // { r: 255, g: 255, b: 255 }
```

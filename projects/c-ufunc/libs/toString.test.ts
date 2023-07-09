import { toString } from './toString'

const stringify = (value: any) => JSON.stringify(value, null, 2)

describe('toString', () => {
  it('should convert a primitives to a string', () => {
    expect(toString()()(undefined)).toBe('""')
    expect(toString()()(null)).toBe('null')
    expect(toString()()(NaN)).toBe('null')
    expect(toString()()(true)).toBe('true')
    expect(toString()()(false)).toBe('false')
    expect(toString()()(0)).toBe('0')
    expect(toString()()(1)).toBe('1')
    expect(toString()()(-1)).toBe('-1')
    expect(toString()()(Infinity)).toBe('null')
    expect(toString()()(-Infinity)).toBe('null')
  })

  it('should convert a map to a string', () => {
    const actual = toString()(2)(
      new Map([
        [1, 1],
        [2, 0],
        [3, 'a'],
        [4, true],
        [5, false],
        [6, null],
        [7, ''],
        [8, NaN],
        [9, new Set(['a', 'b', 'c'])],
        [10, new Map([[0, 'amap']])],
        [11, new Date('2023/1/1')],
        [12, [1, 2, 3]],
        [13, { a: 'a' }],
      ] as any[])
    )

    expect(actual).toEqual(
      stringify({
        '1': 1,
        '2': 0,
        '3': 'a',
        '4': true,
        '5': false,
        '6': null,
        '7': '',
        '8': null,
        '9': ['a', 'b', 'c'],
        '10': {
          '0': 'amap',
        },
        '11': '2022-12-31T23:00:00.000Z',
        '12': [1, 2, 3],
        '13': { a: 'a' },
      })
    )
  })

  it('should convert a array to a string', () => {
    const actaul = toString()(2)([
      1,
      0,
      'a',
      true,
      false,
      null,
      undefined,
      NaN,
      new Set(['a', 'b', 'c']),
      new Map([[0, 'amap']]),
      new Date('2023/1/1'),
      [1, 2, 3],
      { a: 'a' },
    ])

    expect(actaul).toEqual(
      stringify([
        1,
        0,
        'a',
        true,
        false,
        null,
        '',
        null,
        ['a', 'b', 'c'],
        {
          '0': 'amap',
        },
        '2022-12-31T23:00:00.000Z',
        [1, 2, 3],
        { a: 'a' },
      ])
    )
  })

  it('should convert a set to a string', () => {
    const actual = toString()(2)(
      new Set([
        1,
        1,
        1,
        0,
        'a',
        true,
        false,
        null,
        undefined,
        NaN,
        new Set(['a', 'b', 'c']),
        new Map([[0, 'amap']]),
        new Date('2023/1/1'),
        [1, 2, 3],
        { a: 'a' },
      ])
    )

    expect(actual).toEqual(
      stringify([
        1,
        0,
        'a',
        true,
        false,
        null,
        '',
        null,
        ['a', 'b', 'c'],
        {
          '0': 'amap',
        },
        '2022-12-31T23:00:00.000Z',
        [1, 2, 3],
        { a: 'a' },
      ])
    )
  })

  it('should convert a error to a string', () => {
    const error = new Error('I have an error')
    error.stack = 'Error: I have an error'
    expect(toString()()(error.name)).toBe(stringify('Error'))
    expect(toString()()(error.message)).toBe(stringify('I have an error'))
    expect(toString()()(error.stack)).toBe(stringify('Error: I have an error'))
  })

  it('shopuld convert a function to a string', () => {
    expect(toString()()((a: number, b: number) => a + b)).toBe(
      '"(a, b) => a + b"'
    )
  })

  it('should call function', () => {
    const fn = jest.fn((a) => a)
    const value = 'a value'
    toString(fn)(2)('a value')
    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith(value)
  })
})

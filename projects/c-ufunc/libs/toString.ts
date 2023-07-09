/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-loop-statement */
import { isArray } from './isArray'
import { isBoolean } from './isBoolean'
import { isDate } from './isDate'
import { isError } from './isError'
import { isFunction } from './isFunction'
import { isMap } from './isMap'
import { isNull } from './isNull'
import { isNumber } from './isNumber'
import { isSet } from './isSet'
import { isString } from './isString'
import { isUndefined } from './isUndefined'
import { someTrue } from './someTrue'

/**
 * Converts a value to a string
 *
 * @param value - Value to be converted.
 *
 * @returns Returns a string.
 *
 * @usage
 * `import { toString } from "c-ufunc/libs/toString"`
 *
 * @example
 * ```
 * toString()(2)({ firstName: 'otis', lastNmame: 'jimenez' })`
 * // {"firstName":"otis","lastNmame":"jimenez"}
 * ``
 */
export const toString =
  (fn?: (value: unknown) => any | readonly any[]) =>
  (n?: number) =>
  (value: unknown) => {
    const result = convertToStringable(value)
    return JSON.stringify(fn ? fn(result) : result, null, n)
  }

const convertToStringable = (value: unknown) => {
  switch (true) {
    case isUndefined(value): {
      return ''
    }
    case someTrue([
      isNull(value),
      isString(value),
      isNumber(value),
      isBoolean(value),
    ]): {
      return value
    }
    case isSet(value): {
      const arr: any[] = []
      for (const val of value as any[]) {
        arr.push(convertToStringable(val))
      }
      return arr
    }
    case isMap(value): {
      const obj: Record<string | number | symbol, any> = {}
      for (const [key, val] of value as Map<any, any>) {
        obj[key as any] = convertToStringable(val)
      }
      return obj
    }
    case isDate(value): {
      return (value as Date).toISOString()
    }
    case isError(value): {
      return {
        name: (value as Error).name,
        message: (value as Error).message,
        stack: (value as Error).stack,
      }
    }

    case isFunction(value): {
      return (value as Function).toString()
    }
    case isArray(value): {
      const arr: any[] = []
      for (const val of value as Array<any>) {
        arr.push(convertToStringable(val))
      }
      return arr
    }

    default:
      return value
  }
}

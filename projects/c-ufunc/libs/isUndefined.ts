/**
 * Checks if string is a number
 *
 * @param   value  - Value to be evaluated.
 *
 * @returns Returns true if value is a undefined.
 *
 * @usage
 * `import \{ isUndefined \} from "c-ufunc/libs/isUndefined"`
 *
 * @example
 * ```
 * isUndefined(undefined) // true
 * isUndefined(null) // fasle
 * isUndefined('hello') // fasle
 *```
 */
export const isUndefined = <Value>(value: Value) => typeof value === 'undefined'

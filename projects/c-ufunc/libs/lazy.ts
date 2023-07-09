/**
 * @param fn    - Function to be wrapped.
 * @param args  - Function arguments.
 *
 * @returns Returns a function that can be lazy evaluated.
 *
 * @usage
 * import \{ lazy \} from "c-ufunc/libs/lazy"
 *
 * @example
 * ```
 * lazy((a: number, b: number) => a + b)(1, 2)(
 * // 3
 *
 * const sum  = (a: number) => lazy((b: number) => a + b)
 * sum(1)(2)()
 * // 3
 * ```
 */
export const lazy = <Fn extends Function>(fn: Fn) => {
  return <To>(...args: readonly unknown[]) =>
    (): To =>
      fn(...args)
}

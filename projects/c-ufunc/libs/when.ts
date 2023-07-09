import { ifFunction } from './ifFunction'

/**
 * Lazy evaluates a chain of test. Exits on first match.
 *
 * @param   test - value to be tested for equality with `expresstion`.
 * @param   then - if test is true then this is executed.
 * @returns Returns a object with `when`, `none` and `exec` methods.
 *
 * @method when
 * @param   test - value to be tested for equality with `expresstion`.
 * @param   then - if test is true then this is executed.
 * @returns Returns a object with `when`, `none`and `exec` methods.
 *
 * @method none
 * @param none -  value to be returned if all tests fail.
 * @returns Returns a object only the`exec` method.
 *
 * @method exec
 * @param expression - Expression to be tested.
 *
 * @usage
 * `import \{ when \} from "c-ufunc/libs/when"`
 *
 * @example
 * ```
 * when('upper', 'HELLO WORLD')
 *.when('snake', 'hello_world')
 *.none(null)
 *.exec('upper') // HELLO WORLD
 * ```
 */
export const when = <Test, Then>(...test: readonly [Test, Then]) => {
  const tests = [test]

  const evaluateTest =
    <None>(none: None) =>
    <Test, Then>(tests: readonly (readonly [Test, Then])[]) =>
    <Expresstion>(expresstion: Expresstion) => {
      // eslint-disable-next-line functional/no-loop-statement, functional/no-let
      for (let i = 0; i < tests.length; i++) {
        if (ifFunction(tests[i][0]) === ifFunction(expresstion)) {
          return ifFunction(tests[i][1])
        }
      }

      return ifFunction(none)
    }

  const none = <None>(none: None) => {
    return {
      exec: <Expresstion>(expresstion: Expresstion) =>
        evaluateTest(none)(tests)(expresstion),
    }
  }

  return {
    when: <Test, Then>(...test: readonly [Test, Then]) => {
      // eslint-disable-next-line functional/no-expression-statement, functional/immutable-data
      tests.push(test as any)
      return {
        when,
        none,
      }
    },

    none,
  }
}

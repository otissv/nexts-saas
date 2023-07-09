export const logger =
  (printer: (...logs: readonly unknown[]) => unknown) =>
  (...logs: readonly unknown[]) =>
  <Value>(value: Value): Value => {
    // eslint-disable-next-line functional/no-expression-statement
    printer(...logs)
    return value
  }

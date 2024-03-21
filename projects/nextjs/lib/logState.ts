export const logState = (...state: any[]) =>
  console.log(
    ...state.map((s) => {
      switch (typeof s) {
        case 'undefined':
        case 'string':
        case 'number':
        case 'boolean':
          return s
        default:
          return JSON.parse(JSON.stringify(s, undefined, 2))
      }
    })
  )

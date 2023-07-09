/* eslint-plugin-disable functional */

import { ifFunction } from './ifFunction'

describe('isError', () => {
  it('should return function restult', () => {
    expect(
      ifFunction(function () {
        return 'hello'
      })
    ).toBe('hello')
  })

  it('should return vlaue', () => {
    expect(ifFunction('hello')).toBe('hello')
  })
})

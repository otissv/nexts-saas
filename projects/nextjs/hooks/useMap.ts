import * as React from 'react'

import { createMap } from '@/lib/entries'

export type State = [
  Map<any, any>,
  <Data>(data: Data[]) => React.Dispatch<React.SetStateAction<Map<any, any>>>
]

export function useMap<Data>(data: Data[]) {
  const setMap = createMap('id')
  const map = setMap<Data>(data)

  const [state, setState] = React.useState(map)
  return [state, (data) => setState(setMap(data))] as State
}

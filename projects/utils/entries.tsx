export function entriesToArray<U>(callback: (obj: any) => U) {
  return <Obj extends { entries: () => IterableIterator<[any, any]> }>(
    obj: Obj
  ) => {
    let result = []
    let entries = obj.entries()
    for (let entry = entries.next(); !entry.done; entry = entries.next()) {
      result.push(callback(Object.fromEntries(entry.value[1])))
    }
    return result
  }
}

export function createMap<Key>(id: Key) {
  return <Data,>(data: Data[] | string) => {
    if (data instanceof Map) return new Map(data)

    const map = new Map()
    const input = typeof data === 'string' ? JSON.parse(data) : data

    for (const item of input) {
      map.set((item as any)[id], new Map(Object.entries(item)) as any)
    }
    return map
  }
}

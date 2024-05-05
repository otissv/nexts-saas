import { isEmpty } from 'c-ufunc/libs/isEmpty'

export function maybeToMap<Value>(value: Value) {
  return isEmpty(value)
    ? new Map<any, Value>()
    : new Map<any, Value>((value as any[]).entries())
}

export function mapToArray<TMap extends Map<string, any>>(map: TMap) {
  return [...(map || []).values()]
}

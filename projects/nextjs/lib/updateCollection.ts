export function updateCollection<Item>({
  list,
  data,
  fn,
}: {
  list: Item[]
  data: Item
  fn: (Item: Item) => boolean
}): Item[] {
  const itemIndexToUpdate = list.findIndex(fn)
  const item = { ...list.find(fn), ...data }

  switch (itemIndexToUpdate) {
    case 0:
      return [item, ...list.slice(1)]

    case list.length - 1:
      return [...list.slice(0, list.length - 1), item]

    case -1:
      return list

    default:
      return [
        ...list.slice(0, itemIndexToUpdate),
        item,
        ...list.slice(itemIndexToUpdate + 1),
      ]
  }
}

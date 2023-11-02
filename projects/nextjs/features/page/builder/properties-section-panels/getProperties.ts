import { PropertyBreakpoints } from '@/features/page/store/properties.store'

export function getProperty<Type extends { [key: string]: { class: string } }>({
  classNames,
  prop,
  breakpoint,
}: {
  classNames: string[]
  prop: Type
  breakpoint: PropertyBreakpoints
}) {
  const item = Object.entries(prop).filter(([_, item]) =>
    (classNames || []).includes(`${breakpoint}${item.class}`)
  )[0]

  return `${item?.[0] || ''}`
}

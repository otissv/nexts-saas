import { PropertyBreakpoints } from '@/features/page/store/properties.store'

export type ToggleProperty = (
  classNames: string[],
  removeClassNames: string[]
) => void
export type updateProperties = (className: string) => void

export type OptionValue = {
  class: string
  property: string
}

export interface PropertiesSectionPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  breakpoint: PropertyBreakpoints
  properties: string[]
  toggleProperties?: (classNames: string[], removeClassNames: string[]) => void
  updateProperties: (
    classNames: string[],
    values: Record<string, OptionValue>
  ) => void
}

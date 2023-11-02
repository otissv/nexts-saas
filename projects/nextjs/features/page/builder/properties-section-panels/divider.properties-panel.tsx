'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { AutoComplete, Option } from '@/components/auto-complete'
import { getProperty } from '@/features/page/builder/properties-section-panels/getProperties'
import {
  PropertiesContainer,
  PropertyLabel,
} from '@/features/page/builder/properties-panel-container'
import { cn } from '@/lib/utils'
import { PropertiesSectionPanelProps } from '@/features/page/builder/properties-section-panels/type.properties'

import borderStyleProperties from '@/features/page/builder/properties/borders/border-style.properties.json'
import divideColorProperties from '@/features/page/builder/properties/borders/divide-color.properties.json'
import divideWidthProperties from '@/features/page/builder/properties/borders/divide-width.properties.json'

const { borderStyle } = borderStyleProperties
const { divideColor } = divideColorProperties
const { divideWidth } = divideWidthProperties

export const DividerPropertiesPanel = ({
  breakpoint,
  properties,
  className,
  updateProperties,
}: PropertiesSectionPanelProps) => {
  return (
    <PropertiesContainer className={cn('border-b', className)}>
      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="item-1">
          <AccordionTrigger className="h-10">Divider</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PropertyLabel>Color</PropertyLabel>
              <AutoComplete
                id="divide-color"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: divideColor,
                })}
                options={Object.entries(divideColor).reduce(
                  (acc: Option[], [name, value]) => {
                    acc.push({
                      name,
                      children: name,
                      value: value.class,
                      property: value.property,
                    })
                    return acc
                  },
                  []
                )}
                onValueChange={(value) =>
                  updateProperties([value], divideColor)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Width</PropertyLabel>
              <AutoComplete
                id="divide-width"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: divideWidth,
                })}
                options={Object.entries(divideWidth).reduce(
                  (acc: Option[], [name, value]) => {
                    acc.push({
                      name,
                      children: name,
                      value: value.class,
                      property: value.property,
                    })
                    return acc
                  },
                  []
                )}
                onValueChange={(value) =>
                  updateProperties([value], divideWidth)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Style</PropertyLabel>
              <AutoComplete
                id="border-style"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: borderStyle,
                })}
                options={Object.entries(borderStyle).reduce(
                  (acc: Option[], [name, value]) => {
                    acc.push({
                      name,
                      children: name,
                      value: value.class,
                      property: value.property,
                    })
                    return acc
                  },
                  []
                )}
                onValueChange={(value) =>
                  updateProperties([value], borderStyle)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </PropertiesContainer>
  )
}
DividerPropertiesPanel.displayName = 'DividerPropertiesPanel'

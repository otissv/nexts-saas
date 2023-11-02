'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { AutoComplete, Option } from '@/components/auto-complete'
import { getProperty } from '@/features/page/builder/properties-section-panels/getProperties'
import { cn } from '@/lib/utils'
import {
  PropertiesContainer,
  PropertyLabel,
} from '@/features/page/builder/properties-panel-container'

import outlineColorProperties from '@/features/page/builder/properties/borders/outline-color.properties.json'
import outlineStyleProperties from '@/features/page/builder/properties/borders/outline-style.properties.json'
import outlineWidthProperties from '@/features/page/builder/properties/borders/outline-width.properties.json'
import { PropertiesSectionPanelProps } from '@/features/page/builder/properties-section-panels/type.properties'

const { outlineColor } = outlineColorProperties
const { outlineStyle } = outlineStyleProperties
const { outlineWidth } = outlineWidthProperties

export const OutlinePropertiesPanel = ({
  breakpoint,
  properties,
  className,
  updateProperties,
}: PropertiesSectionPanelProps) => {
  return (
    <PropertiesContainer className={cn('border-b', className)}>
      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="item-1">
          <AccordionTrigger className="h-10">Outline</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PropertyLabel>Color</PropertyLabel>
              <AutoComplete
                id="outline-color"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: outlineColor,
                })}
                options={Object.entries(outlineColor).reduce(
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
                  updateProperties([value], outlineColor)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Width</PropertyLabel>
              <AutoComplete
                id="outline-width"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: outlineWidth,
                })}
                options={Object.entries(outlineWidth).reduce(
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
                  updateProperties([value], outlineWidth)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Style</PropertyLabel>
              <AutoComplete
                id="outline-style"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: outlineStyle,
                })}
                options={Object.entries(outlineStyle).reduce(
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
                  updateProperties([value], outlineStyle)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </PropertiesContainer>
  )
}
OutlinePropertiesPanel.displayName = 'OutlinePropertiesPanel'

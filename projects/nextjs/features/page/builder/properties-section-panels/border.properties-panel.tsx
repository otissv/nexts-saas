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
import { PropertiesSectionPanelProps } from '@/features/page/builder/properties-section-panels/type.properties'

import borderColorProperties from '@/features/page/builder/properties/borders/border-color.properties.json'
import borderRadiusProperties from '@/features/page/builder/properties/borders/border-radius.properties.json'
import borderStyleProperties from '@/features/page/builder/properties/borders/border-style.properties.json'
import borderWidthProperties from '@/features/page/builder/properties/borders/border-width.properties.json'

const { borderColor } = borderColorProperties
const { borderRadius } = borderRadiusProperties
const { borderStyle } = borderStyleProperties
const { borderWidth } = borderWidthProperties

export const BorderPropertiesPanel = ({
  breakpoint,
  properties,
  className,
  updateProperties,
}: PropertiesSectionPanelProps) => {
  return (
    <PropertiesContainer heading="Border" className={cn('border-b', className)}>
      <div className="flex items-center mb-2">
        <PropertyLabel>Width</PropertyLabel>
        <AutoComplete
          id="border-width"
          value={getProperty({
            classNames: properties,
            breakpoint,
            prop: borderWidth,
          })}
          options={Object.entries(borderWidth).reduce(
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
          onValueChange={(value) => updateProperties([value], borderWidth)}
        />
      </div>

      <div className="flex items-center mb-2">
        <PropertyLabel>Color</PropertyLabel>
        <AutoComplete
          id="border-color"
          value={getProperty({
            classNames: properties,
            breakpoint,
            prop: borderColor,
          })}
          options={Object.entries(borderColor).reduce(
            (acc: Option[], [name, value]) => {
              // const color = value.property.match(/rgb\(([^\)]+)\)/)

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
          onValueChange={(value) => updateProperties([value], borderColor)}
        />
      </div>

      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="item-1">
          <AccordionTrigger className="h-10">
            More Border properties
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PropertyLabel>Radius</PropertyLabel>
              <AutoComplete
                id="border-radius"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: borderRadius,
                })}
                options={Object.entries(borderRadius).reduce(
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
                  updateProperties([value], borderRadius)
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
BorderPropertiesPanel.displayName = 'BorderPropertiesPanel'

'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import {
  PropertiesContainer,
  PropertyLabel,
} from '@/features/page/builder/properties-panel-container'
import { AutoComplete, Option } from '@/components/auto-complete'
import { getProperty } from '@/features/page/builder/properties-section-panels/getProperties'

import ringColorProperties from '@/features/page/builder/properties/borders/ring-color.properties.json'
import ringOffsetColorProperties from '@/features/page/builder/properties/borders/ring-offset-color.properties.json'
import ringOffsetWidthProperties from '@/features/page/builder/properties/borders/ring-offset-width.properties.json'
import ringWidthProperties from '@/features/page/builder/properties/borders/ring-width.properties.json'
import { PropertiesSectionPanelProps } from '@/features/page/builder/properties-section-panels/type.properties'

const { ringColor } = ringColorProperties
const { ringOffsetColor } = ringOffsetColorProperties
const { ringOffsetWidth } = ringOffsetWidthProperties
const { ringWidth } = ringWidthProperties

export const RingPropertiesPanel = ({
  breakpoint,
  properties,
  updateProperties,
}: PropertiesSectionPanelProps) => {
  return (
    <PropertiesContainer className="ring-b">
      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="item-1">
          <AccordionTrigger className="h-10">Ring</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PropertyLabel>Color</PropertyLabel>
              <AutoComplete
                id="ring-color"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: ringColor,
                })}
                options={Object.entries(ringColor).reduce(
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
                onValueChange={(value) => updateProperties([value], ringColor)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Offset Color</PropertyLabel>
              <AutoComplete
                id="ring-offsetC-color"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: ringOffsetColor,
                })}
                options={Object.entries(ringOffsetColor).reduce(
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
                  updateProperties([value], ringOffsetColor)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Width</PropertyLabel>
              <AutoComplete
                id="ring-width"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: ringWidth,
                })}
                options={Object.entries(ringWidth).reduce(
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
                onValueChange={(value) => updateProperties([value], ringWidth)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Offset Width</PropertyLabel>
              <AutoComplete
                id="ring-offset-width"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: ringOffsetWidth,
                })}
                options={Object.entries(ringOffsetWidth).reduce(
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
                  updateProperties([value], ringOffsetWidth)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </PropertiesContainer>
  )
}
RingPropertiesPanel.displayName = 'RingPropertiesPanel'

'use client'

import {
  PropertiesContainer,
  PropertyLabel,
} from '@/features/page/builder/properties-panel-container'
import { AutoComplete, Option } from '@/components/auto-complete'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getProperty } from '@/features/page/builder/properties-section-panels/getProperties'
import widthProperties from '@/features/page/builder/properties/sizing/width.properties.json'
import heightProperties from '@/features/page/builder/properties/sizing/height.properties.json'
import minWidthProperties from '@/features/page/builder/properties/sizing/min-width.properties.json'
import minHeightProperties from '@/features/page/builder/properties/sizing/min-height.properties.json'
import maxWidthProperties from '@/features/page/builder/properties/sizing/max-width.properties.json'
import maxHeightProperties from '@/features/page/builder/properties/sizing/max-height.properties.json'
import { PropertiesSectionPanelProps } from '@/features/page/builder/properties-section-panels/type.properties'

const { width } = widthProperties
const { height } = heightProperties
const { minWidth } = minWidthProperties
const { minHeight } = minHeightProperties
const { maxWidth } = maxWidthProperties
const { maxHeight } = maxHeightProperties

export const SizePropertiesPanel = ({
  breakpoint,
  properties,
  updateProperties,
}: PropertiesSectionPanelProps) => {
  return (
    <PropertiesContainer heading="Size">
      <div className="flex items-center mb-2">
        <PropertyLabel>Width</PropertyLabel>
        <AutoComplete
          id="width"
          value={getProperty({
            classNames: properties,
            breakpoint,
            prop: width,
          })}
          options={Object.entries(width).reduce(
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
          onValueChange={(value) => updateProperties([value], width)}
        />
      </div>

      <div className="flex items-center mb-2">
        <PropertyLabel>Height</PropertyLabel>
        <AutoComplete
          id="height"
          value={getProperty({
            classNames: properties,
            breakpoint,
            prop: height,
          })}
          options={Object.entries(height).reduce(
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
          onValueChange={(value) => updateProperties([value], height)}
        />
      </div>

      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="item-1">
          <AccordionTrigger className="h-10">
            More size properties
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PropertyLabel>Min Width</PropertyLabel>
              <AutoComplete
                id="min-width"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: minWidth,
                })}
                options={Object.entries(minWidth).reduce(
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
                onValueChange={(value) => updateProperties([value], minWidth)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Min Height</PropertyLabel>
              <AutoComplete
                id="min-height"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: minHeight,
                })}
                options={Object.entries(minHeight).reduce(
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
                onValueChange={(value) => updateProperties([value], minHeight)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Max Width</PropertyLabel>
              <AutoComplete
                id="max-width"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: maxWidth,
                })}
                options={Object.entries(maxWidth).reduce(
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
                onValueChange={(value) => updateProperties([value], maxWidth)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Max Height</PropertyLabel>
              <AutoComplete
                id="max-height"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: maxHeight,
                })}
                options={Object.entries(maxHeight).reduce(
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
                onValueChange={(value) => updateProperties([value], maxHeight)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </PropertiesContainer>
  )
}
SizePropertiesPanel.displayName = 'SizePropertiesPanel'

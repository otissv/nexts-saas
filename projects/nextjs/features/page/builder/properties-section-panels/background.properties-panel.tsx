'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { AutoComplete, Option } from '@/components/auto-complete'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { PropertiesSectionPanelProps } from '@/features/page/builder/properties-section-panels/type.properties'
import { getProperty } from '@/features/page/builder/properties-section-panels/getProperties'
import {
  PropertiesContainer,
  PropertyLabel,
} from '@/features/page/builder/properties-panel-container'

import backgroundAttachmentProperties from '@/features/page/builder/properties/backgrounds/background-attachment.properties.json'
import backgroundClipProperties from '@/features/page/builder/properties/backgrounds/background-clip.properties.json'
import backgroundColorProperties from '@/features/page/builder/properties/backgrounds/background-color.properties.json'
import backgroundOriginProperties from '@/features/page/builder/properties/backgrounds/background-origin.properties.json'
import backgroundPositionProperties from '@/features/page/builder/properties/backgrounds/background-position.properties.json'
import backgroundRepeatProperties from '@/features/page/builder/properties/backgrounds/background-repeat.properties.json'
import backgroundSizeProperties from '@/features/page/builder/properties/backgrounds/background-size.properties.json'

const { backgroundAttachment } = backgroundAttachmentProperties
const { backgroundClip } = backgroundClipProperties
const { backgroundColor } = backgroundColorProperties
const { backgroundOrigin } = backgroundOriginProperties
const { backgroundPosition } = backgroundPositionProperties
const { backgroundRepeat } = backgroundRepeatProperties
const { backgroundSize } = backgroundSizeProperties

export const BackgroundPropertiesPanel = ({
  breakpoint,
  properties,
  className,
  updateProperties,
}: PropertiesSectionPanelProps) => {
  return (
    <PropertiesContainer
      heading="Background"
      className={cn('border-b', className)}
    >
      <div className="flex items-center mb-2">
        <PropertyLabel>Color</PropertyLabel>
        <AutoComplete
          id="background-color"
          value={getProperty({
            classNames: properties,
            prop: backgroundColor,
            breakpoint,
          })}
          options={Object.entries(backgroundColor).reduce(
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
          onValueChange={(value) => updateProperties([value], backgroundColor)}
        />
      </div>

      <div className="flex items-center mb-2">
        <PropertyLabel>Url</PropertyLabel>
        <Input className="border-t-0 border-l-0 border-r-0 rounded-none" />
      </div>

      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="item-1">
          <AccordionTrigger className="h-10">
            More Background properties
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PropertyLabel>clip</PropertyLabel>
              <AutoComplete
                id="background-clip"
                value={getProperty({
                  classNames: properties,
                  prop: backgroundClip,
                  breakpoint,
                })}
                options={Object.entries(backgroundClip).reduce(
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
                  updateProperties([value], backgroundClip)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Attachment</PropertyLabel>
              <AutoComplete
                id="background-attachment"
                value={getProperty({
                  classNames: properties,
                  prop: backgroundAttachment,
                  breakpoint,
                })}
                options={Object.entries(backgroundAttachment).reduce(
                  (acc: Option[], [name, value], i) => {
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
                  updateProperties([value], backgroundAttachment)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Origin</PropertyLabel>
              <AutoComplete
                id="background-origin"
                value={getProperty({
                  classNames: properties,
                  prop: backgroundOrigin,
                  breakpoint,
                })}
                options={Object.entries(backgroundOrigin).reduce(
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
                  updateProperties([value], backgroundOrigin)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Position</PropertyLabel>
              <AutoComplete
                id="background-position"
                value={getProperty({
                  classNames: properties,
                  prop: backgroundPosition,
                  breakpoint,
                })}
                options={Object.entries(backgroundPosition).reduce(
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
                  updateProperties([value], backgroundPosition)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Size</PropertyLabel>
              <AutoComplete
                id="background-size"
                value={getProperty({
                  classNames: properties,
                  prop: backgroundSize,
                  breakpoint,
                })}
                options={Object.entries(backgroundSize).reduce(
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
                  updateProperties([value], backgroundSize)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Repeat</PropertyLabel>
              <AutoComplete
                id="background-repeat"
                value={getProperty({
                  classNames: properties,
                  prop: backgroundRepeat,
                  breakpoint,
                })}
                options={Object.entries(backgroundRepeat).reduce(
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
                  updateProperties([value], backgroundRepeat)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </PropertiesContainer>
  )
}
BackgroundPropertiesPanel.displayName = 'BackgroundPropertiesPanel'

'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { AutoComplete, Option } from '@/components/auto-complete'

import {
  PropertiesContainer,
  PropertyLabel,
} from '@/features/page/builder/properties-panel-container'
import { getProperty } from '@/features/page/builder/properties-section-panels/getProperties'

import { animation } from '@/features/page/builder/properties/transitions/animation.properties.json'
import { transitionDelay } from '@/features/page/builder/properties/transitions/transition-delay.properties.json'
import { transitionDuration } from '@/features/page/builder/properties/transitions/transition-duration.properties.json'
import { transitionProperty } from '@/features/page/builder/properties/transitions/transition-property.properties.json'
import { transitionTimingFunction } from '@/features/page/builder/properties/transitions/transition-timing-function.properties.json'
import { PropertiesSectionPanelProps } from '@/features/page/builder/properties-section-panels/type.properties'

export const EffectPropertiesPanel = ({
  breakpoint,
  properties,
  updateProperties,
}: PropertiesSectionPanelProps) => {
  return (
    <PropertiesContainer heading="Transition" className="effect-b">
      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="item-1">
          <AccordionTrigger className="h-10">Transitions</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PropertyLabel>Property</PropertyLabel>
              <AutoComplete
                id="transition-property"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: transitionProperty,
                })}
                options={Object.entries(transitionProperty).reduce(
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
                  updateProperties([value], transitionProperty)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Duration</PropertyLabel>
              <AutoComplete
                id="transition-duration"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: transitionDuration,
                })}
                options={Object.entries(transitionDuration).reduce(
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
                  updateProperties([value], transitionDuration)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Timing</PropertyLabel>
              <AutoComplete
                id="transition-timing-function"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: transitionTimingFunction,
                })}
                options={Object.entries(transitionTimingFunction).reduce(
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
                  updateProperties([value], transitionTimingFunction)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Delay</PropertyLabel>
              <AutoComplete
                id="transition-delay"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: transitionDelay,
                })}
                options={Object.entries(transitionDelay).reduce(
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
                  updateProperties([value], transitionDelay)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Animation</PropertyLabel>
              <AutoComplete
                id="animation"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: animation,
                })}
                options={Object.entries(animation).reduce(
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
                onValueChange={(value) => updateProperties([value], animation)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </PropertiesContainer>
  )
}
EffectPropertiesPanel.displayName = 'EffectPropertiesPanel'

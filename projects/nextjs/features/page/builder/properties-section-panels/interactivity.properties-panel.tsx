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

import accentColorProperties from '@/features/page/builder/properties/interactivity/accent-color.properties.json'
import appearanceProperties from '@/features/page/builder/properties/interactivity/appearance.properties.json'
import caretColorProperties from '@/features/page/builder/properties/interactivity/caret-color.properties.json'
import cursorProperties from '@/features/page/builder/properties/interactivity/cursor.properties.json'
import pointerEventsProperties from '@/features/page/builder/properties/interactivity/pointer-events.properties.json'
import resizeProperties from '@/features/page/builder/properties/interactivity/resize.properties.json'
import scrollBehaviorProperties from '@/features/page/builder/properties/interactivity/scroll-behavior.properties.json'
import scrollMarginProperties from '@/features/page/builder/properties/interactivity/scroll-margin.properties.json'
import scrollPaddingProperties from '@/features/page/builder/properties/interactivity/scroll-padding.properties.json'
import scrollSnapAlignProperties from '@/features/page/builder/properties/interactivity/scroll-snap-align.properties.json'
import scrollSnapStopProperties from '@/features/page/builder/properties/interactivity/scroll-snap-stop.properties.json'
import scrollSnapTypeProperties from '@/features/page/builder/properties/interactivity/scroll-snap-type.properties.json'
import touchActionProperties from '@/features/page/builder/properties/interactivity/touch-action.properties.json'
import userSelectProperties from '@/features/page/builder/properties/interactivity/user-select.properties.json'

const { accentColor } = accentColorProperties
const { appearance } = appearanceProperties
const { caretColor } = caretColorProperties
const { cursor } = cursorProperties
const { pointerEvents } = pointerEventsProperties
const { resize } = resizeProperties
const { scrollBehavior } = scrollBehaviorProperties
const { scrollMargin } = scrollMarginProperties
const { scrollPadding } = scrollPaddingProperties
const { scrollSnapAlign } = scrollSnapAlignProperties
const { scrollSnapStop } = scrollSnapStopProperties
const { scrollSnapType } = scrollSnapTypeProperties
const { touchAction } = touchActionProperties
const { userSelect } = userSelectProperties

export const InteractivityPropertiesPanel = ({
  breakpoint,
  properties,
  className,
  updateProperties,
}: PropertiesSectionPanelProps) => {
  return (
    <PropertiesContainer className={cn('border-b', className)}>
      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="Interactivity">
          <AccordionTrigger className="h-10">Interactivity</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PropertyLabel>Resize</PropertyLabel>
              <AutoComplete
                id="resize"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: resize,
                })}
                options={Object.entries(resize).reduce(
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
                onValueChange={(value) => updateProperties([value], resize)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Cursor</PropertyLabel>
              <AutoComplete
                id="cursor"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: cursor,
                })}
                options={Object.entries(cursor).reduce(
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
                onValueChange={(value) => updateProperties([value], cursor)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Events</PropertyLabel>
              <AutoComplete
                id="pointer-events"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: pointerEvents,
                })}
                options={Object.entries(pointerEvents).reduce(
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
                  updateProperties([value], pointerEvents)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>User Select</PropertyLabel>
              <AutoComplete
                id="user-select"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: userSelect,
                })}
                options={Object.entries(userSelect).reduce(
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
                onValueChange={(value) => updateProperties([value], userSelect)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Accent </PropertyLabel>
              <AutoComplete
                id="accent-color"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: accentColor,
                })}
                options={Object.entries(accentColor).reduce(
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
                  updateProperties([value], accentColor)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Appearance</PropertyLabel>
              <AutoComplete
                id="appearance"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: appearance,
                })}
                options={Object.entries(appearance).reduce(
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
                onValueChange={(value) => updateProperties([value], appearance)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Caret</PropertyLabel>
              <AutoComplete
                id="caret-color"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: caretColor,
                })}
                options={Object.entries(caretColor).reduce(
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
                onValueChange={(value) => updateProperties([value], caretColor)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Touch Action</PropertyLabel>
              <AutoComplete
                id="touch-action"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: touchAction,
                })}
                options={Object.entries(touchAction).reduce(
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
                  updateProperties([value], touchAction)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="Scroll">
          <AccordionTrigger className="h-10">Scroll</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PropertyLabel>Behavior</PropertyLabel>
              <AutoComplete
                id="scroll-behavior"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: scrollBehavior,
                })}
                options={Object.entries(scrollBehavior).reduce(
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
                  updateProperties([value], scrollBehavior)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Margin</PropertyLabel>
              <AutoComplete
                id="scroll-margin"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: scrollMargin,
                })}
                options={Object.entries(scrollMargin).reduce(
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
                  updateProperties([value], scrollMargin)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>padding</PropertyLabel>
              <AutoComplete
                id="scroll-padding"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: scrollPadding,
                })}
                options={Object.entries(scrollPadding).reduce(
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
                  updateProperties([value], scrollPadding)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Snap Align</PropertyLabel>
              <AutoComplete
                id="scroll-snap-align"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: scrollSnapAlign,
                })}
                options={Object.entries(scrollSnapAlign).reduce(
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
                  updateProperties([value], scrollSnapAlign)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Snap Stop</PropertyLabel>
              <AutoComplete
                id="scroll-snap-stop"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: scrollSnapStop,
                })}
                options={Object.entries(scrollSnapStop).reduce(
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
                  updateProperties([value], scrollSnapStop)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Snap Type</PropertyLabel>
              <AutoComplete
                id="scroll-snap-type"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: scrollSnapType,
                })}
                options={Object.entries(scrollSnapType).reduce(
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
                  updateProperties([value], scrollSnapType)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </PropertiesContainer>
  )
}
InteractivityPropertiesPanel.displayName = 'InteractivityPropertiesPanel'

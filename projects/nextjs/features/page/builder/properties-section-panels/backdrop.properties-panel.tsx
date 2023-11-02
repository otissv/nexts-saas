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
import { getProperty } from '@/features/page/builder/properties-section-panels/getProperties'
import { AutoComplete, Option } from '@/components/auto-complete'
import { cn } from '@/lib/utils'
import { PropertiesSectionPanelProps } from '@/features/page/builder/properties-section-panels/type.properties'

import backdropBlurProperties from '@/features/page/builder/properties/filters/backdrop-blur.properties.json'
import backdropBrightnessProperties from '@/features/page/builder/properties/filters/backdrop-brightness.properties.json'
import backdropContrastProperties from '@/features/page/builder/properties/filters/backdrop-contrast.properties.json'
import backdropGrayscaleProperties from '@/features/page/builder/properties/filters/backdrop-grayscale.properties.json'
import backdropHueRotateProperties from '@/features/page/builder/properties/filters/backdrop-hue-rotate.properties.json'
import backdropInvertProperties from '@/features/page/builder/properties/filters/backdrop-invert.properties.json'
import backdropOpacityProperties from '@/features/page/builder/properties/filters/backdrop-opacity.properties.json'
import backdropSaturateProperties from '@/features/page/builder/properties/filters/backdrop-saturate.properties.json'
import backdropSepiaProperties from '@/features/page/builder/properties/filters/backdrop-sepia.properties.json'

const { backdropBlur } = backdropBlurProperties
const { backdropBrightness } = backdropBrightnessProperties
const { backdropContrast } = backdropContrastProperties
const { backdropGrayscale } = backdropGrayscaleProperties
const { backdropHueRotate } = backdropHueRotateProperties
const { backdropInvert } = backdropInvertProperties
const { backdropOpacity } = backdropOpacityProperties
const { backdropSaturate } = backdropSaturateProperties
const { backdropSepia } = backdropSepiaProperties

export const BackdropPropertiesPanel = ({
  breakpoint,
  properties,
  className,
  updateProperties,
}: PropertiesSectionPanelProps) => {
  return (
    <PropertiesContainer className={cn('border-b', className)}>
      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="item-1">
          <AccordionTrigger className="h-10">Backdrop Filters</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PropertyLabel>Blur</PropertyLabel>
              <AutoComplete
                id="backdrop-blur"
                value={getProperty({
                  classNames: properties,
                  prop: backdropBlur,
                  breakpoint,
                })}
                options={Object.entries(backdropBlur).reduce(
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
                  updateProperties([value], backdropBlur)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Brightness</PropertyLabel>
              <AutoComplete
                id="backdrop-brightness"
                value={getProperty({
                  classNames: properties,
                  prop: backdropBrightness,
                  breakpoint,
                })}
                options={Object.entries(backdropBrightness).reduce(
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
                  updateProperties([value], backdropBrightness)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Contrast</PropertyLabel>
              <AutoComplete
                id="backdrop-contrast"
                value={getProperty({
                  classNames: properties,
                  prop: backdropContrast,
                  breakpoint,
                })}
                options={Object.entries(backdropContrast).reduce(
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
                  updateProperties([value], backdropContrast)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Grayscale</PropertyLabel>
              <AutoComplete
                id="backdrop-grayscale"
                value={getProperty({
                  classNames: properties,
                  prop: backdropGrayscale,
                  breakpoint,
                })}
                options={Object.entries(backdropGrayscale).reduce(
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
                  updateProperties([value], backdropGrayscale)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Hue Rotate</PropertyLabel>
              <AutoComplete
                id="backdrop-hue-rotate"
                value={getProperty({
                  classNames: properties,
                  prop: backdropHueRotate,
                  breakpoint,
                })}
                options={Object.entries(backdropHueRotate).reduce(
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
                  updateProperties([value], backdropHueRotate)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Invert</PropertyLabel>
              <AutoComplete
                id="backdrop-invert"
                value={getProperty({
                  classNames: properties,
                  prop: backdropInvert,
                  breakpoint,
                })}
                options={Object.entries(backdropInvert).reduce(
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
                  updateProperties([value], backdropInvert)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Opacity</PropertyLabel>
              <AutoComplete
                id="backdrop-opacity"
                value={getProperty({
                  classNames: properties,
                  prop: backdropOpacity,
                  breakpoint,
                })}
                options={Object.entries(backdropOpacity).reduce(
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
                  updateProperties([value], backdropOpacity)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Saturate</PropertyLabel>
              <AutoComplete
                id="backdrop-saturate"
                value={getProperty({
                  classNames: properties,
                  prop: backdropSaturate,
                  breakpoint,
                })}
                options={Object.entries(backdropSaturate).reduce(
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
                  updateProperties([value], backdropSaturate)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Sepia</PropertyLabel>
              <AutoComplete
                id="backdrop-sepia"
                value={getProperty({
                  classNames: properties,
                  prop: backdropSepia,
                  breakpoint,
                })}
                options={Object.entries(backdropSepia).reduce(
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
                  updateProperties([value], backdropSepia)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </PropertiesContainer>
  )
}
BackdropPropertiesPanel.displayName = 'BackdropPropertiesPanel'

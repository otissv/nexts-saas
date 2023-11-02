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

import backgroundBlendModeProperties from '@/features/page/builder/properties/effects/background-blend-mode.properties.json'
import boxShadowProperties from '@/features/page/builder/properties/effects/box-shadow.properties.json'
import boxShadowColorProperties from '@/features/page/builder/properties/effects/box-shadow-color.properties.json'
import mixBlendModeProperties from '@/features/page/builder/properties/effects/mix-blend-mode.properties.json'
import blurProperties from '@/features/page/builder/properties/filters/blur.properties.json'
import brightnessProperties from '@/features/page/builder/properties/filters/brightness.properties.json'
import contrastProperties from '@/features/page/builder/properties/filters/contrast.properties.json'
import dropShadowProperties from '@/features/page/builder/properties/filters/drop-shadow.properties.json'
import grayscaleProperties from '@/features/page/builder/properties/filters/grayscale.properties.json'
import hueRotateProperties from '@/features/page/builder/properties/filters/hue-rotate.properties.json'
import invertProperties from '@/features/page/builder/properties/filters/invert.properties.json'
import saturateProperties from '@/features/page/builder/properties/filters/saturate.properties.json'
import sepiaProperties from '@/features/page/builder/properties/filters/sepia.properties.json'

const { backgroundBlendMode } = backgroundBlendModeProperties
const { boxShadow } = boxShadowProperties
const { boxShadowColor } = boxShadowColorProperties
const { mixBlendMode } = mixBlendModeProperties
const { blur } = blurProperties
const { brightness } = brightnessProperties
const { contrast } = contrastProperties
const { dropShadow } = dropShadowProperties
const { grayscale } = grayscaleProperties
const { hueRotate } = hueRotateProperties
const { invert } = invertProperties
const { saturate } = saturateProperties
const { sepia } = sepiaProperties

export const EffectPropertiesPanel = ({
  breakpoint,
  properties,
  className,
  updateProperties,
}: PropertiesSectionPanelProps) => {
  return (
    <PropertiesContainer className={cn('border-b', className)}>
      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="item-1">
          <AccordionTrigger className="h-10">Effects</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PropertyLabel>Blend</PropertyLabel>
              <AutoComplete
                id="background-blend-mode"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: backgroundBlendMode,
                })}
                options={Object.entries(backgroundBlendMode).reduce(
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
                  updateProperties([value], backgroundBlendMode)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Mix Blend</PropertyLabel>
              <AutoComplete
                id="mix-blend-mode"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: mixBlendMode,
                })}
                options={Object.entries(mixBlendMode).reduce(
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
                  updateProperties([value], mixBlendMode)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Elevate</PropertyLabel>
              <AutoComplete
                id="box-shadow"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: boxShadow,
                })}
                options={Object.entries(boxShadow).reduce(
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
                onValueChange={(value) => updateProperties([value], boxShadow)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Elevate Color</PropertyLabel>
              <AutoComplete
                id="box-shadow-color"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: boxShadowColor,
                })}
                options={Object.entries(boxShadowColor).reduce(
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
                  updateProperties([value], boxShadowColor)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Blur</PropertyLabel>
              <AutoComplete
                id="blur"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: blur,
                })}
                options={Object.entries(blur).reduce(
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
                onValueChange={(value) => updateProperties([value], blur)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Brightness</PropertyLabel>
              <AutoComplete
                id="brightness"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: brightness,
                })}
                options={Object.entries(brightness).reduce(
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
                onValueChange={(value) => updateProperties([value], brightness)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Contrast</PropertyLabel>
              <AutoComplete
                id="brightness"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: contrast,
                })}
                options={Object.entries(contrast).reduce(
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
                onValueChange={(value) => updateProperties([value], contrast)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Drop Shadow</PropertyLabel>
              <AutoComplete
                id="drop-shadow"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: dropShadow,
                })}
                options={Object.entries(dropShadow).reduce(
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
                onValueChange={(value) => updateProperties([value], dropShadow)}
              />
            </div>
            <div className="flex items-center mb-2">
              <PropertyLabel>Grayscale</PropertyLabel>
              <AutoComplete
                id="grayscale"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: grayscale,
                })}
                options={Object.entries(grayscale).reduce(
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
                onValueChange={(value) => updateProperties([value], grayscale)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Hue Rotate</PropertyLabel>
              <AutoComplete
                id="hue-rotate"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: hueRotate,
                })}
                options={Object.entries(hueRotate).reduce(
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
                onValueChange={(value) => updateProperties([value], hueRotate)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Invert</PropertyLabel>
              <AutoComplete
                id="invert"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: invert,
                })}
                options={Object.entries(invert).reduce(
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
                onValueChange={(value) => updateProperties([value], invert)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Saturate</PropertyLabel>
              <AutoComplete
                id="saturate"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: saturate,
                })}
                options={Object.entries(saturate).reduce(
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
                onValueChange={(value) => updateProperties([value], saturate)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Sepia</PropertyLabel>
              <AutoComplete
                id="sepia"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: sepia,
                })}
                options={Object.entries(sepia).reduce(
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
                onValueChange={(value) => updateProperties([value], sepia)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </PropertiesContainer>
  )
}
EffectPropertiesPanel.displayName = 'EffectPropertiesPanel'

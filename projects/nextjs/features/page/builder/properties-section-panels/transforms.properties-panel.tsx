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

import rotateProperties from '@/features/page/builder/properties/transforms/rotate.properties.json'
import scaleProperties from '@/features/page/builder/properties/transforms/scale.properties.json'
import skewProperties from '@/features/page/builder/properties/transforms/skew.properties.json'
import translateProperties from '@/features/page/builder/properties/transforms/translate.properties.json'
import transformOriginProperties from '@/features/page/builder/properties/transforms/transform-origin.properties.json'
import { PropertiesSectionPanelProps } from '@/features/page/builder/properties-section-panels/type.properties'

const { rotate } = rotateProperties
const { scale } = scaleProperties
const { skew } = skewProperties
const { translate } = translateProperties
const { transformOrigin } = transformOriginProperties

export const TransformPropertiesPanel = ({
  breakpoint,
  properties,
  updateProperties,
}: PropertiesSectionPanelProps) => {
  return (
    <PropertiesContainer className="transform-b">
      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="item-1">
          <AccordionTrigger className="h-10">Transform</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PropertyLabel>Translate X</PropertyLabel>
              <AutoComplete
                id="translate-x"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: translate.x,
                })}
                options={Object.entries(translate.x).reduce(
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
                  updateProperties([value], translate.x)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Translate Y</PropertyLabel>
              <AutoComplete
                id="translate-y"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: translate.y,
                })}
                options={Object.entries(translate.y).reduce(
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
                  updateProperties([value], translate.y)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Rotate</PropertyLabel>
              <AutoComplete
                id="rotate"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: rotate,
                })}
                options={Object.entries(rotate).reduce(
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
                onValueChange={(value) => updateProperties([value], rotate)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Scale X</PropertyLabel>
              <AutoComplete
                id="scale-x"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: scale.x,
                })}
                options={Object.entries(scale.x).reduce(
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
                onValueChange={(value) => updateProperties([value], scale.x)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Scale Y</PropertyLabel>
              <AutoComplete
                id="scale-y"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: scale.y,
                })}
                options={Object.entries(scale.y).reduce(
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
                onValueChange={(value) => updateProperties([value], scale.y)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Skew X</PropertyLabel>
              <AutoComplete
                id="skew-x"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: skew.x,
                })}
                options={Object.entries(skew.x).reduce(
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
                onValueChange={(value) => updateProperties([value], skew.x)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Skew Y</PropertyLabel>
              <AutoComplete
                id="skew-y"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: skew.y,
                })}
                options={Object.entries(skew.y).reduce(
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
                onValueChange={(value) => updateProperties([value], skew.y)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Origin</PropertyLabel>
              <AutoComplete
                id="transform-origin"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: transformOrigin,
                })}
                options={Object.entries(transformOrigin).reduce(
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
                  updateProperties([value], transformOrigin)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </PropertiesContainer>
  )
}
TransformPropertiesPanel.displayName = 'TransformPropertiesPanel'

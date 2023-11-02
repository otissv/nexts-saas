'use client'

import React from 'react'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  CaseLower,
  CaseSensitive,
  CaseUpper,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { AutoComplete, Option } from '@/components/auto-complete'
import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group'
import { getProperty } from '@/features/page/builder/properties-section-panels/getProperties'

import fontSizeProperties from '@/features/page/builder/properties/typography/font-size.properties.json'
import fontVariantNumericProperties from '@/features/page/builder/properties/typography/font-variant-numeric.properties.json'
import fontWeightProperties from '@/features/page/builder/properties/typography/font-weight.properties.json'
import hyphensProperties from '@/features/page/builder/properties/typography/hyphens.properties.json'
import letterSpacingProperties from '@/features/page/builder/properties/typography/letter-spacing.properties.json'
import lineClampProperties from '@/features/page/builder/properties/typography/line-clamp.properties.json'
import lineHeightProperties from '@/features/page/builder/properties/typography/line-height.properties.json'
import textAlignProperties from '@/features/page/builder/properties/typography/text-align.properties.json'
import textColorProperties from '@/features/page/builder/properties/typography/text-color.properties.json'
import textDecorationProperties from '@/features/page/builder/properties/typography/text-decoration.properties.json'
import textDecorationColorProperties from '@/features/page/builder/properties/typography/text-decoration-color.properties.json'
import textDecorationStyleProperties from '@/features/page/builder/properties/typography/text-decoration-style.properties.json'
import textDecorationThicknessProperties from '@/features/page/builder/properties/typography/text-decoration-thickness.properties.json'
import textIndentProperties from '@/features/page/builder/properties/typography/text-indent.properties.json'
import textOverflowProperties from '@/features/page/builder/properties/typography/text-overflow.properties.json'
import textTransformProperties from '@/features/page/builder/properties/typography/text-transform.properties.json'
import whitespaceProperties from '@/features/page/builder/properties/typography/whitespace.properties.json'
import wordBreakProperties from '@/features/page/builder/properties/typography/word-break.properties.json'
import {
  PropertiesContainer,
  PropertyLabel,
} from '@/features/page/builder/properties-panel-container'
import { PropertiesSectionPanelProps } from '@/features/page/builder/properties-section-panels/type.properties'

const { fontSize } = fontSizeProperties
const { fontVariantNumeric } = fontVariantNumericProperties
const { fontWeight } = fontWeightProperties
const { hyphens } = hyphensProperties
const { letterSpacing } = letterSpacingProperties
const { lineClamp } = lineClampProperties
const { lineHeight } = lineHeightProperties
const { textAlign } = textAlignProperties
const { textColor } = textColorProperties
const { textDecoration } = textDecorationProperties
const { textDecorationColor } = textDecorationColorProperties
const { textDecorationStyle } = textDecorationStyleProperties
const { textDecorationThickness } = textDecorationThicknessProperties
const { textIndent } = textIndentProperties
const { textOverflow } = textOverflowProperties
const { textTransform } = textTransformProperties
const { whitespace } = whitespaceProperties
const { wordBreak } = wordBreakProperties

export const TextPropertiesPanel = ({
  breakpoint,
  properties,
  updateProperties,
  toggleProperties,
}: PropertiesSectionPanelProps) => {
  const handleOnPropertyToggleClick =
    (className: string[], removeClassName: string[]) => () => {
      toggleProperties(className, removeClassName)
      return className
    }

  return (
    <PropertiesContainer heading="Text">
      <div className="flex items-center mb-2">
        <PropertyLabel>Font</PropertyLabel>
      </div>

      <div className="flex items-center mb-2">
        <PropertyLabel>Size</PropertyLabel>
        <AutoComplete
          id="font-size"
          value={getProperty({
            classNames: properties,
            breakpoint,
            prop: fontSize,
          })}
          options={Object.entries(fontSize).reduce(
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
          onValueChange={(value) => updateProperties([value], fontSize)}
        />
      </div>
      <div className="flex items-center mb-2">
        <PropertyLabel>Weight</PropertyLabel>
        <AutoComplete
          id="font-weight"
          value={getProperty({
            classNames: properties,
            breakpoint,
            prop: fontWeight,
          })}
          options={Object.entries(fontWeight).reduce(
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
          onValueChange={(value) => updateProperties([value], fontWeight)}
        />
      </div>

      <div className="flex items-center mb-2">
        <PropertyLabel>Color</PropertyLabel>
        <AutoComplete
          id="text-color"
          value={getProperty({
            classNames: properties,
            breakpoint,
            prop: textColor,
          })}
          options={Object.entries(textColor).reduce(
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
          onValueChange={(value) => updateProperties([value], textColor)}
        />
      </div>

      <div className="flex items-center mb-2">
        <PropertyLabel>Style</PropertyLabel>
      </div>

      <div className="flex items-center mb-2">
        <PropertyLabel>Transform</PropertyLabel>
        <ToggleGroup className="w-[170px]" type="single" label="Text Alignment">
          <ToggleGroupItem
            className="w-full p-2"
            label="Uppercase"
            value="uppercase"
            onClick={handleOnPropertyToggleClick(
              [textTransform.uppercase.class],
              [textTransform.lowercase.class, textTransform.capitalize.class]
            )}
          >
            <CaseUpper />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full p-2"
            label="Lowercase"
            value="lowercase"
            onClick={handleOnPropertyToggleClick(
              [textTransform.lowercase.class],
              [textTransform.uppercase.class, textTransform.capitalize.class]
            )}
          >
            <CaseLower />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full p-2"
            label="Capitalize"
            value="capitalize"
            onClick={handleOnPropertyToggleClick(
              [textTransform.capitalize.class],
              [textTransform.uppercase.class, textTransform.lowercase.class]
            )}
          >
            <CaseSensitive />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center mb-2">
        <PropertyLabel>Align</PropertyLabel>
        <ToggleGroup
          className="w-[170px]"
          type="single"
          defaultValue="left"
          label="Text Alignment"
        >
          <ToggleGroupItem
            className="w-full p-2"
            label="Left aligned"
            value="left"
            onClick={handleOnPropertyToggleClick(
              [textAlign.left.class, textAlign.start.class],
              [
                textAlign.center.class,
                textAlign.right.class,
                textAlign.end.class,
                textAlign.justify.class,
              ]
            )}
          >
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full p-2"
            label="Center aligned"
            value="center"
            onClick={handleOnPropertyToggleClick(
              [textAlign.center.class],
              [
                textAlign.left.class,
                textAlign.start.class,
                textAlign.right.class,
                textAlign.end.class,
                textAlign.justify.class,
              ]
            )}
          >
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full p-2"
            label="Right aligned"
            value="right"
            onClick={handleOnPropertyToggleClick(
              [textAlign.right.class, textAlign.end.class],
              [
                textAlign.left.class,
                textAlign.start.class,
                textAlign.center.class,
                textAlign.justify.class,
              ]
            )}
          >
            <AlignRight />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-full p-2"
            label="justify aligned"
            value="justify"
            onClick={handleOnPropertyToggleClick(
              [textAlign.justify.class],
              [
                textAlign.left.class,
                textAlign.start.class,
                textAlign.center.class,
                textAlign.right.class,
                textAlign.end.class,
              ]
            )}
          >
            <AlignJustify />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center mb-2">
        <Accordion type="single" collapsible className="w-full text-xs">
          <AccordionItem value="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="h-10">
                More Text properties
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center mb-2">
                  <PropertyLabel>Vertical</PropertyLabel>
                </div>

                <div className="flex items-center mb-2">
                  <PropertyLabel>Indent</PropertyLabel>
                  <AutoComplete
                    id="text-indent"
                    value={getProperty({
                      classNames: properties,
                      breakpoint,
                      prop: textIndent,
                    })}
                    options={Object.entries(textIndent).reduce(
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
                      updateProperties([value], textIndent)
                    }
                  />
                </div>

                <div className="flex items-center mb-2">
                  <PropertyLabel>Smoothing</PropertyLabel>
                </div>

                <div className="flex items-center mb-2">
                  <PropertyLabel>Spacing</PropertyLabel>
                  <AutoComplete
                    id="letter-spacing"
                    value={getProperty({
                      classNames: properties,
                      breakpoint,
                      prop: letterSpacing,
                    })}
                    options={Object.entries(letterSpacing).reduce(
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
                      updateProperties([value], letterSpacing)
                    }
                  />
                </div>

                <div className="flex items-center mb-2">
                  <PropertyLabel>Height</PropertyLabel>
                  <AutoComplete
                    id="line-height"
                    value={getProperty({
                      classNames: properties,
                      breakpoint,
                      prop: lineHeight,
                    })}
                    options={Object.entries(lineHeight).reduce(
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
                      updateProperties([value], lineHeight)
                    }
                  />
                </div>

                <div className="flex items-center mb-2">
                  <PropertyLabel>Numeric</PropertyLabel>
                  <AutoComplete
                    id="font-variant-numeric"
                    value={getProperty({
                      classNames: properties,
                      breakpoint,
                      prop: fontVariantNumeric,
                    })}
                    options={Object.entries(fontVariantNumeric).reduce(
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
                      updateProperties([value], fontVariantNumeric)
                    }
                  />
                </div>

                <div className="flex items-center mb-2">
                  <PropertyLabel>Clamp</PropertyLabel>

                  <AutoComplete
                    id="line-clamp"
                    value={getProperty({
                      classNames: properties,
                      breakpoint,
                      prop: lineClamp,
                    })}
                    options={Object.entries(lineClamp).reduce(
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
                      updateProperties([value], lineClamp)
                    }
                  />
                </div>

                <div className="flex items-center mb-2">
                  <PropertyLabel>Decoration</PropertyLabel>

                  <AutoComplete
                    id="text-decoration"
                    value={getProperty({
                      classNames: properties,
                      breakpoint,
                      prop: textDecoration,
                    })}
                    options={Object.entries(textDecoration).reduce(
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
                      updateProperties([value], textDecoration)
                    }
                  />
                </div>

                <div className="flex items-center mb-2">
                  <PropertyLabel>Decoration Color</PropertyLabel>

                  <AutoComplete
                    id="text-decoration-color"
                    value={getProperty({
                      classNames: properties,
                      breakpoint,
                      prop: textDecorationColor,
                    })}
                    options={Object.entries(textDecorationColor).reduce(
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
                      updateProperties([value], textDecorationColor)
                    }
                  />
                </div>

                <div className="flex items-center mb-2">
                  <PropertyLabel>Decoration Style</PropertyLabel>

                  <AutoComplete
                    id="text-decoration-style"
                    value={getProperty({
                      classNames: properties,
                      breakpoint,
                      prop: textDecorationStyle,
                    })}
                    options={Object.entries(textDecorationStyle).reduce(
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
                      updateProperties([value], textDecorationStyle)
                    }
                  />
                </div>

                <div className="flex items-center mb-2">
                  <PropertyLabel>Decoration Thickness</PropertyLabel>

                  <AutoComplete
                    id="text-decoration-thickness"
                    value={getProperty({
                      classNames: properties,
                      breakpoint,
                      prop: textDecorationThickness,
                    })}
                    options={Object.entries(textDecorationThickness).reduce(
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
                      updateProperties([value], textDecorationThickness)
                    }
                  />
                </div>

                <div className="flex items-center mb-2">
                  <PropertyLabel>White Space</PropertyLabel>

                  <AutoComplete
                    id="whitespace"
                    value={getProperty({
                      classNames: properties,
                      breakpoint,
                      prop: whitespace,
                    })}
                    options={Object.entries(whitespace).reduce(
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
                      updateProperties([value], whitespace)
                    }
                  />
                </div>

                <div className="flex items-center mb-2">
                  <PropertyLabel>Word Break</PropertyLabel>

                  <AutoComplete
                    id="word-break"
                    value={getProperty({
                      classNames: properties,
                      breakpoint,
                      prop: wordBreak,
                    })}
                    options={Object.entries(wordBreak).reduce(
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
                      updateProperties([value], wordBreak)
                    }
                  />
                </div>

                <div className="flex items-center mb-2">
                  <PropertyLabel>Overflow</PropertyLabel>

                  <AutoComplete
                    id="text-overflow"
                    value={getProperty({
                      classNames: properties,
                      breakpoint,
                      prop: textOverflow,
                    })}
                    options={Object.entries(textOverflow).reduce(
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
                      updateProperties([value], textOverflow)
                    }
                  />
                </div>

                <div className="flex items-center  mb-2">
                  <PropertyLabel>Hyphens</PropertyLabel>

                  <AutoComplete
                    id="hyphens"
                    value={getProperty({
                      classNames: properties,
                      breakpoint,
                      prop: hyphens,
                    })}
                    options={Object.entries(hyphens).reduce(
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
                      updateProperties([value], hyphens)
                    }
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </AccordionItem>
        </Accordion>
      </div>
    </PropertiesContainer>
  )
}
TextPropertiesPanel.displayName = 'TextPropertiesPanel'

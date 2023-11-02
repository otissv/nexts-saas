'use client'

import {
  Expand,
  PanelBottomClose,
  PanelBottomOpen,
  PanelLeftOpen,
  PanelRightClose,
  Shrink,
  WrapText,
} from 'lucide-react'
import React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { AutoComplete, Option } from '@/components/auto-complete'
import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group'
import {
  PropertiesContainer,
  PropertyLabel,
} from '@/features/page/builder/properties-panel-container'
import { cn } from '@/lib/utils'
import { getProperty } from '@/features/page/builder/properties-section-panels/getProperties'

import aspectRatioProperties from '@/features/page/builder/properties/layout/aspect-ratio.properties.json'
import boxDecorationBreakProperties from '@/features/page/builder/properties/layout/box-decoration-break.properties.json'
import boxSizingProperties from '@/features/page/builder/properties/layout/box-sizing.properties.json'
import breakAfterProperties from '@/features/page/builder/properties/layout/break-after.properties.json'
import breakBeforeProperties from '@/features/page/builder/properties/layout/break-before.properties.json'
import breakInsideProperties from '@/features/page/builder/properties/layout/break-inside.properties.json'
import clearProperties from '@/features/page/builder/properties/layout/clear.properties.json'
import columnsProperties from '@/features/page/builder/properties/layout/columns.properties.json'
import containerProperties from '@/features/page/builder/properties/layout/container.properties.json'
import displayProperties from '@/features/page/builder/properties/layout/display.properties.json'
import floatsProperties from '@/features/page/builder/properties/layout/floats.properties.json'
import isolationProperties from '@/features/page/builder/properties/layout/isolation.properties.json'
import objectFitProperties from '@/features/page/builder/properties/layout/object-fit.properties.json'
import objectPositionProperties from '@/features/page/builder/properties/layout/object-position.properties.json'
import overflowProperties from '@/features/page/builder/properties/layout/overflow.properties.json'
import visibilityProperties from '@/features/page/builder/properties/layout/visibility.properties.json'
import zIndexProperties from '@/features/page/builder/properties/layout/z-index.properties.json'
import flexProperties from '@/features/page/builder/properties/flex-grid/flex.properties.json'
import flexBasisProperties from '@/features/page/builder/properties/flex-grid/flex-basis.properties.json'
import flexDirectionProperties from '@/features/page/builder/properties/flex-grid/flex-direction.properties.json'
import flexGrowProperties from '@/features/page/builder/properties/flex-grid/flex-grow.properties.json'
import flexShrinkProperties from '@/features/page/builder/properties/flex-grid/flex-shrink.properties.json'
import flexWrapProperties from '@/features/page/builder/properties/flex-grid/flex-wrap.properties.json'
import gridAutoColumnsProperties from '@/features/page/builder/properties/flex-grid/grid-auto-columns.properties.json'
import gridAutoFlowProperties from '@/features/page/builder/properties/flex-grid/grid-auto-flow.properties.json'
import gridAutoRowsProperties from '@/features/page/builder/properties/flex-grid/grid-auto-rows.properties.json'
import gridColumnProperties from '@/features/page/builder/properties/flex-grid/grid-column.properties.json'
import gridTemplateColumnsProperties from '@/features/page/builder/properties/flex-grid/grid-template-columns.properties.json'
import gridTemplateRowsProperties from '@/features/page/builder/properties/flex-grid/grid-template-rows.properties.json'
import orderProperties from '@/features/page/builder/properties/flex-grid/order.properties.json'
import { PropertiesSectionPanelProps } from '@/features/page/builder/properties-section-panels/type.properties'

const { aspectRatio } = aspectRatioProperties
const { boxDecorationBreak } = boxDecorationBreakProperties
const { boxSizing } = boxSizingProperties
const { breakAfter } = breakAfterProperties
const { breakBefore } = breakBeforeProperties
const { breakInside } = breakInsideProperties
const { clear } = clearProperties
const { columns } = columnsProperties
const { container } = containerProperties
const { display } = displayProperties
const { floats } = floatsProperties
const { isolation } = isolationProperties
const { objectFit } = objectFitProperties
const { objectPosition } = objectPositionProperties
const { overflow } = overflowProperties
const { visibility } = visibilityProperties
const { zIndex } = zIndexProperties
const { flex } = flexProperties
const { flexBasis } = flexBasisProperties
const { flexDirection } = flexDirectionProperties
const { flexGrow } = flexGrowProperties
const { flexShrink } = flexShrinkProperties
const { flexWrap } = flexWrapProperties
const { gridAutoColumns } = gridAutoColumnsProperties
const { gridAutoFlow } = gridAutoFlowProperties
const { gridAutoRows } = gridAutoRowsProperties
const { gridColumn } = gridColumnProperties
const { gridTemplateColumns } = gridTemplateColumnsProperties
const { gridTemplateRows } = gridTemplateRowsProperties
const { order } = orderProperties

export const LayoutPropertiesPanel = ({
  breakpoint,
  properties,
  className,
  updateProperties,
  toggleProperties,
}: PropertiesSectionPanelProps) => {
  const [layoutType, setLayoutType] = React.useState('')
  const isFlex = layoutType === 'flex' || layoutType === 'inline-flex'
  const isGrid = layoutType === 'grid' || layoutType === 'inline-grid'

  const handleOnPropertyToggleClick =
    (className: string[], removeClassName?: string[]) => () => {
      toggleProperties(className, removeClassName)
      return className
    }

  return (
    <PropertiesContainer heading="Layout" className={cn('border-b', className)}>
      <div className="flex items-center mb-2">
        <PropertyLabel>Display</PropertyLabel>
        <AutoComplete
          id="display"
          value={getProperty({
            classNames: properties,
            breakpoint,
            prop: display,
          })}
          options={Object.entries(display).reduce(
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
          onValueChange={(value) => {
            updateProperties([value], display)
            setLayoutType(value)
          }}
        />
      </div>
      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="flex">
          <AccordionTrigger className="h-10">Flex</AccordionTrigger>
          <AccordionContent>
            <div>
              <div className="flex  mb-2">
                <PropertyLabel>Grow/Shrink</PropertyLabel>

                <ToggleGroup
                  className="w-[170px]"
                  type="single"
                  label="Layout type"
                  disabled={!isFlex}
                >
                  <ToggleGroupItem
                    className="w-full p-2"
                    label="flex grow"
                    value="grow"
                    onClick={handleOnPropertyToggleClick(
                      [flexGrow[0].class],
                      [flexShrink[0].class]
                    )}
                  >
                    <Expand className="w-10" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="w-full p-2"
                    label="flex shrink"
                    value="shrink"
                    onClick={handleOnPropertyToggleClick(
                      [flexShrink[0].class],
                      [flexGrow[0].class]
                    )}
                  >
                    <Shrink className="w-10" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="flex  mb-2">
                <PropertyLabel>Wrap</PropertyLabel>

                <ToggleGroup
                  className="w-[170px]"
                  type="single"
                  label="Layout type"
                  disabled={!isFlex}
                >
                  <ToggleGroupItem
                    className="w-full"
                    label="flex wrap"
                    value="wrap"
                    onClick={handleOnPropertyToggleClick(
                      [flexWrap.wrap.class],
                      [flexWrap['wrap-reverse'].class, flexWrap.nowrap.class]
                    )}
                  >
                    <WrapText />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="w-full"
                    label="flex wrap reverse"
                    value="wrap-revere"
                    onClick={handleOnPropertyToggleClick(
                      [flexWrap['wrap-reverse'].class],
                      [flexWrap.wrap.class, flexWrap.nowrap.class]
                    )}
                  >
                    <WrapText className="scale-[-1]" />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="w-full"
                    label="no wrap"
                    value="nowrap"
                    onClick={handleOnPropertyToggleClick([
                      flexWrap.nowrap.class,
                      flexWrap.wrap.class,
                    ])}
                  >
                    No
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="flex mb-2">
                <PropertyLabel>Direction</PropertyLabel>
                <ToggleGroup
                  className="w-[170px]"
                  type="single"
                  defaultValue="row"
                  label="Flex Direction"
                  disabled={!isFlex}
                >
                  <ToggleGroupItem
                    className="w-full p-2"
                    label="flex row"
                    value="row"
                    onClick={handleOnPropertyToggleClick(
                      [flexDirection.row.class],
                      [
                        flexDirection.row.class,
                        flexDirection['col-reverse'].class,
                        flexDirection.reverse.class,
                      ]
                    )}
                  >
                    <PanelLeftOpen />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="w-full p-2"
                    label="flex column"
                    value="col"
                    onClick={handleOnPropertyToggleClick(
                      [flexDirection.col.class],
                      [
                        flexDirection.col.class,
                        flexDirection['col-reverse'].class,
                        flexDirection.reverse.class,
                      ]
                    )}
                  >
                    <PanelBottomClose />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="w-full p-2"
                    label="flex row reverse"
                    value="reverse"
                    onClick={handleOnPropertyToggleClick(
                      [flexDirection.reverse.class],
                      [
                        flexDirection.row.class,
                        flexDirection.col.class,
                        flexDirection.reverse.class,
                      ]
                    )}
                  >
                    <PanelRightClose />
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="w-full p-2"
                    label="flex col reverse"
                    value="col-reverse"
                    onClick={handleOnPropertyToggleClick(
                      [flexDirection['col-reverse'].class],
                      [
                        flexDirection.col.class,
                        flexDirection.row.class,
                        flexDirection.reverse.class,
                      ]
                    )}
                  >
                    <PanelBottomOpen />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="flex items-center mb-2">
                <PropertyLabel>Flex</PropertyLabel>
                <AutoComplete
                  disabled={!isFlex}
                  id="flex"
                  value={getProperty({
                    classNames: properties,
                    breakpoint,
                    prop: flex,
                  })}
                  options={Object.entries(flex).reduce(
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
                  onValueChange={(value) => updateProperties([value], flex)}
                />
              </div>

              <div className="flex items-center mb-2">
                <PropertyLabel>Bias</PropertyLabel>
                <AutoComplete
                  id="bias"
                  disabled={!isFlex}
                  value={getProperty({
                    classNames: properties,
                    breakpoint,
                    prop: flexBasis,
                  })}
                  options={Object.entries(flexBasis).reduce(
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
                    updateProperties([value], flexBasis)
                  }
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="grid">
          <AccordionTrigger className="h-10">Grid</AccordionTrigger>
          <AccordionContent>
            <div>
              <div className="flex items-center mb-2">
                <PropertyLabel>Columns</PropertyLabel>
                <AutoComplete
                  id="grid-template-columns"
                  value={getProperty({
                    classNames: properties,
                    breakpoint,
                    prop: gridTemplateColumns,
                  })}
                  disabled={!isGrid}
                  options={Object.entries(gridTemplateColumns).reduce(
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
                    updateProperties([value], gridTemplateColumns)
                  }
                />
              </div>

              <div className="flex items-center mb-2">
                <PropertyLabel>Column Span</PropertyLabel>
                <AutoComplete
                  id="grid-column"
                  value={getProperty({
                    classNames: properties,
                    breakpoint,
                    prop: gridColumn,
                  })}
                  options={Object.entries(gridColumn).reduce(
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
                    updateProperties([value], gridColumn)
                  }
                />
              </div>

              <div className="flex items-center mb-2">
                <PropertyLabel>Rows</PropertyLabel>
                <AutoComplete
                  id="grid-template-rows"
                  value={getProperty({
                    classNames: properties,
                    breakpoint,
                    prop: gridTemplateRows,
                  })}
                  disabled={!isGrid}
                  options={Object.entries(gridTemplateRows).reduce(
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
                    updateProperties([value], gridTemplateRows)
                  }
                />
              </div>

              <div className="flex items-center mb-2">
                <PropertyLabel>Auto Flow</PropertyLabel>
                <AutoComplete
                  id="gridAuto-flow"
                  value={getProperty({
                    classNames: properties,
                    breakpoint,
                    prop: gridAutoFlow,
                  })}
                  disabled={!isGrid}
                  options={Object.entries(gridAutoFlow).reduce(
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
                    updateProperties([value], gridAutoFlow)
                  }
                />
              </div>

              <div className="flex items-center mb-2">
                <PropertyLabel>Columns Auto</PropertyLabel>
                <AutoComplete
                  id="grid-auto-columns"
                  value={getProperty({
                    classNames: properties,
                    breakpoint,
                    prop: gridAutoColumns,
                  })}
                  disabled={!isGrid}
                  options={Object.entries(gridAutoColumns).reduce(
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
                    updateProperties([value], gridAutoColumns)
                  }
                />
              </div>

              <div className="flex items-center mb-2">
                <PropertyLabel>Rows Auto</PropertyLabel>
                <AutoComplete
                  id="grid-auto-rows"
                  disabled={!isGrid}
                  value={getProperty({
                    classNames: properties,
                    breakpoint,
                    prop: gridAutoRows,
                  })}
                  options={Object.entries(gridAutoRows).reduce(
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
                    updateProperties([value], gridAutoRows)
                  }
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="item-1">
          <AccordionTrigger className="h-10">
            More Layout Properties
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center mb-2">
              <PropertyLabel>Visibility</PropertyLabel>
              <AutoComplete
                id="visibility"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: visibility,
                })}
                options={Object.entries(visibility).reduce(
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
                onValueChange={(value) => updateProperties([value], visibility)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Overflow</PropertyLabel>
              <AutoComplete
                id="overflow"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: overflow,
                })}
                options={Object.entries(overflow).reduce(
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
                onValueChange={(value) => updateProperties([value], overflow)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Order</PropertyLabel>
              <AutoComplete
                id="order"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: order,
                })}
                options={Object.entries(order).reduce(
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
                onValueChange={(value) => updateProperties([value], order)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Overflow</PropertyLabel>
              <AutoComplete
                id="overflow"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: overflow,
                })}
                options={Object.entries(overflow).reduce(
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
                onValueChange={(value) => updateProperties([value], overflow)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Z Index</PropertyLabel>
              <AutoComplete
                id="z-index"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: zIndex,
                })}
                options={Object.entries(zIndex).reduce(
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
                onValueChange={(value) => updateProperties([value], zIndex)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Object Fit</PropertyLabel>
              <AutoComplete
                id="object-fit"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: objectFit,
                })}
                options={Object.entries(objectFit).reduce(
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
                onValueChange={(value) => updateProperties([value], objectFit)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Object Position</PropertyLabel>
              <AutoComplete
                id="object-position"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: objectPosition,
                })}
                options={Object.entries(objectPosition).reduce(
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
                  updateProperties([value], objectPosition)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Box sizing</PropertyLabel>
              <AutoComplete
                id="box-sizing"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: boxSizing,
                })}
                options={Object.entries(boxSizing).reduce(
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
                onValueChange={(value) => updateProperties([value], boxSizing)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Isolation</PropertyLabel>
              <AutoComplete
                id="isolation"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: isolation,
                })}
                options={Object.entries(isolation).reduce(
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
                onValueChange={(value) => updateProperties([value], isolation)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Aspect Ratio</PropertyLabel>
              <AutoComplete
                id="aspectR-ratio"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: aspectRatio,
                })}
                options={Object.entries(aspectRatio).reduce(
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
                  updateProperties([value], aspectRatio)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Container</PropertyLabel>
              <AutoComplete
                id="container"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: container,
                })}
                options={Object.entries(container).reduce(
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
                onValueChange={(value) => updateProperties([value], container)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Columns</PropertyLabel>
              <AutoComplete
                id="columns"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: columns,
                })}
                options={Object.entries(columns).reduce(
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
                onValueChange={(value) => updateProperties([value], columns)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Break After</PropertyLabel>
              <AutoComplete
                id="break-after"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: breakAfter,
                })}
                options={Object.entries(breakAfter).reduce(
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
                onValueChange={(value) => updateProperties([value], breakAfter)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Break Before</PropertyLabel>
              <AutoComplete
                id="break-before"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: breakBefore,
                })}
                options={Object.entries(breakBefore).reduce(
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
                  updateProperties([value], breakBefore)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Break Inside</PropertyLabel>
              <AutoComplete
                id="break-inside"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: breakInside,
                })}
                options={Object.entries(breakInside).reduce(
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
                  updateProperties([value], breakInside)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Decoration Break</PropertyLabel>
              <AutoComplete
                id="box-decoration-break"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: boxDecorationBreak,
                })}
                options={Object.entries(boxDecorationBreak).reduce(
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
                  updateProperties([value], boxDecorationBreak)
                }
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Float</PropertyLabel>
              <AutoComplete
                id="floats"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: floats,
                })}
                options={Object.entries(floats).reduce(
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
                onValueChange={(value) => updateProperties([value], floats)}
              />
            </div>

            <div className="flex items-center mb-2">
              <PropertyLabel>Clear</PropertyLabel>
              <AutoComplete
                id="clear"
                value={getProperty({
                  classNames: properties,
                  breakpoint,
                  prop: clear,
                })}
                options={Object.entries(clear).reduce(
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
                onValueChange={(value) => updateProperties([value], clear)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </PropertiesContainer>
  )
}
LayoutPropertiesPanel.displayName = 'LayoutPropertiesPanel'

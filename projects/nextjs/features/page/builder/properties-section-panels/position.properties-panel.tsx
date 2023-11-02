'use client'

import {
  PropertiesContainer,
  PropertyLabel,
} from '@/features/page/builder/properties-panel-container'
import { AutoComplete, Option } from '@/components/auto-complete'
import { getProperty } from '@/features/page/builder/properties-section-panels/getProperties'

import positionProperties from '@/features/page/builder/properties/layout/position.properties.json'
import topRightBottomLeftProperties from '@/features/page/builder/properties/layout/top-right-bottom-left.properties.json'
import { PropertiesSectionPanelProps } from '@/features/page/builder/properties-section-panels/type.properties'

const { top, left, right, bottom } = topRightBottomLeftProperties
const { position } = positionProperties

export const PositionPropertiesPanel = ({
  breakpoint,
  properties,
  updateProperties,
}: PropertiesSectionPanelProps) => {
  return (
    <PropertiesContainer heading="Position" className="border-b">
      <div className="flex items-center mb-2">
        <PropertyLabel>Type</PropertyLabel>
        <AutoComplete
          id="position"
          value={getProperty({
            classNames: properties,
            breakpoint,
            prop: position,
          })}
          options={Object.entries(position).reduce(
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
          onValueChange={(value) => updateProperties([value], position)}
        />
      </div>

      <div className="flex items-center mb-2">
        <PropertyLabel>Top</PropertyLabel>
        <AutoComplete
          id="top"
          value={getProperty({ classNames: properties, breakpoint, prop: top })}
          options={Object.entries(top).reduce(
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
          onValueChange={(value) => updateProperties([value], top)}
        />
      </div>

      <div className="flex items-center mb-2">
        <PropertyLabel>Right</PropertyLabel>
        <AutoComplete
          id="right"
          value={getProperty({
            classNames: properties,
            breakpoint,
            prop: right,
          })}
          options={Object.entries(right).reduce(
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
          onValueChange={(value) => updateProperties([value], right)}
        />
      </div>

      <div className="flex items-center mb-2">
        <PropertyLabel>Bottom</PropertyLabel>
        <AutoComplete
          id="bottom"
          value={getProperty({
            classNames: properties,
            breakpoint,
            prop: bottom,
          })}
          options={Object.entries(bottom).reduce(
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
          onValueChange={(value) => updateProperties([value], bottom)}
        />
      </div>

      <div className="flex items-center mb-2">
        <PropertyLabel>Left</PropertyLabel>
        <AutoComplete
          id="left"
          value={getProperty({
            classNames: properties,
            breakpoint,
            prop: left,
          })}
          options={Object.entries(left).reduce(
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
          onValueChange={(value) => updateProperties([value], left)}
        />
      </div>
    </PropertiesContainer>
  )
}
PositionPropertiesPanel.displayName = 'PositionPropertiesPanel'

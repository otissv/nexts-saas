'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

import { Laptop, Monitor, Smartphone, Tablet } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePropertiesStore } from '@/features/page/store/properties.store'

import { TextPropertiesPanel } from '@/features/page/builder/properties-section-panels/text.properties-panel'
import { PositionPropertiesPanel } from '@/features/page/builder/properties-section-panels/position.properties-panel'
import { SizePropertiesPanel } from '@/features/page/builder/properties-section-panels/size.panel-properties'
import { BackgroundPropertiesPanel } from '@/features/page/builder/properties-section-panels/background.properties-panel'
import { BorderPropertiesPanel } from '@/features/page/builder/properties-section-panels/border.properties-panel'
import { OutlinePropertiesPanel } from '@/features/page/builder/properties-section-panels/outline.properties-panel'
import { DividerPropertiesPanel } from '@/features/page/builder/properties-section-panels/divider.properties-panel'
import { RingPropertiesPanel } from '@/features/page/builder/properties-section-panels/ring.properties-panel'
import { EffectPropertiesPanel } from '@/features/page/builder/properties-section-panels/effect.properties-panel'
import { BackdropPropertiesPanel } from '@/features/page/builder/properties-section-panels/backdrop.properties-panel'
import { LayoutPropertiesPanel } from '@/features/page/builder/properties-section-panels/layout.properties-panel'
import { InteractivityPropertiesPanel } from '@/features/page/builder/properties-section-panels/interactivity.properties-panel'
import { TransformPropertiesPanel } from '@/features/page/builder/properties-section-panels/transforms.properties-panel'
import { PseudoPropertiesPanel } from '@/features/page/builder/properties-section-panels/pseudo-panel'
import { OptionValue } from '@/features/page/builder/properties-section-panels/type.properties'
import { usePageStore } from '@/features/page/store/page.store'

export type Breakpoints = 'md' | 'lg' | 'xl'

export interface PropertiesPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {}

// TODO: gradients

export const PropertiesPanel = ({
  className,
  ...props
}: PropertiesPanelProps) => {
  const { setBreakpoint, breakpoint, pseudo, state } = usePropertiesStore()
  const { updateClassNames } = usePageStore()

  const updateProperties = (
    className: string[],
    values: Record<string, OptionValue>
  ) => {
    updateClassNames(
      className.map((name) => `${breakpoint}${pseudo}${state}${name}`),
      Object.values(values).reduce((acc, value) => {
        if (className.includes(value.class)) return acc
        acc.push(`${breakpoint}${value.class}`)
        return acc
      }, [])
    )
  }

  const toggleProperties = (
    className: string[],
    removeClassName: string[] = []
  ) => {
    updateClassNames(
      className.map((name) => `${breakpoint}${pseudo}${state}${name}`),
      removeClassName.map((name) => `${breakpoint}${pseudo}${state}${name}`)
    )
  }

  return (
    <div
      className={cn('flex flex-col h-full overflow-y-auto border-l', className)}
      {...props}
    >
      <div className="flex flex-col h-full border-l p-2">
        <Tabs
          value={breakpoint === '' ? 'sm' : breakpoint.replace(':', '')}
          className="relative w-full flex flex-col "
        >
          <TabsList className="flex w-auto grid-cols-3">
            <TabsTrigger
              value="sm"
              className="w-full"
              onClick={() => setBreakpoint('')}
            >
              <Smartphone />
            </TabsTrigger>
            <TabsTrigger
              value="md"
              className="w-full"
              onClick={() => setBreakpoint('md:')}
            >
              <Tablet />
            </TabsTrigger>
            <TabsTrigger
              value="lg"
              className="w-full"
              onClick={() => setBreakpoint('lg:')}
            >
              <Laptop />
            </TabsTrigger>
            <TabsTrigger
              value="xl"
              className="w-full"
              onClick={() => setBreakpoint('xl:')}
            >
              <Monitor />
            </TabsTrigger>
          </TabsList>
          <TabsContent className="px-2" value="sm">
            <Panels
              updateProperties={updateProperties}
              toggleProperties={toggleProperties}
            />
          </TabsContent>

          <TabsContent className="px-2" value="md">
            <Panels
              updateProperties={updateProperties}
              toggleProperties={toggleProperties}
            />
          </TabsContent>

          <TabsContent className="px-2" value="lg">
            <Panels
              updateProperties={updateProperties}
              toggleProperties={toggleProperties}
            />
          </TabsContent>

          <TabsContent className="px-2" value="xl">
            <Panels
              updateProperties={updateProperties}
              toggleProperties={toggleProperties}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
PropertiesPanel.displayName = 'PropertiesPanel'

export interface PanelsProps {
  updateProperties: (
    className: string[],
    values: Record<string, OptionValue>
  ) => void
  toggleProperties: (className: string[], removeClassName?: string[]) => void
}

export const Panels = ({ updateProperties, toggleProperties }: PanelsProps) => {
  const { getPageLayout } = usePageStore()
  const { breakpoint } = usePropertiesStore()

  const selectedProperties = getPageLayout().selectedProperties

  return (
    <>
      <PseudoPropertiesPanel
        breakpoint={breakpoint}
        className="mt-2"
        properties={selectedProperties}
      />
      <PositionPropertiesPanel
        breakpoint={breakpoint}
        className="mt-2"
        properties={selectedProperties}
        updateProperties={updateProperties}
      />
      <SizePropertiesPanel
        breakpoint={breakpoint}
        className="mt-2"
        properties={selectedProperties}
        updateProperties={updateProperties}
      />
      <LayoutPropertiesPanel
        breakpoint={breakpoint}
        className="mt-2"
        properties={selectedProperties}
        updateProperties={updateProperties}
        toggleProperties={toggleProperties}
      />
      <TextPropertiesPanel
        breakpoint={breakpoint}
        className="mt-2"
        properties={selectedProperties}
        updateProperties={updateProperties}
        toggleProperties={toggleProperties}
      />
      <BackgroundPropertiesPanel
        breakpoint={breakpoint}
        className="mt-2"
        properties={selectedProperties}
        updateProperties={updateProperties}
      />
      <BorderPropertiesPanel
        breakpoint={breakpoint}
        className="mt-2"
        properties={selectedProperties}
        updateProperties={updateProperties}
      />
      <TransformPropertiesPanel
        breakpoint={breakpoint}
        className="mt-2"
        properties={selectedProperties}
        updateProperties={updateProperties}
      />
      <EffectPropertiesPanel
        breakpoint={breakpoint}
        className="mt-2"
        properties={selectedProperties}
        updateProperties={updateProperties}
      />
      <BackdropPropertiesPanel
        breakpoint={breakpoint}
        className="mt-2"
        properties={selectedProperties}
        updateProperties={updateProperties}
      />
      <OutlinePropertiesPanel
        breakpoint={breakpoint}
        className="mt-2"
        properties={selectedProperties}
        updateProperties={updateProperties}
      />
      <DividerPropertiesPanel
        breakpoint={breakpoint}
        className="mt-2"
        properties={selectedProperties}
        updateProperties={updateProperties}
      />
      <RingPropertiesPanel
        breakpoint={breakpoint}
        className="mt-2"
        properties={selectedProperties}
        updateProperties={updateProperties}
      />
      <InteractivityPropertiesPanel
        breakpoint={breakpoint}
        className="mt-2"
        properties={selectedProperties}
        updateProperties={updateProperties}
      />
    </>
  )
}
Panels.displayName = 'Panels'

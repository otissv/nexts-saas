'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group'
import { PropertiesContainer } from '@/features/page/builder/properties-panel-container'
import { usePropertiesStore } from '@/features/page/store/properties.store'
import { PropertiesSectionPanelProps } from '@/features/page/builder/properties-section-panels/type.properties'

export interface PseudoPropertiesPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const PseudoPropertiesPanel = ({}: PropertiesSectionPanelProps) => {
  const { setState, setPseudoType } = usePropertiesStore()

  return (
    <PropertiesContainer>
      <Accordion type="single" collapsible className="w-full text-xs">
        <AccordionItem value="item-1">
          <AccordionTrigger className="h-10">Pseudo</AccordionTrigger>
          <AccordionContent>
            <ToggleGroup
              className="w-full flex justify-between mb-4"
              type="multiple"
              label="Element/pseudo-element"
            >
              <ToggleGroupItem
                className="w-full"
                label="Before"
                value="before"
                onClick={() => setPseudoType('before:')}
              >
                Before
              </ToggleGroupItem>
              <ToggleGroupItem
                className="w-full"
                label="After"
                value="after"
                onClick={() => setPseudoType('after:')}
              >
                After
              </ToggleGroupItem>
            </ToggleGroup>

            <ToggleGroup
              className="w-full flex justify-between"
              type="single"
              defaultValue="left"
              label="Element States"
            >
              <ToggleGroupItem
                label="Hover"
                value="hover"
                onClick={() => setState('hover:')}
              >
                Hover
              </ToggleGroupItem>
              <ToggleGroupItem
                label="Focus"
                value="focus"
                onClick={() => setState('focus:')}
              >
                Focus
              </ToggleGroupItem>
              <ToggleGroupItem
                label="Active"
                value="active"
                onClick={() => setState('active:')}
              >
                Active
              </ToggleGroupItem>
            </ToggleGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </PropertiesContainer>
  )
}
PseudoPropertiesPanel.displayName = 'PseudoPropertiesPanel'

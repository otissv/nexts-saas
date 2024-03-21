'use client'

import React from 'react'
import {
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
} from '@udecode/plate-basic-marks'
import { createBlockquotePlugin } from '@udecode/plate-block-quote'
import { createCodeBlockPlugin } from '@udecode/plate-code-block'
import { Plate, PlatePlugin, Value } from '@udecode/plate-common'
import { createHeadingPlugin } from '@udecode/plate-heading'
import { createParagraphPlugin } from '@udecode/plate-paragraph'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { env } from 'env'

const { isDev } = env()

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Editor } from '@/components/plate-ui/editor'
import { plugins } from '@/components/plate-ui/plugins'
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
import { CommentsPopover } from '@/components/plate-ui/comments-popover'
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'
import { MentionCombobox } from '@/components/plate-ui/mention-combobox'
import { TooltipProvider } from '@/components/plate-ui/tooltip'
const initialValue = [
  {
    type: 'p',
    children: [
      {
        text: 'This is editable plain text with react and history plugins, just like a <textarea>!',
      },
    ],
  },
]

export default function BlogPage() {
  const [debugValue, setDebugValue] = React.useState<Value>(initialValue)

  return (
    <DndProvider backend={HTML5Backend}>
      <TooltipProvider>
        <Plate
          plugins={plugins}
          initialValue={initialValue}
          onChange={(newValue) => {
            setDebugValue(newValue)
            // save newValue...
          }}
        >
          <FixedToolbar>
            <FixedToolbarButtons hasInsert hasEdit />
          </FixedToolbar>

          <Editor className="rounded-t-none" placeholder="Type..." />

          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>
          <MentionCombobox items={[]} />
          <CommentsPopover />

          {isDev && (
            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="manual-installation">
                <AccordionTrigger>Debug Value</AccordionTrigger>
                <AccordionContent>
                  {JSON.stringify(debugValue)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </Plate>
      </TooltipProvider>
    </DndProvider>
  )
}
BlogPage.displayName = 'BlogPage'

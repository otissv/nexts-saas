'use client'

import React from 'react'
import { Expand } from 'lucide-react'
import { Plate, Value } from '@udecode/plate-common'

import { plugins } from '@/components/plate-ui/plugins'
import { Editor } from '@/components/plate-ui/editor'
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
import { TooltipProvider } from '@/components/plate-ui/tooltip'

import { CmsField } from '../cms-config'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@/components/plate-ui/popover'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export type RichTextFieldProps = CmsField<HTMLInputElement> & {
  hasInsert?: boolean
  value: Value
  onUpdate: (newValue: Value) => void
}
export function RichTextField({
  value,
  onBlur,
  errorMessage,
  className,
  fieldId,
  isSelected,
  hasInsert,
  validate,
  isInline,
  onUpdate,
}: RichTextFieldProps) {
  const [expand, setExpand] = React.useState(false)

  const EditorField = () => (
    <TooltipProvider>
      <Plate plugins={plugins} initialValue={value} onChange={onUpdate}>
        <FixedToolbar className="rounded-b-none  py-1">
          <FixedToolbarButtons hasInsert={hasInsert} />

          {isInline && hasInsert && (
            <Button
              variant="ghost"
              className="h-10 w-10 p-0 mx-1"
              onClick={() => setExpand(!expand)}
            >
              <Expand className="h-4 w-4" />
            </Button>
          )}
        </FixedToolbar>

        <Editor className="rounded-t-none " placeholder="Type..." />

        {/* <FloatingToolbar>
      <FloatingToolbarButtons />
    </FloatingToolbar> */}
        {/* <MentionCombobox items={[]} />
      <CommentsPopover /> */}

        {/* {isDebug && isDev && (
          <Accordion type="single" collapsible className="">
            <AccordionItem value="manual-installation">
              <AccordionTrigger>Debug Value</AccordionTrigger>
              <AccordionContent>{JSON.stringify(debugValue)}</AccordionContent>
            </AccordionItem>
          </Accordion>
        )} */}
      </Plate>
    </TooltipProvider>
  )

  return isInline ? (
    <Popover>
      <PopoverTrigger asChild>
        <Input
          className={cn(
            'min-w-48 max-w-96 flex align-start p-2 text-start rounded-none border focus:border-white focus:bg-gray-900 cursor-text',
            className,
            isInline && 'border-t-0',
            isSelected && 'bg-gray-800'
          )}
          value={value?.[0].children?.[0]?.text}
          onChange={() => {}}
          onBlur={onBlur}
        />
      </PopoverTrigger>

      <style>{`.richContent { left: calc(50vw - (1080px/2)); }`}</style>

      <PopoverContent
        className={cn(
          'w-full p-0 min-w-80',
          expand && hasInsert && 'relative  w-[1080px] h-[calc(100vh - 120px)]',
          expand && hasInsert && 'richContent '
        )}
      >
        <EditorField />
      </PopoverContent>
    </Popover>
  ) : (
    <EditorField />
  )
}

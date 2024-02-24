'use client'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export const Document = ({ columns = [], values }) => {
  return (
    <div>
      <h1>{values.title}</h1>

      <Button variant="outline">Add Item</Button>
      <Button variant="outline">Manage Fields</Button>

      <form className="max-w-[1280px] mx-auto">
        {columns.map(({ fieldId, displayName, type }) => {
          return (
            <div key={fieldId}>
              {getInputField({
                type,
                value: values[fieldId],
                onBlur: () => {},
                setValue: () => {},
                displayName,
                fieldId,
              })}
            </div>
          )
        })}

        <Button variant="outline">Add Item</Button>

        <Button variant="outline">Cancel</Button>

        <Button className="w-auto">Save</Button>
      </form>
    </div>
  )
}

function getInputField({
  type,
  value,
  onBlur,
  setValue,
  fieldId,
  displayName,
}) {
  switch (type) {
    case 'rich-text':
      return (
        <RichTextInput
          value={value}
          onBlur={onBlur}
          setValue={setValue}
          fieldId={fieldId}
          displayName={displayName}
        />
      )
    case 'text':
    case 'number':

    default:
      return (
        <TextInput
          value={value}
          onBlur={onBlur}
          setValue={setValue}
          displayName={displayName}
          displayName={displayName}
        />
      )
  }
}

export function TextInput({
  value,
  onBlur,
  className,
  setValue,
  fieldId,
  displayName,
}) {
  return (
    <div>
      <Label htmlFor={fieldId}>{displayName}</Label>
      <Input
        id={fieldId}
        className={cn(
          'p-4 border focus:border-white focus:bg-gray-900',
          className
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    </div>
  )
}
export function RichTextInput({
  value,
  onBlur,
  className,
  setValue,
  fieldId,
  displayName,
}) {
  return (
    <div>
      <Label htmlFor={fieldId}>{displayName}</Label>

      <Textarea
        className={cn(
          'p-4 border focus:border-white focus:bg-gray-900',
          className
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    </div>
  )
}

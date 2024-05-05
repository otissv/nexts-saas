'use client'

import React from 'react'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxList,
} from '@/components/combobox'
import { CmsField, GetFieldComponent } from '../cms-config'
import { deepCompareObjects } from '@/lib/compareCollections'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { SelectOption } from '../../cms.types'

export type SelectFieldItem = {
  id: string
  value: string
}
export type SelectFieldValue = {
  value: string
  items: SelectFieldItem[]
}
export type SelectFieldProps = CmsField<HTMLInputElement> & {
  value: SelectFieldValue
  options: SelectFieldItem[]
  onUpdate: (value: SelectFieldValue) => void
}

export function SelectField({
  className,
  fieldId,
  isInline,
  validate,
  errorMessage,
  isSelected,
  value: initialValue = {
    value: '',
    items: [],
  },
  onUpdate,
  ...props
}: SelectFieldProps) {
  const [state, setValue] = React.useState<SelectFieldValue>(initialValue)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOnSelect = (value: string) => {
    setValue({
      ...state,
      value,
    })
  }

  React.useEffect(() => {
    if (!isOpen && !deepCompareObjects(state)(initialValue)) {
      onUpdate && onUpdate(state)
    }
  }, [isOpen])

  const options = initialValue.items.map(({ id, value }) => ({
    value: id,
    label: value,
  }))
  return (
    <Combobox
      {...props}
      options={options}
      value={state.value}
      placeholder={`Search ${fieldId}...`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className={cn(
        'min-w-48',
        isInline && 'rounded-none border-t-0',
        className
      )}
    >
      <ComboboxContent>
        <ComboboxInput placeholder="Filter..." />
        <ComboboxEmpty>{`${fieldId} not found.`}</ComboboxEmpty>
        <ComboboxGroup>
          <ComboboxList
            options={options}
            value={state.value}
            onSelect={handleOnSelect}
            setIsOpen={setIsOpen}
          />
        </ComboboxGroup>
      </ComboboxContent>
    </Combobox>
  )
}

export type SelectOptionsProps = {
  onUpdate: (props: Omit<SelectOption, 'type'>) => void
} & SelectOption
export function SelectOptions({
  defaultValue,
  canAddItems = true,
  selectType = 'single',
  items = [],
  onUpdate,
}: SelectOptionsProps) {
  const handleOnUpdate =
    (key: string) => (value: string | number | boolean) => {
      onUpdate &&
        onUpdate({
          defaultValue,
          canAddItems,
          items,
          selectType,
          [key]: value,
        })
    }

  return (
    <>
      <div className="mb-6">
        <Label htmlFor="defaultValue" className="flex mb-2">
          Default Value
        </Label>

        <Input
          id="defaultValue"
          value={defaultValue}
          onChange={handleOnUpdate('defaultValue')}
        />
      </div>

      <RadioGroup
        className="mb-6"
        defaultValue={selectType}
        onValueChange={handleOnUpdate('selectType')}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="single" id="single" />
          <Label htmlFor="single">Single item</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="multiple" id="multiple" />
          <Label htmlFor="multiple">Multiple items</Label>
        </div>
      </RadioGroup>

      {canAddItems ? (
        <div className="mb-6">
          <Label htmlFor="items" className="flex mb-2">
            Select List
          </Label>

          <GetFieldComponent
            id="items"
            type="tags"
            value={items}
            onUpdate={handleOnUpdate('items')}
          />
        </div>
      ) : null}
    </>
  )
}

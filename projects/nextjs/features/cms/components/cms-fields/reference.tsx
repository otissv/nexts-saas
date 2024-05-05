'use client'

import { Label } from '@/components/ui/label'
import { ReferenceOption } from '../../cms.types'
import { TagsSelectField, TagSelectFieldProps } from './tag-select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { GetFieldComponent } from '../cms-config'

export type ReferenceFieldProps = Omit<TagSelectFieldProps, 'type'> & {
  type?: 'reference' | 'multiReference'
  url: string
}

export function ReferenceField({
  url,
  type = 'reference',
  validate,
  errorMessage,
  ...props
}: ReferenceFieldProps) {
  return (
    <TagsSelectField
      {...(props as TagSelectFieldProps)}
      url={encodeURI(url).toString()}
      type={type === 'multiReference' ? 'multiple' : 'single'}
    />
  )
}

export type ReferenceOptionsProps = {
  type: 'reference' | 'multiReference'
  url: string
  onUpdate: (props: Omit<ReferenceOption, 'type'>) => void
} & ReferenceOption

export function ReferenceOptions({
  type = 'multiReference',
  defaultValue,
  canAddItems = true,
  selectType = 'single',
  items = [],
  onUpdate,
  url,
}: ReferenceOptionsProps) {
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

  const encodeURL = type === 'reference' ? encodeURI(url).toString() : undefined

  return (
    <>
      <div className="mb-6">
        <Label htmlFor="defaultValue" className="flex mb-2">
          Default Value
        </Label>

        <GetFieldComponent
          id="defaultValue"
          type={type}
          value={defaultValue}
          onUpdate={handleOnUpdate('defaultValue')}
          url={encodeURL}
        />
      </div>

      {canAddItems ? (
        <div className="mb-6">
          <Label htmlFor="items" className="flex mb-2">
            Select List
          </Label>

          <GetFieldComponent
            id="items"
            type="multiReference"
            value={items}
            onUpdate={handleOnUpdate('items')}
            url={encodeURL}
          />
        </div>
      ) : null}
    </>
  )
}

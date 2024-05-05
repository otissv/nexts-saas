'use client'

import React from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Building, Flag, Mail, MapPin, MapPinned } from 'lucide-react'
import { CmsField, GetFieldComponent } from '../cms-config'
import { deepCompareObjects } from '@/lib/compareCollections'
import { cn } from '@/lib/utils'
import { AddressOption, CmsCollectionColumn } from '../../cms.types'

type AddressFieldValue = {
  streetAddress: string
  secondaryAddress: string
  city: string
  state: string
  country: string
  zipCode: string
}
export type AddressInputFieldsProps = CmsField<HTMLInputElement> & {
  value: AddressFieldValue
  onUpdate: (newValue: AddressFieldValue) => void
  setValue: React.Dispatch<React.SetStateAction<AddressFieldValue>>
}

function AddressInputFields({
  value,
  fieldId,
  isSelected,
  errorMessage,
  setValue,
  validate,
}: AddressInputFieldsProps) {
  return (
    <>
      <div className="mb-4 grid gap-1">
        <Label
          className="flex items-center"
          htmlFor={fieldId && '-streetAddress'}
        >
          <MapPin className="h-4 w-4 inline-flex mr-2" /> Street Address
        </Label>
        <Input
          id={fieldId && '-streetAddress'}
          className={cn(
            'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
            isSelected && 'bg-gray-800'
          )}
          value={value.streetAddress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue({
              ...value,
              streetAddress: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-4 grid gap-1">
        <Label
          className="flex items-center"
          htmlFor={fieldId && '-secondStreetAddress'}
        >
          Address 2
        </Label>
        <Input
          id={fieldId && '-secondStreetAddress'}
          className={cn(
            'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
            isSelected && 'bg-gray-800'
          )}
          value={value.secondaryAddress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue({
              ...value,
              secondaryAddress: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-4 grid gap-1">
        <Label className="flex items-center" htmlFor={fieldId && '-city'}>
          <Building className="h-4 w-4 inline-flex mr-2" /> City
        </Label>
        <Input
          id={fieldId && '-city'}
          className={cn(
            'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
            isSelected && 'bg-gray-800'
          )}
          value={value.city}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue({
              ...value,
              city: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-4 grid gap-1">
        <Label className="flex items-center" htmlFor={fieldId && '-value'}>
          <MapPinned className="h-4 w-4 inline-flex mr-2" /> State / Province
        </Label>
        <Input
          id={fieldId && '-value'}
          className={cn(
            'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
            isSelected && 'bg-gray-800'
          )}
          value={value.state}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue({
              ...value,
              state: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-4 grid gap-1">
        <Label className="flex items-center" htmlFor={fieldId && '-country'}>
          <Flag className="h-4 w-4 inline-flex mr-2" /> Country
        </Label>
        <Input
          id={fieldId && '-country'}
          className={cn(
            'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
            isSelected && 'bg-gray-800'
          )}
          value={value.country}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue({
              ...value,
              country: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-4 grid gap-1">
        <Label className="flex items-center" htmlFor={fieldId && '-zipCode'}>
          <Mail className="h-4 w-4 inline-flex mr-2" /> Zip / Postal Code
        </Label>
        <Input
          id={fieldId && '-zipCode'}
          className={cn(
            'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
            isSelected && 'bg-gray-800'
          )}
          value={value.zipCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue({
              ...value,
              zipCode: e.target.value,
            })
          }
        />
      </div>
    </>
  )
}
export type AddressFieldProps = CmsField<HTMLInputElement> & {
  value: AddressFieldValue
  onUpdate: (newValue: AddressFieldValue) => void
}
export function AddressField({
  value: initialValue = {
    streetAddress: '',
    secondaryAddress: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  },
  className,
  fieldId,
  isSelected,
  isInline,
  onUpdate,
}: AddressFieldProps) {
  const [value, setValue] = React.useState<AddressFieldValue>(initialValue)
  const [isOpen, setIsOpen] = React.useState(false)

  const maybeAddress = (value: string) => (value ? `${value}, ` : '')

  React.useEffect(() => {
    if (!isOpen && onUpdate && !deepCompareObjects(value)(initialValue)) {
      onUpdate(value)
    }
  }, [isOpen])

  return isInline ? (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Input
          className={cn(
            'min-w-48 flex align-start p-2 rounded-none focus:border-white focus:bg-gray-900 cursor-text',
            className,
            isInline && 'border-t-0',
            isSelected && 'bg-gray-800'
          )}
          value={
            maybeAddress(value.streetAddress) +
            maybeAddress(value.secondaryAddress) +
            maybeAddress(value.city) +
            maybeAddress(value.state) +
            maybeAddress(value.country) +
            maybeAddress(value.zipCode)
          }
          onChange={() => {}}
        />
      </PopoverTrigger>

      <PopoverContent className={cn('w-full min-w-80')}>
        <AddressInputFields
          value={value}
          fieldId={fieldId}
          isSelected={isSelected}
          isInline={isInline}
          onUpdate={onUpdate}
          setValue={setValue}
        />
      </PopoverContent>
    </Popover>
  ) : (
    <AddressInputFields
      value={value}
      fieldId={fieldId}
      isSelected={isSelected}
      isInline={isInline}
      onUpdate={onUpdate}
      setValue={setValue}
    />
  )
}

export type AddressOptionsProps = {
  type: CmsCollectionColumn['type']
  onUpdate: (props: AddressOption) => void
} & AddressOption

export function AddressOptions({
  defaultValue,
  onUpdate,
}: AddressOptionsProps) {
  const handleOnUpdate = (defaultValue: string | number | boolean) => {
    onUpdate && onUpdate({ defaultValue } as AddressOption)
  }

  return (
    <div className="mb-6">
      <Label htmlFor="defaultValue" className="flex mb-2">
        Default Value
      </Label>

      <GetFieldComponent
        id="defaultValue"
        type="address"
        value={defaultValue}
        onUpdate={handleOnUpdate}
      />
    </div>
  )
}

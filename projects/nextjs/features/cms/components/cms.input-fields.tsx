'use client'

import React from 'react'

import { Accept, FileRejection, useDropzone } from 'react-dropzone'

import { Plate, Value } from '@udecode/plate-common'
import { format, parseISO } from 'date-fns'

import { cn } from '@/lib/utils'
import {
  Building,
  Calendar as CalendarIcon,
  CalendarRange,
  CircleX,
  Clock4,
  CloudUpload,
  Expand,
  File,
  FileMusic,
  FileStack,
  FileText,
  FileType,
  FileVideo,
  FileVolume,
  Flag,
  Hash,
  Image,
  Images,
  Link,
  Mail,
  MapPin,
  MapPinned,
  RectangleEllipsis,
  Replace,
  ReplaceAll,
  ScrollText,
  SquareAsterisk,
  Tag,
  Tags,
  TextCursorInput,
  ToggleLeft,
  Video,
  Volume1,
} from 'lucide-react'
import { CmsCollectionColumn } from '@/features/cms/cms.types'

import { Editor } from '@/components/plate-ui/editor'
import { plugins } from '@/components/plate-ui/plugins'
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
import { TooltipProvider } from '@/components/plate-ui/tooltip'
import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import { Calendar, CalendarProps } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from '@radix-ui/react-label'
import { ToggleSwitch } from '@/components/toggle-switch'
import { DateRange } from 'react-day-picker'
import { PrivateInput } from '@/components/private-input'
import {
  TagsInput,
  TagInput,
  TagItem,
  TagInputItem,
  TagSelect,
  TagSelectTrigger,
  TagSelectContent,
  TagSelectGroup,
  TagSelectItems,
  TagSelectSelected,
} from '@/components/tags'
import {
  ComboboxList,
  Combobox,
  ComboboxContent,
  ComboboxGroup,
  ComboboxEmpty,
  ComboboxInput,
} from '@/components/combobox'
import { isEmpty } from 'c-ufunc/libs/isEmpty'
import { formatBytes } from '@/lib/formatBytes'
import {
  compareCollections,
  deepCompareObjects,
  isObjectInCollectionByProperty,
} from '@/lib/compareCollections'

export type CmsField<TElement> = Omit<
  React.InputHTMLAttributes<TElement>,
  'value' | 'onChange'
> & {
  className?: string
  fieldId: string
  isSelected?: boolean
  isInline?: boolean
}

export type FieldProps =
  | AddressFieldProps
  | BooleanFieldProps
  | DateFieldProps
  | InputFieldProps
  | RichTextFieldProps
  | UploadFieldProps
  | UploadImageFieldProps
  | UploadVideoFieldProps
  | SelectFieldProps
  // | TextFieldProps
  | TagSelectFieldProps
  | TagsFieldProps

type Config = {
  [k in CmsCollectionColumn['type']]: {
    title: string
    type: CmsCollectionColumn['type']
    Icon?: (props: Record<string, any>) => React.JSX.Element
    description: string
    validation: any
  }
}

export const fieldTypeConfig: Config = {
  address: {
    title: 'Address',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <MapPin
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'address',
    description: 'Location',
    validation: { required: false },
    // component: (props) => <AddressField {...(props as AddressFieldProps)} />,
  },
  audio: {
    title: 'Audio',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Volume1
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'audio',
    description: 'Upload an audio file',
    validation: {
      required: false,
      size: '300kb',
    },
  },
  audioFiles: {
    title: 'Audio Files',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <FileVolume
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'audioFiles',
    description: 'Upload multiple audio files collection',
    validation: {
      required: false,
      size: '300kb',
      minItems: '',
      maxItems: '',
    },
  },
  boolean: {
    title: 'Boolean',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <ToggleLeft
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'boolean',
    description: 'Yes or no, true or false',
    validation: { required: false },
  },
  date: {
    title: 'Date',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <CalendarIcon
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'date',
    description: 'Data of event, date added',
    validation: { required: false, before: '', after: '', start: '', end: '' },
  },
  dateRange: {
    title: 'Date Range',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <CalendarRange
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'date',
    description: 'Duration of event',
    validation: { required: false, before: '', after: '', start: '', end: '' },
  },
  document: {
    title: 'Document',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <FileText
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'document',
    description: 'Add a file to a collection',
    validation: {
      required: false,
      size: '300kb',
      minItems: '',
      maxItems: '',
    },
  },
  documents: {
    title: 'Documents',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <FileStack
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'documents',
    description: 'Add files to a collection',
    validation: { required: false, size: 300 },
  },

  gallery: {
    title: 'Gallery',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Images
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'gallery',
    description: 'Upload multiple images',
    validation: {
      required: false,
      size: 300,
      minItems: '',
      maxItems: '',
    },
  },
  image: {
    title: 'Image',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Image
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'image',
    description: 'Upload a single image',
    validation: {
      required: false,
      size: 300,
    },
  },
  number: {
    title: 'Number',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Hash className={cn('h-3 text-muted-foreground', className)} {...props} />
    ),
    type: 'number',
    description: 'ID, rating, oder number',
    validation: { required: false, min: '', max: '' },
  },

  multiReference: {
    title: 'Multi Reference',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <ReplaceAll
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    description: 'Link between collections',
    type: 'multiReference',
    validation: {
      required: false,
      minItems: '',
      maxItems: '',
    },
  },
  privateText: {
    title: 'Private',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <RectangleEllipsis
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'privateText',
    description: 'Hidden text',
    validation: {
      required: false,
      minLength: '',
      maxLength: '',
    },
  },

  privateNumber: {
    title: 'Private Number',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <SquareAsterisk
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'privateNumber',
    description: 'Hidden number',
    validation: { required: false, min: '', max: '' },
  },

  reference: {
    title: 'Reference',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Replace
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'reference',
    description: 'Link to another collection',
    validation: { required: false },
  },

  richContent: {
    title: 'Rich Content',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <ScrollText
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    description: 'Text with links and media',
    type: 'richContent',
    validation: { required: false },
  },
  richtext: {
    title: 'Rich Text',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <FileType
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    description: 'text with formatting',
    type: 'richtext',
    validation: { required: false },
  },
  select: {
    title: 'Select',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <TextCursorInput
        {...props}
        className={cn('h-3 text-muted-foreground', className)}
      />
    ),
    type: 'select',
    description: '',
    validation: {
      minItems: '',
      maxItems: '',
      minLength: '',
      maxLength: '',
    },
  },
  tags: {
    title: 'Tags',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Tags {...props} className={cn('h-3 text-muted-foreground', className)} />
    ),
    type: 'tags',
    description: '',
    validation: {
      minItems: '',
      maxItems: '',
      minLength: '',
      maxLength: '',
    },
  },
  tagSelect: {
    title: 'Tag Select',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Tags {...props} className={cn('h-3 text-muted-foreground', className)} />
    ),
    type: 'tagSelect',
    description: '',
    validation: {
      minItems: '',
      maxItems: '',
      minLength: '',
      maxLength: '',
    },
  },
  text: {
    title: 'Text',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Tags className={cn('h-3 text-muted-foreground', className)} {...props} />
    ),
    type: 'text',
    description: 'Titles, paragraph',
    validation: {
      required: false,
      minLength: '',
      maxLength: '',
    },
  },
  time: {
    title: 'Time',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Clock4
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'time',
    description: 'Opening hours, time of event',
    validation: { required: false, start: '', end: '' },
  },
  title: {
    title: 'Title',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Flag
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
        type="title"
      />
    ),
    type: 'title',
    description: 'Primary key',
    validation: {
      required: false,
      minLength: '',
      maxLength: '',
    },
  },
  url: {
    title: 'URL',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Link className={cn('h-3 text-muted-foreground', className)} {...props} />
    ),
    description: 'Links',
    type: 'url',
    validation: { required: false },
  },
  video: {
    title: 'Video',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Video
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'video',
    description: 'Upload a single video',
    validation: { required: false, size: 300 },
  },
  videos: {
    title: 'Video',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <FileVideo
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'video',
    description: 'Upload videos',
    validation: { required: false, size: 300, minItems: '', maxItems: '' },
  },
} as const

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
  setValue,
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
export type BooleanFieldProps = CmsField<HTMLInputElement> & {
  type: 'yes-no' | 'on-off' | 'check' | 'switch'
  value: boolean
  onUpdate: (newValue: boolean) => void
}
export function BooleanField({
  value,
  onBlur,
  className,
  fieldId,
  isSelected,
  type,
  isInline,
  onUpdate,
  ...props
}: BooleanFieldProps) {
  return isInline ? (
    <div
      className={cn(
        'h-10  flex items-center justify-center border',
        isInline && 'border-t-0',
        className
      )}
    >
      <ToggleSwitch
        className="w-full rounded-none"
        checked={value}
        id="airplane-mode"
        onCheckedChange={onUpdate}
      />
    </div>
  ) : (
    <ToggleSwitch
      checked={value}
      id="airplane-mode"
      onCheckedChange={onUpdate}
    />
  )
}

export type DateFieldProps = CmsField<HTMLInputElement> &
  Omit<CalendarProps, 'selected'> & {
    type: CalendarMode | 'time'
    onUpdate: (newValue: (string | undefined)[]) => void
    value?: string[]
  }

export function DateField({
  value = [],
  onBlur,
  className,
  fieldId,
  isSelected,
  isInline,
  type = 'single',
  onUpdate,
}: DateFieldProps) {
  const handleOnUpdate = (newValue?: Date | DateRange) => {
    if (type === 'single' || type === 'time') {
      onUpdate && onUpdate([(newValue as Date)?.toISOString()])
    } else {
      onUpdate &&
        onUpdate([
          (newValue as DateRange)?.from?.toISOString(),
          (newValue as DateRange)?.to?.toISOString(),
        ])
    }
  }

  let date: Date | DateRange | undefined

  let label
  if (type === 'single' || type === 'time') {
    date = value[0] ? parseISO(value[0]) : undefined
    label = date ? format(date as Date, 'PPP') : <span>Pick a date</span>
  } else {
    date = value[0]
      ? ({
          from: value[0] && parseISO(value[0]),
          to: value[1] && parseISO(value[1]),
        } as DateRange)
      : undefined

    if (date) {
      label = !date.to ? (
        <>
          {format(date.from as any, 'PPP')}
          <>
            <span className="inline-flex mx-1 text-muted-full">&mdash;</span>
            Pick To date
          </>
        </>
      ) : (
        <>
          {format(date.from as any, 'PPP')}
          <span className="inline-flex mx-1 text-muted-full">&mdash;</span>
          {format(date.to as any, 'PPP')}
        </>
      )
    } else {
      label = <span>Pick From date</span>
    }
  }

  const handleOnTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (date instanceof Date) {
      const [hours, minutes] = e.target.value.split(':')
      date.setHours(Number(hours))
      date.setMinutes(Number(minutes))

      onUpdate && onUpdate([date.toISOString()])
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'min-w-48 justify-start text-left font-normal rounded-md',
            !date && 'text-muted-foreground',
            isInline && 'rounded-none border-t-0'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="relative w-auto p-0">
        <Calendar
          mode={type === 'time' ? 'single' : (type as any)}
          selected={date}
          onSelect={handleOnUpdate}
          initialFocus
        />

        {type === 'time' && date instanceof Date ? (
          <div className="flex items-center justify-center border-t px-6">
            <Label htmlFor={`${fieldId}-time`}>Time</Label>
            <Input
              id={`${fieldId}-time`}
              type="time"
              className="p-0 border-0 ml-3 w-auto"
              value={format(date, 'HH:mm')}
              onChange={handleOnTimeChange}
            />
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  )
}

export type InputFieldProps = CmsField<HTMLInputElement> & {
  value: string
  onUpdate: (newValue: string) => void
}
export function InputField({
  value,
  onBlur,
  className,
  fieldId,
  isSelected,
  isInline,
  type,
  onUpdate,
  ...props
}: InputFieldProps) {
  const [state, setState] = React.useState(value || '')

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(state, value, Boolean(onUpdate))
    if (state !== value && onUpdate) {
      onUpdate(state)
    }
  }

  return (
    <Input
      {...props}
      type={type}
      id={fieldId}
      aria-describedby="helper-text-explanation"
      className={cn(
        'min-w-48 rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
        isInline && 'rounded-none border-t-0',
        isSelected && 'bg-gray-800',
        className
      )}
      value={state}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setState(e.target.value)
      }
      onBlur={handleOnBlur}
    />
  )
}

export type PrivateFieldProps = CmsField<HTMLInputElement> & {
  value: string
  onUpdate: (newValue: string) => void
  type?: 'text' | 'number'
}
export function PrivateField({
  value = '',
  onBlur,
  className,
  fieldId,
  isSelected,
  isInline,
  type = 'text',
  onUpdate,
  ...props
}: PrivateFieldProps) {
  const [state, setState] = React.useState(value)

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (state !== value && onUpdate) {
      onUpdate(state)
    }
  }

  return (
    <div className="relative">
      <PrivateInput
        {...props}
        type={type}
        id={fieldId}
        className={cn(
          'min-w-48 rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text pr-10',
          isInline && 'rounded-none border-t-0',
          isSelected && 'bg-gray-800',
          className
        )}
        value={state}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setState(e.target.value)
        }
        onBlur={handleOnBlur}
      />
    </div>
  )
}

export type RichTextFieldProps = CmsField<HTMLInputElement> & {
  hasInsert?: boolean
  value: Value
  onUpdate: (newValue: Value) => void
}
export function RichTextField({
  value,
  onBlur,
  className,
  fieldId,
  isSelected,
  hasInsert,
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

// export type TextFieldProps = CmsField<HTMLInputElement> & {
//   value: string
//   onUpdate: (newValue: string) => void
// }
// export function TextField({
//   value,
//   className,
//   fieldId,
//   isSelected,
//   isInline,
//   onBlur,
//   onUpdate,
//   ...props
// }: TextFieldProps) {
//   return (
//     <TextareaAutosize
//       className={cn(
//         'w-full p-2 px-4 border bg-background rounded-md mt-2 focus:border focus:bg-gray-900',
//         isInline && 'rounded-none',
//         className,
//         isSelected && 'bg-gray-800'
//       )}
//       value={value as string}
//       onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//         onUpdate && onUpdate(e.target.value)
//       }
//       {...props}
//     />
//   )
// }

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
  isSelected,
  value: initialValue = {
    value: '',
    items: [],
  },
  onUpdate,
  fieldOptions,
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
export type TagsFieldProps = CmsField<HTMLInputElement> & {
  value: TagInputItem[]
  onUpdate?: (items: TagInputItem[]) => void
}
export function TagsField({
  className,
  fieldId,
  isInline,
  isSelected,
  value = [],
  onUpdate,
  onBlur,
}: TagsFieldProps) {
  const [state, setState] = React.useState<TagInputItem[]>(value)
  const [isOpen, setIsOpen] = React.useState(false)

  const tagItems = state.map(({ id, value }) => {
    return (
      <TagItem
        key={id}
        id={id}
        value={value}
        onRemoveItem={(id: string) =>
          setState(state.filter((item) => item.id !== id))
        }
      />
    )
  })

  React.useEffect(() => {
    if (!isOpen && !compareCollections(value)(state)) {
      onUpdate && onUpdate(state)
    }
  }, [isOpen, value, state])

  return isInline ? (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'min-w-48 flex gap-2 items-center w-full h-10 p-2 border',
            isInline && 'border-t-0',
            className
          )}
        >
          {tagItems}
        </div>
      </PopoverTrigger>

      <PopoverContent className={cn('w-full min-w-80 p-0 border-0')}>
        <TagsInput className="flex items-center ">
          {tagItems}
          <TagInput
            id={fieldId}
            placeholder="Items..."
            selectedItems={state}
            onUpdate={setState}
          />
        </TagsInput>
      </PopoverContent>
    </Popover>
  ) : (
    <TagsInput>
      {tagItems}
      <TagInput
        id={fieldId}
        placeholder="Items..."
        selectedItems={state}
        onUpdate={setState}
      />
    </TagsInput>
  )
}

export type TagSelectFieldProps = Omit<CmsField<HTMLInputElement>, 'type'> & {
  value: TagSelectSelected
  onUpdate: (selectItem: TagSelectSelected) => void
  items?: TagInputItem[]
  type?: 'single' | 'multiple'
  url?: RequestInfo
}
export function TagsSelectField({
  value: initialValue = {
    selectedItems: [],
    items: [],
  },
  className,
  fieldId,
  isInline,
  isSelected,
  onUpdate,
  onBlur,
  type = 'multiple',
  url,
}: TagSelectFieldProps) {
  const [{ items, selectedItems }, setState] =
    React.useState<TagSelectSelected>({
      selectedItems: initialValue.selectedItems || [],
      items: initialValue.items || [],
    })

  const [previousSelectedItems, setPreviousSelectedItems] = React.useState(
    initialValue.selectedItems || []
  )
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(url as RequestInfo)
      if (!response.ok) throw new Error('Network response was not ok')

      const { data: items } = await response.json()
      setState({
        selectedItems,
        items,
      })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if (
      !isOpen &&
      !deepCompareObjects({
        items,
        selectedItems: previousSelectedItems,
      })({ items, selectedItems })
    ) {
      setPreviousSelectedItems(selectedItems)
      onUpdate && onUpdate({ items, selectedItems })
    }
  }, [isOpen, initialValue, selectedItems])

  React.useEffect(() => {
    if (isOpen && url) {
      fetchData()
    }
  }, [url, isOpen])

  const updateState = (
    nextSelectedItems: TagSelectSelected['selectedItems'],
    previousSelectedItems: TagSelectSelected['selectedItems']
  ) => {
    setState({
      items,
      selectedItems: nextSelectedItems,
    })
    setPreviousSelectedItems(previousSelectedItems)
  }

  return (
    <TagsInput className={cn(isInline && 'rounded-none border-t-0', className)}>
      {selectedItems.map(({ id, value }) => {
        return (
          <TagItem
            key={id}
            id={id}
            value={value}
            onRemoveItem={(id: string) =>
              updateState(
                selectedItems.filter((s) => s.id !== id),
                selectedItems
              )
            }
          />
        )
      })}
      <TagSelect open={isOpen} onOpenChange={setIsOpen}>
        <TagSelectTrigger
          placeholder="Select"
          selectedItems={selectedItems}
          type={type}
        />
        <TagSelectContent>
          <TagSelectGroup>
            <TagSelectItems
              type={type}
              items={items}
              selectedItems={selectedItems}
              onSelect={updateState}
            />
          </TagSelectGroup>
        </TagSelectContent>
      </TagSelect>
    </TagsInput>
  )
}

type ColumnFile = File & {
  alt: string
  preview: string
}

function UploadInputField({
  id,
  accept,
  files = [],
  maxFiles = 1,
  maxSize = 500000,
  minSize,
  multiple,
  type,
  setFiles,
}: {
  id: string
  accept?: Accept
  files: ColumnFile[]
  maxFiles?: File['size']
  maxSize?: number
  minSize?: number
  multiple?: boolean
  type: 'audio' | 'document' | 'image' | 'video'
  setFiles: (newValue: ColumnFile[]) => void
}) {
  const [fileRejections, setFileRejections] = React.useState<FileRejection[]>(
    []
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept: accept,
    maxFiles,
    maxSize,
    minSize,
    multiple,
    onDropRejected: setFileRejections,
    onDrop: (acceptedFiles) => {
      setFileRejections([])

      const hasItem =
        isObjectInCollectionByProperty(acceptedFiles)(files)('name')

      if (!hasItem) {
        setFiles([
          ...(multiple ? files : []),
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              alt: '',
            })
          ),
        ])
      }

      // const acceptedFiles = [
      //   {
      //     path: 'sys..jpg',
      //     preview:
      //       'blob:http://localhost:3000/0fe02943-0922-4f66-a5ea-d49fc8022a2e',
      //     lastModified: 1710932691176,
      //     lastModifiedDate: new Date(
      //       'Wed Mar 20 2024 11:04:51 GMT+0000 (Greenwich Mean Time)'
      //     ),
      //     name: 'sys..jpg',
      //     size: 291052,
      //     type: 'image/jpeg',
      //     webkitRelativePath: '',
      //   },
      // ]
    },
  })

  const handleOnDescriptionChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updateFiles = [...files]
      const file = updateFiles[index]

      file.alt = e.target.value
      updateFiles[index] = file

      setFiles(updateFiles)
    }

  const preview = (file: ColumnFile) => {
    switch (type) {
      case 'image':
      case 'video':
        return (
          <div className="flex min-w-0 overflow-hidden rounded-md justify-center border">
            <img
              src={file.preview}
              className="h-full w-auto block rounded-md"
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(file.preview)
              }}
            />
          </div>
        )
      case 'audio':
        return (
          <div className="flex min-w-0 overflow-hidden rounded-md justify-center border p-2">
            <FileMusic className="w-10 h-10 text-muted-foreground" />
          </div>
        )
      default:
        return (
          <div className="flex min-w-0 overflow-hidden rounded-md justify-center border p-2">
            <File className="w-10 h-10 text-muted-foreground" />
          </div>
        )
    }
  }

  //TODO: double click to zoom in
  const thumbs = files.map((file, index) => {
    return (
      <li key={file.name} className="flex mb-2 items-top">
        <div className="relative w-14 h-16 translate-y-3">
          {preview(file)}
          <Button
            variant="outline"
            className="absolute p-0 rounded-full h-[26px] w-[26px] top-[-0.5rem] right-[-0.5rem]"
            onClick={() => setFiles(files.filter((f) => f.name !== file.name))}
          >
            <CircleX />
          </Button>
        </div>

        <div className="ml-4 text-sm">
          <p className="max-w-52 truncate mb-1">{file.name}</p>
          <p className="mt-1 text-xs">Size {formatBytes(file.size)}</p>

          {type === 'image' || type === 'video' ? (
            <div className="mt-2">
              <Label className="mb-1" htmlFor={id}>
                Description
              </Label>
              <Input
                id={id}
                size="sm"
                value={(file as any)?.alt || ''}
                onChange={handleOnDescriptionChange(index)}
              />
            </div>
          ) : null}
        </div>
      </li>
    )
  })

  React.useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [])

  // const errorMessage = (error as any)?.[0]?.errors[0]?.message.replace('/*', '') || null
  const errorMessage = !isEmpty(fileRejections)
    ? ` File must be of type ${type} and maximum size of ${formatBytes(
        maxSize
      )}kb`
    : null

  const accepts = Object.values(accept || {}).flat()

  return (
    <section>
      <p className="text-destructive mb-1">{errorMessage}</p>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p className="grid grid-rows-2 items-center text-center justify-center border-2 rounded-md border-dashed p-4  ">
          <CloudUpload className="h-20 w-20 text-muted-foreground m-auto" />
          Drag 'n' drop {multiple ? 'some files' : 'a file'} here,
          <br /> or click to select {multiple ? 'files' : 'a file'}
        </p>
      </div>
      <p className="text-sm text-muted-foreground mt-1 mb-2">
        {accepts ? accepts.join(', ') : null}
      </p>
      {thumbs.length > 0 ? (
        <aside className="mt-4">
          <ul className="flex flex-col gap-2">{thumbs}</ul>
        </aside>
      ) : null}
    </section>
  )
}
export type UploadFieldProps = Omit<CmsField<HTMLInputElement>, 'accept'> & {
  type: 'audio' | 'document' | 'image' | 'video'
  isMultiple?: boolean
  value: ColumnFile[]
  onUpdate: (newValue: ColumnFile[]) => void
  accept: Accept
}
export function UploadField({
  className,
  accept,
  fieldId,
  isInline,
  isMultiple = false,
  isSelected,
  type,
  value = [],
  onUpdate,
}: UploadFieldProps) {
  const [files, setFiles] = React.useState(value)
  const [isOpen, setIsOpen] = React.useState(false)

  return isInline ? (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Input
          className={cn(
            'min-w-48 flex align-star w-48 max-w-64 rounded-none border border-t-0 p-2 focus:border-white focus:bg-gray-900 cursor-text',
            isSelected && 'bg-gray-800',
            className
          )}
          value={files.map((f) => f.name)}
          onChange={() => {}}
        />
      </PopoverTrigger>

      <PopoverContent className={cn('w-full min-w-80')}>
        <UploadInputField
          id={fieldId}
          type={type}
          multiple={isMultiple}
          files={files}
          accept={accept}
          setFiles={setFiles}
        />
      </PopoverContent>
    </Popover>
  ) : (
    <UploadInputField
      id={fieldId}
      type={type}
      multiple={isMultiple}
      files={files}
      accept={accept}
      setFiles={setFiles}
    />
  )
}

export type UploadAudioFieldProps = Omit<UploadFieldProps, 'accept'> & {
  accept?: (' .mp3' | '.aac' | '.flac')[]
}

export function UploadAudioField({ accept, ...props }: UploadAudioFieldProps) {
  return (
    <UploadField
      {...(props as UploadFieldProps)}
      type="audio"
      accept={{
        'audio/*': accept || ['.mp3', '.aac', '.flac'],
      }}
    />
  )
}

export type UploadImageFieldProps = Omit<UploadFieldProps, 'accept'> & {
  accept?: ('.gif' | '.jpg' | '.jpeg' | '.png' | '.svg' | '.webp')[]
}

export function UploadImageField({ accept, ...props }: UploadImageFieldProps) {
  return (
    <UploadField
      {...(props as UploadFieldProps)}
      type="image"
      accept={{
        'image/*': accept || ['.gif', '.jpg', '.jpeg', '.png', '.svg', '.webp'],
      }}
    />
  )
}

export type UploadVideoFieldProps = Omit<UploadFieldProps, 'accept'> & {
  accept?: ('mp4' | 'webm' | 'ogg')[]
}

export function UploadVideoField({ accept, ...props }: UploadVideoFieldProps) {
  return (
    <UploadField
      {...(props as UploadFieldProps)}
      type="video"
      accept={{
        'video/*': accept || ['mp4', 'webm', 'ogg'],
      }}
    />
  )
}

export function GetFieldComponent({
  type,
  ...props
}: {
  type: CmsCollectionColumn['type']
  [key: string]: any
}) {
  // const Component = React.memo((fieldTypeConfig as any)[type]?.component)
  // return Component ? <Component {...props} /> : <></>

  switch (type) {
    case 'address': {
      return <AddressField {...(props as AddressFieldProps)} />
    }
    case 'audio': {
      return <UploadAudioField {...(props as UploadAudioFieldProps)} />
    }

    case 'audioFiles': {
      return (
        <UploadAudioField
          {...(props as UploadAudioFieldProps)}
          isMultiple={true}
        />
      )
    }
    case 'boolean': {
      return <BooleanField {...(props as BooleanFieldProps)} />
    }
    case 'date': {
      return <DateField {...(props as DateFieldProps)} type="single" />
    }
    case 'dateRange': {
      return <DateField {...(props as DateFieldProps)} type="range" />
    }
    case 'document': {
      return <UploadField {...(props as UploadFieldProps)} type="document" />
    }
    case 'documents': {
      return (
        <UploadField
          {...(props as UploadFieldProps)}
          type="document"
          isMultiple={true}
        />
      )
    }
    case 'gallery': {
      return (
        <UploadImageField
          {...(props as UploadImageFieldProps)}
          isMultiple={true}
        />
      )
    }
    case 'image': {
      return <UploadImageField {...(props as UploadImageFieldProps)} />
    }
    case 'multiReference': {
      const url = encodeURI(
        '/admin/cms/collections/api?columns=["id", "collectionName"]'
      ).toString()
      return <TagsSelectField {...(props as TagSelectFieldProps)} url={url} />
    }
    case 'number': {
      return <InputField {...(props as InputFieldProps)} type="number" />
    }
    case 'privateNumber': {
      return <PrivateField {...(props as PrivateFieldProps)} type="number" />
    }
    case 'privateText': {
      return <PrivateField {...(props as PrivateFieldProps)} />
    }
    case 'reference': {
      const url = encodeURI(
        '/admin/cms/collections/api?columns=["id", "collectionName"]'
      ).toString()
      return (
        <TagsSelectField
          {...(props as TagSelectFieldProps)}
          type="single"
          url={url}
        />
      )
    }
    case 'richContent': {
      return (
        <RichTextField {...(props as RichTextFieldProps)} hasInsert={true} />
      )
    }
    case 'richtext': {
      return <RichTextField {...(props as RichTextFieldProps)} />
    }
    case 'select': {
      return <SelectField {...(props as SelectFieldProps)} />
    }
    case 'tagSelect': {
      return <TagsSelectField {...(props as TagSelectFieldProps)} />
    }
    case 'tags': {
      return <TagsField {...(props as TagsFieldProps)} />
    }
    case 'text': {
      return <InputField {...(props as InputFieldProps)} />
    }
    case 'time': {
      return <InputField type="time" {...(props as InputFieldProps)} />
    }
    case 'title': {
      return <InputField {...(props as InputFieldProps)} />
    }
    case 'url': {
      return <InputField type="url" {...(props as InputFieldProps)} />
    }
    case 'video': {
      return <UploadVideoField {...(props as UploadVideoFieldProps)} />
    }
    case 'videos': {
      return <UploadVideoField {...(props as UploadVideoFieldProps)} />
    }

    default:
      return null
  }
}

export function GetFieldIcon({
  type,
  ...props
}: {
  type: CmsCollectionColumn['type']
  [key: string]: any
}) {
  const Component = (fieldTypeConfig as any)[type]?.Icon
  return Component ? <Component {...props} /> : <></>
}

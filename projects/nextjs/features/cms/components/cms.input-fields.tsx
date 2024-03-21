'use client'

import React from 'react'

import TextareaAutosize from 'react-textarea-autosize'
import { useDropzone } from 'react-dropzone'

import { Plate, Value } from '@udecode/plate-common'
import { format, parseISO } from 'date-fns'

import { cn } from '@/lib/utils'
import {
  Calendar as CalendarIcon,
  CalendarRange,
  CircleX,
  Clock4,
  Expand,
  Eye,
  EyeOff,
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
  MapPin,
  RectangleEllipsis,
  Replace,
  ReplaceAll,
  ScrollText,
  SquareAsterisk,
  Tags,
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
  | BooleanFieldProps
  | AddressFieldProps
  | DateFieldProps
  | InputFieldProps
  | RichTextFieldProps
  | UploadFieldProps
// | TextFieldProps

type Config = {
  [k in CmsCollectionColumn['type']]: {
    title: string
    type: CmsCollectionColumn['type']
    Icon?: (props: Record<string, any>) => React.JSX.Element
    description: string
    validation: any
    component: (props: FieldProps) => React.JSX.Element
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
    component: (props: FieldProps) => (
      <AddressField {...(props as AddressFieldProps)} />
    ),
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
    component: (props) => (
      <UploadField {...(props as UploadFieldProps)} type="audio" />
    ),
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
    component: (props) => (
      <UploadField
        {...(props as UploadFieldProps)}
        type="audio"
        isMultiple={true}
      />
    ),
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
    component: (props) => <BooleanField {...(props as BooleanFieldProps)} />,
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
    component: (props) => (
      <DateField {...(props as DateFieldProps)} type="single" />
    ),
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
    component: (props) => (
      <DateField {...(props as DateFieldProps)} type="range" />
    ),
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
    component: (props) => (
      <UploadField {...(props as UploadFieldProps)} type="document" />
    ),
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
    component: (props) => (
      <UploadField
        {...(props as UploadFieldProps)}
        type="document"
        isMultiple={true}
      />
    ),
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
    component: (props) => (
      <UploadField
        {...(props as UploadFieldProps)}
        type="image"
        isMultiple={true}
      />
    ),
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
    component: (props) => (
      <UploadField {...(props as UploadFieldProps)} type="image" />
    ),
  },
  number: {
    title: 'Number',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Hash className={cn('h-3 text-muted-foreground', className)} {...props} />
    ),
    type: 'number',
    description: 'ID, rating, oder number',
    validation: { required: false, min: '', max: '' },
    component: (props) => (
      <InputField {...(props as InputFieldProps)} type="number" />
    ),
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
    component: (props) => <TagsField {...(props as TagFieldProps)} />,
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
    component: (props) => <PrivateField {...(props as PrivateFieldProps)} />,
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
    component: (props) => (
      <PrivateField {...(props as PrivateFieldProps)} type="number" />
    ),
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
    component: (props) => (
      <TagsField {...(props as TagFieldProps)} type="single" />
    ),
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
    component: (props) => (
      <RichTextField {...(props as RichTextFieldProps)} hasInsert={true} />
    ),
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
    component: (props) => <RichTextField {...(props as RichTextFieldProps)} />,
  },
  tags: {
    title: 'Tags',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Tags {...props} type="tags" />
    ),
    type: 'tags',
    description: '',
    validation: {
      minItems: '',
      maxItems: '',
      minLength: '',
      maxLength: '',
    },
    component: (props) => <TagsField {...(props as TagFieldProps)} />,
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
    component: (props) => <InputField {...(props as InputFieldProps)} />,
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
    component: (props) => (
      <InputField type="time" {...(props as InputFieldProps)} />
    ),
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
    component: (props) => <InputField {...(props as InputFieldProps)} />,
  },
  url: {
    title: 'URL',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Link className={cn('h-3 text-muted-foreground', className)} {...props} />
    ),
    description: 'Links',
    type: 'url',
    validation: { required: false },
    component: (props) => <InputField {...(props as InputFieldProps)} />,
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
    component: (props) => (
      <UploadField {...(props as UploadFieldProps)} type="video" />
    ),
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
    component: (props) => (
      <UploadField
        {...(props as UploadFieldProps)}
        type="video"
        isMultiple={true}
      />
    ),
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
export type AddressFieldProps = CmsField<HTMLInputElement> & {
  value: AddressFieldValue
  onUpdate: (newValue: AddressFieldValue) => void
}
function AddressInputFields({
  value,
  className,
  fieldId,
  isSelected,
  isInline,
  onUpdate,
}: AddressFieldProps) {
  const [state, setState] = React.useState<AddressFieldValue>(value)

  const handleOnBlur = () => onUpdate && onUpdate(state)

  return (
    <div>
      <div className="mb-4">
        <Label className="mb-2" htmlFor={fieldId && '-streetAddress'}>
          Street Address
        </Label>
        <Input
          id={fieldId && '-streetAddress'}
          className={cn(
            'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
            isSelected && 'bg-gray-800'
          )}
          value={state.streetAddress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState({
              ...state,
              streetAddress: e.target.value,
            })
          }
          onBlur={handleOnBlur}
        />
      </div>
      <div className="mb-4">
        <Label className="mb-2" htmlFor={fieldId && '-secondStreetAddress'}>
          Address 2
        </Label>
        <Input
          id={fieldId && '-secondStreetAddress'}
          className={cn(
            'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
            isSelected && 'bg-gray-800'
          )}
          value={state.secondaryAddress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState({
              ...state,
              secondaryAddress: e.target.value,
            })
          }
          onBlur={handleOnBlur}
        />
      </div>
      <div className="mb-4">
        <Label className="mb-2" htmlFor={fieldId && '-city'}>
          City
        </Label>
        <Input
          id={fieldId && '-city'}
          className={cn(
            'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
            isSelected && 'bg-gray-800'
          )}
          value={state.city}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState({
              ...state,
              city: e.target.value,
            })
          }
          onBlur={handleOnBlur}
        />
      </div>
      <div className="mb-4">
        <Label className="mb-2" htmlFor={fieldId && '-state'}>
          Sate
        </Label>
        <Input
          id={fieldId && '-state'}
          className={cn(
            'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
            isSelected && 'bg-gray-800'
          )}
          value={state.state}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState({
              ...state,
              state: e.target.value,
            })
          }
          onBlur={handleOnBlur}
        />
      </div>
      <div className="mb-4">
        <Label className="mb-2" htmlFor={fieldId && '-country'}>
          Country
        </Label>
        <Input
          id={fieldId && '-country'}
          className={cn(
            'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
            isSelected && 'bg-gray-800'
          )}
          value={state.country}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState({
              ...state,
              country: e.target.value,
            })
          }
          onBlur={handleOnBlur}
        />
      </div>
      <div className="mb-4">
        <Label className="mb-2" htmlFor={fieldId && '-zipCode'}>
          Country
        </Label>
        <Input
          id={fieldId && '-zipCode'}
          className={cn(
            'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
            isSelected && 'bg-gray-800'
          )}
          value={state.zipCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState({
              ...state,
              zipCode: e.target.value,
            })
          }
          onBlur={handleOnBlur}
        />
      </div>
    </div>
  )
}
export function AddressField({
  value,
  className,
  fieldId,
  isSelected,
  isInline,
  onUpdate,
}: AddressFieldProps) {
  const maybeAddress = (value: string) => (value ? `${value}, ` : '')

  return isInline ? (
    <Popover>
      <PopoverTrigger asChild>
        <Input
          className={cn(
            'flex w-64 align-start p-2 rounded-none border focus:border-white focus:bg-gray-900 cursor-text',
            className,
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
        'h-10 p-1 flex items-center justify-center border',
        className
      )}
    >
      <ToggleSwitch
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
    type: 'single' | 'range'
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
    if (type === 'single') {
      onUpdate && onUpdate([(newValue as Date)?.toISOString()])
    } else {
      onUpdate &&
        onUpdate([
          (newValue as DateRange)?.from?.toISOString(),
          (newValue as DateRange)?.to?.toISOString(),
        ])
    }
  }

  let date: Date | DateRange
  let label
  if (type === 'single') {
    date = parseISO(value[0])
    label = date ? format(date as Date, 'PPP') : <span>Pick a date</span>
  } else {
    date = { from: parseISO(value[0]), to: parseISO(value[1]) } as DateRange
    label = date ? format(date.from as any, 'PPP') : <span>Pick a date</span>
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal rounded-md',
            !date && 'text-muted-foreground',
            isInline && 'rounded-none'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode={type as any}
          selected={date}
          onSelect={handleOnUpdate}
          initialFocus
        />
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
  const [state, setState] = React.useState(value)

  return (
    <Input
      {...props}
      type={type}
      id={fieldId}
      aria-describedby="helper-text-explanation"
      className={cn(
        'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
        isInline && 'rounded-none',
        isSelected && 'bg-gray-800',
        className
      )}
      value={state}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setState(e.target.value)
      }
      onBlur={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
        onUpdate && onUpdate(state)
      }
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

  return (
    <div className="relative">
      <PrivateInput
        {...props}
        type={type}
        id={fieldId}
        className={cn(
          'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text pr-10',
          isInline && 'rounded-none',
          isSelected && 'bg-gray-800',
          className
        )}
        value={state}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setState(e.target.value)
        }
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
          onUpdate && onUpdate(state)
        }
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

  // console.log(value?.[0].children?.[0]?.text)

  return isInline ? (
    <Popover style={{ width: '100%' }}>
      <PopoverTrigger asChild>
        <Input
          className={cn(
            'flex align-start p-2 text-start rounded-none border focus:border-white focus:bg-gray-900 cursor-text',
            className,
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

export type TagFieldProps = CmsField<HTMLInputElement> & {
  type?: 'single' | 'multiple'
  value: string
  component?: React.ReactNode
  isFilter?: boolean
  onUpdate: (newValue: string) => void
}
export function TagsField({
  className,
  fieldId,
  isInline,
  isSelected,
  isFilter = false,
  type = 'multiple',
  value,
  onUpdate,
  onBlur,
  ...props
}: TagFieldProps) {
  return (
    <Input
      id={fieldId}
      aria-describedby="helper-text-explanation"
      className={cn(
        'rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
        isInline && 'rounded-none',
        isSelected && 'bg-gray-800',
        className
      )}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
        onUpdate && onUpdate(e.target.value)
      }
      {...props}
    />
  )
}

type ColumnFile = File & {
  preview: string
}

export type UploadFieldProps = CmsField<HTMLInputElement> & {
  type: 'multiple' | 'document' | 'image' | 'video'
  isMultiple?: boolean
  value: ColumnFile[]
  onUpdate: (newValue: ColumnFile[]) => void
}

function UploadInputField({
  multiple,
  maxFiles = 1,
  maxSize,
  minSize,
  accept = {
    'image/*': [],
  },
  files = [],
  onFilesUpdate,
}: {
  multiple?: boolean
  maxFiles?: number
  maxSize?: number
  minSize?: number
  accept?: Record<string, string[]>
  onFilesUpdate: (newValue: ColumnFile[]) => void
  files: ColumnFile[]
}) {
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    multiple,
    onDrop: (acceptedFiles) => {
      console.log(JSON.stringify(acceptedFiles, null, 2))
      onFilesUpdate([
        ...(multiple ? files : []),
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ])
    },
  })

  const thumbs = files.map((file) => (
    <div
      className="relative inline-flex rounded-md border "
      style={{
        width: 64,
        height: 64,
      }}
      key={file.name}
    >
      <div className="flex min-w-0 overflow-hidden relative">
        <img
          src={file.preview}
          className="h-full w-auto block rounded-md"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
      </div>
      <Button
        variant="outline"
        className="absolute p-0 rounded-full h-[26px] w-[26px] top-[-0.5rem] right-[-0.5rem]"
        onClick={() => onFilesUpdate(files.filter((f) => f.name !== file.name))}
      >
        <CircleX />
      </Button>
    </div>
  ))

  React.useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [])

  return (
    <section>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p className="border-2 rounded-md border-dashed p-4">
          Drag 'n' drop {multiple ? 'some files' : 'a file'} here, or click to
          select {multiple ? 'some files' : 'a file'}
        </p>
      </div>
      {thumbs.length > 0 ? (
        <aside className="flex flex-row flex-wrap gap-4 mt-4">{thumbs}</aside>
      ) : null}
    </section>
  )
}

export function UploadField({
  className,
  fieldId,
  isInline,
  isMultiple = false,
  isSelected,
  type,
  value = [],
  onUpdate,
  onBlur,
}: UploadFieldProps) {
  return isInline ? (
    <Popover>
      <PopoverTrigger asChild>
        <Input
          className={cn(
            'flex w-64 align-start p-2 rounded-none border focus:border-white focus:bg-gray-900 cursor-text',
            className,
            isSelected && 'bg-gray-800'
          )}
          value={value.map((f) => f.name)}
          onChange={() => {}}
        />
      </PopoverTrigger>

      <PopoverContent className={cn('w-full min-w-80')}>
        <UploadInputField
          multiple={isMultiple}
          files={value}
          onFilesUpdate={onUpdate}
        />
      </PopoverContent>
    </Popover>
  ) : (
    <UploadInputField
      multiple={isMultiple}
      files={value}
      onFilesUpdate={onUpdate}
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
  const Component = (fieldTypeConfig as any)[type]?.component
  return Component ? <Component {...props} /> : <></>
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

'use client'

import React from 'react'

import { cn } from '@/lib/utils'
import {
  AlignLeft,
  Calendar as CalendarIcon,
  CalendarRange,
  Clock4,
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
  TextCursorInput,
  Type,
  Video,
  Volume1,
} from 'lucide-react'

import {
  CmsCollectionColumn,
  CmsFieldBase,
  ColumnDialogState,
  FieldOptionsTypes,
} from '@/features/cms/cms.types'
import { AddressField, AddressFieldProps } from './cms-fields/address'
import BooleanField, {
  FieldProps as BooleanFieldProps,
} from './cms-fields/boolean'
import TextField, { FieldProps as TextFieldProps } from './cms-fields/text'
import TitleField, { FieldProps as TitleFieldProps } from './cms-fields/title'

import { DateFieldProps, DateField } from './cms-fields/date'
import { InputField, InputFieldProps } from './cms-fields/input'
import { PrivateField, PrivateFieldProps } from './cms-fields/private'
import { RichTextField, RichTextFieldProps } from './cms-fields/richtext'
import { SelectField, SelectFieldProps } from './cms-fields/select'
import { TagsField, TagsFieldProps } from './cms-fields/tags'
import { TagSelectFieldProps, TagsSelectField } from './cms-fields/tag-select'
import {
  UploadFieldProps,
  UploadImageFieldProps,
  UploadVideoFieldProps,
  UploadAudioField,
  UploadAudioFieldProps,
  UploadField,
  UploadImageField,
  UploadVideoField,
} from './cms-fields/upload'
import { ReferenceField } from './cms-fields/reference'

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
  | TagSelectFieldProps
  | TagsFieldProps

type Config = {
  boolean: typeof BooleanField.fieldConfig
  text: typeof TextField.fieldConfig
  title: typeof TitleField.fieldConfig
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

export const fieldTypeConfig: Config = {
  boolean: BooleanField.fieldConfig,
  text: TextField.fieldConfig,
  title: TitleField.fieldConfig,

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
    validate: () => '',
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
    validate: () => '',
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
    validate: () => '',
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
    validate: () => '',
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
    validate: () => '',
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
    validate: () => '',
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
    validate: () => '',
  },
  email: {
    title: 'Email',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Type className={cn('h-3 text-muted-foreground', className)} {...props} />
    ),
    type: 'email',
    description: 'Email Address',
    validation: {
      required: false,
      minLength: '',
      maxLength: '',
      disallowCharacters: '',
      validate: () => '',
    },
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
    validate: () => '',
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
    validate: () => '',
  },
  number: {
    title: 'Number',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Hash className={cn('h-3 text-muted-foreground', className)} {...props} />
    ),
    type: 'number',
    description: 'ID, rating, oder number',
    validation: { required: false, min: '', max: '' },
    validate: () => '',
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
    validate: () => '',
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
      disallowCharacters: '',
    },
    validate: () => '',
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
    validate: () => '',
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
    validate: () => '',
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
    validate: () => '',
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
    validate: () => '',
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
      disallowCharacters: '',
    },
    validate: () => '',
  },
  paragraph: {
    title: 'Paragraph',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <AlignLeft
        className={cn('h-3 text-muted-foreground', className)}
        {...props}
      />
    ),
    type: 'text',
    description: 'Paragraphs',
    validation: {
      required: false,
      minLength: '',
      maxLength: '',
      disallowCharacters: '',
    },
    validate: () => '',
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
      disallowCharacters: '',
    },
    validate: () => '',
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
      disallowCharacters: '',
    },
    validate: () => '',
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
    validate: () => '',
  },
  url: {
    title: 'URL',
    Icon: ({ className, ...props }: Record<string, any>) => (
      <Link className={cn('h-3 text-muted-foreground', className)} {...props} />
    ),
    description: 'Links',
    type: 'url',
    validation: { required: false },
    validate: () => '',
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
    validate: () => '',
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
    validate: () => '',
  },
} as const

export function GetFieldComponent({
  type,
  ...props
}: CmsFieldBase & {
  type: CmsCollectionColumn['type']
  value: any
}) {
  switch (type) {
    case 'boolean': {
      return <BooleanField.Field {...(props as BooleanFieldProps)} />
    }
    case 'text': {
      return <TextField.Field {...(props as TextFieldProps)} />
    }

    case 'title': {
      return <TitleField.Field {...(props as TitleFieldProps)} />
    }

    // case 'address': {
    //   return <AddressField {...(props as AddressFieldProps)} />
    // }
    // case 'audio': {
    //   return <UploadAudioField {...(props as UploadAudioFieldProps)} />
    // }

    // case 'audioFiles': {
    //   return (
    //     <UploadAudioField
    //       {...(props as UploadAudioFieldProps)}
    //       isMultiple={true}
    //     />
    //   )
    // }

    // case 'date': {
    //   return <DateField {...(props as DateFieldProps)} type="single" />
    // }
    // case 'dateRange': {
    //   return <DateField {...(props as DateFieldProps)} type="range" />
    // }
    // case 'document': {
    //   return <UploadField {...(props as UploadFieldProps)} type="document" />
    // }
    // case 'documents': {
    //   return (
    //     <UploadField
    //       {...(props as UploadFieldProps)}
    //       type="document"
    //       isMultiple={true}
    //     />
    //   )
    // }
    // case 'gallery': {
    //   return (
    //     <UploadImageField
    //       {...(props as UploadImageFieldProps)}
    //       isMultiple={true}
    //     />
    //   )
    // }
    // case 'image': {
    //   return <UploadImageField {...(props as UploadImageFieldProps)} />
    // }
    // case 'multiReference': {
    //   return (
    //     <ReferenceField
    //       {...(props as TagSelectFieldProps)}
    //       type="multiReference"
    //       url='/admin/cms/collections/api?columns=["id", "collectionName"]'
    //     />
    //   )
    // }
    // case 'number': {
    //   return <InputField {...(props as InputFieldProps)} type="number" />
    // }
    // case 'privateNumber': {
    //   return <PrivateField {...(props as PrivateFieldProps)} type="number" />
    // }
    // case 'privateText': {
    //   return <PrivateField {...(props as PrivateFieldProps)} />
    // }
    // case 'reference': {
    //   return (
    //     <ReferenceField
    //       {...(props as TagSelectFieldProps)}
    //       type="reference"
    //       url='/admin/cms/collections/api?columns=["id", "collectionName"]'
    //     />
    //   )
    // }
    // case 'richContent': {
    //   return (
    //     <RichTextField {...(props as RichTextFieldProps)} hasInsert={true} />
    //   )
    // }
    // case 'richtext': {
    //   return <RichTextField {...(props as RichTextFieldProps)} />
    // }
    // case 'select': {
    //   return <SelectField {...(props as SelectFieldProps)} />
    // }
    // case 'tagSelect': {
    //   return <TagsSelectField {...(props as TagSelectFieldProps)} />
    // }
    // case 'tags': {
    //   return <TagsField {...(props as TagsFieldProps)} />
    // }

    // case 'time': {
    //   return <InputField type="time" {...(props as InputFieldProps)} />
    // }
    // case 'url': {
    //   return <InputField type="url" {...(props as InputFieldProps)} />
    // }
    // case 'video': {
    //   return <UploadVideoField {...(props as UploadVideoFieldProps)} />
    // }
    // case 'videos': {
    //   return <UploadVideoField {...(props as UploadVideoFieldProps)} />
    // }

    default:
      return null
  }
}

export function FieldOptions({
  type,
  fieldOptionsField,
  onChange,
  fieldId,
}: {
  fieldId: string
  fieldOptionsField: ColumnDialogState['fieldOptionsField']
  type: ColumnDialogState['typeField']['value']
  onChange: (felidOptions: FieldOptionsTypes) => void
}) {
  const handleOnUpdate = (felidOptions: FieldOptionsTypes) => {
    onChange && onChange(felidOptions)
  }

  const fieldProps = {
    ...fieldOptionsField,
    fieldId,
    onUpdate: handleOnUpdate,
  }

  switch (type) {
    case 'boolean':
      return <BooleanField.FieldOptions {...fieldProps} />

    case 'title':
      return <TitleField.FieldOptions {...fieldProps} />

    case 'text':
      return <TextField.FieldOptions {...fieldProps} />

    // case 'address':
    //   return (
    //     <AddressOptions
    //       type="address"
    //       {...(fieldOptionsField as AddressOption)}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )

    // case 'date':
    //   return (
    //     <DateOptions
    //       {...(fieldOptionsField as DateOption)}
    //       type="date"
    //       onUpdate={handleOnUpdate}
    //     />
    //   )

    // case 'dateRange':
    //   return (
    //     <DateOptions
    //       {...(fieldOptionsField as DateOption)}
    //       type="dateRange"
    //       onUpdate={handleOnUpdate}
    //     />
    //   )

    // case 'number':
    //   return (
    //     <InputOptions
    //       type="number"
    //       {...(fieldOptionsField as InputOption)}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )
    // case 'privateText':
    //   return (
    //     <PrivateOptions
    //       {...(fieldOptionsField as PrivateOption)}
    //       onUpdate={handleOnUpdate}
    //       type="text"
    //     />
    //   )
    // case 'privateNumber':
    //   return (
    //     <PrivateOptions
    //       type="number"
    //       {...(fieldOptionsField as PrivateOption)}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )

    // case 'select':
    //   return (
    //     <TagsOptions
    //       {...(fieldOptionsField as SelectOption)}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )

    // case 'tags':
    //   return (
    //     <SelectOptions
    //       {...(fieldOptionsField as SelectOption)}
    //       canAddItems={false}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )

    // case 'tagSelect':
    //   return (
    //     <TagSelectOptions
    //       {...(fieldOptionsField as SelectOption)}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )

    // case 'multiReference':
    //   return (
    //     <ReferenceOptions
    //       {...(fieldOptionsField as ReferenceOption)}
    //       type="reference"
    //       url='/admin/cms/collections/api?columns=["id", "collectionName"]'
    //       onUpdate={handleOnUpdate}
    //     />
    //   )

    // case 'reference':
    //   return (
    //     <ReferenceOptions
    //       {...(fieldOptionsField as ReferenceOption)}
    //       type="multiReference"
    //       url='/admin/cms/collections/api?columns=["id", "collectionName"]'
    //       onUpdate={handleOnUpdate}
    //     />
    //   )

    // case 'time':
    //   return (
    //     <InputOptions
    //       {...(fieldOptionsField as InputOption)}
    //       type="time"
    //       onUpdate={handleOnUpdate}
    //     />
    //   )

    // case 'audio':
    //   return (
    //     <UploadOptions
    //       {...(fieldOptionsField as FieldOptionsTypes)}
    //       type="audio"
    //       accept={{
    //         'audio/*': ['.mp3', '.aac', '.flac'],
    //       }}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )
    // case 'audioFiles':
    //   return (
    //     <UploadOptions
    //       {...(fieldOptionsField as FieldOptionsTypes)}
    //       type="audioFiles"
    //       accept={{
    //         'audio/*': ['.mp3', '.aac', '.flac'],
    //       }}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )
    // case 'document':
    //   return (
    //     <UploadOptions
    //       {...(fieldOptionsField as FieldOptionsTypes)}
    //       type="document"
    //       onUpdate={handleOnUpdate}
    //     />
    //   )
    // case 'documents':
    //   return (
    //     <UploadOptions
    //       {...(fieldOptionsField as FieldOptionsTypes)}
    //       type="documents"
    //       onUpdate={handleOnUpdate}
    //     />
    //   )
    // case 'gallery':
    //   return (
    //     <UploadOptions
    //       {...(fieldOptionsField as FieldOptionsTypes)}
    //       type="gallery"
    //       accept={{
    //         'image/*': ['.gif', '.jpg', '.jpeg', '.png', '.svg', '.webp'],
    //       }}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )
    // case 'image':
    //   return (
    //     <UploadOptions
    //       {...(fieldOptionsField as UploadOption)}
    //       type="image"
    //       accept={{
    //         'image/*': ['.gif', '.jpg', '.jpeg', '.png', '.svg', '.webp'],
    //       }}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )
    // case 'video':
    //   return (
    //     <UploadOptions
    //       {...(fieldOptionsField as UploadOption)}
    //       type="video"
    //       accept={{
    //         'video/*': ['.mp4', '.webm', '.ogg'],
    //       }}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )
    // case 'videos':
    //   return (
    //     <UploadOptions
    //       {...(fieldOptionsField as UploadOption)}
    //       type="videos"
    //       accept={{
    //         'video/*': ['.mp4', '.webm', '.ogg'],
    //       }}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )

    // case 'url':
    //   return (
    //     <InputOptions
    //       type="url"
    //       {...(fieldOptionsField as InputOption)}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )

    // case 'richContent':
    //   return (
    //     <InputOptions
    //       type="richContent"
    //       {...(fieldOptionsField as InputOption)}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )
    // case 'richtext':
    //   return (
    //     <InputOptions
    //       type="richtext"
    //       {...(fieldOptionsField as InputOption)}
    //       onUpdate={handleOnUpdate}
    //     />
    //   )

    default:
      return null
  }
}

export function Validation({
  type,
  validationField,
  onChange,
}: {
  type: CmsCollectionColumn['type']
  validationField: ColumnDialogState['validationField']
  onChange: (props: ValidationUpdateTypes) => void
}) {
  const validationFields: {
    [k in CmsCollectionColumn['type']]: (props: {
      validationField: { value: Record<string, any> }
      onChange: (props: ValidationUpdateTypes) => void
    }) => React.JSX.Element
  } = {
    boolean: (props) => <BooleanField.FieldValidation {...props} />,

    title: (props) => <TitleField.FieldValidation {...props} />,
    text: (props) => <TextField.FieldValidation {...props} />,
    // paragraph: (props) => <TextValidation {...props} />,
    // privateText: (props) => <TextValidation {...props} />,
    // number: (props) => <NumberValidation {...props} />,
    // privateNumber: (props) => <NumberValidation {...props} />,
    // audio: (props) => <FileValidation {...props} />,
    // document: (props) => <FileValidation {...props} />,
    // image: (props) => <FileValidation {...props} />,
    // video: (props) => <FileValidation {...props} />,

    // audioFiles: (props) => <FilesValidation {...props} />,
    // videos: (props) => <FilesValidation {...props} />,
    // documents: (props) => <FilesValidation {...props} />,
    // gallery: (props) => <FilesValidation {...props} />,

    // url: (props) => <Required {...props} />,
    // address: (props) => <Required {...props} />,
    // reference: (props) => <Required {...props} />,
    // richContent: (props) => <Required {...props} />,
    // richtext: (props) => <Required {...props} />,

    // date: (props) => <Required {...props} />,
    // dateRange: (props) => <Required {...props} />,
    // time: (props) => <Required {...props} />,
    // multiReference: (props) => <Required {...props} />,
    // tags: (props) => <Required {...props} />,
  }

  const Component = validationFields[type]

  return Component ? (
    <Component validationField={validationField} onChange={onChange} />
  ) : null
}

import { z } from 'zod'
import { VisibilityState } from '@tanstack/react-table'

import {
  cmsCollectionColumnInsertValidator,
  cmsCollectionColumnUpdateValidator,
  cmsCollectionColumnValidator,
  cmsCollectionDateColumnValidator,
  cmsCollectionDocumentInsertValidator,
  cmsCollectionDocumentUpdateValidator,
  cmsCollectionDocumentValidator,
  cmsCollectionEmailColumnValidator,
  cmsCollectionFileColumnValidator,
  cmsCollectionFilesColumnValidator,
  cmsCollectionInsertValidator,
  cmsCollectionNumberColumnValidator,
  cmsCollectionRequiredColumnValidator,
  cmsCollectionTagsColumnValidator,
  cmsCollectionTextColumnValidator,
  cmsCollectionTimeColumnValidator,
  cmsCollectionUpdateValidator,
  cmsCollectionValidator,
} from '@/features/cms/cms.validators'
import { AutocompleteCheckboxOption } from '@/components/autocomplete-checkbox'
import { TagInputItem } from '@/components/tags'

export type CmsConfigField<Validation> = {
  description: string
  title: string
  type: CmsCollectionColumn['type']
  validationDefaults?: Validation
  Icon?: (props: Record<string, any>) => React.JSX.Element
  validate: (value: unknown, validation: Validation) => string
}

export type CmsFieldBase = {
  className?: string
  errorMessage?: string
  fieldId: string
  id: string
  isInline?: boolean
  isSelected?: boolean
  value: unknown
  validate?: (value: unknown, validation: Record<string, any>) => string
  onUpdate: (newValue: unknown, errorMessage?: 'string') => void
  validation?: Record<string, string>
}

export type CmsField<TElement> = Omit<
  React.InputHTMLAttributes<TElement>,
  'value' | 'onChange' | 'id'
> &
  CmsFieldBase

/** Tenant Cms Collection **/
export type CmsCollection = z.infer<typeof cmsCollectionValidator>
export type CmsCollectionInsert = z.infer<typeof cmsCollectionInsertValidator>
export type CmsCollectionUpdate = z.infer<typeof cmsCollectionUpdateValidator>

/** Tenant Cms Collection Document **/
export type CmsCollectionDocument = z.infer<
  typeof cmsCollectionDocumentValidator
>
export type CmsCollectionDocumentInsert = z.infer<
  typeof cmsCollectionDocumentInsertValidator
>
export type CmsCollectionDocumentUpdate = z.infer<
  typeof cmsCollectionDocumentUpdateValidator
>

/** Tenant Cms Collection Column **/
export type CmsCollectionColumn = z.infer<typeof cmsCollectionColumnValidator>
export type CmsCollectionColumnInsert = z.infer<
  typeof cmsCollectionColumnInsertValidator
>
export type CmsCollectionColumnUpdate = z.infer<
  typeof cmsCollectionColumnUpdateValidator
>

/* CMS State */
type ErrorId = string // column.id:row.index
type ErrorMessage = string

export type CmsErrorState = Map<ErrorId, ErrorMessage>

export type CmsState = {
  collectionName: CmsCollection['collectionName']
  datasetId: CmsCollection['datasetId']
  collectionType: CmsCollection['type']
  columns: CmsCollectionColumn[]
  columnVisibility: VisibilityState
  data: CmsCollectionDocument[]
  isColumnDialogOpen: boolean
  columnOrder: string[]
  errors: CmsErrorState
}

export type CmsActionAddData = {
  type: 'addData'
  data: CmsState['data']
}

export type CmsActionUpdateData = {
  type: 'updateData'
  data: CmsState['data']
}

export type CmsActionAddColumns = {
  type: 'addColumns'
  columns: CmsState['columns']
}

export type CmsActionColumnAddVisibility = {
  type: 'addColumnVisibility'
  field: string
  value: boolean
}

export type CmsActionSetState = {
  type: 'setState'
  set:
    | Partial<{ [K in keyof CmsState]: CmsState[K] }>
    | ((state: CmsState) => CmsState)
}

export type CmsActionUpdateColumn = {
  type: 'updateColumn'
  column: CmsStateUpdateColumn
}

export type CmsActions =
  | CmsActionAddData
  | CmsActionUpdateData
  | CmsActionAddColumns
  | CmsActionColumnAddVisibility
  | CmsActionSetState
  | CmsActionUpdateColumn

export type CmsStateInsert = {
  fieldId: CmsCollectionColumn['fieldId']
  columnName: CmsCollectionColumn['columnName']
  type: CmsCollectionColumn['type']
  fieldOptions?: CmsCollectionColumn['fieldOptions']
  help?: CmsCollectionColumn['help']
  enableDelete?: CmsCollectionColumn['enableDelete']
  enableSort?: CmsCollectionColumn['enableSort']
  enableHide?: CmsCollectionColumn['enableHide']
  enableFilter?: CmsCollectionColumn['enableFilter']
  filter?: CmsCollectionColumn['filter']
  sortBy?: CmsCollectionColumn['sortBy']
  visibility?: CmsCollectionColumn['visibility']
  index?: CmsCollectionColumn['index']
}

export type CmsStateUpdateCollection = {
  collectionName?: CmsCollection['collectionName']
  type?: CmsCollection['type']
  data?: CmsCollection['data']
  columnOrder?: CmsCollection['columnOrder']
}

export type CmsStateUpdateColumn = {
  fieldId: CmsCollectionColumn['fieldId']
  columnName?: CmsCollectionColumn['columnName']
  type?: CmsCollectionColumn['type']
  fieldOptions?: CmsCollectionColumn['fieldOptions']
  help?: CmsCollectionColumn['help']
  enableDelete?: CmsCollectionColumn['enableDelete']
  enableSort?: CmsCollectionColumn['enableSort']
  enableHide?: CmsCollectionColumn['enableHide']
  enableFilter?: CmsCollectionColumn['enableFilter']
  filter?: CmsCollectionColumn['filter']
  sortBy?: CmsCollectionColumn['sortBy']
  visibility?: CmsCollectionColumn['visibility']
  index?: CmsCollectionColumn['index']
}

export type CmsStateUpdate = CmsStateUpdateCollection | CmsStateUpdateColumn

/*
 * Field Options
 */
export type AddressOption = { defaultValue?: string }
export type InputOption = { defaultValue?: string | number }
export type EmailOption = { defaultValue?: string | number }

export type DateOption = {
  type?: 'date' | 'dateRange'
  betweenDates?: Date[]
  defaultValue?: Date
  excludeDates?: Date[]
  selectType?: 'single' | 'multiple'
  showTime?: boolean
}
export type PrivateOption = {
  type?: 'text' | 'number'
  defaultValue?: string
  toggleVisibility?: boolean
}
export type SelectOption = {
  canAddItems?: boolean
  defaultValue?: string
  items?: TagInputItem[]
  selectType?: 'single' | 'multiple'
}

export type RichContent = {
  defaultValue?: {
    type: string
    children: { text: string }[]
  }[]
}

export type ReferenceOption = {
  type?: 'reference' | 'multiReference'
  canAddItems?: boolean
  defaultValue?: TagInputItem[]
  items?: TagInputItem[]
  selectType?: 'single' | 'multiple'
}

export type UploadOption = {
  items?: AutocompleteCheckboxOption[]
  canAddItems?: boolean
  defaultValue?: AutocompleteCheckboxOption[]
  selectType?: 'single' | 'multiple'
} & (
  | {
      type: 'audio' | 'audioFiles'
      accept: {
        'audio/*': ('.mp3' | '.aac' | '.flac')[]
      }
    }
  | {
      type: 'image' | 'gallery'
      accept: {
        'image/*': ('.gif' | '.jpg' | '.jpeg' | '.png' | '.svg' | '.webp')[]
      }
    }
  | {
      type: 'video' | 'videos'
      accept: {
        'video/*': ('.mp4' | '.webm' | '.ogg')[]
      }
    }
  | {
      type: 'document' | 'documents'
      accept?: Record<string, string[]>
    }
)

export type AudioOptions = {
  items?: AutocompleteCheckboxOption[]
  canAddItems?: boolean
  defaultValue?: AutocompleteCheckboxOption[]
  selectType?: 'single' | 'multiple'
  type: 'audio' | 'audioFiles'
  accept: {
    'audio/*': ('.mp3' | '.aac' | '.flac')[]
  }
}

export type FieldOptionsTypes =
  | AddressOption
  | InputOption
  | BooleanOption
  | DateOption
  | PrivateOption
  | SelectOption
  | RichContent
  | ReferenceOption
  | UploadOption

const cmsCollectionRequiredColumnField =
  cmsCollectionRequiredColumnValidator.pick({
    validation: true,
  })
export type CmsCollectionRequiredColumnField = z.infer<
  typeof cmsCollectionRequiredColumnField
>['validation']

const cmsCollectionDateColumnField = cmsCollectionDateColumnValidator.pick({
  validation: true,
})
export type CmsCollectionDateColumnField = z.infer<
  typeof cmsCollectionDateColumnField
>['validation']

const cmsCollectionEmailColumnField = cmsCollectionEmailColumnValidator.pick({
  validation: true,
})
export type CmsCollectionEmailColumnField = z.infer<
  typeof cmsCollectionEmailColumnField
>['validation']

const cmsCollectionFileColumnField = cmsCollectionFileColumnValidator.pick({
  validation: true,
})
export type CmsCollectionFileColumnField = z.infer<
  typeof cmsCollectionFileColumnField
>['validation']

const cmsCollectionFilesColumnField = cmsCollectionFilesColumnValidator.pick({
  validation: true,
})
export type CmsCollectionFilesColumnField = z.infer<
  typeof cmsCollectionFilesColumnField
>['validation']

const cmsCollectionNumberColumnField = cmsCollectionNumberColumnValidator.pick({
  validation: true,
})
export type CmsCollectionNumberColumnField = z.infer<
  typeof cmsCollectionNumberColumnField
>['validation']

const cmsCollectionTagsColumnField = cmsCollectionTagsColumnValidator.pick({
  validation: true,
})
export type XmsCollectionTagsColumnField = z.infer<
  typeof cmsCollectionTagsColumnField
>['validation']

const cmsCollectionTextColumnField = cmsCollectionTextColumnValidator.pick({
  validation: true,
})
export type CmsCollectionTextColumnField = z.infer<
  typeof cmsCollectionTextColumnField
>['validation']

const cmsCollectionTimeColumnField = cmsCollectionTimeColumnValidator.pick({
  validation: true,
})
export type CmsCollectionTimeColumnField = z.infer<
  typeof cmsCollectionTimeColumnField
>['validation']

export type ValidationUpdateTypes =
  | CmsCollectionRequiredColumnField
  | CmsCollectionDateColumnField
  | CmsCollectionEmailColumnField
  | CmsCollectionFileColumnField
  | CmsCollectionFilesColumnField
  | CmsCollectionNumberColumnField
  | XmsCollectionTagsColumnField
  | CmsCollectionTextColumnField
  | CmsCollectionTimeColumnField

/* ColumnDialog */
export type ColumnDialogFieldState<Value> = {
  readonly value: Value
  readonly error: ''
  readonly validate: ({
    setError,
    value,
  }: {
    setError: (message: string) => void
    value: string
  }) => boolean
}

export type ColumnDialogFieldOptionsFieldState = {
  readonly value: FieldOptionsTypes
  readonly error: ''
  readonly validate: ({
    setError,
    value,
  }: {
    setError: (message: string) => void
    value: string
  }) => boolean
}

export type ColumnDialogState = {
  columnNameField: ColumnDialogFieldState<string>
  fieldIdField: ColumnDialogFieldState<string>
  fieldOptionsField: ColumnDialogFieldState<FieldOptionsTypes>
  helpField: ColumnDialogFieldState<string>
  typeField: ColumnDialogFieldState<CmsCollectionColumn['type']>
  validationField: ColumnDialogFieldState<ValidationUpdateTypes>
}

export type ColumnNameFieldActionType = {
  type: 'columnNameField'
  value: string
  error: string
}
export type FieldIdFieldActionType = {
  type: 'fieldIdField'
  value: string
  error: string
}
export type FieldOptionsFieldActionType = {
  type: 'fieldOptionsField'
  value: FieldOptionsTypes
  error: string
}
export type HelpFieldActionType = {
  type: 'helpField'
  value: string
  error: string
}
export type TypeFieldActionType = {
  type: 'typeField'
  value: CmsCollectionColumn['type']
  error: string
}
export type ValidationFieldActionType = {
  type: 'validationField'
  value: ValidationUpdateTypes
  error: string
}

export type ColumnDialogFieldActionType =
  | ColumnNameFieldActionType
  | FieldIdFieldActionType
  | FieldOptionsFieldActionType
  | HelpFieldActionType
  | TypeFieldActionType
  | ValidationFieldActionType

export type ColumnDialogFieldErrorActionType = {
  type:
    | 'columnNameField'
    | 'fieldIdField'
    | 'fieldOptionsField'
    | 'helpField'
    | 'typeField'
    | 'validationField'
  error: string
}

export type ColumnDialogResetActionType = {
  type: 'reset'
}

export type ColumnDialogActionTypes =
  | ColumnDialogFieldActionType
  | ColumnDialogFieldErrorActionType
  | ColumnDialogResetActionType

/* Validation Options */

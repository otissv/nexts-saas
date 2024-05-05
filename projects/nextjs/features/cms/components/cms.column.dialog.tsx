'use client'

import React from 'react'
import { RefreshCcw, CheckCircle2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  CmsCollectionColumn,
  CmsStateInsert,
  ColumnDialogActionTypes,
  ColumnDialogFieldErrorActionType,
  ColumnDialogState,
  FieldOptionsFieldActionType,
  FieldOptionsTypes,
  ValidationUpdateTypes,
} from '@/features/cms/cms.types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  GetFieldIcon,
  fieldTypeConfig,
  FieldOptions,
  Validation,
} from '@/features/cms/components/cms-config'

export type SetError = (error: string) => void
export type Field<Value> = {
  value: Value
  error: string
  validate: ({ setError, value }: { setError: SetError; value: any }) => boolean
}

export function ColumnDialog({
  step: initialStep = 1,
  children,
  columnName = '',
  fieldId = '',
  type = 'text',
  help = '',
  fieldOptions,
  validation,
  onAddColumn,
  onEditColumn,
  process = 'add',
}: {
  process: 'add' | 'edit'
  step: 1 | 2
  children: React.ReactNode
  fieldOptions?: FieldOptionsTypes
  columnName?: string
  fieldId?: string
  help?: string
  type?: CmsCollectionColumn['type']
  validation?: ValidationUpdateTypes
  onAddColumn?: (values: CmsStateInsert) => void
  onEditColumn?: (values: Partial<CmsCollectionColumn>) => void
}) {
  const [open, setOpen] = React.useState(false)

  const initialState: ColumnDialogState = {
    columnNameField: {
      value: columnName,
      error: '',
      validate: ({
        setError,
        value,
      }: {
        setError: (message: string) => void
        value: string
      }) => {
        if (
          typeof value !== 'string' ||
          value.trim().length < 2 ||
          value.trim().length > 50
        ) {
          setError(
            'This filed is required and a minium 3 and a maximin of 50 characters'
          )

          return false
        }

        setError('')
        return true
      },
    },
    fieldIdField: {
      value: fieldId,
      error: '',
      validate: ({
        setError,
        value,
      }: {
        setError: (message: string) => void
        value: string
      }) => {
        if (
          typeof value !== 'string' ||
          value.trim().length < 2 ||
          value.trim().length > 50
        ) {
          setError(
            'This filed is required and a minium 3 and a maximin of 50 characters'
          )

          return false
        }

        setError('')
        return true
      },
    },
    fieldOptionsField: {
      value: {
        ...fieldOptions,
        defaultValue:
          type === 'richContent' || type === 'richtext'
            ? fieldOptions?.defaultValue || [
                { type: 'p', children: [{ text: '' }] },
              ]
            : fieldOptions?.defaultValue || undefined,
      } as any,

      error: '',
      validate: () => true,
    },
    helpField: {
      value: help,
      error: '',
      validate: () => true,
    },
    typeField: {
      value: type,
      error: '',
      validate: ({
        setError,
        value,
      }: {
        setError: (message: string) => void
        value: string
      }) => {
        if (
          typeof value !== 'string' ||
          value.trim().length < 2 ||
          value.trim().length > 50
        ) {
          setError(
            'This filed is required and a minium 3 and a maximin of 50 characters'
          )

          return false
        }

        setError('')
        return true
      },
    },
    validationField: {
      value: validation || (fieldTypeConfig as any)[type].validation,
      error: '',
      validate: () => true,
    },
  }

  const reducer = (
    state: ColumnDialogState,
    { type, ...payload }: ColumnDialogActionTypes
  ) => {
    // console.log('state: ', state[type].value, payload)
    // console.log('state: update ', {
    //   ...(state as any)[type],
    //   ...payload,
    // })

    switch (type) {
      case 'columnNameField':
      case 'fieldIdField':
      case 'fieldOptionsField':
      case 'helpField':
      case 'typeField':
      case 'validationField':
        return {
          ...state,
          [type]: {
            ...(state as any)[type],
            ...payload,
          },
        }

      case 'reset':
        return initialState

      default:
        return state
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState)

  console.log('CmsDialog: ', state)

  const {
    typeField,
    columnNameField,
    fieldIdField,
    helpField,
    fieldOptionsField,
    validationField,
  } = state

  const columnDialogIsInvalid: (
    dispatch: (value: ColumnDialogFieldErrorActionType) => void,
    fields: {
      field: TypeOfProperty<ColumnDialogState>
      type: ColumnDialogFieldErrorActionType['type']
    }[]
  ) => boolean = (dispatch, fields) => {
    for (let { field, type } of fields) {
      const isInvalid = !field.validate({
        setError: (error: string) => dispatch({ type, error }),
        value: field.value,
      })

      if (isInvalid) return true
    }

    return false
  }

  const handleClearForm = () => {
    dispatch({ type: 'reset' })
    setStep(process === 'edit' ? 2 : 1)
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (
      columnDialogIsInvalid(dispatch, [
        { field: typeField, type: 'typeField' },
        { field: columnNameField, type: 'columnNameField' },
        { field: fieldIdField, type: 'fieldIdField' },
        { field: helpField, type: 'helpField' },
        { field: fieldOptionsField, type: 'fieldOptionsField' },
        { field: validationField, type: 'validationField' },
      ])
    ) {
      return
    }

    const values = {
      type: typeField.value as CmsCollectionColumn['type'],
      columnName: columnNameField.value as CmsCollectionColumn['columnName'],
      fieldId: fieldIdField.value as CmsCollectionColumn['fieldId'],
      help: helpField.value as CmsCollectionColumn['help'],
      fieldOptions:
        fieldOptionsField.value as CmsCollectionColumn['fieldOptions'],
      validation: validationField.value as CmsCollectionColumn['validation'],
    }

    console.log('handleSubmit: ', values)

    // onAddColumn ? onAddColumn(values) : onEditColumn && onEditColumn(values)

    // const restField = {
    //   value: validation,
    //   error: '',
    //   validate: () => true,
    // }
    //TODO: clear form after save
  }

  const [step, setStep] = React.useState<1 | 2>(initialStep)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <ColumnDialogContent
          step={step}
          setStep={setStep}
          typeField={typeField}
          columnNameField={columnNameField}
          fieldIdField={fieldIdField}
          helpField={helpField}
          fieldOptionsField={fieldOptionsField}
          validationField={validationField}
          onSettingsChange={(type, value) =>
            dispatch({ type, value, error: '' })
          }
          onValidationChange={(value) =>
            dispatch({ type: 'validationField', value, error: '' })
          }
          onSettingsBlur={(type, value) =>
            columnDialogIsInvalid(dispatch, [
              { field: { ...state[type], value }, type },
            ])
          }
          onFieldOptionsChange={(fieldOption) => {
            dispatch({
              type: 'fieldOptionsField',
              value: {
                ...fieldOptionsField.value,
                ...fieldOption,
              },
              error: '',
            } as FieldOptionsFieldActionType)
          }}
        />

        <div className="flex justify-start mt-2">
          <DialogClose asChild>
            <Button variant="outline" onClick={handleClearForm}>
              Cancel
            </Button>
          </DialogClose>

          {step === 2 && (
            <DialogClose asChild className="ml-auto">
              <Button onClick={handleSubmit}>Save</Button>
            </DialogClose>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ColumnDialogContent({
  fieldOptionsField,
  fieldIdField,
  helpField,
  columnNameField,
  step = 1,
  typeField,
  validationField,
  setStep,
  onSettingsChange,
  onSettingsBlur,
  onValidationChange,
  onValidationBlur,
  onFieldOptionsChange,
  onFieldOptionsBlur,
}: {
  step: 1 | 2
  fieldOptionsField: ColumnDialogState['fieldOptionsField']
  fieldIdField: ColumnDialogState['fieldIdField']
  helpField: ColumnDialogState['helpField']
  columnNameField: ColumnDialogState['columnNameField']
  typeField: ColumnDialogState['typeField']
  validationField: ColumnDialogState['validationField']
  setStep: React.Dispatch<React.SetStateAction<1 | 2>>
  onSettingsChange: (
    type: keyof Omit<
      ColumnDialogState,
      'fieldOptionsField' | 'validationField'
    >,
    value: string
  ) => void
  onSettingsBlur: (
    type: keyof Omit<
      ColumnDialogState,
      'fieldOptionsField' | 'validationField'
    >,
    value: string
  ) => void

  onValidationChange: (value: ValidationUpdateTypes) => void
  onValidationBlur: (value: ValidationUpdateTypes) => void
  onFieldOptionsChange: (value: FieldOptionsTypes) => void
  onFieldOptionsBlur: (value: FieldOptionsTypes) => void
}) {
  const [_type, setType] = React.useState<CmsCollectionColumn['type']>('text')

  return step === 1 ? (
    <div>
      <DialogHeader className="mb-4">
        <DialogTitle>Add a column</DialogTitle>
      </DialogHeader>
      <div className="h-[416px] overflow-y-auto">
        <div className="grid grid-cols-3 gap-3 overflow-hidden">
          {Object.values(fieldTypeConfig).map(
            ({ title, type, description }) => {
              const isType = typeField.value === type

              return (
                <div
                  key={type}
                  onClick={() => {
                    setType(type)
                    onSettingsChange('typeField', type)
                    setStep(2)
                  }}
                >
                  <div className="relative pt-2">
                    <Card
                      className={cn(
                        'relative h-28 hover:bg-accent hover:text-accent-foreground cursor-pointer',
                        isType && 'border-2 bg-gray-900'
                      )}
                    >
                      <CardHeader className="p-3">
                        <CardTitle className="text-sm flex items-start">
                          <GetFieldIcon className="p-0 h-4 mr-1" type={type} />
                          {title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    {isType && (
                      <CheckCircle2Icon className="absolute top-[0.2rem] right-[-0.4rem] text-accent-foreground rounded-full bg-accent" />
                    )}
                  </div>
                </div>
              )
            }
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <DialogHeader className="mb-4">
        <DialogTitle>
          Edit {columnNameField.value ? columnNameField.value : 'a column'}
        </DialogTitle>
      </DialogHeader>
      <div className="min-h-[420px]">
        <Tabs defaultValue="setting" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-5">
            <TabsTrigger value="setting">Setting</TabsTrigger>
            <TabsTrigger value="validations">Validations</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
          </TabsList>

          <TabsContent value="setting">
            <div className="mb-4">
              <Label htmlFor="type" className="mb-2">
                Column Type
              </Label>
              <div className="relative flex items-center">
                <GetFieldIcon
                  className="absolute pointer-events-none h-3 w-3 ml-4 text-muted-foreground"
                  type={typeField.value as any}
                />
                <Input
                  className={cn(
                    'pl-8 text-muted-foreground w-30',
                    typeField.error && 'border-destructive'
                  )}
                  id="type"
                  defaultValue={typeField.value}
                  disabled
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                    onSettingsBlur &&
                    onSettingsBlur('typeField', e.target.value)
                  }
                />

                {typeField.value !== 'title' && (
                  <Button
                    variant="outline"
                    className="ml-4 px-2"
                    title="Change Content Type"
                    onClick={() => setStep(1)}
                  >
                    <RefreshCcw className="h-4 w-4 mr-2" /> Change Type
                  </Button>
                )}

                {typeField.error ? (
                  <p className="text-destructive text-sm mt-2">
                    {typeField.error}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid grid-col-2 gap-4 mb-4">
              <div>
                <Label htmlFor="name" className="mb-2" required>
                  Column Name
                </Label>
                <Input
                  required
                  id="name"
                  className={cn(columnNameField.error && 'border-destructive')}
                  value={columnNameField.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onSettingsChange &&
                      onSettingsChange('columnNameField', e.target.value)
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                    onSettingsBlur &&
                    onSettingsBlur('columnNameField', e.target.value)
                  }
                />
                {columnNameField.error ? (
                  <p className="text-destructive text-sm mt-2">
                    {columnNameField.error}
                  </p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="fieldId" className="mb-2" required>
                  Column ID
                </Label>
                <Input
                  required
                  id="fieldId"
                  value={fieldIdField.value}
                  className={cn(fieldIdField.error && 'border-destructive')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onSettingsChange &&
                      onSettingsChange('fieldIdField', e.target.value)
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                    onSettingsBlur &&
                    onSettingsBlur('fieldIdField', e.target.value)
                  }
                />
                {fieldIdField.error ? (
                  <p className="text-destructive text-sm mt-2">
                    {fieldIdField.error}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="help" className="mb-2">
                Help text
                <span className="ml-1 text-muted-foreground">(optional)</span>
              </Label>
              <Input
                required
                id="help"
                value={helpField.value}
                className={cn(helpField.error && 'border-destructive')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onSettingsChange &&
                    onSettingsChange('helpField', e.target.value)
                }}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                  onSettingsBlur && onSettingsBlur('helpField', e.target.value)
                }
              />
              {helpField.error ? (
                <p className="text-destructive text-sm mt-2">
                  {helpField.error}
                </p>
              ) : null}
            </div>
          </TabsContent>
          <TabsContent value="validations">
            <Validation
              type={typeField.value}
              validationField={validationField}
              onChange={onValidationChange}
            />
          </TabsContent>
          <TabsContent value="options">
            <FieldOptions
              fieldId={fieldIdField.value}
              type={typeField.value}
              fieldOptionsField={fieldOptionsField}
              onChange={onFieldOptionsChange}
              onBlur={onFieldOptionsBlur}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import { RefreshCcw, CheckCircle2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { CmsCollectionColumn, CmsStateInsert } from '@/features/cms/cms.types'
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
import { Switch } from '@/components/ui/switch'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  GetFieldComponent,
  GetFieldIcon,
  fieldTypeConfig,
} from '@/features/cms/components/cms.input-fields'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export type SetError = (error: string) => void
export type Field<Value> = {
  // value: CmsCollectionColumn['validation'] | string | boolean | number
  value: Value
  error: string
  validate: ({ setError, value }: { setError: SetError; value: any }) => boolean
}

type RequiredUpdate = { required: boolean }
type MinLengthUpdate = { minLength: number }
type MaxLengthUpdate = { maxLength: number }
type MinItemsUpdate = { minItems: number }
type MaxItemsUpdate = { maxItems: number }
type SizeUpdate = { size: number }
type MinUpdate = { min: number }
type MaxUpdate = { max: number }
type FileValidationUpdate = RequiredUpdate | SizeUpdate
type FilesValidationUpdate =
  | RequiredUpdate
  | SizeUpdate
  | MinItemsUpdate
  | MaxItemsUpdate
type NumberValidationUpdate = RequiredUpdate | MinUpdate | MaxUpdate
type TextValidationUpdate = RequiredUpdate | MinLengthUpdate | MaxLengthUpdate

type ValidationUpdateTypes =
  | RequiredUpdate
  | MinLengthUpdate
  | MaxLengthUpdate
  | MinItemsUpdate
  | MaxItemsUpdate
  | SizeUpdate
  | MinUpdate
  | MaxUpdate
  | TextValidationUpdate
  | FileValidationUpdate
  | FilesValidationUpdate
  | NumberValidationUpdate

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
  fieldOptions?: string
  columnName?: string
  fieldId?: string
  help?: string
  type?: CmsCollectionColumn['type']
  validation?: CmsCollectionColumn['validation']
  onAddColumn?: (values: CmsStateInsert) => void
  onEditColumn?: (values: Partial<CmsCollectionColumn>) => void
}) {
  const [open, setOpen] = React.useState(false)

  const [typeField, setTypeField] = React.useState<
    Field<CmsCollectionColumn['type'] | ''>
  >({
    value: type,
    error: '',
    validate: ({ setError, value }) => {
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
  })

  const [columnNameField, setNameField] = React.useState<
    Field<CmsCollectionColumn['columnName']>
  >({
    value: columnName,
    error: '',
    validate: ({ setError, value }) => {
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
  })

  const [fieldIdField, setFieldIdField] = React.useState<
    Field<CmsCollectionColumn['fieldId']>
  >({
    value: fieldId,
    error: '',
    validate: ({ setError, value }) => {
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
  })

  const [helpField, setHelpField] = React.useState<
    Field<CmsCollectionColumn['help']>
  >({
    value: help,
    error: '',
    validate: () => true,
  })

  const [fieldOptionsField, setFieldOptionsField] = React.useState<
    Field<CmsCollectionColumn['fieldOptions']>
  >({
    value: {
      ...fieldOptions,
      defaultValue:
        fieldOptions || type === 'richContent' || type === 'richtext'
          ? [{ type: 'p', children: [{ text: '' }] }]
          : '',
    },

    error: '',
    validate: () => true,
  })

  const [validationField, setValidationField] = React.useState<
    Field<CmsCollectionColumn['validation']>
  >({
    value: validation || (fieldTypeConfig as any)[type].validation,
    error: '',
    validate: () => true,
  })

  const columnDialogIsInvalid: <Value>(
    fields: [Field<Value>, SetError][]
  ) => boolean = (fields) => {
    for (let [field, setError] of fields) {
      const isInvalid = !field.validate({
        setError,
        value: field.value,
      })

      if (isInvalid) return true
    }

    return false
  }

  const handleClearForm = () => {
    setTypeField({ ...typeField, value: '' })
    setNameField({ ...columnNameField, value: '' })
    setFieldIdField({ ...fieldIdField, value: '' })
    setHelpField({ ...helpField, value: '' })
    setFieldOptionsField({ ...fieldOptionsField, value: '' })
    setValidationField({
      ...validationField,
      value: {
        required: false,
      },
    })
    setStep(process === 'edit' ? 2 : 1)
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const setError: <Value>(
      field: Field<Value>,
      setField: React.Dispatch<React.SetStateAction<Field<Value>>>
    ) => (error: string) => void = (field, setField) => (error) => {
      return setField({
        ...field,
        error,
      })
    }

    if (
      columnDialogIsInvalid([
        [typeField, setError(typeField, setTypeField)],
        [columnNameField, setError(columnNameField, setNameField)],
        [fieldIdField, setError(fieldIdField, setFieldIdField)],
        [helpField, setError(helpField, setHelpField)],
        [fieldOptionsField, setError(fieldOptionsField, setFieldOptionsField)],
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

    onAddColumn ? onAddColumn(values) : onEditColumn && onEditColumn(values)

    const restField = {
      value: validation,
      error: '',
      validate: () => true,
    }
    //TODO: clear form after save
  }

  // return <div>{step}</div>

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
          setTypeField={setTypeField}
          setNameField={setNameField}
          setFieldIdField={setFieldIdField}
          setHelpField={setHelpField}
          validationField={validationField}
          setValidationField={setValidationField}
          setFieldOptionsField={setFieldOptionsField}
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
  setFieldOptionsField,
  setFieldIdField,
  setHelpField,
  setNameField,
  setStep,
  setTypeField,
  setValidationField,
}: {
  step: 1 | 2
  fieldOptionsField: Field<CmsCollectionColumn['fieldOptions']>
  fieldIdField: Field<CmsCollectionColumn['fieldId']>
  helpField: Field<CmsCollectionColumn['help']>
  columnNameField: Field<CmsCollectionColumn['columnName']>
  typeField: Field<CmsCollectionColumn['type'] | ''>
  validationField: Field<CmsCollectionColumn['validation']>
  setStep: React.Dispatch<React.SetStateAction<1 | 2>>
  setFieldOptionsField: React.Dispatch<
    React.SetStateAction<Field<CmsCollectionColumn['fieldOptions']>>
  >
  setFieldIdField: React.Dispatch<
    React.SetStateAction<Field<CmsCollectionColumn['fieldId']>>
  >
  setHelpField: React.Dispatch<
    React.SetStateAction<Field<CmsCollectionColumn['help']>>
  >
  setNameField: React.Dispatch<
    React.SetStateAction<Field<CmsCollectionColumn['columnName']>>
  >
  setTypeField: React.Dispatch<
    React.SetStateAction<Field<CmsCollectionColumn['type'] | ''>>
  >
  setValidationField: React.Dispatch<
    React.SetStateAction<Field<CmsCollectionColumn['validation']>>
  >
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
                    setTypeField({
                      ...typeField,
                      value: type,
                    })
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
        <DialogTitle>Edit a column</DialogTitle>
      </DialogHeader>
      <div className="h-[416px] overflow-y-auto">
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
                  className="pl-8 text-muted-foreground w-30"
                  id="type"
                  defaultValue={typeField.value}
                  disabled
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
                  value={columnNameField.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldIdField({
                      ...columnNameField,
                      value: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="fieldId" className="mb-2" required>
                  Column ID
                </Label>
                <Input
                  required
                  id="fieldId"
                  value={fieldIdField.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldIdField({
                      ...fieldIdField,
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="help" className="mb-2">
                Help text (optional)
              </Label>
              <Input
                required
                id="help"
                value={helpField.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldIdField({
                    ...helpField,
                    value: e.target.value,
                  })
                }
              />
            </div>
          </TabsContent>
          <TabsContent value="validations">
            <Validation
              type={typeField.value}
              validationField={validationField}
              setValidationField={setValidationField}
            />
          </TabsContent>
          <TabsContent value="options">
            <FieldOptions
              type={typeField.value}
              fieldOptionsField={fieldOptionsField}
              setFieldOptions={setFieldOptionsField}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export function RequiredValidation({
  checked,
  onUpdate,
}: {
  checked?: boolean
  onUpdate: (props: { required: boolean }) => void
}) {
  const handleOnCheckChange = (checked: boolean) => {
    onUpdate && onUpdate({ required: checked })
  }

  return (
    <div className="flex items-center space-x-2 mb-4">
      <Switch
        id="requiredField"
        checked={Boolean(checked)}
        onCheckedChange={handleOnCheckChange}
      />
      <Label htmlFor="requiredField">Make this a require field</Label>
    </div>
  )
}

export function FileValidation({
  validationField,
  onUpdate,
}: {
  validationField: {
    value: {
      required?: boolean
      size?: number
    }
  }
  onUpdate: (props: FileValidationUpdate) => void
}) {
  const { required, size } = validationField.value

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate && onUpdate({ size: parseInt(e.target.value, 10) })
  }

  return (
    <>
      <RequiredValidation checked={required} onUpdate={onUpdate} />

      <div className="mb-4">
        <Label htmlFor="fieldId" className="text-sm">
          Size in kb
        </Label>
        <Input
          type="number"
          id="fieldId"
          value={size}
          className="w-16"
          onChange={handleOnChange}
        />
      </div>
    </>
  )
}

export function FilesValidation({
  validationField,
  onUpdate,
}: {
  validationField: {
    value: {
      minItems?: number
      maxItems?: number
      required?: boolean
      size?: number
    }
  }
  onUpdate: (props: FilesValidationUpdate) => void
}) {
  const { minItems, maxItems, size, required } = validationField.value

  const handleOnChange =
    (field: 'minItems' | 'maxItems' | 'size') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value

      if (field === 'minItems') {
        value = { minItems: parseInt(e.target.value, 10) }
      } else if (field === 'maxItems') {
        value = { maxItems: parseInt(e.target.value, 10) }
      } else if (field === 'size') {
        value = { size: parseInt(e.target.value, 10) }
      }
      onUpdate && onUpdate(value as FilesValidationUpdate)
    }

  return (
    <>
      <RequiredValidation checked={required} onUpdate={onUpdate} />

      <div className="mb-4">
        <Label htmlFor="fieldId" className="text-sm">
          File Size in kb
        </Label>
        <Input
          type="number"
          id="fieldId"
          value={size}
          className="w-16"
          onChange={handleOnChange('size')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 w-40">
        <div className="mb-4">
          <Label htmlFor="fieldName" className="text-sm">
            Min Number of Items
          </Label>
          <Input
            id="fieldName"
            value={minItems}
            className="w-16"
            onChange={handleOnChange('minItems')}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="fieldId" className="text-sm">
            Max Number of Items
          </Label>
          <Input
            id="fieldId"
            value={maxItems}
            className="w-16"
            onChange={handleOnChange('maxItems')}
          />
        </div>
      </div>
    </>
  )
}

export function NumberValidation({
  validationField,
  onUpdate,
}: {
  validationField: {
    value: {
      required?: boolean
      min?: number
      max?: number
    }
  }
  onUpdate: (props: NumberValidationUpdate) => void
}) {
  const { min, max, required } = validationField.value

  const handleOnChange =
    (field: 'min' | 'max') => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value

      if (field === 'min') {
        value = { min: parseInt(e.target.value, 10) }
      } else if (field === 'max') {
        value = { max: parseInt(e.target.value, 10) }

        onUpdate && onUpdate(value)
      }
    }

  return (
    <>
      <RequiredValidation checked={required} onUpdate={onUpdate} />

      <div className="grid grid-cols-2 gap-4 w-40">
        <div className="mb-4">
          <Label htmlFor="fieldName" className="text-sm">
            Min Number
          </Label>
          <Input
            id="fieldName"
            value={min}
            className="w-16"
            onChange={handleOnChange('min')}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="fieldId" className="text-sm">
            Max Number
          </Label>
          <Input
            id="fieldId"
            value={max}
            className="w-16"
            onChange={handleOnChange('max')}
          />
        </div>
      </div>
    </>
  )
}

export function TextValidation({
  validationField,
  onUpdate,
}: {
  validationField: {
    value: {
      required?: boolean
      minLength?: number
      maxLength?: number
    }
  }
  onUpdate: (props: TextValidationUpdate) => void
}) {
  const { minLength, maxLength, required } = validationField.value

  const handleOnChange =
    (field: 'minLength' | 'maxLength') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === 'minLength'
          ? { minLength: parseInt(e.target.value, 10) }
          : { maxLength: parseInt(e.target.value, 10) }

      onUpdate && onUpdate(value)
    }

  return (
    <>
      <RequiredValidation checked={required} onUpdate={onUpdate} />

      <span className="mb-2">Number of characters</span>
      <div className="grid grid-cols-2 gap-4 w-40">
        <div className="mb-4">
          <Label htmlFor="fieldName" className="text-sm">
            <span className="whitespace-nowrap">Min Length</span>
          </Label>
          <Input
            id="fieldName"
            value={minLength}
            className="w-16"
            onChange={handleOnChange('minLength')}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="fieldId" className="text-sm">
            <span className="whitespace-nowrap">Max Length</span>
          </Label>
          <Input
            id="fieldId"
            value={maxLength}
            className="w-16"
            onChange={handleOnChange('maxLength')}
          />
        </div>
      </div>
    </>
  )
}

export function Validation({
  type,
  validationField,
  onUpdate,
}: {
  type: CmsCollectionColumn['type']
  validationField: { value: Record<string, any> }
  onUpdate: (props: ValidationUpdateTypes) => void
}) {
  const validationFields: {
    [k in CmsCollectionColumn['type']]: (props: {
      validationField: { value: Record<string, any> }
      onUpdate: (props: ValidationUpdateTypes) => void
    }) => React.JSX.Element
  } = {
    title: (props) => <TextValidation {...props} />,
    text: (props) => <TextValidation {...props} />,
    privateText: (props) => <TextValidation {...props} />,
    number: (props) => <NumberValidation {...props} />,
    privateNumber: (props) => <NumberValidation {...props} />,
    audio: (props) => <FileValidation {...props} />,
    document: (props) => <FileValidation {...props} />,
    image: (props) => <FileValidation {...props} />,
    video: (props) => <FileValidation {...props} />,

    audioFiles: (props) => <FilesValidation {...props} />,
    videos: (props) => <FilesValidation {...props} />,
    documents: (props) => <FilesValidation {...props} />,
    gallery: (props) => <FilesValidation {...props} />,

    url: (props) => <RequiredValidation {...props} />,
    address: (props) => <RequiredValidation {...props} />,
    boolean: (props) => <RequiredValidation {...props} />,
    reference: (props) => <RequiredValidation {...props} />,
    richContent: (props) => <RequiredValidation {...props} />,
    richtext: (props) => <RequiredValidation {...props} />,

    date: (props) => <RequiredValidation {...props} />,
    dateRange: (props) => <RequiredValidation {...props} />,
    time: (props) => <RequiredValidation {...props} />,
    multiReference: (props) => <RequiredValidation {...props} />,
    tags: (props) => <RequiredValidation {...props} />,
  }

  const Component = validationFields[type]

  return Component ? (
    <Component validationField={validationField} onUpdate={onUpdate} />
  ) : null
}

export function DefaultOptions({ type = 'text', value, onUpdate }) {
  return (
    <div className="mb-6">
      <Label htmlFor="defaultValue" className="flex mb-2">
        Default Value
      </Label>

      <GetFieldComponent
        id="defaultValue"
        type={type}
        value={value.defaultValue}
        onUpdate={onUpdate}
      />
    </div>
  )
}

export function BooleanOptions({ type = 'text', value, onUpdate }) {
  return (
    <>
      <div className="mb-6">
        <Label htmlFor="defaultValue" className="flex mb-2">
          Default Value
        </Label>

        <GetFieldComponent
          id="defaultValue"
          type={type}
          value={value.defaultValue}
          onUpdate={onUpdate}
        />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="defaultValue" className="flex mb-2">
            True Value
          </Label>

          <Input
            id="trueValue"
            type={type}
            value={value.trueValue}
            onUpdate={onUpdate}
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="defaultValue" className="flex mb-2">
            False Value
          </Label>

          <Input
            id="falseValue"
            type={type}
            value={value.falseValue}
            onUpdate={onUpdate}
          />
        </div>
      </div>
    </>
  )
}

export function DateOptions({ type = 'text', value, onUpdate }) {
  return (
    <>
      <div className="mb-6">
        <Label htmlFor="defaultValue" className="flex mb-2">
          Default Value
        </Label>

        <GetFieldComponent
          id="defaultValue"
          type={type}
          value={value.showTime}
          onUpdate={onUpdate}
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="showTime" className="flex mb-2">
          Show Time Input
        </Label>

        <Switch
          id="showTime"
          checked={Boolean(value.showTime)}
          onCheckedChange={onUpdate}
        />
      </div>
    </>
  )
}

export function PrivateOptions({ type = 'text', value, onUpdate }) {
  return (
    <>
      <div className="mb-6">
        <Label htmlFor="defaultValue" className="flex mb-2">
          Default Value
        </Label>

        <GetFieldComponent
          id="defaultValue"
          type={type}
          value={value.defaultValue}
          onUpdate={onUpdate}
        />
      </div>
      <div className="mb-6">
        <Label htmlFor="toggleVisibility" className="flex mb-2">
          Allow toggle visibility
        </Label>

        <Switch
          id="toggleVisibility"
          checked={Boolean(value.toggleVisibility)}
          onCheckedChange={onUpdate}
        />
      </div>
    </>
  )
}

export function SelectOptions({
  type = 'text',
  value,
  onUpdate,
  canAddItems = true,
}) {
  return (
    <>
      <div className="mb-6">
        <Label htmlFor="defaultValue" className="flex mb-2">
          Default Value
        </Label>

        <Input
          id="defaultValue"
          value={value.defaultValue}
          onUpdate={onUpdate}
        />
      </div>

      <RadioGroup className="mb-6" defaultValue="single" onChange={onUpdate}>
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
            value={value.tags}
            onUpdate={onUpdate}
          />
        </div>
      ) : null}
    </>
  )
}

export function FieldOptions({
  type,
  onUpdate,
  // fieldOptionsField,#

  setFieldOptions,
}: {
  type: CmsCollectionColumn['type']
  onUpdate: (props: ValidationUpdateTypes) => void
}) {
  switch (type) {
    case 'boolean':
      return <BooleanOptions type="boolean" value={{}} />

    case 'url':

    case 'number':
      return <DefaultOptions type="number" value={{}} />
    case 'privateText':
      return <PrivateOptions />
    case 'privateNumber':
      return <PrivateOptions type="number" value={{}} />

    case 'tagSelect':
    case 'select':
      return <SelectOptions value={{}} type="select" />

    case 'tags':
      return <SelectOptions value={{}} canAddItems={false} />
    case 'address':
      return <DefaultOptions value={{}} type="address" />

    case 'date':
      return <DateOptions value={{}} type="date" />

    case 'multiReference':
    case 'reference':

    case 'dateRange':
    case 'time':

    case 'audio':
    case 'audioFiles':

    case 'document':
    case 'documents':

    case 'gallery':
    case 'image':

    case 'video':
    case 'videos':

    case 'richContent':
    case 'richtext':
    case 'title':
    case 'text':
      return <DefaultOptions value={{}} />
    default:
      return null
  }
}

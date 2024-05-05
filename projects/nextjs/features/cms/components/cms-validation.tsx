import { Input } from '@/components/plate-ui/input'
import { Label } from '@/components/ui/label'
import {
  CmsCollectionFileColumnField,
  CmsCollectionRequiredColumnField,
  CmsCollectionTextColumnField,
} from '@/features/cms/cms.types'
import { ToggleSwitch } from '@/components/toggle-switch'

export function Required({
  checked,
  onChange,
}: {
  checked?: boolean
  onChange: (required: boolean) => void
}) {
  const handleOnCheckChange = (required: boolean) => {
    onChange && onChange(required)
  }

  return (
    <div className="grid items-center gap-2">
      <Label htmlFor="requiredField">Make this a require field?</Label>

      <ToggleSwitch
        className="w-[200px]"
        checked={Boolean(checked)}
        id="requiredField"
        onOff={'Yes,No'}
        onCheckedChange={handleOnCheckChange}
      />
    </div>
  )
}

export function RequiredValidation({
  validationField,
  onChange,
}: {
  validationField: { value: CmsCollectionRequiredColumnField }
  onChange: (props: CmsCollectionRequiredColumnField) => void
}) {
  return (
    <Required onChange={onChange} checked={validationField?.value?.required} />
  )
}

export function FileValidation({
  validationField = {
    value: {
      required: false,
      size: 0,
    },
  },
  onChange,
}: {
  validationField: { value: CmsCollectionFileColumnField }
  onChange: (props: CmsCollectionFileColumnField) => void
}) {
  const { required, size } = validationField.value

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange({ size: parseInt(e.target.value, 10) })
  }

  return (
    <>
      <Required checked={required} onChange={onChange} />

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
  onChange,
}: {
  validationField: {
    value: {
      minItems?: number
      maxItems?: number
      required?: boolean
      size?: number
    }
  }
  onChange: (props: FilesValidationUpdate) => void
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
      onChange && onChange(value as FilesValidationUpdate)
    }

  return (
    <>
      <Required checked={required} onChange={onChange} />

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
            type="number"
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
            type="number"
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
  onChange,
}: {
  validationField: {
    value: {
      required?: boolean
      min?: number
      max?: number
    }
  }
  onChange: (props: NumberValidationUpdate) => void
}) {
  const { min, max, required } = validationField.value

  const handleOnChange =
    (field: 'min' | 'max') => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value

      if (field === 'min') {
        value = { min: parseInt(e.target.value, 10) }
      } else if (field === 'max') {
        value = { max: parseInt(e.target.value, 10) }

        onChange && onChange(value)
      }
    }

  return (
    <>
      <Required checked={required} onChange={onChange} />

      <div className="grid grid-cols-2 gap-4 w-40">
        <div className="mb-4">
          <Label htmlFor="fieldName" className="text-sm">
            Min Number
          </Label>
          <Input
            type="number"
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
            type="number"
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
  onChange,
}: {
  validationField: {
    value: CmsCollectionTextColumnField
  }
  onChange: (props: CmsCollectionTextColumnField) => void
}) {
  const { minLength, maxLength, required, disallowCharacters } =
    validationField.value || {}

  console.log('TextValidation: ', validationField.value)

  const handleOnChange =
    (field: 'minLength' | 'maxLength' | 'disallowCharacters') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const getLength = () => {
        const int = parseInt(e.target.value, 10)
        return isNaN(int) ? undefined : int
      }

      let update: any = {}

      switch (field) {
        case 'disallowCharacters':
          update = {
            ...validationField.value,
            disallowCharacters: e.target.value,
          }
          break
        case 'minLength':
          update = { ...validationField.value, minLength: getLength() }
          break
        case 'maxLength':
          update = { ...validationField.value, maxLength: getLength() }
      }

      onChange && onChange(update)
    }

  const handleOnRequiredChange = (required: boolean) => {
    onChange &&
      onChange({
        ...validationField.value,
        required,
      })
  }

  return (
    <div className="space-y-6">
      <Required checked={required} onChange={handleOnRequiredChange} />

      <div className="space-y-6">
        <div className="space-y-2">
          <span className="mb-2">Number of characters</span>

          <div className="grid grid-cols-2 gap-6 w-40">
            <div>
              <Label htmlFor="minLength" className="text-sm">
                <span className="whitespace-nowrap">Min Length</span>
              </Label>
              <Input
                type="number"
                id="minLength"
                value={minLength}
                className="w-16"
                onChange={handleOnChange('minLength')}
                min={0}
              />
            </div>
            <div>
              <Label htmlFor="maxLength" className="text-sm">
                <span className="whitespace-nowrap">Max Length</span>
              </Label>
              <Input
                type="number"
                id="maxLength"
                value={maxLength}
                className="w-16"
                onChange={handleOnChange('maxLength')}
                min={0}
              />
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Set length 0 for any length
          </p>
        </div>
        <div>
          <Label htmlFor="disallowCharacters" className="text-sm">
            <span className="whitespace-nowrap">Disallow characters</span>
          </Label>
          <Input
            id="disallowCharacters"
            value={disallowCharacters}
            onChange={handleOnChange('disallowCharacters')}
          />
          <p className="text-sm text-muted-foreground">Example %?&*</p>
        </div>
      </div>
    </div>
  )
}

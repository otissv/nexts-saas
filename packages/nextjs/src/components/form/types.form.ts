export interface FormSchema {
  attributes?: React.HTMLProps<HTMLFormElement>
  classNames?: {
    label?: string
    input?: string
  }
  description?: string
  error: string
  label: string
  name: string
  ref?: any
  required?: boolean
  invalid?: boolean
  type:
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'range'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'time'
    | 'color'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'week'
    | 'search'
    | 'tel'
    | 'url'
    | 'select'
    | 'textarea'
  value?: string | number | boolean
  onBlur?: (e: any) => void
  onChange?: (e: any) => void
}

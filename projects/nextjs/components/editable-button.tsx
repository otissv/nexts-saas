import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface EditableButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  input?: typeof Input
  isActive?: boolean
  defaultValue?: string
  update: (value: string) => void
}

export const EditableButton = ({
  children,
  value,
  input,
  isActive,
  defaultValue = '',
  update,
  ...props
}: EditableButtonProps) => {
  const [isEdit, setIsEdit] = React.useState(false)
  const [currentValue, setValue] = React.useState(value || defaultValue)

  React.useEffect(() => {
    setValue(value)
  }, [value, setValue])

  return isEdit ? (
    <Input
      value={currentValue}
      autoFocus={true}
      onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape' || event.key === 'Enter') {
          setIsEdit(false)
          update(currentValue || defaultValue)
        }
      }}
      onBlur={() => {
        setIsEdit(false)
        update(currentValue || defaultValue)
      }}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setValue(value)
      }}
      {...input}
    />
  ) : (
    <Button
      className={cn(
        'w-full justify-start mb-2',
        isEdit ? 'cursor-text' : 'cursor-pointer'
      )}
      variant="ghost"
      onDoubleClick={() => setIsEdit(true)}
      aria-selected={isActive}
      {...props}
    >
      {children}
      {currentValue}
    </Button>
  )
}

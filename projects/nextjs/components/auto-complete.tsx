'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export type Option = {
  children: React.ReactNode
  name: string
  value: string
  property: string
}

export type CurrentValue = {
  name: string
  className: string
}

type Context = {
  currentValue: CurrentValue
  id: string
  isOpen: boolean
  setCurrentValue: React.Dispatch<React.SetStateAction<CurrentValue>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onValueChange?: (value: string) => void
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}

const AutoCompleteContext = React.createContext<Context>({
  currentValue: { name: '', className: '' },
  id: '',
  isOpen: false,
  setCurrentValue: () => {},
  setIsOpen: () => {},
})

export interface AutoCompleteProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  options: Option[]
  placeholder?: string
  value?: string
  onValueChange: (value: string) => void
  onFucus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
  disabled?: boolean
  required?: boolean
  open?: boolean
  dir?: 'ltr' | 'rtl'
  id: string
}

export const AutoComplete = ({
  options,
  placeholder,
  value,
  defaultValue = '',
  onValueChange,
  onFucus,
  onBlur,
  onClick,
  open = false,
  id,
  required,
  disabled,
  ...props
}: AutoCompleteProps) => {
  return (
    <AutoCompleteRoot
      id={id}
      options={options}
      open={open}
      onValueChange={onValueChange}
      onClick={onClick}
      value={value || ''}
      required={required}
      disabled={disabled}
      {...props}
    >
      <AutoCompleteSearch
        onFocus={onFucus}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
      />
      <AutoCompleteListbox>
        <AutoCompleteListBoxContent options={options} />
      </AutoCompleteListbox>
    </AutoCompleteRoot>
  )
}

export interface AutoCompleteRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  open?: boolean
  onValueChange?: (value: string) => void
  id: string
  options: Option[]
  disabled?: boolean
  required?: boolean
}

export const AutoCompleteRoot = ({
  value,
  open = false,
  children,
  className,
  onValueChange,
  onClick,
  id,
  options,
  ...props
}: AutoCompleteRootProps) => {
  const [currentValue, setCurrentValue] = React.useState({
    name: value,
    className: '',
  })
  const [isOpen, setIsOpen] = React.useState(open)

  React.useEffect(() => {
    let className = currentValue.className.trim()

    if (className === '') {
      className =
        options
          .filter(({ name }) => name === currentValue.name)
          .map(({ value }) => value)[0] || ''
    }

    onValueChange(className)
  }, [currentValue.name])

  React.useEffect(() => {
    setCurrentValue({
      name: value,
      className: '',
    })
  }, [value])

  return (
    <AutoCompleteContext.Provider
      value={{
        isOpen,
        currentValue,
        setCurrentValue,
        setIsOpen,
        onValueChange,
        onClick,
        id,
      }}
    >
      <div className={cn('grid', className)} {...props}>
        {children}
      </div>
    </AutoCompleteContext.Provider>
  )
}

export interface AutoCompleteSearchProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  required?: boolean
}

export const AutoCompleteSearch = ({
  className,
  onFocus,
  onBlur,
  disabled,
  required,
  ...props
}: AutoCompleteSearchProps) => {
  const { id, currentValue, isOpen, setCurrentValue, setIsOpen, onClick } =
    React.useContext(AutoCompleteContext)

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue({ name: event.target.value, className: '' })
  }

  const handleOnInputClick = (event: React.MouseEvent<any>) => {
    setIsOpen(true)
    onClick && onClick(event)
  }

  const handleOnButtonClick = (event: React.MouseEvent<any>) => {
    setIsOpen(!isOpen)
    onClick && onClick(event)
  }

  React.useEffect(() => {
    setIsOpen(false)
  }, [onBlur])

  return (
    <>
      <div
        id={id}
        className={cn(
          'relative flex border border-input rounded-md',
          className
        )}
      >
        <Input
          suppressHydrationWarning
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={id}
          className={cn(
            'relative border-none pr-12 pointer-events-auto',
            'before:border-l before:border-red-700 before:border-b before:absolute before:top-0 before:right-0 before:w-4 before:h-4',
            className
          )}
          onClick={handleOnInputClick}
          onChange={handleOnInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={currentValue.name || ''}
          disabled={disabled}
          required={required}
          {...props}
        />
        <Button
          className="w-10 h-10 absolute top-0 right-0 p-0 rounded-l-none pointer-events-auto"
          variant="ghost"
          disabled={disabled}
          onClick={handleOnButtonClick}
        >
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </Button>
      </div>
      <div className="relative" id={`mount-${id}`}></div>
    </>
  )
}

export interface AutoCompleteListboxProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const AutoCompleteListbox = ({
  children,
  className,
}: AutoCompleteListboxProps) => {
  const { id, isOpen } = React.useContext(AutoCompleteContext)

  const [mountedRef, setMount] = React.useState(null)

  React.useEffect(() => {
    setMount(document.getElementById(`mount-${id}`))
  }, [isOpen])

  return isOpen && mountedRef
    ? createPortal(
        <div
          role="listbox"
          tabIndex={-1}
          className={cn(
            'absolute z-[99] bg-background w-full rounded-md border p-2 text-sm max-h-96 overflow-y-auto',
            className
          )}
        >
          <div role="presentation">{children}</div>
        </div>,
        mountedRef
      )
    : null
}

export interface AutoCompleteOptionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  options: Option[]
}

export const AutoCompleteListBoxContent = ({
  options,
}: AutoCompleteOptionsProps) => {
  const { currentValue } = React.useContext(AutoCompleteContext)

  const filterOptions = (str: string) =>
    str ? options.filter(({ name }) => name.includes(str)) : options

  return (
    <>
      {filterOptions(currentValue.name).map(({ name, value, children }) => (
        <AutoCompleteItem key={value} value={value} name={name}>
          {children}
        </AutoCompleteItem>
      ))}
    </>
  )
}

export interface AutoCompleteItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  name: string
}

export const AutoCompleteItem = ({
  className,
  value,
  name,
  ...props
}: AutoCompleteItemProps) => {
  const { id, currentValue, setCurrentValue, setIsOpen } =
    React.useContext(AutoCompleteContext)
  const selected = currentValue.name == name

  return (
    <div
      role="option"
      tabIndex={-1}
      aria-labelledby={id}
      aria-selected={selected}
      className={cn(
        'w-full h-10 grid items-center rounded-md p-2 hover:bg-secondary pointer-events-auto',
        selected && 'bg-secondary',
        className
      )}
      onClick={() => {
        setCurrentValue({ name, className: value })
        setIsOpen(false)
      }}
      {...props}
    />
  )
}

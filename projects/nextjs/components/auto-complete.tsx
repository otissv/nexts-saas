'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown, ChevronsUpDown } from 'lucide-react'
import debounce from 'debounce'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

// export type Option = {
//   children?: React.ReactNode
//   id: string
//   value: string
// }

// export type AutoCompleteSelected = {
//   id: string
//   value: string
// }
// export type AutoCompleteProps = React.HTMLAttributes<HTMLInputElement> & {
//   isOpen?: boolean
//   setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
// }

export const AutoCompletedInput = CommandInput
export const AutoCompletedItem = CommandItem

export function AutoCompletedContent({ className, children, placeholder }) {
  return (
    <PopoverContent className={cn('w-[200px] p-0', className)}>
      <Command>
        <CommandInput placeholder={placeholder} />
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandGroup>{children}</CommandGroup>
      </Command>
    </PopoverContent>
  )
}

export function AutoComplete({
  children,
  value,
  options,
  isOpen,
  setISOpen,
  placeholder,
}) {
  return (
    <Popover open={isOpen} onOpenChange={setISOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      {children}
    </Popover>
  )
}

export function AutoCompleteList({ value, options }) {
  {
    options.map((item) => (
      <AutoCompletedItem
        key={item.value}
        value={item.value}
        onSelect={(currentValue) => {
          setValue(currentValue === value ? '' : currentValue)
          setOpen(false)
        }}
      >
        <Check
          className={cn(
            'mr-2 h-4 w-4',
            value === item.value ? 'opacity-100' : 'opacity-0'
          )}
        />
        {item.label}
      </AutoCompletedItem>
    ))
  }
}

// export function AutoComplete({
//   children,
//   isOpen: hostIsOpen,
//   setIsOpen: hostSetIsOpen,
// }: AutoCompleteProps) {
//   const [isOpen, setIsOpen] = React.useState(hostIsOpen || false)

//   return<>{children}</>
// }
// export type AutoCompleteSearchProps = React.HTMLAttributes<HTMLInputElement> & {
//   value?: string
//   onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
//   onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
//   disabled?: boolean
//   required?: boolean
//   isOpen?: boolean
// }

// export const AutoCompleteSearch = ({
//   className,
//   onFocus,
//   onBlur,
//   disabled,
//   required,
//   id,
//   value,
//   isOpen = false,
//   // setCurrentValue,
//   // setIsOpen,
//   // onClick,
//   // options,
//   ...props
// }: AutoCompleteSearchProps) => {
//   const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value.trim()
//     const item = options.find(
//       (o) => o.value?.toLowerCase() === value.toLowerCase()
//     )

//     setCurrentValue(item || { id: value, value })
//   }

//   const handleOnInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
//     setIsOpen(true)
//     onClick && onClick(event)
//   }

//   const handleOnButtonClick = (event: React.MouseEvent<HTMLInputElement>) => {
//     setIsOpen(!isOpen)
//     onClick && onClick(event)
//   }

//   return (
//     <div
//       className={cn('relative flex border border-input rounded-md', className)}
//     >
//       <Input
//         id={id}
//         suppressHydrationWarning
//         role="combobox"
//         aria-expanded={isOpen}
//         aria-autocomplete="list"
//         aria-controls={id}
//         aria-label={id}
//         className={cn(
//           'relative border-none pr-12 pointer-events-auto',
//           'before:border-l before:border-red-700 before:border-b before:absolute before:top-0 before:right-0 before:w-4 before:h-4',
//           className
//         )}
//         onClick={handleOnInputClick}
//         onChange={handleOnInputChange}
//         onFocus={onFocus}
//         onBlur={onBlur}
//         value={value || ''}
//         disabled={disabled}
//         required={required}
//         {...props}
//       />
//       <Button
//         className="w-10 h-10 absolute top-0 right-0 p-0 rounded-l-none pointer-events-auto"
//         variant="ghost"
//         disabled={disabled}
//         onClick={handleOnButtonClick}
//       >
//         <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
//       </Button>
//     </div>
//   )
// }

// type Context = {
//   currentValue: AutoCompleteSelected
//   id: string
//   isOpen: boolean
//   options: Option[]
//   setCurrentValue: React.Dispatch<React.SetStateAction<AutoCompleteSelected>>
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
//   onValueChange?: (value: AutoCompleteSelected) => void
//   onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
// }

// const AutoCompleteContext = React.createContext<Context>({
//   currentValue: { id: '', value: '' },
//   id: '',
//   isOpen: false,
//   options: [],
//   setCurrentValue: () => {},
//   setIsOpen: () => {},
// })

// export interface AutoCompleteProps
//   extends React.HTMLAttributes<HTMLDivElement> {
//   defaultValue?: string
//   dir?: 'ltr' | 'rtl'
//   disabled?: boolean
//   id: string
//   isOpen?: boolean
//   options: Option[]
//   placeholder?: string
//   required?: boolean
//   selected?: AutoCompleteSelected
//   value?: AutoCompleteSelected
//   setSelected: React.Dispatch<React.SetStateAction<AutoCompleteSelected>>
//   setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
//   onFucus?: (event: React.FocusEvent<HTMLInputElement>) => void
//   onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
//   onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
// }

// export const AutoComplete = ({
//   options,
//   placeholder,
//   selected = {
//     id: '',
//     value: '',
//   },
//   defaultValue = '',
//   onFucus,
//   onBlur,
//   onClick,
//   id,
//   required,
//   disabled,
//   setSelected,
//   isOpen: hostIsOpen,
//   setIsOpen: hostSetIsOpen,
//   ...props
// }: AutoCompleteProps) => {
//   const [isOpen, setIsOpen] = React.useState(hostIsOpen || false)

//   console.log('options: ', options)

//   return (
//     <AutoCompleteRoot
//       id={id}
//       options={options}
//       onClick={onClick}
//       selected={selected}
//       required={required}
//       disabled={disabled}
//       setSelected={setSelected}
//       isOpen={hostIsOpen ?? isOpen}
//       setIsOpen={hostSetIsOpen ?? setIsOpen}
//     >
//       <AutoCompleteSearch
//         onFocus={onFucus}
//         onBlur={onBlur}
//         required={required}
//         disabled={disabled}
//         placeholder={placeholder}
//         {...props}
//       />
//       <AutoCompleteListbox>
//         <AutoCompleteListBoxContent options={options} />
//       </AutoCompleteListbox>
//     </AutoCompleteRoot>
//   )
// }

// export interface AutoCompleteRootProps {
//   selected: AutoCompleteSelected
//   setSelected: React.Dispatch<React.SetStateAction<AutoCompleteSelected>>
//   open?: boolean
//   onValueChange?: (value: AutoCompleteSelected) => void
//   id: string
//   options: Option[]
//   disabled?: boolean
//   required?: boolean
//   children: React.ReactNode
//   onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
//   isOpen: boolean
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
// }

// export const AutoCompleteRoot = ({
//   selected = {
//     id: '',
//     value: '',
//   },
//   setSelected,
//   children,
//   onValueChange,
//   onClick,
//   options = [],
//   id,
//   isOpen,
//   setIsOpen,
// }: AutoCompleteRootProps) => {
//   return (
//     <AutoCompleteContext.Provider
//       value={{
//         isOpen,
//         options,
//         currentValue: selected,
//         setCurrentValue: setSelected,
//         setIsOpen,
//         onValueChange,
//         onClick,
//         id,
//       }}
//     >
//       <>{children}</>
//     </AutoCompleteContext.Provider>
//   )
// }

// export interface AutoCompleteSearchProps
//   extends React.HTMLAttributes<HTMLDivElement> {
//   onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
//   onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
//   disabled?: boolean
//   required?: boolean
// }

// export const AutoCompleteSearch = ({
//   className,
//   onFocus,
//   onBlur,
//   disabled,
//   required,
//   ...props
// }: AutoCompleteSearchProps) => {
//   const {
//     id,
//     currentValue,
//     isOpen,
//     setCurrentValue,
//     setIsOpen,
//     onClick,
//     options,
//   } = React.useContext(AutoCompleteContext)

//   const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value.trim()
//     const item = options.find(
//       (o) => o.value?.toLowerCase() === value.toLowerCase()
//     )

//     setCurrentValue(item || { id: value, value })
//   }

//   const handleOnInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
//     setIsOpen(true)
//     onClick && onClick(event)
//   }

//   const handleOnButtonClick = (event: React.MouseEvent<HTMLInputElement>) => {
//     setIsOpen(!isOpen)
//     onClick && onClick(event)
//   }

//   return (
//     <>
//       <div
//         // id={id}
//         className={cn(
//           'relative flex border border-input rounded-md',
//           className
//         )}
//       >
//         <Input
//           id={id}
//           suppressHydrationWarning
//           role="combobox"
//           aria-expanded={isOpen}
//           aria-autocomplete="list"
//           aria-controls={id}
//           aria-label={id}
//           className={cn(
//             'relative border-none pr-12 pointer-events-auto',
//             'before:border-l before:border-red-700 before:border-b before:absolute before:top-0 before:right-0 before:w-4 before:h-4',
//             className
//           )}
//           onClick={handleOnInputClick}
//           onChange={handleOnInputChange}
//           onFocus={onFocus}
//           onBlur={onBlur}
//           value={currentValue.value || ''}
//           disabled={disabled}
//           required={required}
//           {...props}
//         />
//         <Button
//           className="w-10 h-10 absolute top-0 right-0 p-0 rounded-l-none pointer-events-auto"
//           variant="ghost"
//           disabled={disabled}
//           onClick={handleOnButtonClick}
//         >
//           <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
//         </Button>
//       </div>
//       <div className="relative" id={`mount-${id}`}></div>
//     </>
//   )
// }

// export interface AutoCompleteListboxProps
//   extends React.HTMLAttributes<HTMLDivElement> {}

// export const AutoCompleteListbox = ({
//   children,
//   className,
// }: AutoCompleteListboxProps) => {
//   const { id, isOpen } = React.useContext(AutoCompleteContext)

//   const [mountedRef, setMount] = React.useState(null)

//   React.useEffect(() => {
//     setMount(document.getElementById(`mount-${id}`))
//   }, [isOpen])

//   return isOpen && mountedRef
//     ? createPortal(
//         <div
//           role="listbox"
//           tabIndex={-1}
//           className={cn(
//             'absolute z-[99] bg-background w-full rounded-md border p-2 text-sm max-h-96 overflow-y-auto',
//             className
//           )}
//         >
//           <div role="presentation">{children}</div>
//         </div>,
//         mountedRef
//       )
//     : null
// }

// export interface AutoCompleteOptionsProps
//   extends React.HTMLAttributes<HTMLDivElement> {
//   options: Option[]
// }

// export const AutoCompleteListBoxContent = ({
//   options = [],
// }: AutoCompleteOptionsProps) => {
//   const { currentValue } = React.useContext(AutoCompleteContext)

//   const filterOptions = (str: string) =>
//     str
//       ? options.filter(({ id }) => id.toLowerCase().includes(str.toLowerCase()))
//       : options

//   return (
//     <>
//       {filterOptions(currentValue.id).map(({ id, value, children }) => (
//         <AutoCompleteItem key={value} value={value} id={id}>
//           {children || value}
//         </AutoCompleteItem>
//       ))}
//     </>
//   )
// }

// export interface AutoCompleteItemProps
//   extends React.HTMLAttributes<HTMLDivElement> {
//   value: string
//   id: string
// }

// export const AutoCompleteItem = ({
//   className,
//   value,
//   id,
//   ...props
// }: AutoCompleteItemProps) => {
//   const {
//     id: label,
//     currentValue,
//     setCurrentValue,
//     setIsOpen,
//   } = React.useContext(AutoCompleteContext)
//   const selected = currentValue.id == id

//   return (
//     <div
//       role="option"
//       tabIndex={-1}
//       aria-labelledby={label}
//       aria-selected={selected}
//       className={cn(
//         'w-full h-10 grid items-center rounded-md p-2 hover:bg-secondary pointer-events-auto',
//         selected && 'bg-secondary',
//         className
//       )}
//       onClick={() => {
//         setCurrentValue({ id, value })
//         setIsOpen(false)
//       }}
//       {...props}
//     />
//   )
// }

"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const ComboboxTrigger = PopoverTrigger
export const ComboboxInput = CommandInput
export const ComboboxEmpty = CommandEmpty
export const ComboboxGroup = CommandGroup
export const ComboboxItem = CommandItem

export interface ComboboxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    React.FC<PopoverPrimitive.PopoverProps> {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  ({ children, open, onOpenChange }) => {
    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        {children}
      </Popover>
    )
  }
)
Combobox.displayName = "Combobox"

export interface ComboboxContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    React.ForwardRefExoticComponent<
      Omit<
        PopoverPrimitive.PopoverContentProps &
          React.RefAttributes<HTMLDivElement>,
        "ref"
      > &
        React.RefAttributes<HTMLDivElement>
    > {}

export const ComboboxContent = React.forwardRef<
  HTMLDivElement,
  ComboboxContentProps
>(({ children, ...props }, ref) => {
  return (
    <PopoverContent className="w-[200px] p-0" ref={ref} {...props}>
      <Command>{children}</Command>
    </PopoverContent>
  )
})
ComboboxContent.displayName = "ComboboxContent"

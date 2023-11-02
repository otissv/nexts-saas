import React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type ToggleGroupProps = {
  label: string
} & React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>

export const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, children, label, type, orientation, value, ...props }, ref) => {
  const [currentValue, setCurrentValue] = React.useState(value)

  React.useEffect(() => {
    setCurrentValue(value)
  }, [value])

  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      aria-label={label}
      type={type}
      value={currentValue}
      className={cn(
        'inline-flex p-1 h-10 bg-muted text-muted rounded-md justify-center items-center',
        className
      )}
      orientation={orientation}
      onValueChange={(value: string) => setCurrentValue(value)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  )
})
ToggleGroup.displayName = 'ToggleGroup'

export type ToggleGroupItemProps = {
  label: string
} & React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.ToggleGroupItem>

export const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.ToggleGroupItem>,
  ToggleGroupItemProps
>(({ label, className, variant, children, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.ToggleGroupItem
      className={cn(
        buttonVariants({ variant: variant || 'ghost' }, {}),
        'h-8 text-muted-foreground',
        'data-[state=on]:shadow-sm data-[state=on]:text-foreground data-[state=on]:bg-background rounded-sm',
        className
      )}
      aria-label={label}
      ref={ref}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.ToggleGroupItem>
  )
})
ToggleGroupItem.displayName = 'ToggleGroupItem'

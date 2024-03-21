'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'

export type ToggleSwitchProps = React.ForwardRefExoticComponent<
  SwitchPrimitives.SwitchProps & {
    onOff?:
      | 'onOff'
      | 'enableDisable'
      | 'startStop'
      | 'subscribeUnsubscribe'
      | 'acceptDecline'
      | 'activeInactive'
      | 'allowBlock'
      | 'approveReject'
      | 'optInOptOut'
      | 'trueFalse'
      | 'yesNo'
  } & React.RefAttributes<HTMLButtonElement>
>

const ToggleSwitch = React.forwardRef<
  React.ElementRef<ToggleSwitchProps>,
  React.ComponentPropsWithoutRef<ToggleSwitchProps>
>(({ onOff = 'onOff', className, ...props }, ref) => {
  let on = 'On'
  let off = 'Off'

  if (onOff === 'enableDisable') {
    on = 'Enable'
    off = 'Disable'
  }
  if (onOff === 'startStop') {
    on = 'Start'
    off = 'Stop'
  }
  if (onOff === 'subscribeUnsubscribe') {
    on = 'Subscribe'
    off = 'Unsubscribe'
  }
  if (onOff === 'acceptDecline') {
    on = 'Accept'
    off = 'Decline'
  }
  if (onOff === 'activeInactive') {
    on = 'Active'
    off = 'Inactive'
  }
  if (onOff === 'allowBlock') {
    on = 'Allow'
    off = 'Block'
  }
  if (onOff === 'approveReject') {
    on = 'Approve'
    off = 'Reject'
  }
  if (onOff === 'okCancel') {
    on = 'OK'
    off = 'Cancel'
  }
  if (onOff === 'optInOptOut') {
    on = 'Opt In'
    off = 'Opt Out'
  }
  if (onOff === 'trueFalse') {
    on = 'True'
    off = 'False'
  }
  if (onOff === 'yesNo') {
    on = 'yes'
    off = 'No'
  }

  return (
    <SwitchPrimitives.Root
      className={cn(
        'relative peer inline-flex h-10  cursor-pointer items-center rounded-md border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent data-[state=unchecked]:bg-input',
        className
      )}
      {...props}
      ref={ref}
    >
      <div className="relative grid gap-2 grid-cols-2 p-2 justify-center items-center">
        <div className=" flex justify-center px-1">{on}</div>
        <div className="flex justify-center px-1">{off}</div>
      </div>
      <SwitchPrimitives.Thumb
        className={cn(
          'absolute pointer-events-none block h-9 w-[50%] bg-background rounded-md shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[100%] data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitives.Root>
  )
})
ToggleSwitch.displayName = SwitchPrimitives.Root.displayName

export { ToggleSwitch }

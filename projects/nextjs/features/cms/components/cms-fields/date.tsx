'use client'

import { DateRange } from 'react-day-picker'
import { format, parseISO } from 'date-fns'
import { isEmpty } from 'c-ufunc/libs/isEmpty'
import { CalendarIcon, CalendarOff } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { CmsField, GetFieldComponent } from '../cms-config'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Calendar, CalendarProps } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { DateOption } from '../../cms.types'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'

export type DateFieldProps = CmsField<HTMLInputElement> &
  Omit<CalendarProps, 'selected'> & {
    type: 'single' | 'range' | 'time'
    onUpdate: (newValue: (string | undefined)[]) => void
    value?: string[]
  }

export function DateField({
  value = [],
  fieldId,
  isSelected,
  errorMessage,
  isInline,
  type = 'single',
  onUpdate,
  validate,
}: DateFieldProps) {
  const handleOnUpdate = (newValue?: Date | DateRange) => {
    if (type === 'single' || type === 'time') {
      onUpdate && onUpdate([(newValue as Date)?.toISOString()])
    } else {
      onUpdate &&
        onUpdate([
          (newValue as DateRange)?.from?.toISOString(),
          (newValue as DateRange)?.to?.toISOString(),
        ])
    }
  }

  let date: Date | DateRange | undefined

  let label
  if (type === 'single' || type === 'time') {
    date = value[0] ? parseISO(value[0]) : undefined
    label = date ? format(date as Date, 'PPP') : <span>Pick a date</span>
  } else {
    date = value[0]
      ? ({
          from: value[0] && parseISO(value[0]),
          to: value[1] && parseISO(value[1]),
        } as DateRange)
      : undefined

    if (date) {
      label = !date.to ? (
        <>
          {format(date.from as any, 'PPP')}
          <>
            <span className="inline-flex mx-1 text-muted-full">&mdash;</span>
            Pick To date
          </>
        </>
      ) : (
        <>
          {format(date.from as any, 'PPP')}
          <span className="inline-flex mx-1 text-muted-full">&mdash;</span>
          {format(date.to as any, 'PPP')}
        </>
      )
    } else {
      label = <span>Pick From date</span>
    }
  }

  const handleOnTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (date instanceof Date) {
      const [hours, minutes] = e.target.value.split(':')
      date.setHours(Number(hours))
      date.setMinutes(Number(minutes))

      onUpdate && onUpdate([date.toISOString()])
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'min-w-48 justify-start text-left font-normal rounded-md',
            !date && 'text-muted-foreground',
            isInline && 'rounded-none border-t-0'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="relative w-auto p-0">
        <Calendar
          mode={type === 'time' ? 'single' : (type as any)}
          selected={date}
          onSelect={handleOnUpdate}
          initialFocus
        />

        {type === 'time' && date instanceof Date ? (
          <div className="flex items-center justify-center border-t px-6">
            <Label htmlFor={`${fieldId}-time`}>Time</Label>
            <Input
              id={`${fieldId}-time`}
              type="time"
              className="p-0 border-0 ml-3 w-auto"
              value={format(date, 'HH:mm')}
              onChange={handleOnTimeChange}
            />
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  )
}

export type DateOptionsProps = {
  onUpdate: (props: Omit<DateOption, 'type'>) => void
} & DateOption

export function DateOptions({
  betweenDates,
  excludeDates,
  defaultValue,
  selectType = 'single',
  showTime,
  type = 'date',
  onUpdate,
}: DateOptionsProps) {
  const handleOnUpdate =
    (key: string) => (value: string | number | boolean) => {
      onUpdate &&
        onUpdate({
          betweenDates,
          excludeDates,
          defaultValue,
          selectType,
          showTime,
          [key]: value,
        })
    }

  return (
    <>
      <div className="mb-6">
        <Label htmlFor="defaultValue" className="flex mb-2">
          Default Value
        </Label>

        <GetFieldComponent
          id="defaultValue"
          type={type}
          value={defaultValue}
          onUpdate={handleOnUpdate('defaultValue')}
        />

        <Button
          variant="outline"
          className="ml-2"
          disabled={isEmpty(defaultValue)}
          onClick={() => onUpdate}
        >
          <CalendarOff className="h-4 w-4" />
        </Button>
      </div>

      {type === 'date' ? (
        <RadioGroup
          className="mb-6"
          defaultValue={selectType}
          onValueChange={handleOnUpdate('selectType')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="single" id="single" />
            <Label htmlFor="single">Single date</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multiple" id="multiple" />
            <Label htmlFor="multiple">Multiple dates</Label>
          </div>
        </RadioGroup>
      ) : null}

      <div className="mb-6">
        <Label htmlFor="betweenDates" className="flex mb-2">
          Between Dates
        </Label>
        <GetFieldComponent
          id="betweenDates"
          type="dateRange"
          value={betweenDates}
          onUpdate={handleOnUpdate('betweenDates')}
        />
        <Button
          variant="outline"
          className="ml-2"
          disabled={isEmpty(betweenDates)}
          onClick={() => onUpdate}
        >
          <CalendarOff className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-6">
        <Label htmlFor="excludeDates" className="flex mb-2">
          Exclude Dates
        </Label>
        <GetFieldComponent
          id="excludeDates"
          type="date"
          value={excludeDates}
          onUpdate={handleOnUpdate('excludeDates')}
        />
        <Button
          variant="outline"
          className="ml-2"
          disabled={isEmpty(excludeDates)}
          onClick={() => onUpdate}
        >
          <CalendarOff className="h-4 w-4" />
        </Button>
      </div>

      {type === 'date' ? (
        <div className="mb-6">
          <Label htmlFor="showTime" className="flex mb-2">
            Show Time Input
          </Label>

          <Switch
            id="showTime"
            checked={Boolean(showTime)}
            onCheckedChange={handleOnUpdate('showTime')}
          />
        </div>
      ) : null}
    </>
  )
}

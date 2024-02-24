'use client'

import * as React from 'react'

import { Maybe } from '@/components/maybe'
import { Typography } from '@/components/typography/typography'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import Section from './section'

const Subscribe = ({ form, id, ...props }) => {
  const { input, button, contents, submit, className, ...formProps } = form

  const [inputValue, setInputValue] = React.useState(input?.value || '')

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submit && submit(false)
    }
  }

  return (
    <Section id={id} {...props}>
      <Maybe check={Boolean(button || contents)}>
        <div
          {...props}
          data-editor={`${id}-form`}
          {...formProps}
          className={cn('relative flex flex-col mt-4', className)}
        >
          <form className="relative sm:flex lg:w-96">
            <Input
              onKeyUp={handleOnKeyUp}
              {...input}
              value={inputValue}
              onChange={handleOnChange}
              className={cn(
                'rounded-b-none md:rounded-bl-md md:rounded-tr-none',
                input?.className
              )}
              data-editor={`${id}-form.input`}
            />
            <Button
              {...button}
              className={cn(
                'w-full rounded-t-none md:rounded-bl-none md:rounded-tr-md md:w-auto',
                button?.className
              )}
              data-editor={`${id}-form.button`}
            />
          </form>

          {contents
            ? (Object.entries(contents) || []).map(([key, content]) => (
                <Typography
                  key={content.id || key}
                  as="p"
                  {...content}
                  className={cn('!mt-2 text-sm', content?.className)}
                  data-editor={`${id}-form.content.${key}`}
                />
              ))
            : null}
        </div>
      </Maybe>
    </Section>
  )
}

Subscribe.displayName = 'Subscribe'

export default Subscribe

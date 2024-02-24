'use client'

import * as React from 'react'

import { Maybe } from '@/components/maybe'
import { Typography } from '@/components/typography/typography'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import Section from './section'

const Hero = ({ list, id, ...props }) => {
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
    <div id={id} {...props}>
      <Section>
      <Maybe check={Boolean(items)}>
        <div
          {...listProps}
          className={cn(
            '!mt-8 mb-8 relative',
            cols === 'none' && 'md:grid md:grid-flow-col md:grid-cols-none',
            cols === 1 && 'md:grid md:grid-flow-col md:grid-cols-1',
            cols === 2 && 'md:grid md:grid-flow-row md:grid-cols-2',
            cols === 3 && 'md:grid md:grid-flow-col md:grid-cols-3',
            cols === 4 && 'md:grid md:grid-flow-col  lg:grid-cols-4 ',
            cols === 5 &&
              'md:grid md:grid-flow-col md:grid-cols-2 lg:grid-cols-5',
            cols === 6 &&
              'md:grid md:grid-flow-col md:grid-cols-2 lg:grid-cols-6',
            cols === 7 &&
              'md:grid md:grid-flow-col md:grid-cols-2 lg:grid-cols-7',
            cols === 8 &&
              'md:grid md:grid-flow-col md:grid-cols-2 lg:grid-cols-8',
            cols === 9 &&
              'md:grid md:grid-flow-col md:grid-cols-2 lg:grid-cols-9',
            cols === 10 &&
              'md:grid md:grid-flow-col md:grid-cols-2 lg:grid-cols-10',
            cols === 11 &&
              'md:grid md:grid-flow-col md:grid-cols-2 lg:grid-cols-11',
            cols === 12 &&
              'md:grid md:grid-flow-col md:grid-cols-2 lg:grid-cols-12',
            isScrollable && 'md:block whitespace-nowrap overflow-y-hidden',
            className
          )}
        >
          {items.map(
            (
              { contents, heading, links, image, className, ...item },
              index: number
            ) => {
              return (
                <div
                  key={item.id || index}
                  className={cn(
                    'relative mb-4 md:mr-4',
                    isScrollable && ' inline-block',
                    className
                  )}
                  {...item}
                  data-editor={`${id}-list.items`}
                >
                  <div
                    className={cn(
                      image?.container?.className,
                      'flex justify-center mx-auto space-around'
                    )}
                    style={{
                      //TODO: media queries
                      // height: `${image?.height}px`,
                      // width: `${image?.width}px`,
                      ...image?.container?.style,
                    }}
                  >
                    {image ? (
                      <Image
                        {...image}
                        className={cn('w-full mb-4', image?.className)}
                        src={image?.src || ''}
                        alt={image?.alt || ''}
                        width={image?.width || '0'}
                        height={image?.height || '0'}
                        data-editor={`${id}-list.items.${index}.image`}
                      />
                    ) : null}
                  </div>

                  <Maybe check={Boolean(heading)}>
                    <Typography
                      as="h3"
                      className="mb-1"
                      {...heading}
                      data-editor={`${id}-list.items${index}.heading`}
                    />
                  </Maybe>

                  {Object.entries(contents || {}).map(([key, content]) => {
                    return (
                      <Typography
                        key={content?.id || key}
                        as="p"
                        {...content}
                        className={cn('md:!mt-0', content?.className)}
                        data-editor={`${id}-list.items.${index}.contents${key}`}
                      />
                    )
                  })}

                  {(Object.entries(links || {}) || []).map(([key, link]) => {
                    return (
                      <AppLink
                        {...link}
                        key={link?.id || key}
                        className={cn('mr-4 mb-2 h-10', link.className)}
                        data-editor={`${id}-list.items.${index}.link${key}`}
                      >
                        {link.children}
                      </AppLink>
                    )
                  })}
                </div>
              )
            }
          )}
        </div>
      </Maybe>
      </Section>
      </Maybe>
    </div>
  )
}

Hero.displayName = 'Hero'

export default Hero

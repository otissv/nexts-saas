'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

import Section from './section'
import { AppLink } from '@/components/app-link'
import { Maybe } from '@/components/maybe'
import { Typography } from '@/components/typography/typography'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Slider = ({
  list,
  id,
  scrollBy = 200,
  defaultScrollPosition = 0,
  ...props
}) => {
  const ref = React.useRef(null)
  const [scrollPosition, setScrollPosition] = React.useState(
    defaultScrollPosition
  )

  const { items, cols, className, stretch, ...listProps } = list

  const handleScroll = () => {
    const position = ref.current.scrollLeft
    setScrollPosition(position)
  }

  React.useEffect(() => {
    ref?.current?.addEventListener('scroll', handleScroll)
    ref.current.scrollLeft = defaultScrollPosition
    return () => {
      ref?.current?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNext = () => {
    ref.current.scrollLeft += scrollBy
  }

  const handleBack = () => {
    ref.current.scrollLeft -= scrollBy
  }

  return (
    <Section id={id} {...props}>
      <Maybe check={Boolean(items)}>
        <div
          {...listProps}
          className={cn(
            '!mt-8 mb-8 relative scrollbar-hide scroll-smooth whitespace-nowrap overflow-auto',
            className
          )}
          ref={ref}
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
                    'relative mb-4 md:mr-4 inline-block w-full',
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
                      height: `${image?.height}px`,
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

        <button
          className={cn(
            'bg-gradient-to-r from-white dark:from-[#181818] via-white dark:via-[#181818] to-transparent h-full w-28 flex items-center justify-center  absolute left-0 top-1/2 -translate-y-1/2',
            scrollPosition === 0 ? 'hidden' : 'block'
          )}
          onClick={handleBack}
        >
          <ChevronLeft />
        </button>
        <button
          className={cn(
            'bg-gradient-to-l from-white dark:from-[#181818] via-white dark:via-[#181818] to-transparent h-full w-28 flex items-center justify-center  absolute right-0 top-1/2 -translate-y-1/2',
            ref.current &&
              scrollPosition + ref.current.clientWidth ===
                ref.current.scrollWidth
              ? 'hidden'
              : 'block'
          )}
          onClick={handleNext}
        >
          <ChevronRight />
        </button>
      </Maybe>
    </Section>
  )
}

Slider.displayName = 'Slider'

export default Slider

'use client'

import { useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import Image from 'next/image'

import { Typography } from '@/components/typography/typography'
import { cn } from '@/lib/utils'
import { Maybe } from '@/components/maybe'
import { ChevronRight } from 'lucide-react'
import { AppLink } from '@/components/app-link'
import { omit } from 'c-ufunc/libs/omit'

const DndImg = ({ id, className, src, alt, width, height, ...props }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item) {
        if (onDrop) {
          onDrop(item)
        }
      },
      canDrop(item) {
        console.log('canDrop', item.files, item.items)
        return true
      },
      hover(item) {
        console.log('hover', item.files, item.items)
      },
      collect: (monitor) => {
        const item = monitor.getItem()
        if (item) {
          // console.log("collect", item.files, item.items)
        }
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }
      },
    }),
    [props]
  )
  //   const isActive = canDrop && isOver

  return src ? (
    <Image
      className={cn('w-full md:w-1/2', className)}
      src={src || ''}
      alt={alt || ''}
      width={width || '0'}
      height={height || '0'}
      {...props}
    />
  ) : (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: 'inherit',
        backgroundColor: '#ffffff',
        opacity: 0.5,
        backgroundSize: '10px 10px',
        border: 'solid 1px #c4c4c4',
        backgroundImage:
          'repeating-linear-gradient(45deg, #c4c4c4 0, #c4c4c4 1px, #ffffff 0, #ffffff 50%)',
      }}
      {...props}
    />
  )
}

const Section = ({
  children,
  className,
  contents,
  edit = 'root',
  heading,
  id,
  image,
  isEdit,
  footer,
  data,
  ...props
}) => {
  return (
    <section
      className={cn('relative md:flex', className)}
      {...data}
      {...props}
      data-editor={`${id}-${edit}`}
    >
      {isEdit ? (
        <Maybe check={image}>
          <DndImg
            className="h-full"
            {...omit(['editType'])(image)}
            data-editor={`${id}-image`}
            {...data}
          />
        </Maybe>
      ) : image ? (
        <Image
          {...omit(['editType', 'children'])(image)}
          className={cn(
            'w-full md:w-1/2 object-contain self-start',
            image?.className
          )}
          src={image.children[0]?.src || ''}
          alt={image.children[0]?.alt || ''}
          width={image.children[0]?.width || '0'}
          height={image.children[0]?.height || '0'}
          data-editor={`${id}-image`}
          {...data}
        />
      ) : null}

      <div
        className={cn(
          'flex flex-col justify-start px-8 pb-8 md:pb-1',
          image && 'md:w-1/2'
        )}
        {...data}
      >
        <Maybe check={Boolean(heading)}>
          <Typography
            as="h2"
            {...omit(['editType'])(heading)}
            className={cn('mb-2 md:!mt-2', heading?.className)}
            data-editor={`${id}-heading`}
            data-edit-type={heading.editType}
            {...data}
          />
        </Maybe>

        {(contents?.children || []).map(
          ({ editType, ...content }, index: number) => {
            return (
              <Typography
                key={content.id || index}
                as="p"
                {...content}
                className={cn('md:!mt-0', content?.className)}
                data-editor={`${id}-contents.${index}`}
                data-edit-type={editType}
                {...data}
              />
            )
          }
        )}

        <Maybe check={Boolean(children)}>{children}</Maybe>

        {footer ? (
          <Maybe check={Boolean(footer)}>
            <div
              className={cn('section-footer relative mt-4', footer.className)}
            >
              {/* {(footer.links?.children || []).map(
                ({ editType, ...content }, index: number) => {
                  return (
                    <AppLink
                      {...content}
                      {...data}
                      key={content?.id || index}
                      className={cn('mr-4 mb-2 h-10', content?.className)}
                      data-editor={`${id}-footer.links.${index}`}
                      data-edit-type={editType}
                    >
                      {content?.children}
                      <ChevronRight className="inline-flex ml-1" />
                    </AppLink>
                  )
                }
              )} */}

              {(footer.contents?.children || []).map(
                ({ editType, ...content }, index: number) => {
                  return (
                    <Typography
                      as="p"
                      key={content?.id || index}
                      {...content}
                      className={cn(
                        'mb-4 md:!my-0 text-sm',
                        content?.className
                      )}
                      data-editor={`${id}-footer.contents.${index}`}
                      data-edit-type={editType}
                      {...data}
                    />
                  )
                }
              )}
            </div>
          </Maybe>
        ) : null}
      </div>
    </section>
  )
}

Section.displayName = 'Section'

export default Section

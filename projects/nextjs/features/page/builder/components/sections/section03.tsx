import { Maybe } from '@/components/maybe'
import { Typography } from '@/components/typography/typography'
import { cn } from '@/lib/utils'

import Section from './section'

const List = ({ contents, list, id, ...props }) => {
  const { items, cols, className, ...listProps } = list
  return (
    <Section id={id} contents={contents} {...props}>
      <Maybe check={Boolean(items)}>
        <ul
          {...listProps}
          className={cn(
            'relative list-disc ',
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
            className
          )}
          data-editor={`${id}-list`}
        >
          {items.map(({ contents, heading, ...item }, index) => {
            return (
              <li
                className="relative mb-2"
                key={item.id || index}
                {...item}
                data-editor={`${id}-list.items.${index}`}
              >
                <Maybe check={Boolean(heading)}>
                  <Typography
                    as="h3"
                    className="mt-4 mb-1"
                    {...heading}
                    data-editor={`${id}-list.items.heading`}
                  />
                </Maybe>

                {Object.entries(contents || {}).map(([key, content]) => {
                  return (
                    <Typography
                      key={content?.id || key}
                      as="p"
                      {...content}
                      className={cn('md:!mt-0', content?.className)}
                      data-editor={`${id}-list.item.contents.${key}`}
                    />
                  )
                })}
              </li>
            )
          })}
        </ul>
      </Maybe>
    </Section>
  )
}

List.displayName = 'List'

export default List

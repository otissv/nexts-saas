import * as React from 'react'
import Image from 'next/image'

import { ContentEditable } from '@/components/content-editable'

export interface TwoColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  image: {
    href: string
    src: string
    alt: string
    width: number
    height: number
  }
  title: string
  category: string
  contents: string[]
}

export const TwoColumn = React.forwardRef<HTMLDivElement, TwoColumnProps>(
  (
    { image: { href, alt, ...image }, title, category, contents, ...props },
    ref
  ) => {
    const isEdit = true

    return (
      <div className="container mb-24 mx-auto md:px-6" ref={ref} {...props}>
        <section className="mb-32">
          <div className="mb-16 flex flex-wrap">
            <div className="mb-6 w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-6/12 lg:pr-6">
              <div
                className="cmx-image ripple relative overflow-hidden rounded-lg bg-cover bg-[50%] bg-no-repeat"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <Image className="w-full" alt={alt} {...image} />
                <a href={href}>
                  <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.2)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                </a>
              </div>
            </div>

            <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 lg:pl-6">
              <ContentEditable id="title" label="Title" isEdit={isEdit}>
                <h3 className="cmx-title mb-4 text-2xl font-bold">{title}</h3>
              </ContentEditable>

              <ContentEditable id="category" label="Category" isEdit={isEdit}>
                <div className="mb-4 flex items-center text-sm font-medium text-danger dark:text-danger-500">
                  {category}
                </div>
              </ContentEditable>

              {contents.map((content: string, i: number) => (
                <React.Fragment key={i}>
                  <ContentEditable
                    id={`content-${i}`}
                    isEdit={isEdit}
                    label={`content-${i}`}
                    srOnly={true}
                    expandable={true}
                  >
                    <p className="cmx-content mb-6 text-sm text-neutral-500 dark:text-neutral-400">
                      {content}
                    </p>
                  </ContentEditable>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }
)
TwoColumn.displayName = 'TwoColumn'

import Link from 'next/link'
import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import { PluggableList } from 'react-markdown/lib/react-markdown'
import remarkGfm from 'remark-gfm'
import stringWidth from 'string-width'

export interface MarkdownProps extends React.HTMLProps<HTMLElement> {
  remarkPlugins?: PluggableList
  children: string
}

export const Markdown = React.forwardRef<HTMLElement, MarkdownProps>(
  ({ remarkPlugins = [], children, ...props }, ref) => {
    return (
      <ReactMarkdown
        components={{
          p: React.Fragment,
          a: ({ href = '', node, ...props }) => {
            return (
              <Link
                className="underline underline-offset-4 hover:text-primary whitespace-nowrap"
                href={href}
                {...props}
              />
            )
          },
        }}
        remarkPlugins={[
          ...remarkPlugins,
          [remarkGfm, { singleTilde: false, stringLength: stringWidth }],
        ]}
        ref={ref}
        {...props}
      >
        {children}
      </ReactMarkdown>
    )
  }
)
Markdown.displayName = 'Markdown'

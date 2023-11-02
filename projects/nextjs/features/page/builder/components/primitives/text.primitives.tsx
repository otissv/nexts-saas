import { Typography, TypographyProps } from '@/components/typography/typography'
import { InlineTextEditor } from '@/components/inline-text-editor'
import { htmlToMarkdown } from '@/lib/html-to-markdown'
import { BlockActions } from '@/features/page/store/page.store'

export interface TextPrimitiveProps extends TypographyProps {
  isEdit?: boolean
  edit: string
  content: Record<string, any>
  update: BlockActions['updatePageContent']
}

const TextPrimitive = ({
  as,
  id,
  isEdit,
  edit,
  content,
  update,
  ...props
}: TextPrimitiveProps) => {
  const toMarkdown = htmlToMarkdown()

  const handleOnBlur = (event: React.FormEvent<HTMLSpanElement>) => {
    const updateContent = (text: string, props: Record<string, any>) => {
      if (props[edit]) props[edit].children = text
    }

    update(toMarkdown(event.currentTarget.innerHTML), updateContent)
  }

  return (
    <Typography as={as} {...content} {...props} data-editor={`${id}-${edit}`}>
      <InlineTextEditor
        onBlur={handleOnBlur}
        isEdit={isEdit}
        {...props}
        data-editor={`${id}-${edit}`}
      >
        {content.children}
      </InlineTextEditor>
    </Typography>
  )
}

export default TextPrimitive

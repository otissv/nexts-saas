import { InlineTextEditor } from '@/components/inline-text-editor'
import { Button, ButtonProps } from '@/components/ui/button'
import { htmlToMarkdown } from '@/lib/html-to-markdown'
import { BlockActions } from '@/features/page/store/page.store'

export interface ButtonPrimitiveProps extends ButtonProps {
  isEdit?: boolean
  edit: string
  content: Record<string, any>
  update: BlockActions['updatePageContent']
}

const ButtonPrimitive = ({
  as,
  id,
  isEdit,
  edit,
  content,
  update,
  className,
  variant,
  size,
  asChild,
  defaultVariants,
  variants,
  ...props
}: ButtonPrimitiveProps) => {
  const toMarkdown = htmlToMarkdown()

  const handleOnBlur = (event: React.FormEvent<HTMLSpanElement>) => {
    const updateContent = (text: string, props: Record<string, any>) => {
      if (props[edit]) props[edit].children = text
    }

    update(toMarkdown(event.currentTarget.innerHTML), updateContent)
  }

  return (
    <Button
      as={as}
      className={className}
      variant={variant}
      size={size}
      asChild={asChild}
      defaultVariants={defaultVariants}
      variants={variants}
      {...content}
      {...props}
      data-editor={`${id}-${edit}`}
    >
      <InlineTextEditor
        onBlur={handleOnBlur}
        isEdit={isEdit}
        {...props}
        data-editor={`${id}-${edit}`}
      >
        {content.children}
      </InlineTextEditor>
    </Button>
  )
}

export default ButtonPrimitive

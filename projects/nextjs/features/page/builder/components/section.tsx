import * as React from 'react'

import TextPrimitive from '@/features/page/builder/components/primitives/text.primitives'
import ButtonPrimitive from './primitives/button.primitives'

const Section = ({
  id,
  isEdit,
  content,
  heading,
  pageStore,
  onClick,
  cta,
  ...props
}) => {
  const { updatePageContent } = pageStore

  return (
    <section data-editor={`${id}-root`} onClick={onClick} {...props}>
      {cta && (
        <ButtonPrimitive
          id={id}
          edit="cta"
          isEdit={isEdit}
          content={cta}
          update={updatePageContent}
          className="flex"
          variant="secondary"
          {...props}
        />
      )}

      <TextPrimitive
        as="h1"
        id={id}
        edit="heading"
        isEdit={isEdit}
        content={heading}
        update={updatePageContent}
        {...props}
      />

      <TextPrimitive
        as="p"
        id={id}
        isEdit={isEdit}
        edit="content"
        content={content}
        update={updatePageContent}
        {...props}
      />
    </section>
  )
}
Section.displayName = 'Section'

export default Section

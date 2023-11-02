import * as React from 'react'

import { Typography, TypographyProps } from '@/components/typography/typography'
import { PageState, BlockActions } from '@/features/page/store/page.store'

export interface TextProps extends TypographyProps {
  isEdit?: boolean
  edit: string
  root: Record<string, any>
  pageStore: () => PageState & BlockActions
}

const Text = ({
  as = 'p',
  isEdit,
  root,
  id,
  onClick,
  edit = 'root',
  pageStore,
  ...props
}: TextProps) => {
  return (
    <Typography as={as} {...root} {...props} data-editor={`${id}-${edit}`}>
      {root.children}
    </Typography>
  )
}
Text.displayName = 'Text'

export default Text

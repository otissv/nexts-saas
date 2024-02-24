import * as React from 'react'

import { getTranslations } from 'next-intl/server'
import { Markdown } from '@/components/markdown'
import { serverContext } from '@/features/context-server-only'

export const translateServer = getTranslations

export async function serverUseTranslate(namespace: string) {
  const locale = serverContext().localeService.get()

  let t: (children: string) => string
  try {
    t = await translateServer({ locale, namespace })
  } catch (error) {
    console.error(error)
  }

  /* eslint-disable react/display-name */
  return ({ children }: { children: string }) => (
    <Markdown>{t(children)}</Markdown>
  )
}

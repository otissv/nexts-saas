import * as React from 'react'

import { getTranslator } from 'next-intl/server'
import { Markdown } from '@/components/markdown'
import { serverContext } from '@/app/context-server-only'

export const translateServer = getTranslator

export async function serverUseTranslate(namespace: string) {
  const locale = serverContext().localeService.get()

  let t: (children: string) => string
  try {
    t = await translateServer(locale, namespace)
  } catch (error) {
    console.error(error)
  }

  /* eslint-disable react/display-name */
  return ({ children }: { children: string }) => (
    <Markdown>{t(children)}</Markdown>
  )
}

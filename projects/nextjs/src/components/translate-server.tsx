import * as React from 'react'

import { getTranslations } from 'next-intl/server'
import { Markdown } from '@/components/markdown'

export const translateServer = getTranslations

export async function serverUseTranslate(namespace: string) {
  let t: (children: string) => string
  try {
    t = await translateServer(namespace)
  } catch (error) {
    console.error(error)
  }

  return ({ children }: { children: string }) => (
    <Markdown>{t(children)}</Markdown>
  )
}

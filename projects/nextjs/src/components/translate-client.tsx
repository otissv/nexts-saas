'use client'

import { useTranslations } from 'next-intl'
import { Markdown } from '@/components/markdown'

export const useTranslate = useTranslations

export function translateClient(namespace: string) {
  const t = useTranslations(namespace)
  return ({ children }: { children: string }) => (
    <Markdown>{t(children)}</Markdown>
  )
}

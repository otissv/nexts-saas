'use client'

import { useTranslations } from 'next-intl'
import { Markdown } from '../markdown'

export const useTranslateClient = useTranslations

export function useTranslateClientComponent(namespace: string) {
  const t = useTranslations(namespace)

  /* eslint-disable react/display-name */
  return ({ children }: { children: string }) => (
    <Markdown>{t(children)}</Markdown>
  )
}

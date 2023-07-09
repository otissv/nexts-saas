import { useLocale as useLang } from 'next-intl'
import { notFound } from 'next/navigation'

import { PageParams } from '@/types'

export function useLocale(params: PageParams) {
  const locale = useLang()

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound()
  } else {
    return useLang()
  }
}

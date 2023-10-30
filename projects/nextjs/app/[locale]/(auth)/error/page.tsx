import { redirect } from 'next/navigation'

import { translateServer } from '@/components/translate/translate-server'
import { serverContext } from '@/app/context-server-only'

export default async function AuthError() {
  const locale = serverContext().localeService.get()
  const t = await translateServer(locale, 'ui.pages.authentication')
  redirect(`/login?error=${t('login.error')}`)
}

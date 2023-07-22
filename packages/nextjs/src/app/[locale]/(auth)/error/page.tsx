import { redirect } from 'next/navigation'

import { translateServer } from '@/components/translate/translate-server'

export default async function AuthError() {
  const t = await translateServer('ui.pages.authentication')
  redirect(`/login?error=${t('login.error')}`)
}

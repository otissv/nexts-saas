'use server'

import { serverContext } from '@/features/context-server-only'
import { OauthProviderSignup } from '@/features/app-oauth-providers/oauth-providers.types'

const { oauthProvidersService } = serverContext()

/* Mutations */

export async function oauthProviderSignup(data: OauthProviderSignup) {
  return await oauthProvidersService.signup({ data })
}

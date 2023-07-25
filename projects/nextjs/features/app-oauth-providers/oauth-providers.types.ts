import { z } from 'zod'

import { oauthProvidersDb } from '@/features/app-oauth-providers/oauth-providers.db'
import {
  oauthProviderValidator,
  oauthProviderSignupValidator,
  oauthProviderInsertValidator,
} from './oauth-providers.validators'
import { UserInsert } from '@/features/app-users/users.types'

export type OauthProvider = z.infer<typeof oauthProviderValidator>
export type OauthProviderInsert = z.infer<typeof oauthProviderInsertValidator>
export type OauthProviderSignup = z.infer<typeof oauthProviderSignupValidator>
export type OauthUserInsert = Omit<UserInsert, 'password'>

export type OauthProvidersDb = typeof oauthProvidersDb

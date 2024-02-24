import { z } from 'zod'

import { validate } from '@/lib/validate'
import {
  OauthProvider,
  OauthProviderSignup,
} from '@/features/app-oauth-providers/oauth-providers.types'
import { userValidator } from '@/features/app-users/users.validators'

export const oauthProviderValidator = z.object({
  id: z.number().int().positive(),
  providerId: z.string().min(1).max(256),
  provider: z.string().min(1).max(256),
  tenantId: z.number().int().positive(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const oauthProviderInsertValidator = oauthProviderValidator.omit({
  id: true,
})

export const oauthProviderSignupValidator = z.object({
  provider: z.object({
    provider: oauthProviderValidator.shape.provider,
    providerId: oauthProviderValidator.shape.providerId,
  }),
  user: z.object({
    username: userValidator.shape.username,
    email: userValidator.shape.email,
    firstName: userValidator.shape.firstName,
    imageUrl: userValidator.shape.imageUrl,
    lastName: userValidator.shape.lastName,
    phone: userValidator.shape.phone,
    emailVerified: userValidator.shape.emailVerified,
  }),
})

export async function oauthProviderValidate(data: OauthProvider) {
  return validate(oauthProviderValidator)(data)
}

export async function oauthProviderSignupValidate(data: OauthProviderSignup) {
  return validate(oauthProviderSignupValidator)(data)
}

export async function oauthProviderInsertValidate(
  data: Partial<OauthProvider>
) {
  return validate(oauthProviderInsertValidator)(data)
}

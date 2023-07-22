import { z } from 'zod'

import { validate } from '@/lib/validate'
import {
  Tenant,
  TenantInsert,
  TenantUpdate,
} from '@/features/app-tenants/tenants.types'

export const tenantValidator = z.object({
  id: z.number().int().positive(),
  ownerId: z.number().int().positive(),
})

export const tenantInsertValidator = tenantValidator.omit({
  id: true,
})

export const tenantUpdateValidator = tenantValidator
  .omit({
    id: true,
  })
  .partial()

export async function tenantValidate(data: Tenant) {
  return validate(tenantValidator)(data)
}

export async function tenantInsertValidate(data: TenantInsert) {
  return validate(tenantInsertValidator)(data)
}

export async function tenantUpdateValidate(data: TenantUpdate) {
  return validate(tenantUpdateValidator)(data)
}

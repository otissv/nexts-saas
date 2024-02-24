import { z } from 'zod'

import { validate } from '@/lib/validate'
import {
  TenantAddress,
  TenantAddressInsert,
  TenantAddressUpdate,
} from '@/features/tenant-addresses/addresses.tenant.types'

export const tenantAddressValidator = z.object({
  id: z.number().int().positive(),
  companyId: z.number().int().positive(),
  site: z.string().min(1).max(256),
  streetAddress: z.string().min(3).max(256),
  addressDetails: z.string().max(256).optional(),
  city: z.string().min(3).max(256),
  state: z.string().min(2).max(256).optional(),
  postalCode: z.string().min(3).max(10),
  country: z.string().min(3).max(256),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const tenantAddressInsertValidator = tenantAddressValidator.omit({
  id: true,
  companyId: true,
})

export const tenantAddressUpdateValidator = tenantAddressValidator.omit({
  id: true,
  companyId: true,
})

export async function tenantAddressValidate(data: TenantAddress) {
  return validate(tenantAddressValidator)(data)
}

export async function tenantAddressInsertValidate(data: TenantAddressInsert) {
  return validate(tenantAddressInsertValidator)(data)
}

export async function tenantAddressUpdateValidate(data: TenantAddressUpdate) {
  return validate(tenantAddressUpdateValidator)(data)
}

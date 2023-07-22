import { z } from 'zod'
import { validate } from 'utils/validate'

import {
  TenantCompanyAddress,
  TenantCompanyAddressInsert,
  TenantCompanyAddressUpdate,
} from '@/features/tenant-company-addresses/company-addresses.tenant.types'

export const tenantCompanyAddressValidator = z.object({
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

export const tenantCompanyAddressInsertValidator =
  tenantCompanyAddressValidator.omit({
    id: true,
    companyId: true,
  })

export const tenantCompanyAddressUpdateValidator =
  tenantCompanyAddressValidator.omit({
    id: true,
    companyId: true,
  })

export async function tenantCompanyAddressValidate(data: TenantCompanyAddress) {
  return validate(tenantCompanyAddressValidator)(data)
}

export async function tenantCompanyAddressInsertValidate(
  data: TenantCompanyAddressInsert
) {
  return validate(tenantCompanyAddressInsertValidator)(data)
}

export async function tenantCompanyAddressUpdateValidate(
  data: TenantCompanyAddressUpdate
) {
  return validate(tenantCompanyAddressUpdateValidator)(data)
}

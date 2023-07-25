import { z } from 'zod'

import {
  tenantCompanyAddressValidator,
  tenantCompanyAddressInsertValidator,
  tenantCompanyAddressUpdateValidator,
} from '@/features/tenant-company-addresses/company-addresses.tenant.validators'

export type TenantCompanyAddress = z.infer<typeof tenantCompanyAddressValidator>
export type TenantCompanyAddressInsert = z.infer<
  typeof tenantCompanyAddressInsertValidator
>
export type TenantCompanyAddressUpdate = z.infer<
  typeof tenantCompanyAddressUpdateValidator
>

import { z } from 'zod'

import {
  tenantAddressValidator,
  tenantAddressInsertValidator,
  tenantAddressUpdateValidator,
} from '@/features/tenant-addresses/addresses.tenant.validators'

export type TenantAddress = z.infer<typeof tenantAddressValidator>
export type TenantAddressInsert = z.infer<typeof tenantAddressInsertValidator>
export type TenantAddressUpdate = z.infer<typeof tenantAddressUpdateValidator>

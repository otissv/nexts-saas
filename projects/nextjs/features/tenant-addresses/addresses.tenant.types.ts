import { z } from 'zod'

import {
  tenantAddressInsertValidator,
  tenantAddressValidator,
} from '@/features/tenant-addresses/addresses.tenant.validators'

export type TenantAddress = z.infer<typeof tenantAddressValidator>
export type TenantAddressPartial = Partial<
  z.infer<typeof tenantAddressValidator>
>
export type TenantAddressInsert = z.infer<typeof tenantAddressInsertValidator>
export type TenantAddressUpdate = TenantAddressPartial

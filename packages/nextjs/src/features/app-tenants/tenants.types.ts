import { z } from 'zod'

import {
  tenantInsertValidator,
  tenantUpdateValidator,
  tenantValidator,
} from '@/features/app-tenants/tenants.validator'

export type Tenant = z.infer<typeof tenantValidator>
export type TenantInsert = z.infer<typeof tenantInsertValidator>
export type TenantUpdate = z.infer<typeof tenantUpdateValidator>

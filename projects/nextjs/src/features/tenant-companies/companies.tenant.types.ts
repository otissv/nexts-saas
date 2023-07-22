import { z } from 'zod'
import {
  tenantCompanyInsertValidator,
  tenantCompanyUpdateValidator,
  tenantCompanyValidator,
} from '@/features/tenant-companies/companies.tenant.validators'

export type TenantCompany = z.infer<typeof tenantCompanyValidator>
export type TenantCompanyInsert = z.infer<typeof tenantCompanyInsertValidator>
export type TenantCompanyUpdate = z.infer<typeof tenantCompanyUpdateValidator>

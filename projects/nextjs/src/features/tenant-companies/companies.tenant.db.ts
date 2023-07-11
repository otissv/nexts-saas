import { SelectedFieldsFlat } from 'drizzle-orm/pg-core'

import { checkHasTenantId } from '@/lib/utils-server-only'
import { SelectProps } from '@/database/pg/types.pg'
import { PostgresDatabase } from '@/database/pg//connection.pg'
import { tenantSchema } from '@/schema/tenant.schema'
import {
  TenantCompany,
  TenantCompanyInsert,
  TenantCompanyUpdate,
} from '@/features/tenant-companies/companies.tenant.types'
import { dbController } from '@/database/pg/db-controller.pg'
import {
  tenantCompanyInsertValidate,
  tenantCompanyUpdateValidate,
} from '@/features/tenant-companies/companies.tenant.validators'

export function tenantCompanyDb(db: PostgresDatabase) {
  return (tenantId: string) => {
    const tenantCompaniesSchema = tenantSchema(tenantId).companies
    const tenantCompanies = dbController(db)({
      schema: tenantCompaniesSchema,
      insertValidate: tenantCompanyInsertValidate,
      updateValidate: tenantCompanyUpdateValidate,
    })

    const maybeTenant = checkHasTenantId(tenantId)

    return {
      schema: tenantCompaniesSchema,

      /* Queries */

      select: (props: SelectProps<TenantCompany> = {}) =>
        maybeTenant(tenantCompanies.select)(props),

      selectById: (props: {
        id: TenantCompany['id']
        select?: Omit<SelectProps<TenantCompany>, 'where'>
      }) => maybeTenant(tenantCompanies.selectById)(props),

      /* Mutations */

      deleteById: (props: {
        id: TenantCompany['id']
        returning?: SelectedFieldsFlat
      }) => maybeTenant(tenantCompanies.deleteById)(props),

      insert: (props: {
        data: TenantCompanyInsert
        returning?: SelectedFieldsFlat
      }) => maybeTenant(tenantCompanies.insert)(props),

      update: (props: {
        data: TenantCompanyUpdate
        where?: SelectProps<TenantCompany>['where']
        returning?: SelectedFieldsFlat
      }) => maybeTenant(tenantCompanies.update)(props),

      updateById: <Update>(props: {
        id: TenantCompany['id']
        data: Update
        returning?: SelectedFieldsFlat
      }) => maybeTenant(tenantCompanies.updateById)(props),
    }
  }
}

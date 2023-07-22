import { SelectedFieldsFlat } from 'drizzle-orm/pg-core'

import { SelectProps } from '@/database/pg/types.pg'
import { PostgresDatabase } from '@/database/pg/connection.pg'
import { tenantSchema } from '@/schema/tenant.schema'
import {
  TenantCompanyAddress,
  TenantCompanyAddressInsert,
  TenantCompanyAddressUpdate,
} from './company-addresses.tenant.types'
import { dbController } from '@/database/pg/db-controller.pg'
import { checkHasTenantId } from '@/lib/utils-server-only'
import {
  tenantCompanyAddressInsertValidate,
  tenantCompanyAddressUpdateValidate,
} from '@/features/tenant-company-addresses/company-addresses.tenant.validators'

export function tenantCompanyAddressDb(db: PostgresDatabase) {
  return (tenantId: string) => {
    const tenantCompaniesAddressSchema = tenantSchema(tenantId).companyAddresses
    const tenantCompaniesAddress = dbController(db)({
      schema: tenantCompaniesAddressSchema,
      insertValidate: tenantCompanyAddressInsertValidate,
      updateValidate: tenantCompanyAddressUpdateValidate,
    })

    const maybeTenant = checkHasTenantId(tenantId)

    return {
      schema: tenantCompaniesAddressSchema,

      /* Queries */

      select: (props: SelectProps<TenantCompanyAddress>) =>
        maybeTenant(tenantCompaniesAddress.select)(props),

      selectById: (props: {
        id: TenantCompanyAddress['id']
        select?: Omit<SelectProps<TenantCompanyAddress>, 'where'>
      }) => maybeTenant(tenantCompaniesAddress.selectById)(props),

      /* Mutations */

      deleteById: (props: {
        id: TenantCompanyAddress['id']
        returning?: SelectedFieldsFlat
      }) => maybeTenant(tenantCompaniesAddress.deleteById)(props),

      insert: (props: {
        data: TenantCompanyAddressInsert
        returning?: SelectedFieldsFlat
      }) => maybeTenant(tenantCompaniesAddress.insert)(props),

      update: (props: {
        data: TenantCompanyAddressUpdate
        where?: SelectProps<TenantCompanyAddress>['where']
        returning?: SelectedFieldsFlat
      }) => maybeTenant(tenantCompaniesAddress.update)(props),

      updateById: <Update>(props: {
        id: TenantCompanyAddress['id']
        data: Update
        returning?: SelectedFieldsFlat
      }) => maybeTenant(tenantCompaniesAddress.updateById)(props),
    }
  }
}

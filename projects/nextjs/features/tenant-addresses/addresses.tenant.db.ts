import { SelectedFieldsFlat } from 'drizzle-orm/pg-core'

import { SelectProps } from '@/database/pg/types.pg'
import { PostgresDatabase } from '@/database/pg/connection.pg'
import { tenantSchema } from '@/schema/orm/tenant.schema'
import {
  TenantAddress,
  TenantAddressInsert,
  TenantAddressUpdate,
} from './addresses.tenant.types'
import { dbController } from '@/database/pg/db-controller.pg'
import { checkHasTenantId } from '@/lib/utils-server-only'
import {
  tenantAddressInsertValidate,
  tenantAddressUpdateValidate,
} from '@/features/tenant-addresses/addresses.tenant.validators'

export function tenantAddressDb(db: PostgresDatabase) {
  return (tenantId: number) => {
    const tenantCompaniesAddressSchema = tenantSchema(tenantId).addresses
    const tenantCompaniesAddress = dbController(db)({
      schema: tenantCompaniesAddressSchema,
      insertValidate: tenantAddressInsertValidate,
      updateValidate: tenantAddressUpdateValidate,
    })

    const maybeTenant = checkHasTenantId(tenantId)

    return {
      schema: tenantCompaniesAddressSchema,

      /* Queries */

      select: (props: SelectProps<TenantAddress>) =>
        maybeTenant(tenantCompaniesAddress.select)(props),

      selectById: (props: {
        id: TenantAddress['id']
        select?: Omit<SelectProps<TenantAddress>, 'where'>
      }) => maybeTenant(tenantCompaniesAddress.selectById)(props),

      /* Mutations */

      deleteById: (props: {
        id: TenantAddress['id']
        returning?: SelectedFieldsFlat
      }) => maybeTenant(tenantCompaniesAddress.deleteById)(props),

      insert: (props: {
        data: TenantAddressInsert
        returning?: SelectedFieldsFlat
      }) => maybeTenant(tenantCompaniesAddress.insert)(props),

      update: (props: {
        data: TenantAddressUpdate
        where?: SelectProps<TenantAddress>['where']
        returning?: SelectedFieldsFlat
      }) => maybeTenant(tenantCompaniesAddress.update)(props),

      updateById: <Update>(props: {
        id: TenantAddress['id']
        data: Update
        returning?: SelectedFieldsFlat
      }) => maybeTenant(tenantCompaniesAddress.updateById)(props),
    }
  }
}

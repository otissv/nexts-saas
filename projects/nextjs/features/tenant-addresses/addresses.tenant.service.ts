import { eq, SQL } from 'drizzle-orm'
import { SelectedFieldsFlat } from 'drizzle-orm/pg-core'

import { SelectProps, SeverReturnType } from '@/database/pg/types.pg'
import { PostgresDatabase } from '@/database/pg/connection.pg'
import { tenantAddressDb } from '@/features/tenant-addresses/addresses.tenant.db'
import {
  TenantAddress,
  TenantAddressInsert,
  TenantAddressUpdate,
} from '@/features/tenant-addresses/addresses.tenant.types'
import { errorResponse } from '@/database/utils.db'

export function tenantAddressService(db: PostgresDatabase) {
  return (tenantId: number) => {
    const tenantAddress = tenantAddressDb(db)(tenantId)

    return {
      schema: tenantAddress.schema,

      /* Queries */
      select: (props: SelectProps<TenantAddress> = {}) =>
        tenantAddress
          .select(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantAddress>,

      selectById: (props: {
        id: TenantAddress['id']
        select?: Omit<SelectProps<TenantAddress>, 'where'>
      }) =>
        tenantAddress
          .selectById(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantAddress>,

      selectByCompanyId: ({
        companyId,
        props,
      }: {
        companyId: TenantAddress['companyId']
        props?: Omit<SelectProps<TenantAddress>, 'where'>
      }) => {
        return tenantAddress
          .select({
            ...props,
            where: eq(
              tenantAddress.schema.companyId,
              companyId
            ) as SQL<TenantAddress>,
          })
          .catch(errorResponse(422)) as SeverReturnType<TenantAddress>
      },

      /* Mutations */

      deleteById: (props: {
        id: TenantAddress['id']
        returning?: SelectedFieldsFlat
      }) =>
        tenantAddress
          .deleteById(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantAddress>,

      insert: (props: {
        data: TenantAddressInsert
        returning?: SelectedFieldsFlat
      }) =>
        tenantAddress
          .insert(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantAddress>,

      update: (props: {
        data: TenantAddressUpdate
        returning?: SelectedFieldsFlat
        where?: SelectProps<TenantAddress>['where']
      }) =>
        tenantAddress
          .update(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantAddress>,

      updateById: (props: {
        id: TenantAddress['id']
        data: TenantAddressUpdate
        returning?: SelectedFieldsFlat
      }) =>
        tenantAddress
          .updateById(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantAddress>,
    }
  }
}

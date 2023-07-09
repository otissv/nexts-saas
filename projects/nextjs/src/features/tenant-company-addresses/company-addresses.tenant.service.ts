import { eq, SQL } from 'drizzle-orm'
import { SelectedFieldsFlat } from 'drizzle-orm/pg-core'

import { SelectProps, SeverReturnType } from '@/types'
import { PostgresDatabase } from '@/database/connection'
import { errorResponse } from '@/lib/utils-server-only'
import { tenantCompanyAddressDb } from '@/features/tenant-company-addresses/company-addresses.tenant.db'
import {
  TenantCompanyAddress,
  TenantCompanyAddressInsert,
  TenantCompanyAddressUpdate,
} from '@/features/tenant-company-addresses/company-addresses.tenant.types'

export function tenantCompanyAddressService(db: PostgresDatabase) {
  return (tenantId: string) => {
    const tenantCompanyAddress = tenantCompanyAddressDb(db)(tenantId)

    return {
      schema: tenantCompanyAddress.schema,

      /* Queries */
      select: (props: SelectProps<TenantCompanyAddress> = {}) =>
        tenantCompanyAddress
          .select(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCompanyAddress>,

      selectById: (props: {
        id: TenantCompanyAddress['id']
        select?: Omit<SelectProps<TenantCompanyAddress>, 'where'>
      }) =>
        tenantCompanyAddress
          .selectById(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCompanyAddress>,

      selectByCompanyId: ({
        companyId,
        props,
      }: {
        companyId: TenantCompanyAddress['companyId']
        props?: Omit<SelectProps<TenantCompanyAddress>, 'where'>
      }) => {
        return tenantCompanyAddress.select({
          ...props,
          where: eq(
            tenantCompanyAddress.schema.companyId,
            companyId
          ) as SQL<TenantCompanyAddress>,
        })
      },

      /* Mutations */

      deleteById: (props: {
        id: TenantCompanyAddress['id']
        returning?: SelectedFieldsFlat
      }) =>
        tenantCompanyAddress
          .deleteById(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCompanyAddress>,

      insert: (props: {
        data: TenantCompanyAddressInsert
        returning?: SelectedFieldsFlat
      }) =>
        tenantCompanyAddress
          .insert(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCompanyAddress>,

      update: (props: {
        data: TenantCompanyAddressUpdate
        returning?: SelectedFieldsFlat
        where?: SelectProps<TenantCompanyAddress>['where']
      }) =>
        tenantCompanyAddress
          .update(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCompanyAddress>,

      updateById: (props: {
        id: TenantCompanyAddress['id']
        data: TenantCompanyAddressUpdate
        returning?: SelectedFieldsFlat
      }) =>
        tenantCompanyAddress
          .updateById(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCompanyAddress>,
    }
  }
}

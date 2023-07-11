import 'server-only'

import { SelectedFieldsFlat } from 'drizzle-orm/pg-core'

import { PostgresDatabase } from '@/database/pg/connection.pg'
import { tenantCompanyDb } from '@/features/tenant-companies/companies.tenant.db'

import { errorResponse } from '@/lib/utils-server-only'
import { SelectProps, SeverReturnType } from '@/database/pg/types.pg'
import {
  TenantCompany,
  TenantCompanyInsert,
} from '@/features/tenant-companies/companies.tenant.types'

export function tenantCompaniesService(db: PostgresDatabase) {
  return (tenantId: string) => {
    const tenantCompanies = tenantCompanyDb(db)(tenantId)

    return {
      schema: tenantCompanies.schema,

      /* Queries */
      select: (props: SelectProps<TenantCompany> = {}) =>
        tenantCompanies
          .select(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCompany>,

      selectById: (props: {
        id: TenantCompany['id']
        select?: Omit<SelectProps<TenantCompany>, 'where'>
      }) =>
        tenantCompanies
          .selectById(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCompany>,

      /* Mutations */

      // TODO: also delete users
      deleteById: (props: {
        id: TenantCompany['id']
        returning?: SelectedFieldsFlat
      }) =>
        tenantCompanies
          .deleteById(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCompany>,

      insert: (props: {
        data: TenantCompanyInsert
        returning?: SelectedFieldsFlat
      }) =>
        tenantCompanies
          .insert(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCompany>,

      updateById: <Update>(props: {
        id: TenantCompany['id']
        data: Update
        returning?: SelectedFieldsFlat
      }) =>
        tenantCompanies
          .updateById(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCompany>,
    }
  }
}

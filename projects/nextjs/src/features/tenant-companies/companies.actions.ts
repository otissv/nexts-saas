'use server'

import { AuthOptions, getServerSession } from 'next-auth'

import { serverContext } from '@/app/context-server-only'
import { ServerSession, authOptions } from '@/features/app-auth/auth.options'
import { authorize } from '@/lib/utils-server-only'
import { SeverReturnType, ActionProps } from '@/database/pg/types.pg'
import {
  TenantCompanyUpdate,
  TenantCompany,
  TenantCompanyInsert,
} from '@/features/tenant-companies/companies.tenant.types'
import { errorResponse } from '@/database/utils.db'

const { tenantCompaniesService } = serverContext()

/* Queries */

export async function selectTenantCompaniesAction(
  props: ActionProps<TenantCompany>,
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, ServerSession>(
    authOptions
  )

  const service = tenantCompaniesService(session?.user?.tenantId || '')

  return authorize(service.select)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCompany>
}

export async function selectTenantCompanyByIdAction(
  id: TenantCompany['id'],
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, ServerSession>(
    authOptions
  )
  const service = tenantCompaniesService(session?.user?.tenantId || '')

  return authorize(service.selectById)({ id }, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCompany>
}

/* Mutations */

export async function deleteUserByIdAction(
  id: TenantCompany['id'],
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, ServerSession>(
    authOptions
  )
  const service = tenantCompaniesService(session?.user?.tenantId || '')

  return authorize(service.deleteById)({ id }, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCompany>
}

export async function insertTenantCompanyAction(
  props: { data: TenantCompanyInsert },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, ServerSession>(
    authOptions
  )

  const service = tenantCompaniesService(session?.user?.tenantId || '')

  return authorize(service.insert)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCompany>
}

export async function updateTenantCompanyByIdAction(
  props: {
    id: TenantCompany['id']
    data: TenantCompanyUpdate
  },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, ServerSession>(
    authOptions
  )
  const service = tenantCompaniesService(session?.user?.tenantId || '')

  return authorize(service.updateById)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCompany>
}

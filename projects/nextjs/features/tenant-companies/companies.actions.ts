'use server'

import { AuthOptions, getServerSession } from 'next-auth'

import { serverContext } from '@/features/context-server-only'
import { authOptions } from '@/features/app-auth/auth.options'
import { AuthSession } from '@/features/app-auth/auth.types'
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
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)

  const service = tenantCompaniesService(session?.user?.tenantId as number)

  const where = props.where && {
    or: [
      { like: ['name', props.where] },
      { like: ['email', props.where] },
      { like: ['phone', props.where] },
      { like: ['website', props.where] },
    ],
  }

  return authorize(service.select)({ ...props, where }, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCompany>
}

export async function selectTenantCompanyAction(revalidatePath?: string) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = tenantCompaniesService(session?.user?.tenantId as number)

  return authorize(service.select)({}, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCompany>
}

export async function selectTenantCompanyByIdAction(
  id: TenantCompany['id'],
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = tenantCompaniesService(session?.user?.tenantId as number)

  return authorize(service.selectById)({ id }, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCompany>
}

/* Mutations */

export async function deleteTenantCompanyByIdAction(
  id: TenantCompany['id'],
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = tenantCompaniesService(session?.user?.tenantId as number)

  return authorize(service.deleteById)({ id }, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCompany>
}

export async function insertTenantCompanyAction(
  props: { data: TenantCompanyInsert },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)

  const service = tenantCompaniesService(session?.user?.tenantId as number)

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
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = tenantCompaniesService(session?.user?.tenantId as number)

  return authorize(service.updateById)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCompany>
}

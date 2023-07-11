'use server'

import { getServerSession, AuthOptions } from 'next-auth'

import { serverContext } from '@/app/context-server-only'
import { authorize, errorResponse } from '@/lib/utils-server-only'
import {
  TenantCompanyAddress,
  TenantCompanyAddressInsert,
  TenantCompanyAddressUpdate,
} from '@/features/tenant-company-addresses/company-addresses.tenant.types'
import { ServerSession, authOptions } from '@/features/app-auth/auth.options'
import { SeverReturnType, ActionProps } from '@/database/pg/types.pg'

const { tenantCompanyAddressService } = serverContext()

/* Queries */

export async function selectTenantCompanyAddressesByCompanyIdAction(
  companyId: TenantCompanyAddress['companyId'],
  props: ActionProps<TenantCompanyAddress>,
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, ServerSession>(
    authOptions
  )

  const service = tenantCompanyAddressService(session?.user?.tenantId || '')

  return authorize(service.selectByCompanyId)(
    { companyId, props },
    revalidatePath
  ).catch(errorResponse(422)) as SeverReturnType<TenantCompanyAddress>
}

export async function selectTenantCompanyAddressByIdAction(
  id: TenantCompanyAddress['id'],
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, ServerSession>(
    authOptions
  )

  const service = tenantCompanyAddressService(session?.user?.tenantId || '')

  return authorize(service.selectById)({ id }, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCompanyAddress>
}

/* Mutations */

export async function deleteTenantCompanyAddressByIdAction(
  id: TenantCompanyAddress['id'],
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, ServerSession>(
    authOptions
  )

  const service = tenantCompanyAddressService(session?.user?.tenantId || '')

  return authorize(service.deleteById)({ id }, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCompanyAddress>
}

export async function insertTenantCompanyAddressAction(
  props: { data: TenantCompanyAddressInsert },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, ServerSession>(
    authOptions
  )

  const service = tenantCompanyAddressService(session?.user?.tenantId || '')

  return authorize(service.insert)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCompanyAddress>
}

export async function updateTenantCompanyAddressByIdAction(
  props: {
    id: TenantCompanyAddress['id']
    data: TenantCompanyAddressUpdate
  },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, ServerSession>(
    authOptions
  )

  const service = tenantCompanyAddressService(session?.user?.tenantId || '')

  return authorize(service.updateById)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCompanyAddress>
}

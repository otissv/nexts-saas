'use server'

import { getServerSession, AuthOptions } from 'next-auth'

import { serverContext } from '@/features/context-server-only'
import { authorize } from '@/lib/utils-server-only'
import {
  TenantAddress,
  TenantAddressInsert,
  TenantAddressUpdate,
} from '@/features/tenant-addresses/addresses.tenant.types'
import { authOptions } from '@/features/app-auth/auth.options'
import { AuthSession } from '@/features/app-auth/auth.types'
import { SeverReturnType, ActionProps } from '@/database/pg/types.pg'
import { errorResponse } from '@/database/utils.db'

const { tenantAddressService } = serverContext()

/* Queries */

export async function selectTenantAddressesByCompanyIdAction(
  companyId: TenantAddress['companyId'],
  props: ActionProps<TenantAddress> = {},
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)

  if (!session?.user?.tenantId) return []

  const service = tenantAddressService(session?.user?.tenantId)

  return authorize(service.selectByCompanyId)(
    { companyId, props },
    revalidatePath
  ).catch(errorResponse(422)) as SeverReturnType<TenantAddress>
}

export async function selectTenantAddressByIdAction(
  id: TenantAddress['id'],
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)

  const service = tenantAddressService(session?.user?.tenantId as number)

  return authorize(service.selectById)({ id }, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantAddress>
}

/* Mutations */

export async function deleteTenantAddressByIdAction(
  id: TenantAddress['id'],
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)

  const service = tenantAddressService(session?.user?.tenantId as number)

  return authorize(service.deleteById)({ id }, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantAddress>
}

export async function insertTenantAddressAction(
  props: { data: TenantAddressInsert },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)

  const service = tenantAddressService(session?.user?.tenantId as number)

  return authorize(service.insert)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantAddress>
}

export async function updateTenantAddressByIdAction(
  props: {
    id: TenantAddress['id']
    data: TenantAddressUpdate
  },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)

  const service = tenantAddressService(session?.user?.tenantId as number)

  return authorize(service.updateById)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantAddress>
}

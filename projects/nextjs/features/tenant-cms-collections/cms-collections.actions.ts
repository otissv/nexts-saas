'use server'

import { AuthOptions, getServerSession } from 'next-auth'

import { serverContext } from '@/features/context-server-only'
import { authOptions } from '@/features/app-auth/auth.options'
import { AuthSession } from '@/features/app-auth/auth.types'
import { authorize } from '@/lib/utils-server-only'
import { SeverReturnType, ActionProps } from '@/database/pg/types.pg'
import {
  TenantCmsCollectionUpdate,
  TenantCmsCollection,
  TenantCmsCollectionInsert,
} from '@/features/tenant-cms-collections/cms-collections.tenant.types'
import { errorResponse } from '@/database/utils.db'

const { tenantCmsCollectionsService } = serverContext()

/* Queries */
export async function selectTenantCmsCollectionsAction(
  props?: ActionProps<TenantCmsCollection>,
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)

  const service = tenantCmsCollectionsService(session?.user?.tenantId as number)

  //   const where = props.where && {
  //     or: [
  //       { like: ['name', props.where] },
  //       { like: ['email', props.where] },
  //       { like: ['phone', props.where] },
  //       { like: ['website', props.where] },
  //     ],
  //   }

  return authorize(service.select)(props || {}, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCmsCollection>
}

export async function selectTenantCmsCollectionsByIdAction(
  props: {
    id: TenantCmsCollection['id']
    orderBy: ActionProps<TenantCmsCollection>['orderBy']
    limit: ActionProps<TenantCmsCollection>['limit']
  },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = tenantCmsCollectionsService(session?.user?.tenantId as number)

  return authorize(service.selectById)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCmsCollection>
}

export async function selectTenantCmsCollectionDocumentAction(
  props: ActionProps<TenantCmsCollection>,
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = tenantCmsCollectionsService(session?.user?.tenantId as number)

  return authorize(service.selectDocumentByTitle)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCmsCollection>
}
/* Mutations */

export async function deleteTenantCmsCollectionByIdAction(
  id: TenantCmsCollection['id'],
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = tenantCmsCollectionsService(session?.user?.tenantId as number)

  return authorize(service.deleteById)({ id }, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCmsCollection>
}

export async function insertTenantCmsCollectionAction(
  props: { data: TenantCmsCollectionInsert },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)

  const service = tenantCmsCollectionsService(session?.user?.tenantId as number)

  return authorize(service.insert)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCmsCollection>
}

export async function updateTenantCmsCollectionByIdAction(
  props: {
    id: TenantCmsCollection['id']
    data: TenantCmsCollectionUpdate
  },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = tenantCmsCollectionsService(session?.user?.tenantId as number)

  return authorize(service.updateById)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<TenantCmsCollection>
}

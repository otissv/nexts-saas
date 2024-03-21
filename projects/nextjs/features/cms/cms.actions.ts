'use server'

import { AuthOptions, getServerSession } from 'next-auth'

import { serverContext } from '@/features/context-server-only'
import { authOptions } from '@/features/app-auth/auth.options'
import { AuthSession } from '@/features/app-auth/auth.types'
import { authorize } from '@/lib/utils-server-only'
import { SeverReturnType, ActionProps } from '@/database/pg/types.pg'
import {
  CmsCollectionUpdate,
  CmsCollection,
  CmsCollectionInsert,
  CmsCollectionDocument,
  CmsCollectionColumn,
  CmsCollectionColumnUpdate,
  CmsCollectionColumnInsert,
} from '@/features/cms/cms.types'
import { errorResponse } from '@/database/utils.db'

const { cmsCollectionsService } = serverContext()

/* Queries */
export async function selectCmsCollectionsAction(
  props?: ActionProps<CmsCollection>,
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = cmsCollectionsService(session?.user?.tenantId as number)

  //   const where = props.where && {
  //     or: [
  //       { like: ['name', props.where] },
  //       { like: ['email', props.where] },
  //       { like: ['phone', props.where] },
  //       { like: ['website', props.where] },
  //     ],
  //   }

  return authorize(service.selectCollection)(props || {}, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<CmsCollection>
}

export async function selectCmsCollectionsDocumentsByDatasetIdAction(
  props: {
    datasetId: CmsCollection['datasetId']
    props?: ActionProps<CmsCollectionDocument>
  },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = cmsCollectionsService(session?.user?.tenantId as number)

  return authorize(service.selectDocumentsByDatasetId)(
    props,
    revalidatePath
  ).catch(errorResponse(422)) as SeverReturnType<CmsCollection>
}

export async function selectCmsCollectionDocumentAction(
  props: { id: CmsCollectionDocument['id']; title: string },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = cmsCollectionsService(session?.user?.tenantId as number)

  return authorize(service.selectOneDocumentByTitle)(
    props,
    revalidatePath
  ).catch(errorResponse(422)) as SeverReturnType<CmsCollection>
}
/* Mutations */

export async function deleteCmsCollectionByIdAction(
  id: CmsCollection['id'],
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = cmsCollectionsService(session?.user?.tenantId as number)

  return authorize(service.deleteCollectionById)({ id }, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<CmsCollection>
}

export async function insertCmsCollectionAction(
  props: { data: CmsCollectionInsert },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = cmsCollectionsService(session?.user?.tenantId as number)

  return authorize(service.insertCollection)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<CmsCollection>
}

export async function insertCmsColumnAction(
  props: {
    data: Omit<
      CmsCollectionColumnInsert,
      'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy' | 'userId'
    >
  },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = cmsCollectionsService(session?.user?.tenantId as number)

  const userId = session?.user?.userId

  return authorize(service.insertColumn)(
    {
      ...props,
      data: { ...props.data, userId },
      userId,
    },
    revalidatePath
  ).catch(errorResponse(422)) as SeverReturnType<CmsCollection>
}

export async function UpdateColumnByDatasetIdAction(
  props: {
    fieldId: CmsCollectionColumn['fieldId']
    datasetId: CmsCollectionColumn['datasetId']
    data: CmsCollectionColumnUpdate
    columns?: ActionProps<CmsCollectionColumn>['columns']
    where?: ActionProps<CmsCollectionColumn>['where']
  },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = cmsCollectionsService(session?.user?.tenantId as number)
  const columns = props.columns || []

  return authorize(service.UpdateColumnByDatasetId)(
    {
      ...props,
      userId: session?.user?.userId,
      columns: ['datasetId', ...columns],
    },

    revalidatePath
  ).catch(errorResponse(422)) as SeverReturnType<CmsCollection>
}

export async function updateCollectionByDatasetIdAction(
  props: {
    datasetId: CmsCollection['datasetId']
    data: CmsCollectionUpdate
    columns?: ActionProps<CmsCollection>['columns']
  },
  revalidatePath?: string
) {
  const session = await getServerSession<AuthOptions, AuthSession>(authOptions)
  const service = cmsCollectionsService(session?.user?.tenantId as number)
  const columns = props.columns || []

  return authorize(service.updateCollectionByDatasetId)(
    {
      ...props,
      userId: session?.user?.userId,
      columns: ['datasetId', ...columns],
    },

    revalidatePath
  ).catch(errorResponse(422)) as SeverReturnType<CmsCollection>
}

'use client'

import * as React from 'react'
import { Maybe } from '@/components/maybe'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

import { TenantCompany } from '@/features/tenant-companies/companies.tenant.types'
import { AppLink } from '@/components/app-link'
import { EditButton } from '@/components/buttons/edit-button'
import { DeleteButton } from '@/components/buttons/delete-button'
import { useTranslateClient } from '@/components/translate/translate-client'
import { SortOrderDropdown } from '@/components/sort-order-dropdown'
import { SeverReturnType, PageInfo } from '@/database/pg/types.pg'
import { entriesToArray } from '@/lib/entries'
import { useMap } from '@/hooks/useMap'

export interface TenantCompaniesProps {
  data: Partial<TenantCompany>[]
  baseUrl: string
  onDelete: (id: number) => SeverReturnType<TenantCompany>
  limit?: PageInfo<TenantCompany>['limit']
  orderBy?: PageInfo<TenantCompany>['orderBy']
  page?: PageInfo<TenantCompany>['page']
  where?: PageInfo<TenantCompany>['where']
  total?: number
}

export function TenantCompaniesTable({
  data,
  baseUrl,
  where,
  limit,
  page,
  orderBy = [],
  total,
  onDelete,
}: TenantCompaniesProps) {
  const [tenantCompanies, setTenantCompanies] = useMap(data)
  const t = useTranslateClient('ui.pages')
  const [isPending, startTransition] = React.useTransition()

  const handleDelete = (id: number) => async () => {
    const result = await onDelete(id).then(({ error }) => !error)

    if (result) {
      // console.log(new Map(users.entries()))
    }
    return result
  }

  const orderByDep = orderBy?.flat().toString()

  React.useEffect(() => {
    setTenantCompanies(data)
  }, [limit, where, orderByDep, page])

  const rows = ({ id, name, email }: TenantCompany) => {
    return (
      <TableRow key={id}>
        <TableCell className="min-h-14  text-base p-0">
          <AppLink
            href={`${baseUrl}/${id}`}
            className="flex items-center p-3 text-default"
          >
            {id}{' '}
          </AppLink>
        </TableCell>

        <TableCell className="min-h-14  text-base p-0">
          <AppLink
            href={`${baseUrl}/${id}`}
            className="flex items-center p-3 text-default"
          >
            {name}
          </AppLink>
        </TableCell>

        <TableCell className="min-h-14  text-base p-0">
          <AppLink
            href={`${baseUrl}/${id}`}
            className="flex items-center p-3 text-default"
          >
            {email}
          </AppLink>
        </TableCell>

        <TableCell className="min-h-14 text-base p-3 flex items-center justify-end">
          <EditButton
            href={`${baseUrl}/${id}`}
            variant="ghost"
            className="mr-2 p-2 hover:bg-foreground hover:text-gray-950 h-9 w-9"
          />
          <DeleteButton
            title={t('user.notifications.delete.alert.title')}
            description={t('user.notifications.delete.alert.description')}
            cancel={t('user.notifications.delete.alert.buttons.cancel')}
            ok={t('user.notifications.delete.alert.buttons.ok')}
            onAction={handleDelete(id as number)}
            variant="ghost"
            className="hover:bg-destructive h-9 w-9 hover:text-default"
            error={{
              description: '',
              title: '',
            }}
            success={{
              description: '',
              title: '',
            }}
          />
        </TableCell>
      </TableRow>
    )
  }

  return (
    <Maybe check={Boolean(tenantCompanies)}>
      <Table>
        {total ? (
          <TableCaption>
            {tenantCompanies.size} of {total} {t('tenantCompanies.heading')}
          </TableCaption>
        ) : (
          <TableCaption>{t('table.caption')}</TableCaption>
        )}

        <TableHeader>
          <TableRow className="hover:bg-transparent mb-4">
            <TableHead className="w-[100px] pl-0">
              <SortOrderDropdown
                name="id"
                isPending={isPending}
                startTransition={startTransition}
              >
                {t('tenantCompanies.table.headings.id.content')}
              </SortOrderDropdown>
            </TableHead>

            <TableHead className=" pl-0">
              <SortOrderDropdown
                name="name"
                isPending={isPending}
                startTransition={startTransition}
              >
                {t('tenantCompanies.table.headings.name.content')}
              </SortOrderDropdown>
            </TableHead>

            <TableHead className=" pl-0">
              <SortOrderDropdown
                name="name"
                isPending={isPending}
                startTransition={startTransition}
              >
                {t('tenantCompanies.table.headings.email.content')}
              </SortOrderDropdown>
            </TableHead>

            <TableHead className="pl-0 text-right text-base">
              {t('users.table.headings.action.content')}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>{entriesToArray(rows)(tenantCompanies)}</TableBody>
      </Table>
    </Maybe>
  )
}

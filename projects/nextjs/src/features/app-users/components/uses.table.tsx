'use client'

import * as React from 'react'
import { Maybe } from '@/components/maybe'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

import { User } from '@/features/app-users/users.types'
import { AppLink } from '@/components/app-link'
import { DeleteButton, EditButton } from '@/components/buttons'
import { useTranslate } from '@/components/translate-client'
import { SortOrderDropdown } from '@/components/sort-order-dropdown'
import { SeverReturnType, PageInfo } from '@/database/pg/types.pg'
import { entriesToArray } from '@/lib/entries'
import { useMap } from '@/hooks/useMap'

export interface UsersTableProps {
  data: Partial<User>[]
  baseUrl: string
  onDelete: (id: number) => SeverReturnType<User>
  limit?: PageInfo<User>['limit']
  orderBy?: PageInfo<User>['orderBy']
  page?: PageInfo<User>['page']
  where?: PageInfo<User>['where']
  total?: number
}

export function UsersTable({
  data,
  baseUrl,
  where,
  limit,
  page,
  orderBy = [],
  total,
  onDelete,
}: UsersTableProps) {
  const [users, setUsers] = useMap(data)
  const t = useTranslate('ui.pages')
  const [isPending, startTransition] = React.useTransition()

  const handleDelete = (id: number) => async () => {
    const result = await onDelete(id).then(({ error }) => !error)

    if (result) {
      // console.log(new Map(users.entries()))
    }
    return result
  }

  React.useEffect(() => {
    setUsers(data)
  }, [limit, where, orderBy?.flat().toString(), page])

  const rows = ({ id, firstName, lastName, imageUrl, email }: User) => {
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

        <TableCell className="min-h-14 text-base p-0">
          <AppLink
            href={`${baseUrl}/${id}`}
            className="flex items-center p-3 text-default"
          >
            <Avatar className="inline-block mr-4">
              <AvatarImage src={imageUrl} alt={`${firstName}, ${lastName}`} />
              <AvatarFallback>
                {firstName?.charAt(0)} {lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span>
              {firstName} {lastName}
            </span>
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

        <TableCell className="min-h-14  text-base p-3 flex items-center justify-end">
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

  //TODO: translate
  return (
    <Maybe check={Boolean(users)}>
      <Table>
        {total ? (
          <TableCaption>
            {users.size} of {total} {t('users.breadcrumb')}
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
                {t('users.table.headings.id.content')}
              </SortOrderDropdown>
            </TableHead>
            <TableHead className="pl-0">
              <SortOrderDropdown
                name="name"
                isPending={isPending}
                startTransition={startTransition}
              >
                {t('users.table.headings.name.content')}
              </SortOrderDropdown>
            </TableHead>
            <TableHead className="pl-0">
              <SortOrderDropdown
                name="email"
                isPending={isPending}
                startTransition={startTransition}
              >
                {t('users.table.headings.email.content')}
              </SortOrderDropdown>
            </TableHead>
            <TableHead className="pl-0 text-right text-base">
              {t('users.table.headings.action.content')}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>{entriesToArray(rows)(users)}</TableBody>
      </Table>
    </Maybe>
  )
}

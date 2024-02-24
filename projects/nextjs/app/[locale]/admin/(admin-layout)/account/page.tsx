/**
 * User Page
 */

import * as React from 'react'
import { isDev } from 'c-ufunc/libs/isDev'

import { translateServer } from '@/components/translate/translate-server'
import {
  deleteUserByIdAction,
  selectUserByIdAction,
} from '@/features/app-users/users.actions'
import { TypographyH2 } from '@/components/typography/h2.typography'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/divider'
import { DeleteButton } from '@/components/buttons/delete-button'
import { getHeaders } from '@/lib/getHeaders'
import { UserForm } from '@/features/app-users/components/user-form'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/features/app-auth/auth.options'
import { AuthSession } from '@/features/app-auth/auth.types'

export default async function AccountPage() {
  const session: AuthSession = await getServerSession(authOptions)

  const userId = session?.user?.userId

  const { data } = await selectUserByIdAction({ id: userId as number })

  const t = await translateServer('ui')

  const breadcrumbs = [
    { label: t('pages.admin.breadcrumb.label'), crumb: 'admin' },
    { label: t('pages.user.breadcrumb.label') },
  ]

  const user = data[0]

  const fullName = user
    ? `${data[0]?.firstName} ${data[0]?.lastName}`
    : t('pages.user.heading')

  const handleDelete = async () => {
    'use server'

    const { pathname } = getHeaders()
    const { error } = await deleteUserByIdAction(id, pathname)

    if (error && isDev()) console.error(error)
    return !error
  }

  return (
    <React.Fragment>
      <UserForm name="users" data={data} />

      <TypographyH2>Change Password</TypographyH2>

      <Divider />

      {/* TODO: if credentials */}
      <Input placeholder="Old Password" />
      <Input placeholder="New Password" />
      <Input placeholder="Conform password" />
      <Button>Change password</Button>

      <Divider className="mt-8 mb-6" />

      <DeleteButton
        cancel={t('pages.user.notifications.delete.alert.buttons.cancel')}
        description={t('pages.user.notifications.delete.alert.description')}
        ok={t('pages.user.notifications.delete.alert.buttons.ok')}
        title={t('pages.user.notifications.delete.alert.title')}
        onAction={handleDelete}
        error={{
          title: t('pages.user.notifications.save.error.title'),
          description: t('pages.user.notifications.save.error.description'),
        }}
        success={{
          title: t('pages.user.notifications.delete.success.title'),
          description: t('pages.user.notifications.delete.success.description'),
        }}
      >
        {t('page.toolbar.delete.content')}
      </DeleteButton>
    </React.Fragment>
  )
}

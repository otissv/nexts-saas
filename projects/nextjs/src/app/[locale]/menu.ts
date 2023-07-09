import { translateServer } from '@/components/translate-server'

export type MenuItem = {
  id: number
  label: string
  href: string
}

export async function menu() {
  const t = await translateServer('ui.sidebar')
  return [
    {
      id: 1,
      label: t('page.a.content'),
      href: '/admin/pages',
    },
    {
      id: 2,
      label: t('company.a.content'),
      href: '/admin/companies',
    },
    {
      id: 4,
      label: t('addresses.a.content'),
      href: '/admin/companies/addresses',
    },
    {
      id: 5,
      label: t('users.a.content'),
      href: '/admin/users',
    },
    {
      id: 6,
      label: t('menu.a.content'),
      href: '/admin/menu',
    },
    {
      id: 7,
      label: t('media.a.content'),
      href: '/admin/media',
    },
    {
      id: 8,
      label: t('team.a.content'),
      href: '/admin/team',
    },
  ]
}

import { translateServer } from '@/components/translate/translate-server'

export async function menu() {
  const t = await translateServer('ui.menu.admin')

  return [
    {
      id: 'pages',
      label: t('page.content'),
      href: '/admin/pages',
    },
    {
      id: 'companies',
      label: t('company.content'),
      href: '/admin/companies',
    },
    {
      id: 'addresses',
      label: t('addresses.content'),
      href: '/admin/companies/addresses',
    },
    {
      id: 'users',
      label: t('users.content'),
      href: '/admin/users',
    },
    {
      id: 'menu',
      label: t('menu.content'),
      href: '/admin/menu',
    },
    {
      id: 'media',
      label: t('media.content'),
      href: '/admin/media',
    },
    {
      id: 'team',
      label: t('team.content'),
      href: '/admin/team',
    },
  ]
}

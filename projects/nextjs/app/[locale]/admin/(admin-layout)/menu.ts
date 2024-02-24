import { translateServer } from '@/components/translate/translate-server'

export async function menu() {
  const t = await translateServer('ui.menu.admin')

  return [
    {
      id: 'pages',
      label: 'Pages',
      href: '/admin/pages',
    },
    {
      id: 'cms',
      label: 'CMS',
      href: '/admin/cms',
    },
    {
      id: 'company',
      label: 'Company',
      href: '/admin/company',
    },
    {
      id: 'account',
      label: 'Account',
      href: '/admin/account',
    },
    {
      id: 'menu',
      label: t('menu.content'),
      href: '/admin/menu',
    },
    // {
    //   id: 'media',
    //   label: t('media.content'),
    //   href: '/admin/media',
    // },
    // {
    //   id: 'team',
    //   label: t('team.content'),
    //   href: '/admin/team',
    // },
  ]
}

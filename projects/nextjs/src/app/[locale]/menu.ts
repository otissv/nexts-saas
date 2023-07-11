import { translateServer } from '@/components/translate-server'

export type MenuItem = {
  id: number
  label: string
  href: string
}

export async function menu() {
  const t = await translateServer('ui.menu')

  return {
    marketing: [
      {
        id: 1,
        label: t('loggedOut.about.a.content'),
        href: '/about',
      },
      {
        id: 2,
        label: t('loggedOut.contact.a.content'),
        href: '/contact',
      },
      {
        id: 3,
        label: t('loggedOut.pricing.a.content'),
        href: '/pricing',
      },
      {
        id: 4,
        label: t('loggedOut.pricing.a.content'),
        href: '/pricing',
      },
      {
        id: 5,
        label: t('loggedOut.blog.a.content'),
        href: '/blog',
      },
    ],
    admin: [
      {
        id: 1,
        label: t('loggedIn.page.a.content'),
        href: '/admin/pages',
      },
      {
        id: 2,
        label: t('loggedIn.company.a.content'),
        href: '/admin/companies',
      },
      {
        id: 4,
        label: t('loggedIn.addresses.a.content'),
        href: '/admin/companies/addresses',
      },
      {
        id: 5,
        label: t('loggedIn.users.a.content'),
        href: '/admin/users',
      },
      {
        id: 6,
        label: t('loggedIn.menu.a.content'),
        href: '/admin/menu',
      },
      {
        id: 7,
        label: t('loggedIn.media.a.content'),
        href: '/admin/media',
      },
      {
        id: 8,
        label: t('loggedIn.team.a.content'),
        href: '/admin/team',
      },
    ],
  }
}

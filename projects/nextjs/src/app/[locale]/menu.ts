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
        label: t('marketing.about.a.content'),
        href: '/about',
      },
      {
        id: 2,
        label: t('marketing.contact.a.content'),
        href: '/contact',
      },
      {
        id: 3,
        label: t('marketing.pricing.a.content'),
        href: '/pricing',
      },
      {
        id: 4,
        label: t('marketing.pricing.a.content'),
        href: '/pricing',
      },
      {
        id: 5,
        label: t('marketing.blog.a.content'),
        href: '/blog',
      },
    ],
    admin: [
      {
        id: 1,
        label: t('admin.page.a.content'),
        href: '/admin/pages',
      },
      {
        id: 2,
        label: t('admin.company.a.content'),
        href: '/admin/companies',
      },
      {
        id: 4,
        label: t('admin.addresses.a.content'),
        href: '/admin/companies/addresses',
      },
      {
        id: 5,
        label: t('admin.users.a.content'),
        href: '/admin/users',
      },
      {
        id: 6,
        label: t('admin.menu.a.content'),
        href: '/admin/menu',
      },
      {
        id: 7,
        label: t('admin.media.a.content'),
        href: '/admin/media',
      },
      {
        id: 8,
        label: t('admin.team.a.content'),
        href: '/admin/team',
      },
    ],
  }
}

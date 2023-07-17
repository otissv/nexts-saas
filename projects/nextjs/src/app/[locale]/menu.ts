import { translateServer } from '@/components/translate/translate-server'

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
        label: t('marketing.about.content'),
        href: '/about',
      },
      {
        id: 2,
        label: t('marketing.contact.content'),
        href: '/contact',
      },
      {
        id: 3,
        label: t('marketing.pricing.content'),
        href: '/pricing',
      },
      {
        id: 4,
        label: t('marketing.pricing.content'),
        href: '/pricing',
      },
      {
        id: 5,
        label: t('marketing.blog.content'),
        href: '/blog',
      },
    ],
    admin: [
      {
        id: 1,
        label: t('admin.page.content'),
        href: '/admin/pages',
      },
      {
        id: 2,
        label: t('admin.company.content'),
        href: '/admin/companies',
      },
      {
        id: 4,
        label: t('admin.addresses.content'),
        href: '/admin/companies/addresses',
      },
      {
        id: 5,
        label: t('admin.users.content'),
        href: '/admin/users',
      },
      {
        id: 6,
        label: t('admin.menu.content'),
        href: '/admin/menu',
      },
      {
        id: 7,
        label: t('admin.media.content'),
        href: '/admin/media',
      },
      {
        id: 8,
        label: t('admin.team.content'),
        href: '/admin/team',
      },
    ],
  }
}

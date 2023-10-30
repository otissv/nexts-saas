import { translateServer } from '@/components/translate/translate-server'
import { serverContext } from '@/app/context-server-only'

export async function menu() {
  const locale = serverContext().localeService.get()
  const t = await translateServer(locale, 'ui.menu')

  return {
    marketing: [
      {
        id: 'about',
        label: t('marketing.about.content'),
        href: '/about',
      },
      {
        id: 'contact',
        label: t('marketing.contact.content'),
        href: '/contact',
      },
      {
        id: 'pricing',
        label: t('marketing.pricing.content'),
        href: '/pricing',
      },
      {
        id: 'blog',
        label: t('marketing.blog.content'),
        href: '/blog',
      },
      {
        id: 'admin',
        label: t('marketing.admin.content'),
        href: '/admin',
      },
    ],
    admin: [
      {
        id: 'pages',
        label: t('admin.page.content'),
        href: '/admin/pages',
      },
      {
        id: 'companies',
        label: t('admin.company.content'),
        href: '/admin/companies',
      },
      {
        id: 'addresses',
        label: t('admin.addresses.content'),
        href: '/admin/companies/addresses',
      },
      {
        id: 'users',
        label: t('admin.users.content'),
        href: '/admin/users',
      },
      {
        id: 'menu',
        label: t('admin.menu.content'),
        href: '/admin/menu',
      },
      {
        id: 'media',
        label: t('admin.media.content'),
        href: '/admin/media',
      },
      {
        id: 'team',
        label: t('admin.team.content'),
        href: '/admin/team',
      },
    ],
  }
}

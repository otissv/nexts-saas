import { translateServer } from '@/components/translate/translate-server'
import { serverContext } from '@/features/context-server-only'

export async function menu() {
  const t = await translateServer(locale, 'ui.menu')

  return {
    marketing: [
      {
        id: 'about',
        label: 'About Us',
        href: '/about',
      },
      {
        id: 'contact',
        label: 'Contact',
        href: '/contact',
      },
      {
        id: 'pricing',
        label: 'Pricing',
        href: '/pricing',
      },
      {
        id: 'blog',
        label: 'Blog',
        href: '/blog',
      },
      {
        id: 'admin',
        label: 'Admin',
        href: '/admin',
      },
    ],
    admin: [
      {
        id: 'pages',
        label: 'Pages',
        href: '/admin/pages',
      },
      {
        id: 'company',
        label: 'Companies',
        href: '/admin/companies',
      },
      {
        id: 'address',
        label: 'address',
        href: '/admin/company/address',
      },
      {
        id: 'account',
        label: 'account',
        href: '/admin/account',
      },
      {
        id: 'menu',
        label: 'menu',
        href: '/admin/menu',
      },
      {
        id: 'media',
        label: 'media',
        href: '/admin/media',
      },
      {
        id: 'team',
        label: 'team',
        href: '/admin/team',
      },
    ],
  }
}

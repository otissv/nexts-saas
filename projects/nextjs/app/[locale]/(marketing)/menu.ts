import { translateServer } from '@/components/translate/translate-server'

export async function menu() {
  const t = await translateServer('ui.menu.marketing')

  return [
    {
      id: 'about',
      label: 'About',
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
  ]
}

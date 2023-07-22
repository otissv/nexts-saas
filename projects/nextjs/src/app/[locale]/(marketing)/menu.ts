import { translateServer } from 'components/translate/translate-server'

export async function menu() {
  const t = await translateServer('ui.menu.marketing')

  return [
    {
      id: 'about',
      label: t('about.content'),
      href: '/about',
    },
    {
      id: 'contact',
      label: t('contact.content'),
      href: '/contact',
    },
    {
      id: 'pricing',
      label: t('pricing.content'),
      href: '/pricing',
    },
    {
      id: 'blog',
      label: t('blog.content'),
      href: '/blog',
    },
    {
      id: 'admin',
      label: t('admin.content'),
      href: '/admin',
    },
  ]
}

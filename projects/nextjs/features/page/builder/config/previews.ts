import { Component } from '@/features/page/store/page.store'

export const previews: Record<string, Omit<Component, 'id'>[]> = {
  layout: [
    {
      type: 'row',
      component: 'row',
      props: {},
    },
    {
      type: 'component',
      component: 'component',
      props: {},
    },
  ],
  basic: [
    {
      type: 'component',
      component: 'p',
      props: {
        content: {
          children:
            'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
        },
      },
    },
    {
      type: 'component',
      component: 'h1',
      props: {
        as: 'h1',
        content: {
          children: 'Heading 1',
        },
      },
    },
    {
      type: 'component',
      component: 'h2',
      props: {
        as: 'h2',
        content: {
          children: 'Heading 2',
        },
      },
    },
    {
      type: 'component',
      component: 'h3',
      props: {
        as: 'h3',
        content: {
          children: 'Heading 3',
        },
      },
    },
    {
      type: 'component',
      component: 'h4',
      props: {
        as: 'h4',
        content: {
          children: 'Heading 4',
        },
      },
    },
    {
      type: 'component',
      component: 'code',
      props: {
        as: 'code',
        content: {
          children: "<code>consol.log('Hello, World!)</code>",
        },
      },
    },
    {
      type: 'component',
      component: 'blockquote',
      props: {
        as: 'blockquote',
        content: {
          children: 'Sed aperiam aut nihil. Eos culpa fugiat',
        },
      },
    },
  ],

  heros: [
    {
      type: 'component',
      component: 'hero1',
      props: {
        className: 'p-10',
        image: {
          src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          alt: 'beach',
          width: '600',
          height: '600',
        },
        heading: {
          children: 'About Heading',
        },
        content: {
          children:
            'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
        },
        cta: {
          children: 'call to action',
        },
      },
    },
  ],

  navigation: [
    {
      type: 'component',
      component: 'navbar1',
      props: {
        items: [
          {
            id: 'home',
            label: 'Home',
            href: '/home',
          },
          {
            id: 'products',
            label: 'Products',
            href: '/products',
          },
          ,
          {
            id: 'services',
            label: 'Services',
            href: '/services',
          },
          ,
          {
            id: 'about',
            label: 'About',
            href: '/about',
          },
          ,
          {
            id: 'contact',
            label: 'Contact',
            href: '/contact',
          },
        ],
      },
    },
  ],

  section: [
    {
      type: 'component',
      component: 'section',
      props: {
        heading: {
          children: 'Section Heading',
        },
        content: {
          children:
            'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
        },
      },
    },
  ],
}

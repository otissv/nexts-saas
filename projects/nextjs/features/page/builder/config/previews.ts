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
        heading: {
          children: 'Heading',
        },
        lead: {
          children:
            'Numquam consequatur nihil quo quae accusamus in dolores maiores.',
        },
        cta: {
          children: 'CTA',
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

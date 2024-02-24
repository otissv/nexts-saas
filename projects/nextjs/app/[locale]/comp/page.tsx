import React from 'react'

import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

import { LayoutItem } from '@/features/page/store/page.store'
import { uid } from 'uid'

export const components = {
  section: require('../../../features/page/builder/components/sections/section')
    .default,
  section01:
    require('../../../features/page/builder/components/sections/section01')
      .default,
  section02:
    require('../../../features/page/builder/components/sections/section02')
      .default,
  section03:
    require('../../../features/page/builder/components/sections/section03')
      .default,
  scrollable:
    require('../../../features/page/builder/components/sections/scrollable')
      .default,
  slider: require('../../../features/page/builder/components/sections/slider')
    .default,

  typography: require('../../../features/page/builder/components/text').default,
  blockquote: require('../../../features/page/builder/components/text').default,
  code: require('../../../features/page/builder/components/text').default,
  h1: require('../../../features/page/builder/components/text').default,
  h2: require('../../../features/page/builder/components/text').default,
  h3: require('../../../features/page/builder/components/text').default,
  h4: require('../../../features/page/builder/components/text').default,
  p: require('../../../features/page/builder/components/text').default,
  navbar1: require('../../../features/page/builder/components/navbar').default,
  row: (props: any) => <div {...props} />,
  column: (props: any) => <div {...props} />,
  // row: require('@/features/page/builder/components/blocks').RowBlock,
  // column: require('../../../features/page/builder/components/blocks')
  //   .ColumnBlock,
} as const

const ReadMore = () => {
  return (
    <>
      Read more <ChevronRight className="inline-flex ml-1" />
    </>
  )
}

const homeSections = [
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              footer: {
                links: [
                  {
                    className: 'w-auto inline-block',
                    children: 'Learn more',
                    href: '/#',
                    variant: 'button',
                  },
                ],
                contents: [
                  {
                    children: 'Some cta text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              footer: {
                links: [
                  {
                    className: 'w-auto inline-block',
                    children: 'Learn more',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'oSed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              footer: {
                links: [
                  {
                    className: 'w-auto inline-block',
                    children: 'Learn more',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              footer: {
                links: [
                  {
                    className: 'w-auto inline-block',
                    children: 'Learn more',
                    href: '/#',
                    variant: 'button',
                  },
                ],
                contents: [
                  {
                    children: 'Some cta text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section01',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              form: {
                button: {
                  children: 'Subscribe',
                },
                input: {
                  placeholder: 'Email',
                },
                contents: [
                  {
                    id: uid(),
                    children: 'Some form text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section01',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              form: {
                button: {
                  children: 'Subscribe',
                },
                input: {
                  placeholder: 'Email',
                },
                contents: [
                  {
                    children: 'Some form text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              footer: {
                links: [
                  {
                    children: 'Learn more',
                    href: '/#',
                  },
                  {
                    children: 'Contact',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              footer: {
                links: [
                  {
                    children: 'Learn more',
                    href: '/#',
                  },
                  {
                    children: 'Contact',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                cols: 2,
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                cols: 2,
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                items: [...Array(2)].map(() => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                items: [...Array(2)].map(() => ({
                  id: uid(),

                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },

              list: {
                cols: 2,
                className: '!mt-8 md:grid-cols-2 md:grid-flow-row',
                items: [...Array(4)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Est facere totam. At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },

              list: {
                cols: 2,
                className: '!mt-8 md:grid-cols-2 md:grid-flow-row',
                items: [...Array(4)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Est facere totam. At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },

              list: {
                className: '!mt-8',
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },

              list: {
                className: '!mt-8',
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },

              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                className: '!mt-8',
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },

              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                className: '!mt-8',
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              list: {
                className: '!mt-8',
                cols: 2,
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              list: {
                className: '!mt-8',
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Features ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              list: {
                className: '!mt-8',
                items: [...Array(4)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Est facere totam. At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              list: {
                className: '!mt-8',
                items: [...Array(4)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Est facere totam. At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
]

const imageSections = [
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              footer: {
                links: [
                  {
                    className: 'w-auto inline-block',
                    children: 'Learn more',
                    href: '/#',
                    variant: 'button',
                  },
                ],
                contents: [
                  {
                    children: 'Some cta text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              footer: {
                links: [
                  {
                    className: 'w-auto inline-block',
                    children: 'Learn more',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'oSed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              footer: {
                links: [
                  {
                    className: 'w-auto inline-block',
                    children: 'Learn more',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              footer: {
                links: [
                  {
                    className: 'w-auto inline-block',
                    children: 'Learn more',
                    href: '/#',
                    variant: 'button',
                  },
                ],
                contents: [
                  {
                    children: 'Some cta text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section01',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              form: {
                button: {
                  children: 'Subscribe',
                },
                input: {
                  placeholder: 'Email',
                },
                contents: [
                  {
                    id: uid(),
                    children: 'Some form text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section01',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              form: {
                button: {
                  children: 'Subscribe',
                },
                input: {
                  placeholder: 'Email',
                },
                contents: [
                  {
                    children: 'Some form text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              footer: {
                links: [
                  {
                    children: 'Learn more',
                    href: '/#',
                  },
                  {
                    children: 'Contact',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              footer: {
                links: [
                  {
                    children: 'Learn more',
                    href: '/#',
                  },
                  {
                    children: 'Contact',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                cols: 2,
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                cols: 2,
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                items: [...Array(2)].map(() => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                items: [...Array(2)].map(() => ({
                  id: uid(),

                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },

              list: {
                cols: 2,
                className: '!mt-8 md:grid-cols-2 md:grid-flow-row',
                items: [...Array(4)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Est facere totam. At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },

              list: {
                cols: 2,
                className: '!mt-8 md:grid-cols-2 md:grid-flow-row',
                items: [...Array(4)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Est facere totam. At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },

              list: {
                className: '!mt-8',
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },

              list: {
                className: '!mt-8',
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },

              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                className: '!mt-8',
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },

              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                className: '!mt-8',
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              list: {
                className: '!mt-8',
                cols: 2,
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              list: {
                className: '!mt-8',
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Features ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              list: {
                className: '!mt-8',
                items: [...Array(4)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Est facere totam. At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              className: 'flex-row-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
              },
              list: {
                className: '!mt-8',
                items: [...Array(4)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Est facere totam. At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
]

const textSections = [
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  className: '!mb-8',
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
            },
          },
        ],
      },
    ],
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              footer: {
                links: [
                  {
                    id: uid(),
                    className: 'w-auto inline-block !mb-8',
                    children: 'Learn more',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              footer: {
                className: '!mb-8',
                links: [
                  {
                    id: uid(),
                    className: 'w-auto inline-block',
                    children: 'Learn more',
                    href: '/#',
                    variant: 'button',
                  },
                ],
                contents: [
                  {
                    id: uid(),
                    children: 'Some cta text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section01',
            props: {
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              form: {
                className: 'mb-8',
                button: {
                  children: 'Subscribe',
                },
                input: {
                  placeholder: 'Email',
                },
                contents: [
                  {
                    id: uid(),
                    children: 'Some form text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              footer: {
                className: 'mb-8',
                links: [
                  {
                    id: uid(),
                    children: 'Action',
                    href: '/#',
                  },
                  {
                    id: uid(),
                    children: 'Action',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              list: {
                className: 'mb-8',
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              list: {
                cols: 2,
                className: 'mb-8',
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              list: {
                col: 2,
                className: 'mb-8',
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              list: {
                cols: 2,
                className: 'mb-8',
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                cols: 2,
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },

              list: {
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },

              list: {
                cols: 3,
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              contents: [
                {
                  id: uid(),
                  className: '!mt-8',
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              contents: [
                {
                  id: uid(),
                  className: '!mt-8',
                  children:
                    'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                },
              ],
              list: {
                cols: 2,
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              list: {
                className: '!mt-8 mb-8',
                items: [...Array(4)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section03',
            props: {
              list: {
                cols: 2,
                className: '!mt-8 mb-8',
                items: [...Array(4)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              list: {
                cols: 2,
                items: [...Array(2)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              list: {
                cols: 3,
                items: [...Array(3)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              list: {
                cols: 4,
                items: [...Array(4)].map((_, index: number) => ({
                  id: uid(),
                  contents: [
                    {
                      id: uid(),
                      children:
                        'At vero eos et accusamus et iusto odio dignissimos.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              list: {
                cols: 2,
                items: [...Array(4)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      className: 'w-[300px]',
                      children:
                        'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              list: {
                items: [...Array(4)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  contents: [
                    {
                      id: uid(),
                      className: 'w-[300px]',
                      children:
                        'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              className: 'justify-center',
              list: {
                className: '!mt-8 mb-8 center',
                items: [...Array(4)].map((_, index: number) => ({
                  id: uid(),
                  heading: {
                    children: `Feature ${index + 1}`,
                  },
                  links: [
                    {
                      id: uid(),
                      children: 'Read more',
                      href: '/#',
                    },
                  ],
                  contents: [
                    {
                      id: uid(),
                      className: 'w-[300px]',
                      children:
                        'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam.',
                    },
                  ],
                })),
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
]

const centerSections = [
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center',
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  className: '!mb-8',
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center',
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              footer: {
                links: [
                  {
                    id: uid(),
                    className: 'w-auto inline-block !mb-8',
                    children: 'Learn more',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center',
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              footer: {
                className: '!mb-8',
                links: [
                  {
                    id: uid(),
                    className: 'w-auto inline-block',
                    children: 'Learn more',
                    href: '/#',
                    variant: 'button',
                  },
                ],
                contents: [
                  {
                    id: uid(),
                    children: 'Some cta text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section01',
            props: {
              className: 'text-center',
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              form: {
                className: 'mb-8 mx-auto',
                button: {
                  children: 'Subscribe',
                },
                input: {
                  placeholder: 'Email',
                },
                contents: [
                  {
                    id: uid(),
                    children: 'Some form text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center',
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              footer: {
                className: 'mb-8',
                links: [
                  {
                    id: uid(),
                    children: 'Action',
                    href: '/#',
                  },
                  {
                    id: uid(),
                    children: 'Action',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center justify-around',
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              footer: {
                className: 'mb-8',
                links: [
                  {
                    id: uid(),
                    children: 'Action',
                    href: '/#',
                    variant: 'button',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center justify-around',
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              footer: {
                links: [
                  {
                    id: uid(),
                    className: 'w-auto inline-block !mb-8',
                    children: 'Learn more',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
]

const centerImageSections = [
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center items-center flex-col',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  className: '!mb-8',
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center  items-center flex-col flex-col-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  className: '!mb-8',
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center items-center flex-col',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '600',
                height: '600',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              footer: {
                links: [
                  {
                    id: uid(),
                    className: 'w-auto inline-block !mb-8',
                    children: 'Learn more',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center items-center flex-col flex-col-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              footer: {
                links: [
                  {
                    id: uid(),
                    className: 'w-auto inline-block !mb-8',
                    children: 'Learn more',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center items-center flex-col-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              footer: {
                className: '!mb-8',
                links: [
                  {
                    id: uid(),
                    className: 'w-auto inline-block',
                    children: 'Learn more',
                    href: '/#',
                    variant: 'button',
                  },
                ],
                CountQueuingStrategy: [
                  {
                    id: uid(),
                    children: 'Some cta text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center items-center flex-col-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              footer: {
                className: '!mb-8',
                links: [
                  {
                    id: uid(),
                    className: 'w-auto inline-block',
                    children: 'Learn more',
                    href: '/#',
                    variant: 'button',
                  },
                ],
                contents: [
                  {
                    id: uid(),
                    children: 'Some cta text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section01',
            props: {
              className: 'text-center items-center flex-col',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              form: {
                className: 'mb-8 mx-auto',
                button: {
                  children: 'Subscribe',
                },
                input: {
                  placeholder: 'Email',
                },
                contents: [
                  {
                    id: uid(),
                    children: 'Some form text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section01',
            props: {
              className: 'text-center items-center flex-col flex-col-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              form: {
                className: 'mb-8 mx-auto',
                button: {
                  children: 'Subscribe',
                },
                input: {
                  placeholder: 'Email',
                },
                contents: [
                  {
                    id: uid(),
                    children: 'Some form text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section01',
            props: {
              className: 'text-center items-center flex-col flex-col-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              form: {
                className: 'mb-8 mx-auto',
                button: {
                  children: 'Subscribe',
                },
                input: {
                  placeholder: 'Email',
                },
                contents: [
                  {
                    id: uid(),
                    children: 'Some form text Lean more',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center items-center flex-col',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              footer: {
                className: 'mb-8',
                links: [
                  {
                    id: uid(),
                    children: 'Action',
                    href: '/#',
                  },
                  {
                    id: uid(),
                    children: 'Action',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center items-center flex-col flex-col-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              contents: [
                {
                  id: uid(),
                  children:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
              ],
              footer: {
                className: 'mb-8',
                links: [
                  {
                    id: uid(),
                    children: 'Action',
                    href: '/#',
                  },
                  {
                    id: uid(),
                    children: 'Action',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center justify-around items-center flex-col',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              footer: {
                className: 'mb-8',
                links: [
                  {
                    id: uid(),
                    children: 'Action',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center justify-around items-center flex-col',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              footer: {
                className: 'mb-8',
                links: [
                  {
                    id: uid(),
                    children: 'Action',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className:
                'text-center justify-around items-center flex-col flex-col-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              footer: {
                className: 'mb-8',
                links: [
                  {
                    id: uid(),
                    children: 'Action',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className: 'text-center justify-around items-center flex-col',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              footer: {
                links: [
                  {
                    id: uid(),
                    className: 'w-auto inline-block !mb-8',
                    children: 'Learn more',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section',
            props: {
              className:
                'text-center justify-around items-center flex-col flex-col-reverse',
              image: {
                src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                alt: 'beach',
                width: '768',
                height: '768',
                className: 'self-center',
                className: 'max-w-[768px]',
              },
              heading: {
                className: '!mt-8',
                children: 'Heading',
              },
              footer: {
                links: [
                  {
                    id: uid(),
                    className: 'w-auto inline-block !mb-8',
                    children: 'Learn more',
                    href: '/#',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
]

const gridSections = [
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              list: {
                className:
                  '!mt-8 mb-8  md:grid-cols-2 md:grid-flow-row lg:grid-flow-col lg:grid-cols-none',
                items: [
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '600',
                      height: '600',
                    },
                    heading: {
                      children: 'Feature 1',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam.',
                      },
                    ],
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '600',
                      height: '600',
                    },
                    heading: {
                      children: 'Feature 2',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'At vero eos et accusamus et iusto odio dignissimos.',
                      },
                    ],
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '600',
                      height: '600',
                    },
                    heading: {
                      children: 'Feature 3',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                      },
                    ],
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '600',
                      height: '600',
                    },
                    heading: {
                      children: 'Feature 4',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'Est facere totam. At vero eos et accusamus et iusto odio dignissimos.',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              className: 'justify-center',
              list: {
                className:
                  '!mt-8 mb-8  md:grid-cols-2 md:grid-flow-row lg:grid-flow-col lg:grid-cols-none',
                items: [
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '600',
                      height: '600',
                    },
                    heading: {
                      children: 'Feature 1',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam.',
                      },
                    ],
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '600',
                      height: '600',
                    },
                    heading: {
                      children: 'Feature 2',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'At vero eos et accusamus et iusto odio dignissimos.',
                      },
                    ],
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '600',
                      height: '600',
                    },
                    heading: {
                      children: 'Feature 3',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              className: 'justify-center',
              list: {
                className:
                  '!mt-8 mb-8  md:grid-cols-2 md:grid-flow-row lg:grid-flow-col lg:grid-cols-none',
                items: [
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '600',
                      height: '600',
                    },
                    heading: {
                      children: 'Feature 1',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam.',
                      },
                    ],
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '600',
                      height: '600',
                    },
                    heading: {
                      children: 'Feature 2',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'At vero eos et accusamus et iusto odio dignissimos.',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              className: 'justify-center',
              list: {
                cols: 4,
                items: [
                  {
                    id: uid(),
                    className: 'center',
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                    heading: {
                      children: 'Feature 1',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam.',
                      },
                    ],
                  },
                  {
                    id: uid(),
                    className: 'center',
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '300',
                      height: '300',
                    },
                    heading: {
                      children: 'Feature 2',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'At vero eos et accusamus et iusto odio dignissimos.',
                      },
                    ],
                  },
                  {
                    id: uid(),
                    className: 'center',
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '300',
                      height: '300',
                    },
                    heading: {
                      children: 'Feature 3',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                      },
                    ],
                  },
                  {
                    id: uid(),
                    className: 'center',
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '300',
                      height: '300',
                    },
                    heading: {
                      children: 'Feature 4',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'Est facere totam. At vero eos et accusamus et iusto odio dignissimos.',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              className: 'justify-center',
              list: {
                cols: 3,
                items: [
                  {
                    id: uid(),
                    className: 'center',
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '400',
                      height: '400',
                    },
                    heading: {
                      children: 'Feature 1',
                    },
                    links: [
                      {
                        id: uid(),
                        children: <ReadMore />,
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam.',
                      },
                    ],
                  },
                  {
                    id: uid(),
                    className: 'center',
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '400',
                      height: '400',
                    },
                    heading: {
                      children: 'Feature 2',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'At vero eos et accusamus et iusto odio dignissimos.',
                      },
                    ],
                  },
                  {
                    id: uid(),
                    className: 'center',
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '400',
                      height: '400',
                    },
                    heading: {
                      children: 'Feature 3',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'Nam libero tempore, cum soluta nobis est eligendi optio cumque.',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              className: 'justify-center',
              list: {
                cols: 2,
                items: [
                  {
                    id: uid(),
                    className: 'center',
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '600',
                      height: '600',
                    },
                    heading: {
                      children: 'Feature 1',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam.',
                      },
                    ],
                  },
                  {
                    id: uid(),
                    className: 'center',
                    image: {
                      src: 'https://images.unsplash.com/photo-1699110404880-f5b213cef5eb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '600',
                      height: '600',
                    },
                    heading: {
                      children: 'Feature 2',
                    },
                    links: [
                      {
                        id: uid(),
                        children: 'Read more',
                        href: '/#',
                      },
                    ],
                    contents: [
                      {
                        id: uid(),
                        children:
                          'At vero eos et accusamus et iusto odio dignissimos.',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
]

const gallerySections = [
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              list: {
                items: [
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'section02',
            props: {
              list: {
                items: [
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699192781399-e2275a9f60b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699110404880-f5b213cef5eb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699302150582-bffc5309a8c8?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'scrollable',
            props: {
              list: {
                items: [
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699192781399-e2275a9f60b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699110404880-f5b213cef5eb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699302150582-bffc5309a8c8?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699192781399-e2275a9f60b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699110404880-f5b213cef5eb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699302150582-bffc5309a8c8?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },

  {
    type: 'row',
    component: 'row',
    id: uid(),
    children: [
      {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [
          {
            type: 'component',
            id: uid(),
            component: 'slider',
            props: {
              list: {
                items: [
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699192781399-e2275a9f60b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699110404880-f5b213cef5eb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699302150582-bffc5309a8c8?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699192781399-e2275a9f60b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699110404880-f5b213cef5eb?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                  {
                    id: uid(),
                    image: {
                      src: 'https://images.unsplash.com/photo-1699302150582-bffc5309a8c8?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                      alt: 'beach',
                      width: '320',
                      height: '320',
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  {
    type: 'row',
    component: 'row',
    id: uid(),
    props: {
      className: 'h-10 bg-white',
    },
  },
]

export const BuildLayout = ({
  layout,
  parent,
}: {
  layout: LayoutItem[]
  parent: string
}) => {
  if (!layout) return null

  return (layout || []).map((item, index) => {
    const path = `${parent.trim() === '' ? '' : parent + '-'}${index + 1}`

    switch (item.type) {
      case 'column': {
        return (
          <React.Fragment key={item.id}>
            <div
              className={cn(
                'relative column-block flex-1',
                item.props?.className
              )}
            >
              {item.children ? (
                <>
                  <BuildLayout layout={item.children} parent={path} />
                </>
              ) : null}
            </div>
          </React.Fragment>
        )
      }

      case 'component': {
        const Component = components[item.component]

        return (
          <div key={item.id} className="component-block">
            <Component id={item.id} key={item.id} {...item.props} />
          </div>
        )
      }

      case 'row':
      default: {
        return (
          <div
            key={item.id}
            className={cn('relative row-block md:flex', item.props?.className)}
          >
            {item.children ? (
              <>
                <BuildLayout
                  layout={item.children}
                  parent={`${parseInt(path)}`}
                />
              </>
            ) : null}
          </div>
        )
      }
    }
  })
}
BuildLayout.displayName = 'BuildLayout'

export default function ComponentPage() {
  return (
    <>
      <BuildLayout layout={homeSections} parent={''} />
      {/* <BuildLayout layout={imageSections} parent={''} /> */}
      {/* <BuildLayout layout={textSections} parent={''} /> */}
      {/* <BuildLayout layout={centerSections} parent={''} /> */}
      {/* <BuildLayout layout={centerImageSections} parent={''} /> */}
      {/* <BuildLayout layout={gridSections} parent={''} /> */}
      {/* <BuildLayout layout={gallerySections} parent={''} /> */}
    </>
  )
}

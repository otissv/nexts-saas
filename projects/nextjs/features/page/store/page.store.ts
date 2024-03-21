import { immer } from 'zustand/middleware/immer'
import { uid } from 'uid'

import { createStore } from '@/features/page/store/create.store'
import {
  moveWithInParent,
  moveToDifferentParent,
  moveSidebarComponentIntoParent,
  updateChildren,
  updateChildrenClassNames,
  updateProps,
  updateSelectedChildren,
} from '@/features/page/store/helpers.store'
import { object } from 'zod'

const initialState: PageState = {
  mode: 'edit',
  selectedPage: 'defaultPage',
  pages: {
    defaultPage: {
      name: 'Untitled',
      seo: {},
      layout: {
        selectedElement: {
          path: '',
          element: '',
        },
        selectedProperties: [],
        children: [
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
                    edit: {
                      label: 'Hero',
                      type: 'heading',
                      id: uid(),
                      order: 0,
                    },
                    props: {
                      heading: {
                        edit: {
                          label: 'Heading',
                          type: 'text',
                          id: uid(),
                          order: 1,
                        },
                        className: '!mt-8 text-red-500',
                        children: ['**Heading**'],
                      },
                      image: {
                        edit: {
                          label: 'Image',
                          type: 'image',
                          id: uid(),
                          order: 2,
                        },
                        children: [
                          {
                            src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            alt: 'beach',
                            width: '600',
                            height: '600',
                          },
                        ],
                      },
                      contents: {
                        edit: {
                          label: 'Contents',
                          type: 'richtext',
                          id: uid(),
                          order: 3,
                        },
                        children: [
                          {
                            children:
                              'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
                          },
                          {
                            children: 'Another paragraph',
                          },
                        ],
                      },
                      footer: {
                        edit: {
                          label: 'Footer',
                          type: 'heading',
                          id: uid(),
                          order: 4,
                        },
                        links: {
                          edit: {
                            label: 'Links',
                            type: 'links',
                            id: uid(),
                            order: 5,
                          },
                          children: [
                            {
                              className: 'w-auto inline-block',
                              children: 'Learn more',
                              href: '/#',
                            },
                          ],
                        },
                        contents: {
                          edit: {
                            label: 'Contents',
                            type: 'richtext',
                            id: uid(),
                            order: 6,
                          },
                          children: [
                            {
                              className: 'text-blue-500',
                              children: 'Some cta text',
                            },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    // page1: {
    //   name: 'Home Page',
    //   seo: {},
    //   layout: {
    //     selectedElement: {
    //       path: '',
    //       element: '',
    //     },
    //     selectedProperties: [],
    //     children: [
    // {
    //   type: "row",
    //   component: "row",
    //   id: uid(),
    //   props: {
    //     className: "border-2 border-red-500",
    //   },
    //   children: [
    //     {
    //       type: "column",
    //       component: "column",
    //       id: uid(),
    //       props: {
    //         className: "border-2 border-blue-500",
    //       },
    //       children: [
    //         {
    //           type: "component",
    //           id: uid(),
    //           component: "p",
    //           props: {
    //             root: {
    //               placeholder: "Placeholder",
    //               children: "This is a **simple** WYSIWYG editor.",
    //             },
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       type: "column",
    //       component: "column",
    //       id: uid(),
    //       props: {
    //         className: "border-2 border-blue-500",
    //       },
    //       children: [
    //         {
    //           type: "component",
    //           id: uid(),
    //           component: "p",
    //           props: {
    //             root: {
    //               placeholder: "Placeholder",
    //               children: "**component1**",
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    //         {
    //           type: 'row',
    //           component: 'row',
    //           id: uid(),
    //           props: {
    //             className: 'border-2 border-red-500',
    //           },
    //           children: [
    //             {
    //               type: 'column',
    //               component: 'column',
    //               id: uid(),
    //               props: {
    //                 className: 'border-2 border-blue-500',
    //               },
    //               children: [
    //                 {
    //                   type: 'component',
    //                   id: uid(),
    //                   component: 'p',
    //                   props: {
    //                     root: {
    //                       className: 'text-red-500',
    //                       children: 'This is a **simple** WYSIWYG editor.',
    //                     },
    //                   },
    //                 },
    //                 {
    //                   type: 'component',
    //                   id: uid(),
    //                   component: 'section',
    //                   props: {
    //                     heading: {
    //                       className: 'bg-red-500 inline relative text-blue-500',
    //                       children: 'Section Heading',
    //                     },
    //                     content: {
    //                       className: 'lg:font-extrabold',
    //                       children:
    //                         'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
    //                     },
    //                   },
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   },
    //   page2: {
    //     name: 'About Page',
    //     seo: {},
    //     layout: {
    //       selectedElement: {
    //         path: '',
    //         element: '',
    //       },
    //       selectedProperties: [],
    //       children: [
    //         {
    //           type: 'row',
    //           component: 'row',
    //           id: uid(),
    //           props: {
    //             className: 'border-2 border-red-500',
    //           },
    //           children: [
    //             {
    //               type: 'column',
    //               component: 'column',
    //               id: uid(),
    //               props: {
    //                 className: 'border-2 border-blue-500',
    //               },
    //               children: [
    //                 {
    //                   type: 'component',
    //                   id: 'hero1',
    //                   component: 'hero2',
    //                   props: {
    //                     className: 'p-10',
    //                     image: {
    //                       src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //                       alt: 'beach',
    //                       width: '600',
    //                       height: '600',
    //                     },
    //                     heading: {
    //                       children: 'About Heading',
    //                     },
    //                     content: {
    //                       children:
    //                         'Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.',
    //                     },
    //                     cta: {
    //                       link: {
    //                         className: 'w-auto inline-block',
    //                         children: 'call to action',
    //                         href: '/contact',
    //                       },
    //                       content: {
    //                         children: 'Some cta text Lean more',
    //                       },
    //                     },
    //                   },
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   },
  },
}

export const ROW = 'row'
export const COLUMN = 'column'
export const COMPONENT = 'component'

export type RowType = typeof ROW
export type ColumnType = typeof COLUMN
export type ComponentType = typeof COMPONENT | typeof ROW | typeof COLUMN
export type LayoutTypes = RowType | ColumnType | ComponentType
export const layoutTypes: LayoutTypes[] = [ROW, COLUMN, COMPONENT]

export type Row = {
  as?: string
  children: Column[]
  component: string
  id: string
  name?: string
  props?: Record<string, any>
  type: RowType
}

export type Column = {
  as?: string
  children?: Component[]
  component: string
  id: string
  name?: string
  props?: Record<string, any>
  type: ColumnType
}

export type Component = {
  component: string
  id: string
  name?: string
  props: Record<string, any>
  type: ComponentType
}

export type LayoutItem = Row | Column | Component

export type LayoutChildren = LayoutItem & { children?: any }

export type SelectedElement = {
  path: string
  element: string
}

export type LayoutMode = 'move' | 'edit' | 'zoom'

export type LayoutState = {
  children: Row[]
  selectedElement: SelectedElement
  selectedProperties: string[]
}

export type Page = {
  layout: LayoutState
  name: string
  seo: Record<string, any>
}

export type PageId = string

export type PageState = {
  mode: LayoutMode
  pages: Record<PageId, Page>
  selectedPage: PageId
}

export type BlockActions = {
  addPage: () => void
  changeLayoutMode: (mode: LayoutMode) => void
  getPageLayout: () => Page['layout']
  getPageName: () => string
  getPageNames: () => [key: string, value: string][]
  setPageName: (pageName: string) => void
  setSelectedClassNames: (classNames: string[]) => void
  setSelectedElement: (selectedElement: SelectedElement) => void
  setSelectedPage: (pageName: string) => void
  updatePageContent: (
    text: string,
    update: (text: string, props: Record<string, any>) => void
  ) => void
  updateLayout: ({
    path,
    target,
  }: {
    path: string
    target: {
      path: string
      type: LayoutTypes
    }
  }) => void

  updateClassNames: (
    addClassNames: string[],
    removeClassNames?: string[]
  ) => void
}

export const usePageStore = createStore<PageState & BlockActions>(
  immer<PageState & BlockActions>((set, get) => ({
    _name: 'page',
    mode: initialState.mode,
    pages: initialState.pages,
    selectedPage: initialState.selectedPage,
    addPage: () =>
      set((state) => {
        const key = uid()
        state.selectedPage = key
        state.pages[key] = {
          name: 'Untitled',
          seo: {},
          layout: {
            selectedElement: {
              path: '',
              element: '',
            },
            selectedProperties: [],
            children: [
              {
                type: 'row',
                component: 'row',
                id: uid(),
                children: [
                  {
                    type: 'column',
                    component: 'column',
                    id: uid(),
                    children: [],
                  },
                ],
              },
            ],
          },
        }
      }),

    changeLayoutMode: (mode) => {
      set((state) => {
        if (state.mode !== mode) {
          state.mode = mode
        }
      })
    },

    getPageLayout: () => {
      const state = get()
      return state.pages[state.selectedPage]?.layout || ({} as LayoutState)
    },

    getPageName: () => {
      const state = get()
      return state.pages[state.selectedPage]?.name || ''
    },

    getPageNames: () => {
      const state = get()
      return Object.entries(state.pages).map(([key, value]) => [
        key,
        value.name,
      ])
    },

    getEditableFields: () => {
      const state = get()

      //TODO: Loop over all children and get get editable fields
      const layout = state.pages[state.selectedPage].layout
      if (
        !layout?.selectedElement ||
        !layout?.selectedElement?.path ||
        !layout?.selectedElement?.element
      ) {
        return []
      }

      const getEditFields = (layoutItem = [], fields = []) => {
        const editableFelids = (props) =>
          Object.values(props).reduce(
            (previousValue, { edit, children, ...rest }) => {
              return !edit
                ? previousValue
                : [
                    ...previousValue,
                    {
                      ...(edit ? { edit } : {}),
                      ...(children ? { children } : {}),
                    },
                    ...Object.values(rest || []).map(({ edit, children }) => ({
                      ...(edit ? { edit } : {}),
                      ...(children ? { children } : {}),
                    })),
                  ]
            },
            []
          )

        return layoutItem.reduce((previousValue, { props, children }) => {
          if (props) {
            previousValue.push(editableFelids(props))

            if (props.children) {
              return getEditFields(props.children, fields)
            }
          }
          if (children) {
            return getEditFields(children, fields)
          }

          return previousValue
        }, fields)
      }

      return getEditFields(layout.children).flat()
    },

    setPageName: (pageName) =>
      set((state) => {
        if (!state.pages[state.selectedPage]) return
        state.pages[state.selectedPage].name = pageName
      }),

    setSelectedElement: (selectedElement) =>
      set((state) => {
        const layout = state.pages[state.selectedPage].layout
        if (!layout || !selectedElement.path || !selectedElement.element) return

        layout.selectedElement = selectedElement

        const update = (props: Record<string, any>) => {
          return props?.className?.split(' ') || []
        }

        //TODO: fix missing classes when changing selected element
        layout.selectedProperties = updateSelectedChildren({
          children: layout.children,
          path: selectedElement.path,
          element: selectedElement.element,
          update,
        })
      }),

    setSelectedPage: (pageKey) =>
      set((state) => {
        state.selectedPage = pageKey
      }),

    setSelectedClassNames: (classNames) =>
      set((state) => {
        const layout = state.pages[state.selectedPage].layout
        if (!layout?.selectedElement.path || !layout?.selectedElement.element) {
          return
        }

        const update = (props: Record<string, any>) => {
          logState('Props: ', props)
          props.className = classNames
          return classNames
        }

        //TODO: fix missing classes when changing selected element
        layout.selectedProperties = updateSelectedChildren({
          children: layout.children,
          path: layout.selectedElement.path,
          element: layout.selectedElement.element,
          update,
        })
      }),

    updateLayout: ({ path, target, ...item }) =>
      set((state) => {
        const layout = state.pages[state.selectedPage].layout
        if (!layout) return

        const splitPath = path.split('-').filter(Boolean)
        const splitTargetPath = target.path.split('-').filter(Boolean)
        let newItem = { ...item, id: uid() } as LayoutItem

        if (splitPath.length === splitTargetPath.length) {
          if (
            splitPath.slice(0, -1).join('-') ===
            splitTargetPath.slice(0, -1).join('-')
          ) {
            layout.children = moveWithInParent({
              layout,
              targetPath: splitTargetPath,
              path: splitPath,
            })
          } else {
            layout.children = moveToDifferentParent({
              layout,
              targetPath: splitTargetPath,
              targetType: target.type,
              path: splitPath,
              item: newItem,
            })
          }
        } else if (path.trim() === '' && newItem.type === 'component') {
          layout.children = moveSidebarComponentIntoParent({
            layout,
            targetPath: splitTargetPath,
            targetType: target.type,
            item: newItem,
          })
        } else {
          layout.children = moveToDifferentParent({
            layout,
            targetPath: splitTargetPath,
            targetType: target.type,
            path: splitPath,
            item: newItem,
          })
        }

        layout.children = layout.children.filter(
          ({ children }: { children: LayoutChildren[] }) => children.length
        )
      }),

    updatePageContent: (text, update) =>
      set((state) => {
        const layout = state.pages[state.selectedPage].layout
        if (
          !layout ||
          !layout.selectedElement.path ||
          !layout.selectedElement.element
        ) {
          return
        }

        updateProps({
          children: layout.children,
          path: layout.selectedElement.path.split('-'),
          element: layout.selectedElement.element,
          update: (props) => update(text, props),
        })
      }),

    updateClassNames: (addClassNames, removeClassNames = []) => {
      set((state) => {
        const layout = state.pages[state.selectedPage]?.layout
        if (!layout) return

        const element = layout.selectedElement.element

        if (element) {
          const update = updateChildrenClassNames({
            addClassNames,
            removeClassNames,
          })

          layout.children = updateChildren({
            children: layout.children,
            path: layout.selectedElement.path.split('-').filter(Boolean),
            update,
            element,
          }) as Row[]
        }
      })
    },

    updateSelectedChildren: (content) => {
      set((state) => {
        const layout = state.pages[state.selectedPage].layout
        if (
          !layout?.selectedElement ||
          !layout?.selectedElement?.path ||
          !layout?.selectedElement?.element
        ) {
          return ['']
        }

        // console.log('updateSelectedChildren: ', content.split('\n\n'))
        // console.log('updateSelectedChildren: ', content)

        const update = (props: Record<string, any>) => {
          props.children = content.split('\n\n').map((c) => ({ children: c }))
        }

        return updateSelectedChildren({
          children: layout.children,
          path: layout.selectedElement.path,
          element: layout.selectedElement.element,
          update,
        })
      })
    },
  }))
)

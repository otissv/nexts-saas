import { immer } from 'zustand/middleware/immer'
import { uid } from 'uid'

import { createStore } from '@/features/page/store/create.store'
import {
  moveWithInParent,
  moveToDifferentParent,
  moveSidebarComponentIntoParent,
  updateChildren,
  updateChildrenClassNames,
  updateSelectedProperties,
  updateProps,
  logState,
} from '@/features/page/store/helpers.store'

const initialState: PageState = {
  mode: 'edit',
  selectedPage: 'page1',
  pages: {
    // defaultPage: {
    //   name: "Untitled",
    //   seo: {},
    //   layout: {
    //     selectedElement: {
    //       path: "",
    //       element: "",
    //     },
    //     selectedProperties: [],
    //     children: [
    //       {
    //         type: "row",
    //         component: "row",
    //         id: uid(),
    //         children: [
    //           {
    //             type: "column",
    //             component: "column",
    //             id: uid(),
    //             children: [],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
    page1: {
      name: 'Home Page',
      seo: {},
      layout: {
        selectedElement: {
          path: '',
          element: '',
        },
        selectedProperties: [],
        children: [
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
          {
            type: 'row',
            component: 'row',
            id: uid(),
            props: {
              className: 'border-2 border-red-500',
            },
            children: [
              {
                type: 'column',
                component: 'column',
                id: uid(),
                props: {
                  className: 'border-2 border-blue-500',
                },
                children: [
                  {
                    type: 'component',
                    id: uid(),
                    component: 'p',
                    props: {
                      root: {
                        children: 'This is a **simple** WYSIWYG editor.',
                      },
                    },
                  },
                  // {
                  //   type: "component",
                  //   id: uid(),
                  //   component: "section",
                  //   props: {
                  //     cta: {
                  //       children: "Call to action",
                  //     },
                  //     heading: {
                  //       className: "bg-red-500 inline relative text-blue-500",
                  //       children: "Section Heading",
                  //     },
                  //     content: {
                  //       className: "lg:font-extrabold",
                  //       children:
                  //         "Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.",
                  //     },
                  //   },
                  // },
                ],
              },
            ],
          },
        ],
      },
    },
    // page2: {
    //   name: "About Page",
    //   seo: {},
    //   layout: {
    //     selectedElement: {
    //       path: "",
    //       element: "",
    //     },
    //     selectedProperties: [],
    //     children: [
    //       {
    //         type: "row",
    //         component: "row",
    //         id: uid(),
    //         props: {
    //           className: "border-2 border-red-500",
    //         },
    //         children: [
    //           {
    //             type: "column",
    //             component: "column",
    //             id: uid(),
    //             props: {
    //               className: "border-2 border-blue-500",
    //             },
    //             children: [
    //               {
    //                 type: "component",
    //                 id: "section1",
    //                 component: "section",
    //                 props: {
    //                   className: "p-10",
    //                   heading: {
    //                     children: "About Heading",
    //                   },
    //                   content: {
    //                     children:
    //                       "Sed aperiam aut nihil. Eos culpa fugiat. Voluptas perferendis velit nemo ullam. Est facere totam.",
    //                   },
    //                 },
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
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

    setPageName: (pageName: string) =>
      set((state) => {
        if (!state.pages[state.selectedPage]) return
        state.pages[state.selectedPage].name = pageName
      }),

    setSelectedElement: (selectedElement) =>
      set((state) => {
        const layout = state.pages[state.selectedPage].layout
        if (!layout || !selectedElement.path || !selectedElement.element) return

        layout.selectedElement = selectedElement

        //TODO: fix missing classes when changing selected element
        layout.selectedProperties = updateSelectedProperties({
          children: layout.children,
          path: selectedElement.path,
          element: selectedElement.element,
        })
      }),

    setSelectedPage: (pageKey: string) =>
      set((state) => {
        state.selectedPage = pageKey
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
  }))
)

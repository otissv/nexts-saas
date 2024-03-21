import { uid } from 'uid'
import {
  LayoutState,
  LayoutTypes,
  LayoutItem,
  LayoutChildren,
  Row,
} from '@/features/page/store/page.store'

export function moveWithInParent({
  layout,
  targetPath,
  path,
}: {
  layout: LayoutState
  targetPath: string[]
  path: string[]
}) {
  return reorderChildren({
    children: layout.children,
    targetPath,
    path,
  })
}

export function moveToDifferentParent({
  layout,
  targetPath,
  targetType,
  path,
  item,
}: {
  layout: LayoutState
  targetType: LayoutTypes
  targetPath: string[]
  path: string[]
  item: LayoutItem
}) {
  let children = layout.children

  children = removeChildFromChildren({ children, targetPath, path }) as Row[]
  children = addChildToChildren({
    children,
    targetPath,
    targetType,
    item,
  }) as Row[]

  return children
}

export function moveSidebarComponentIntoParent({
  layout,
  targetPath,
  targetType,
  item,
}: {
  layout: LayoutState
  targetPath: string[]
  targetType: LayoutTypes
  item: LayoutItem
}) {
  let children = layout.children

  children = addChildToChildren({
    children,
    targetPath,
    targetType,
    item,
  }) as Row[]

  return children
}

export const addColumDataToRow = (children: LayoutState['children'] = []) => {
  return children.map((row) => {
    if (!row.children.length) {
      row.children = [
        {
          type: 'column',
          component: 'column',
          id: uid(),
          children: [],
        },
      ]
    }
    return row
  })
}

export function reorderChildren({
  children = [],
  targetPath,
  path,
}: {
  children: LayoutItem[]
  targetPath: string[]
  path: string[]
}) {
  if (targetPath.length === 1) {
    return reorder({
      children,
      pathIndex: Number(path[0]),
      targetIndex: Number(targetPath[0]),
    })
  }

  const curIndex = Number(targetPath.slice(0, 1))
  const callback = ({
    children,
    targetPath,
    path,
  }: {
    children: LayoutItem[]
    targetPath: string[]
    path: string[]
  }): LayoutChildren[] =>
    reorderChildren({
      children,
      targetPath,
      path,
    })
  return updateChildrenLocation({
    children,
    targetPath,
    path,
    curIndex,
    callback,
  }).filter(({ children }) => children.length)
}

export function reorder({
  children = [],
  pathIndex,
  targetIndex,
}: {
  children: LayoutItem[]
  pathIndex: number
  targetIndex: number
}) {
  const [removed] = children.splice(pathIndex, 1)
  // inserting child
  children.splice(targetIndex, 0, removed)
  return children
}

export function updateChildrenLocation({
  children = [],
  curIndex,
  path,
  targetPath,
  callback,
}: {
  children: LayoutChildren[]
  curIndex: number
  path: string[]
  targetPath: string[]
  callback: ({
    children,
    targetPath,
    path,
  }: {
    children: LayoutChildren[]
    targetPath: string[]
    path: string[]
  }) => LayoutChildren[]
}) {
  const nodeChildren = children[curIndex]

  children[curIndex] = {
    ...nodeChildren,
    children: callback({
      children: nodeChildren.children,
      targetPath: targetPath.slice(1),
      path: path.slice(1),
    }),
  } as any

  return children
}

export function addChildToChildren({
  children = [],
  targetPath,
  targetType,
  item,
}: {
  children: LayoutChildren[]
  targetType: LayoutTypes
  targetPath: string[]
  item: LayoutItem
}) {
  if (targetPath.length === 1) {
    const index = Number(targetPath[0])
    let newItem = item

    if (targetType === 'row' && item.type === 'component') {
      newItem = {
        type: 'row',
        component: 'row',
        id: uid(),
        props: {},
        children: [
          {
            type: 'column',
            component: 'column',
            id: uid(),
            children: [item],
            props: {},
          },
        ],
      }
    }

    if (targetType === 'column' && item.type === 'component') {
      newItem = {
        type: 'column',
        component: 'column',
        id: uid(),
        children: [item],
        props: {},
      }
    }

    // insert child
    return [...children.slice(0, index), newItem, ...children.slice(index)]
  }

  const curIndex = Number(targetPath.slice(0, 1))

  const nodeChildren = children[curIndex]
  children[curIndex] = {
    ...nodeChildren,
    children: addChildToChildren({
      children: nodeChildren.children,
      targetPath: targetPath.slice(1),
      targetType,
      item,
    }),
  } as any

  return children
}

export function removeChildFromChildren({
  children = [],
  targetPath,
  path,
}: {
  children: LayoutChildren[]
  path: string[]
  targetPath: string[]
}) {
  if (path.length === 1) {
    const index = Number(path[0])
    // remove child
    return [...children.slice(0, index), ...children.slice(index + 1)]
  }

  const curIndex = Number(path.slice(0, 1))
  const callback = ({
    children,
    targetPath,
    path,
  }: {
    children: LayoutChildren[]
    targetPath: string[]
    path: string[]
  }): LayoutChildren[] =>
    removeChildFromChildren({
      children,
      targetPath,
      path,
    })

  return updateChildrenLocation({
    children,
    curIndex,
    path,
    targetPath,
    callback,
  }).filter(({ children = [] }) => {
    return children.length
  })
}

export function updateChildren({
  children = [],
  element,
  path = [],
  update,
}: {
  children: LayoutChildren[]
  element: string
  path: string[]
  update: (children: LayoutChildren) => LayoutChildren
}) {
  if (path.length === 1) {
    if (element) {
      const [id, prop] = element.split('-')
      const childProps = prop.split('.')
      let item: LayoutChildren
      let props: Record<string, any>

      if (prop === 'root') {
        item = children.find((item) => item.id === id) as any
        props = item.props as any
      } else if (childProps.length > 1) {
        item = children[0]
        props = childProps.reduce(
          (acc: any, curr: any) => {
            return acc[curr] || acc
          },
          item?.props
        )
      } else {
        item = children.find(
          (item: any) => item.id === id && item.props[prop]
        ) as any
        props = item.props?.[prop]
      }

      if (item) {
        update({
          props: props || {},
        } as LayoutChildren)
      }
    }

    return children
  }

  const curIndex = Number(path.slice(0, 1))
  const nodeChildren = children[curIndex]

  children[curIndex] = {
    ...nodeChildren,
    children: updateChildren({
      children: nodeChildren.children,
      path: path.slice(1),
      element,
      update,
    }),
  } as any

  return children
}

export function updateChildrenClassNames({
  addClassNames,
  removeClassNames,
}: {
  addClassNames: string[]
  removeClassNames: string[]
}) {
  return (children: LayoutChildren) => {
    //TODO:
    const props = children?.props

    if (!props) return children

    const addClass = (className: string) =>
      (props.className || '') + ' ' + className

    const removeClass = (className: string[]) =>
      className.reduce(
        (str, cls) => str.replace(cls.trim(), ''),
        props.className || ''
      )

    if (removeClassNames.length) {
      props.className = removeClass(removeClassNames)
    }

    if (addClassNames.length) {
      for (let cls of addClassNames) {
        if (props.className?.match(cls.trim())) {
          props.className = removeClass([cls])
        } else if (cls.charAt(cls.length - 1) === '-') {
          props.className = addClass(cls.substring(0, cls.length - 1))
        } else {
          props.className = addClass(cls)
        }
      }
    }

    props.className = props.className.replace(/\s+/g, ' ').trim()

    return children
  }
}

export function updateProps({
  children,
  path,
  element,
  update,
}: {
  children: LayoutChildren[]
  path: string[]
  element: string
  update: (props: Record<string, any>) => any
}) {
  if (path.length === 1) {
    const [id, prop] = element.split('-')
    const childProps = prop.split('.')
    let item: LayoutChildren
    let props: Record<string, any>

    if (prop === 'root') {
      item = children.find((item) => item.id === id) as any
      props = item?.props || {}
    } else if (childProps.length > 1) {
      props = childProps.reduce(
        (acc: any, curr: any) => {
          return acc[curr] || acc
        },
        children[0]?.props || {}
      )
    } else {
      item = children.find(
        (item: any) => item?.id === id && item?.props[prop]
      ) as any
      props = item?.props?.[prop] || {}
    }

    return update(props)
  }

  const curIndex = Number(path.slice(0, 1))
  const nodeChildren = children[curIndex]

  return updateProps({
    children: nodeChildren.children,
    path: path.slice(1),
    element,
    update,
  })
}

export function updateSelectedChildren({
  children,
  path,
  element,
  update,
}: {
  children: LayoutChildren[]
  path: string
  element: string
  update: (props: Record<string, any>) => unknown
}) {
  return updateProps({
    children,
    path: path.split('-'),
    element,
    update,
  })
}

import React from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { usePageStore } from '@/features/page/store/page.store'
import { cn } from '@/lib/utils'
import { components } from '@/features/page/builder/components/components'

interface Item {
  type: string
  id: string
  children?: Item[]
  component?: string
}

export interface LayoutTreeProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export interface TreeItemProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  item: Item
  parent?: string
  index?: number
}

export interface TreeItemLabelProps
  extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  path: string
  element: string
}

export interface TreeProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data: Item
}

export const LayoutTree = ({ ...props }: LayoutTreeProps) => {
  const { getPageLayout } = usePageStore()
  const layout = getPageLayout() as any as Item

  return <Tree data={layout} {...props} />
}
LayoutTree.displayName = 'LayoutTree'

export const TreeItem = ({
  className,
  item,
  parent = '',
  index = 0,
  ...props
}: TreeItemProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  let path = ''

  if (item.type) {
    path = `${parent.trim() === '' ? '' : parent + '-'}${index}`
  }

  const trigger = isOpen ? (
    <ChevronDown size="16px" className="inline-block mr-1" />
  ) : (
    <ChevronRight size="16px" className="inline-block mr-1" />
  )

  const displayName =
    // @ts-ignore dynamic indexing of type
    components[item.component as string]?.displayName || item.type || 'Layout'

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn('py-2', item.type && 'pl-4', className)}
      {...props}
    >
      <CollapsibleTrigger asChild>
        <TreeItemLabel path={path} element={`${item.id}-root`}>
          {item.children ? trigger : null}
          {displayName}
        </TreeItemLabel>
      </CollapsibleTrigger>

      {item.children &&
        item.children.map((child) => (
          <CollapsibleContent key={child.id}>
            <TreeItem item={child} parent={path} index={index++} />
          </CollapsibleContent>
        ))}
    </Collapsible>
  )
}
TreeItem.displayName = 'TreeItem'

export const TreeItemLabel = ({
  children,
  element,
  onClick,
  path,
  ...props
}: TreeItemLabelProps) => {
  const { setSelectedElement } = usePageStore()

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(event)

    if (path) {
      setSelectedElement({ path, element })
    }
  }

  return (
    <button {...props} onClick={handleOnClick}>
      {children}
    </button>
  )
}
TreeItemLabel.displayName = 'TreeItemLabel'

export const Tree = ({ data, ...props }: TreeProps) => {
  return (
    <div {...props}>
      <TreeItem item={data} />
    </div>
  )
}
TreeItemLabel.displayName = 'TreeItemLabel'

export default Tree

import { cn } from '@/lib/utils'
import React from 'react'
import { LayoutTypes, LayoutItem, usePageStore } from '../store/page.store'
import { ColumnBlock, ComponentBlock, RowBlock } from './components/blocks'
import { components } from './components/components'
import { DropZoneProps, DropZone } from './dropzone'

export const BuildLayout = ({
  drop,
  layout,
  parent,
}: {
  drop: (target: string, type: LayoutTypes) => DropZoneProps['drop']
  layout: LayoutItem[]
  parent: string
}) => {
  const { setSelectedElement } = usePageStore()

  const handleOnElementClick = (e: React.MouseEvent<HTMLElement>) => {
    setSelectedElement({
      // @ts-expect-error dataset exits
      path: e.target.dataset.blockpath,
      // @ts-expect-error dataset exits
      element: e.target.dataset.editor,
    })
  }

  if (!layout) return null

  return (layout || []).map((item, index) => {
    const path = `${parent.trim() === '' ? '' : parent + '-'}${index}`

    switch (item.type) {
      case 'column': {
        return (
          <React.Fragment key={item.id}>
            <ColumnBlock
              edit="root"
              path={path}
              item={item}
              drop={drop}
              onClick={handleOnElementClick}
              className={cn(
                'relative column-block flex-1',
                item.props?.className
              )}
            >
              {item.children ? (
                <>
                  <BuildLayout
                    drop={drop}
                    layout={item.children}
                    parent={path}
                  />
                </>
              ) : null}
            </ColumnBlock>
          </React.Fragment>
        )
      }

      case 'component': {
        const Component = components[item.component]

        return (
          <ComponentBlock
            key={item.id}
            path={path}
            item={item as any}
            drop={drop}
            className="component-block"
            onClick={handleOnElementClick}
          >
            <Component
              data={{
                ['data-blockpath']: path,
                onClick: handleOnElementClick,
              }}
              edit="root"
              id={item.id}
              {...item.props}
            />
          </ComponentBlock>
        )
      }

      case 'row':
      default: {
        return (
          <RowBlock
            data-blockpath={path}
            edit="root"
            key={item.id}
            path={path}
            onClick={handleOnElementClick}
            item={item as any}
            drop={drop}
            className={cn('row-block', item.props?.className)}
          >
            <div path={path} onClick={handleOnElementClick}>
              {item.children ? (
                <BuildLayout
                  key={item.id}
                  drop={drop}
                  layout={item.children}
                  parent={`${parseInt(path)}`}
                />
              ) : null}
            </div>
          </RowBlock>
        )
      }
    }
  })
}
BuildLayout.displayName = 'BuildLayout'

export const BuildPageLayout = ({
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
          <div key={item.id} className={item.props?.className}>
            <div path={path}>
              {item.children ? (
                <BuildLayout key={item.id} layout={item.children} parent="" />
              ) : null}
            </div>
          </div>
        )
      }
    }
  })
}
BuildPageLayout.displayName = 'BuildPageLayout'

// export const BuildLayout = ({
//   drop,
//   layout,
//   parent,
// }: {
//   drop: (target: string, type: LayoutTypes) => DropZoneProps['drop']
//   layout: LayoutItem[]
//   parent: string
// }) => {
//   const { mode, setSelectedElement } = usePageStore()

//   if (!layout) return null

//   const isEdit = mode === 'edit'

//   const handleOnElementClick = (e: React.MouseEvent<HTMLElement>) => {
//     setSelectedElement({
//       // @ts-expect-error dataset exits
//       path: e.target.dataset.blockpath,
//       // @ts-expect-error dataset exits
//       element: e.target.dataset.editor,
//     })
//   }

//   return (layout || []).map((item, index) => {
//     const path = `${parent.trim() === '' ? '' : parent + '-'}${index}`

//     switch (item.type) {
//       case 'column': {
//         return (
//           <React.Fragment key={item.id}>
//             <ColumnBlock
//               data-editor={`${item.id}-root`}
//               data-blockpath={path}
//               path={path}
//               item={item}
//               drop={drop}
//               onClick={handleOnElementClick}
//               className={cn(
//                 'column-block flex flex-col',
//                 item.props?.className
//               )}
//             >
//               {item.children ? (
//                 <>
//                   <DropZone
//                     data-blockpath={`${path}-0`}
//                     direction="horizontal"
//                     drop={drop(`${path}-0`, 'column')}
//                     data-type="column"
//                   />
//                   <BuildLayout
//                     layout={item.children}
//                     drop={drop}
//                     parent={path}
//                   />
//                 </>
//               ) : null}
//             </ColumnBlock>
//           </React.Fragment>
//         )
//       }

//       case 'component': {
//         const Component = components[item.component]
//         return (
//           <ComponentBlock
//             data-blockpath={path}
//             key={item.id}
//             path={path}
//             item={item as any}
//             drop={drop}
//             className="component-block"
//           >
//             <Component
//               data-blockpath={path}
//               data-editor={`${item.id}-root`}
//               onClick={handleOnElementClick}
//               id={item.id}
//               key={item.id}
//               isEdit={isEdit}
//               {...item.props}
//             />
//           </ComponentBlock>
//         )
//       }

//       case 'row':
//       default: {
//         return (
//           <RowBlock
//             data-blockpath={path}
//             data-editor={`${item.id}-root`}
//             key={item.id}
//             path={path}
//             onClick={handleOnElementClick}
//             item={item as any}
//             drop={drop}
//             className={cn('row-block flex', item.props?.className)}
//           >
//             {item.children ? (
//               <>
//                 <DropZone
//                   data-blockpath={`${parseInt(path)}-0`}
//                   direction="vertical"
//                   drop={drop(`${parseInt(path)}-0`, 'column')}
//                   data-type="column"
//                 />

//                 <BuildLayout
//                   layout={item.children}
//                   drop={drop}
//                   parent={`${parseInt(path)}`}
//                 />
//               </>
//             ) : null}
//           </RowBlock>
//         )
//       }
//     }
//   })
// }
// BuildLayout.displayName = 'BuildLayout'

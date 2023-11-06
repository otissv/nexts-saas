'use client'

import * as React from 'react'
import { uid } from 'uid'
import { Check, ChevronRight, X as Close } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ComponentBlock } from '@/features/page/builder/components/blocks'
import { LayoutTypes, usePageStore } from '@/features/page/store/page.store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { config } from '@/features/page/builder/config/config'
import { LayoutTree } from '@/features/page/builder/layout-tree'
import { Maybe } from '@/components/maybe'
import { cn } from '@/lib/utils'
import { EditableButton } from '@/components/editable-button'

export const SectionsPanel = () => {
  const { selectedPage, getPageNames, setSelectedPage, setPageName } =
    usePageStore()
  const [isOpen, setIsOpen] = React.useState(false)
  const [option, setOption] = React.useState<string | null>(null)

  const handleOnInsertSectionClick = (newOption: string) => () => {
    setIsOpen(true)
    setOption(newOption)
  }

  const handleOnSelectPageClick =
    (pageName: string) => (event: React.MouseEvent<HTMLButtonElement>) =>
      setSelectedPage(pageName)

  const handleOnCloseClick = () => setIsOpen(!isOpen)
  let pageNames = getPageNames()

  return (
    <div className="relative h-inherit border-x">
      <div className="p-4">
        <Tabs defaultValue="pages" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pages">Pages</TabsTrigger>

            <TabsTrigger value="layout" disabled={!selectedPage}>
              Layout
            </TabsTrigger>

            <TabsTrigger value="insert" disabled={!selectedPage}>
              Insert
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pages">
            <Maybe check={selectedPage}>
              {pageNames.map(([key, value]) => {
                const isActive = selectedPage === key
                return (
                  <EditableButton
                    update={setPageName}
                    key={key}
                    value={value}
                    isActive={isActive}
                    onClick={handleOnSelectPageClick(key)}
                    defaultValue="Untitled"
                  >
                    <Check
                      size="16px"
                      className={cn('mr-2', !isActive && 'text-background')}
                    />
                  </EditableButton>
                )
              })}
            </Maybe>
          </TabsContent>

          <TabsContent value="layout">
            <Maybe check={selectedPage}>
              <LayoutTree />
            </Maybe>
          </TabsContent>

          <TabsContent value="insert">
            <Maybe check={selectedPage}>
              {Object.keys(config.previews).map((key) => {
                return (
                  <Button
                    key={key}
                    variant="ghost"
                    className="w-full justify-between mb-2"
                    onClick={handleOnInsertSectionClick(key)}
                  >
                    {key.charAt(0).toUpperCase()}
                    {key.substring(1)} <ChevronRight />
                  </Button>
                )
              })}
            </Maybe>
          </TabsContent>
        </Tabs>
      </div>

      {isOpen && <OptionsPanel option={option} onClose={handleOnCloseClick} />}
    </div>
  )
}
SectionsPanel.displayName = 'SectionsPanel'

const OptionsPanel = ({ option, onClose }) => {
  const style = {
    droppable: {
      border: '1px dashed gray',
      backgroundColor: 'white',
      color: 'black',
      cursor: 'move',
      float: 'left',
    },
  }

  const handleOnDrop =
    (target: string, type: LayoutTypes) => (item, monitor) => {
      return {
        ...item,
        target: {
          path: target,
          type,
        },
      }
    }

  return (
    <div className="flex flex-col absolute top-0 left-[100%] z-10 w-[200px] h-inherit border-x">
      <Button
        variant="ghost"
        className="self-end flex justify-center h-10 w-10 p-0 rounded-full m-1"
        onClick={onClose}
      >
        <Close />
      </Button>
      {((config.previews as any)[option as any] || []).map((item) => {
        return (
          <ComponentBlock
            key={uid()}
            item={item}
            drop={handleOnDrop('', 'column')}
            path=""
          >
            <>{item.component}</>
          </ComponentBlock>
        )
      })}
    </div>
  )
}

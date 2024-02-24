'use client'

import * as React from 'react'
import Link from 'next/link'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { EditIcon, LucideZoomIn, MonitorSmartphone, Move } from 'lucide-react'

import { SectionsPanel } from '@/features/page/builder/sections-panel'
import { MainWindow } from '@/features/page/builder/main-window'
import { PropertiesPanel } from '@/features/page/builder/properties-panel'
import { usePageStore, LayoutMode } from '@/features/page/store/page.store'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EditPanel } from './edit-panel'
import { CssPanel } from './css-panels'

export const PageBuilder = () => {
  const {
    mode,
    changeLayoutMode,
    selectedPage,
    addPage,
    setPageName,
    getPageName,
  } = usePageStore()
  const [isFullView, setFullView] = React.useState(false)

  React.useEffect(() => {
    const element = document.querySelector<HTMLElement>('.main-window')

    if (element) {
      if (mode === 'move') {
        element.style.cursor = 'grab'
      } else if (mode === 'zoom') {
        element.style.cursor = 'zoom-in'
      } else if (mode === 'edit') {
        element.style.cursor = 'text'
      }
    }
  }, [mode])

  const handleOnLayoutModeClick = (mode: LayoutMode) => () => {
    changeLayoutMode(mode)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-toolbar flex items-center border px-4">
        <Link href="/admin">Admin</Link>
        <Button onClick={() => addPage()}>New Page</Button>

        <Input
          value={getPageName()}
          variant="ghost"
          className="text-xl"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPageName(event.target.value)
          }
          onBlur={(event: React.MouseEvent<HTMLInputElement>) =>
            event.currentTarget.value === '' && setPageName('Untitled')
          }
        />

        <ToggleGroup type="single" defaultValue={mode} label="Text Alignment">
          <ToggleGroupItem
            className="w-10 p-0"
            label="Move"
            value="move"
            disabled={!selectedPage}
            onClick={handleOnLayoutModeClick('move')}
          >
            <Move />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-10 p-0"
            label="Zoom"
            value="zoom"
            disabled={!selectedPage}
            onClick={handleOnLayoutModeClick('zoom')}
          >
            <LucideZoomIn />
          </ToggleGroupItem>
          <ToggleGroupItem
            className="w-10 p-0"
            label="Edit"
            value="edit"
            disabled={!selectedPage}
            onClick={handleOnLayoutModeClick('edit')}
          >
            <EditIcon />
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup type="single" defaultValue="move" label="Full Screen">
          <ToggleGroupItem
            className=" w-10 p-0"
            label="Full Screen"
            value="full"
            disabled={!selectedPage}
            onClick={() => setFullView(!isFullView)}
          >
            <MonitorSmartphone />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="h-app overflow-hidden">
        <div className="builder-grid border-l-1 ">
          <SectionsPanel />
          <MainWindow isFullView={isFullView} />

          <div>
            /component/breadcrumbs
            <Tabs defaultValue="edit" className="w-full h-app border-l">
              <TabsList className="grid w-full grid-cols-3 rounded-none">
                <TabsTrigger value="edit">Edit</TabsTrigger>

                <TabsTrigger value="properties" disabled={!selectedPage}>
                  Properties
                </TabsTrigger>

                <TabsTrigger value="css" disabled={!selectedPage}>
                  Class
                </TabsTrigger>
              </TabsList>

              <TabsContent className="h-[calc(100%-80px)]" value="edit">
                <EditPanel />
              </TabsContent>

              <TabsContent value="properties">
                <PropertiesPanel />
              </TabsContent>

              <TabsContent value="css">
                <CssPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}
PageBuilder.displayName = 'PageBuilder'

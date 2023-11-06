'use client'

import * as React from 'react'
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
      <div className="grid h-app page-builder-layout border-l-1 overflow-hidden">
        <SectionsPanel />
        <MainWindow isFullView={isFullView} />

        <PropertiesPanel />
      </div>
    </DndProvider>
  )
}
PageBuilder.displayName = 'PageBuilder'

'use client'

import * as React from 'react'
import {
  Bold,
  Italic,
  MoreHorizontal,
  Redo2,
  Strikethrough,
  Undo2,
} from 'lucide-react'

import {
  Editor,
  defaultValueCtx,
  editorViewCtx,
  rootCtx,
  serializerCtx,
} from '@milkdown/core'
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react'
import {
  commonmark,
  paragraphAttr,
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
} from '@milkdown/preset-commonmark'
import { callCommand } from '@milkdown/utils'
import { redoCommand, undoCommand } from '@milkdown/plugin-history'
import {
  insertTableCommand,
  toggleStrikethroughCommand,
} from '@milkdown/preset-gfm'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { prism } from '@milkdown/plugin-prism'
import { clipboard } from '@milkdown/plugin-clipboard'
import { gfm } from '@milkdown/preset-gfm'
import { history } from '@milkdown/plugin-history'
import { cursor } from '@milkdown/plugin-cursor'
import { replaceAll } from '@milkdown/utils'

import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group'
import { usePageStore } from '../store/page.store'
import { TextSelection } from '@milkdown/prose/state'
import { Button } from '@/components/ui/button'

export interface EditPanelProps {}

const MilkdownEditor: React.FC = ({ content = '', setContent }) => {
  const selectionRef = React.useRef<Record<string, any> | undefined>()

  const editor = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, content)
        ctx.set(paragraphAttr.key, () => ({
          class: 'px-1',
        }))
        ctx
          .get(listenerCtx)
          .markdownUpdated((_ctx, markdown, _prevMarkdown) => {
            setContent(markdown)
          })
      })

      .use(commonmark)
      .use(gfm)
      .use(history)
      .use(listener)
      .use(prism)
      .use(cursor)
      .use(clipboard)
  )

  function call<T>(command: CmdKey<T>, payload?: T) {
    return editor.get()?.action(callCommand(command, payload))
  }

  // React.useEffect(() => {
  //   const _editor = editor?.get()
  //   if (!_editor) return

  //   // Capture the current cursor position relative to the content
  //   const view = _editor.action((ctx) => ctx.get(editorViewCtx))
  //   const selectionIndex = view.state.selection.head // Assuming a simple cursor position for demonstration

  //   console.log('VIEW: ', view.state)

  //   // Perform your state update here
  //   // For example, updating the content
  //   _editor?.action(replaceAll(content))

  //   // After state update, restore the cursor position
  //   setTimeout(() => {
  //     const updatedView = _editor.action((ctx) => ctx.get(editorViewCtx))
  //     const updatedDoc = updatedView.state.doc

  //     // Convert the selection index to a valid selection in the new document
  //     const pos = Math.min(selectionIndex, updatedDoc.content.size)
  //     const newSelection = TextSelection.create(updatedView.state.doc, pos)

  //     updatedView.dispatch(updatedView.state.tr.setSelection(newSelection))
  //   }, 0)
  // }, [content])

  // React.useEffect(() => {
  //   const _editor = editor?.get()
  //   if (!_editor || !selectionRef) return

  //   const view = _editor.action((ctx) => ctx.get(editorViewCtx))
  //   view.dispatch(view.state.tr.setSelection(selectionRef.current as any))
  // }, [editor, selectionRef])

  return (
    <div className="h-full p-1">
      <ToggleGroup
        className="w-full rounded-none"
        label="Editor Toolbar"
        type="multiple"
      >
        <ToggleGroupItem
          className="w-full flex justify-center"
          label="Undo"
          value="undo"
          onClick={() => call(undoCommand.key)}
        >
          <Undo2 />
        </ToggleGroupItem>
        <ToggleGroupItem
          className="w-full flex justify-center"
          label="Redo"
          value="redo"
          onClick={() => call(redoCommand.key)}
        >
          <Redo2 />
        </ToggleGroupItem>
        <ToggleGroupItem
          className="w-full flex justify-center"
          label="Bold"
          value="bold"
          onClick={() => call(toggleStrongCommand.key)}
        >
          <Bold />
        </ToggleGroupItem>
        <ToggleGroupItem
          className="w-full flex justify-center"
          label="Italic"
          value="italic"
          onClick={() => call(toggleEmphasisCommand.key)}
        >
          <Italic />
        </ToggleGroupItem>
        <ToggleGroupItem
          className="w-full flex justify-center"
          label="Strike Through"
          value="strikeThrough"
          onClick={() => call(toggleStrikethroughCommand.key)}
        >
          <Strikethrough />
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="editor-panel-editor h-full relative bg-gray-600">
        <Milkdown />
      </div>
    </div>
  )
}

export const EditPanel = ({}: EditPanelProps) => {
  const { getEditableFields, updateSelectedChildren, getPageLayout } =
    usePageStore()
  const selectedElementPath = getPageLayout().selectedElement.path
  const editorRef = React.useRef(null)

  const fields = getEditableFields()

  // const content = !selectedElementPath
  //   ? ''
  //   : getSelectedChildren()
  //       ?.map((c) => c.children || c)
  //       .join('\n\n') || ''
  // console.log('Content: ', selectedElementPath, content)

  // React.useEffect(() => {
  //   if (selectedElementPath) {
  //     const content =
  //       getSelectedChildren()
  //         ?.map((c) => c.children || c)
  //         .join('\n\n') || ''

  //     // editorRef.current = (
  //     //   <MilkdownEditor content={content} setContent={updateSelectedChildren} />
  //     // )
  //   }
  // }, [content, selectedElementPath])

  const InputType = ({ type, content, ...props }: { type: string }) => {
    const handleTextChange = () => {}
    switch (type) {
      case 'text':
        return (
          <textarea
            {...props}
            onChange={handleTextChange}
            value={content.join('\n')}
          />
        )
      case 'image':
        return <img width={200} height={200} />
      case 'richtext': {
        const richTextContent = content.reduce((acc, curr) => {
          return curr.children ? acc.concat(curr.children + '\n\n') : acc
        }, '')

        return (
          <textarea
            {...props}
            onChange={handleTextChange}
            value={richTextContent}
          />
        )
      }
      case 'heading':
        null
      case 'links':
        return (
          <Button>
            <MoreHorizontal />
          </Button>
        )

      default:
        return null
    }
  }

  const form = fields.map(({ edit, children }) => {
    if (!edit) return null
    const { label, type, id } = edit
    return (
      <React.Fragment key={id}>
        <label className="block w-full">{label}</label>
        {children && (
          <InputType className="block w-full" type={type} content={children} />
        )}
      </React.Fragment>
    )
  })

  // return <MilkdownProvider>{form}</MilkdownProvider>

  return <form>{form}</form>
}

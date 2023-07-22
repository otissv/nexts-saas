'use client'

import { FormEvent, useRef, useState, useCallback, useEffect } from 'react'
import EditorJS from '@editorjs/editorjs'

import './editor.css'
import { cn } from '@/lib/utils'
import { postValidator } from '@/features/tenant_posts/posts.tenant.validators'
import { Button, buttonVariants } from '@/components/ui/button'
import { TestBlock } from './test-block'
import { TwoColumnBlock } from './two-column'
import { BackButton } from '@/components/buttons/back-button'

interface EditorProps {
  post: any
}

export function Editor({ post }: EditorProps) {
  const ref = useRef<EditorJS>()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const CheckList = (await import('@editorjs/checklist')).default
    const Code = (await import('@editorjs/code')).default
    const Delimiter = (await import('@editorjs/delimiter')).default
    const Embed = (await import('@editorjs/embed')).default
    const Header = (await import('@editorjs/header')).default
    const Image = (await import('@editorjs/image')).default
    const InlineCode = (await import('@editorjs/inline-code')).default
    const LinkTool = (await import('@editorjs/link')).default
    const List = (await import('@editorjs/list')).default
    const Marker = (await import('@editorjs/marker')).default
    const Quote = (await import('@editorjs/quote')).default
    const Raw = (await import('@editorjs/raw')).default
    const Table = (await import('@editorjs/table')).default
    const Warning = (await import('@editorjs/warning')).default

    const body = postValidator.parse(post)

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: body.content,
        readOnly: false,
        tools: {
          twoColumn: {
            class: TwoColumnBlock,
            inlineToolbar: true,
            config: {
              placeholder: 'Enter your username',
            },
          },
          template: {
            class: TestBlock,
            inlineToolbar: true,
            config: {
              placeholder: 'Paste image URL',
            },
          },
          checkList: CheckList,
          code: Code,
          divider: Delimiter,
          embed: Embed,
          heading: Header,
          image: Image,
          inlineCode: InlineCode,
          linkTool: LinkTool,
          list: List,
          marker: Marker,
          quote: Quote,
          raw: Raw,
          table: Table,
          warning: Warning,
        },
      })
    }
  }, [post])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    // setIsSaving(true)

    const blocks = await ref.current?.save()

    console.log(blocks)

    // const response = await fetch(`/api/posts/${post.id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     title: data.title,
    //     content: blocks,
    //   }),
    // })

    // setIsSaving(false)

    // if (!response?.ok) {
    //   return toast({
    //     title: 'Something went wrong.',
    //     description: 'Your post was not saved. Please try again.',
    //     variant: 'destructive',
    //   })
    // }

    // router.refresh()

    // return toast({
    //   description: 'Your post has been saved.',
    // })
  }

  if (!isMounted) {
    return null
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col w-full">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10 mb-5">
            <BackButton>Back</BackButton>
            <p className="text-sm text-muted-foreground">
              {post.published ? 'Published' : 'Draft'}
            </p>
          </div>
          <Button
            type="submit"
            className={cn(buttonVariants(), '-translate-y-2')}
          >
            Save
          </Button>
        </div>

        <p className="ml-12 text-sm text-gray-500 mb-5">
          Use{' '}
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
            Tab
          </kbd>{' '}
          to open the command menu.
        </p>

        <div className="ml-12 prose prose-stone dark:prose-invert border rounded">
          <div id="editor" className="min-h-[500px] " />
        </div>
      </div>
    </form>
  )
}

"use client"
import { markdownToHtml } from "@/lib/markdown-to-html"
import * as React from "react"

export interface InlineTextEditorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children: string
  isEdit?: boolean
  onBlur?: (event: React.FormEvent<HTMLSpanElement>) => void
  onFocus?: (event: React.FormEvent<HTMLSpanElement>) => void
}

export const InlineTextEditor = ({
  placeholder = "",
  children,
  isEdit,
  onBlur,
  onFocus,
  ...props
}: InlineTextEditorProps) => {
  const ref = React.useRef()
  const [isPlaceholderVisible, setIsPlaceholderVisible] = React.useState(
    children === ""
  )
  const __html = markdownToHtml(
    isPlaceholderVisible ? `${placeholder}` : children
  )

  const handleOnBlur = (event: React.FormEvent<HTMLSpanElement>) => {
    onBlur(event)
  }

  const handleOnFocus = (event: React.FormEvent<HTMLSpanElement>) => {
    // onFocus && onFocus(event)
    // if (isPlaceholderVisible) {
    //   ref.current.innerHTML = ""
    // }
  }

  const handleOnInput = (event: React.FormEvent<HTMLSpanElement>) => {
    setIsPlaceholderVisible(event.currentTarget.innerHTML === "")
  }

  return (
    <span
      ref={ref}
      contentEditable={isEdit}
      dangerouslySetInnerHTML={{
        __html: __html,
      }}
      suppressContentEditableWarning={true}
      onBlur={handleOnBlur}
      onInput={handleOnInput}
      onFocus={handleOnFocus}
      {...props}
    />
  )
}
InlineTextEditor.displayName = "InlineTextEditor"

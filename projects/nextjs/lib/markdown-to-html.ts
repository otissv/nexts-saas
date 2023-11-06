"use client"

import * as React from "react"

import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import DOMPurify from "dompurify"

export function markdownToHtml(
  text: string,
  options?: DOMPurify.Config & {
    RETURN_TRUSTED_TYPE: true
  }
) {
  const [html, setHtml] = React.useState("")

  React.useEffect(() => {
    ;(async () => {
      const file = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(text)

      const __html = DOMPurify.sanitize(file.value as string, {
        ALLOWED_TAGS: ["b", "i", "em", "strong", "a"],
        ALLOWED_ATTR: ["href"],
        ...options,
      }) as any as string

      setHtml(__html)
    })()

    return () => {}
  }, [text, setHtml])

  return html
}

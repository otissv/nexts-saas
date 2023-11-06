import TurndownService from "turndown"

export function htmlToMarkdown(options?: {
  headingStyle?: string
  hr?: string
  bulletListMarker?: "-" | "+" | "*"
  codeBlockStyle?: "indented" | "fenced"
  fence?: "```" | "~~~"
  emDelimiter?: "_" | "*"
  strongDelimiter?: "**" | "__"
  linkStyle?: "inlined" | "referenced"
  linkReferenceStyle?: "full" | "collapsed" | "shortcut"
  preformattedCode?: boolean
  blankReplacement?: (content: string, node: HTMLElement) => string
  keepReplacement?: (content: string, node: HTMLElement) => string
  defaultReplacement?: (content: string, node: HTMLElement) => string
}) {
  const turndownService = new TurndownService(options)

  return (html: string) => turndownService.turndown(html)
}

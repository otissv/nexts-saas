import { createRoot } from 'react-dom/client'
import { API } from '@editorjs/editorjs'

import { TwoColumn } from '../../two-column'

type Data = {
  [key: string]: any
}

type Config = {
  placeholder: string
}

export class TwoColumnBlock {
  private data: any
  private wrapper: HTMLDivElement = document.createElement('div')

  constructor({
    data,
    api,
    config,
  }: {
    data?: Data
    api: API
    config?: Config
  }) {
    this.data = data
    this.wrapper.id = 'reactblock'
  }

  static get toolbox() {
    return {
      title: 'Two Columns',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    }
  }

  render() {
    this.wrapper.classList.add('simple-image')

    const root = createRoot(this.wrapper) // createRoot(container!) if you use TypeScript
    root.render(<TwoColumn {...this.data} />)
    return this.wrapper
  }

  save(blockContent: HTMLInputElement) {
    const image: HTMLImageElement | null =
      blockContent.querySelector('.cmx-image img')
    const imageAnchor: HTMLAnchorElement | null =
      blockContent.querySelector('.cmx-image a')
    const content: HTMLCollection =
      blockContent.getElementsByClassName('cmx-content')

    const title = blockContent.querySelector(
      '[aria-labelledby="Title"]'
    )?.innerHTML
    const category = blockContent.querySelector(
      '[aria-labelledby="Category"]'
    )?.innerHTML

    return {
      title,
      category,
      image: {
        src: image?.src,
        alt: image?.alt,
        href: imageAnchor?.href,
      },
      content: Array.from(content || []).map((element) => element.innerHTML),
    }
  }
}

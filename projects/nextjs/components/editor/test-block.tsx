import { API } from '@editorjs/editorjs'

import './test-block.css'

type Data = {
  url: string
  caption: string
  alt: string
  withBorder: boolean
  withBackground: boolean
  stretched: boolean

  [key: string]: any
}

type Config = {
  placeholder: string | null
}

export class TestBlock {
  private data: Data
  private wrapper: HTMLElement = document.createElement('div')
  private settings: { name: string; icon: string }[]
  private api: any
  private config:
    | Config
    | {
        placeholder: null
      }

  constructor({
    data,
    api,
    config,
  }: {
    data?: Data
    api: API
    config?: Config
  }) {
    this.api = api
    this.config = config || {
      placeholder: null,
    }
    this.data = {
      url: data?.url || '',
      caption: data?.caption || '',
      withBorder: Boolean(data?.withBorder),
      withBackground: Boolean(data?.withBackground),
      stretched: Boolean(data?.stretched),
      alt: data?.alt || '',
    }

    this.settings = [
      {
        name: 'withBorder',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`,
      },
      {
        name: 'stretched',
        icon: `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>`,
      },
      {
        name: 'withBackground',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z"/></svg>`,
      },
    ]
  }

  static get pasteConfig() {
    return {
      tags: ['IMG'],
      files: {
        mimeTypes: ['image/*'],
        extensions: ['gif', 'jpg', 'png'], // You can specify extensions instead of mime-types
      },
      patterns: {
        image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i,
      },
    }
  }

  static get sanitize() {
    return {
      url: false, // disallow HTML
      caption: {}, // only tags from Inline Toolbar
    }
  }

  static get toolbox() {
    return {
      title: 'Template',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-template"><rect width="18" height="7" x="3" y="3" rx="1"/><rect width="9" height="7" x="3" y="14" rx="1"/><rect width="5" height="7" x="16" y="14" rx="1"/></svg>',
    }
  }

  onPaste(event: any) {
    switch (event.type) {
      // ... case 'tag'
      case 'file':
        /* We need to read file here as base64 string */
        const file = event.detail.file
        const reader = new FileReader()

        reader.onload = (loadEvent) => {
          this._createImage(loadEvent?.target?.result as any)
        }

        reader.readAsDataURL(file)
        break
    }
  }

  _createImage(url: string, captionText: string = '') {
    const image = document.createElement('img')
    const caption = document.createElement('div')

    image.src = url
    caption.contentEditable = 'true'
    caption.innerHTML = captionText

    this.wrapper.innerHTML = ''
    this.wrapper.appendChild(image)
    this.wrapper.appendChild(caption)

    this._acceptTuneView()
  }

  save(blockContent: HTMLElement) {
    const image = blockContent.querySelector('img')
    const caption = blockContent.querySelector('[contenteditable]')
    const alt = blockContent.querySelector('input')

    return Object.assign(this.data, {
      url: image?.src,
      caption: caption?.innerHTML || '',
      alt: alt?.value,
    })
  }

  validate(savedData: Data) {
    if (!savedData.url.trim()) {
      return false
    }

    return true
  }

  render() {
    this.wrapper.classList.add('simple-image')

    if (this.data && this.data.url) {
      this._createImage(this.data.url, this.data.caption)
      return this.wrapper
    }

    const input = document.createElement('input')

    input.placeholder = this.config?.placeholder || 'Paste an image URL...'
    input.addEventListener('paste', (event) => {
      this._createImage(event.clipboardData?.getData('text') || '', '')
    })

    this.wrapper.appendChild(input)

    return this.wrapper
  }

  renderSettings() {
    const wrapper = document.createElement('div')

    this.settings.forEach((tune) => {
      let button = document.createElement('div')

      button.classList.add(this.api.styles.settingsButton)
      button.classList.toggle(
        this.api.styles.settingsButtonActive,
        this.data[tune.name]
      )

      button.innerHTML = tune.icon
      wrapper.appendChild(button)

      button.addEventListener('click', () => {
        this._toggleTune(tune.name)
        button.classList.toggle(this.api.styles.settingsButtonActive)
      })
    })

    return wrapper
  }

  /**
   * @private
   * Click on the Settings Button
   * @param {string} tune — tune name from this.settings
   */
  _toggleTune(tune: string) {
    this.data[tune] = !this.data[tune]
    this._acceptTuneView()
  }

  /**
   * Add specified class corresponds with activated tunes
   * @private
   */
  _acceptTuneView() {
    this.settings.forEach((tune) => {
      this.wrapper.classList.toggle(tune.name, !!this.data[tune.name])

      if (tune.name === 'stretched') {
        this.api.blocks.stretchBlock(
          this.api.blocks.getCurrentBlockIndex(),
          !!this.data.stretched
        )
      }
    })
  }
}

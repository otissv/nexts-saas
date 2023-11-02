import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const log = (config: any) => (set: any, get: any, api: any) =>
  config(
    (args: any) => {
      set(args)
      if (process.env.NODE_ENV === 'development') {
        console.log('zustand:', JSON.parse(JSON.stringify(get(), null, 2)))
      }
    },
    get,
    api
  )

export const createStore = <Store>(store: any) =>
  create(log(devtools(store))) as () => Store

import { immer } from 'zustand/middleware/immer'

import { createStore } from '@/features/page-builder/store/create.store'

export type PropertyPseudo = 'before:' | 'after:' | ''
export type PropertyStates = 'hover:' | 'focus:' | 'active:' | ''
export type PropertyBreakpoints = 'md:' | 'lg:' | 'xl:' | ''

export type PropertiesState = {
  breakpoint: PropertyBreakpoints
  pseudo: PropertyPseudo
  state: PropertyStates
}

export type PropertyActions = {
  setBreakpoint: (breakpoint: PropertyBreakpoints) => void
  setPseudoType: (type: PropertyPseudo) => void
  setState: (states: PropertyStates) => void
}

export const usePropertiesStore = createStore<
  PropertiesState & PropertyActions
>(
  immer<PropertiesState & PropertyActions>((set) => ({
    _name: 'properties',
    breakpoint: '',
    pseudo: '',
    state: '',

    setBreakpoint: (breakpoint) =>
      set((state) => {
        if (state.breakpoint !== breakpoint) {
          state.breakpoint = breakpoint
        }
      }),

    setPseudoType: (pseudo) =>
      set((state) => {
        if (state.pseudo === pseudo) {
          state.pseudo = ''
        } else {
          state.pseudo = pseudo
        }
      }),

    setState: (pseudoState) =>
      set((state) => {
        if (state.state === pseudoState) {
          state.state = ''
        } else {
          state.state = pseudoState
        }
      }),
  }))
)

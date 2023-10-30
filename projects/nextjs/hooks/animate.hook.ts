import * as React from 'react'
import { animate } from 'popmotion'
import { useInView } from 'react-intersection-observer'

export type Animation = Record<string, any>
export type Animations = Record<string, Record<string, any>>

export type AnimationElementRef =
  | React.MutableRefObject<HTMLElement | undefined>
  | ((node?: Element | null | undefined) => void)

export function useAnimation(
  active = '',
  animations: Animations,
  ref?: AnimationElementRef
) {
  const currentAnimation = React.useRef(active)

  function reducer(
    state: Record<string, Record<string, any>>,
    action: Record<string, any>
  ) {
    return {
      ...state,
      [action.type]: action.value,
    }
  }

  const [styles, dispatch] = React.useReducer(reducer, {})

  React.useEffect(() => {
    if (!animations || currentAnimation.current === active) {
      return
    }

    for (const key of Object.keys(animations[active] || {})) {
      const {
        onUpdate,
        onComplete,

        ...prop
      } = animations[active][key]
      animate({
        ...prop,
        onComplete: () => onComplete && onComplete(ref),
        onUpdate: (value) => {
          const newValue = onUpdate ? onUpdate(value, ref) : value
          dispatch({
            type: key,
            value: newValue,
          })
        },
      })
    }

    currentAnimation.current = active ?? ''
  }, [active, animations, ref])

  return styles
}

export function useAnimateInView(animation: Animation) {
  const [active, setActive] = React.useState('')
  const { ref, inView } = useInView()

  const currentAnimation = useAnimation(
    active,
    {
      active: animation,
    },
    ref
  )

  React.useEffect(() => {
    if (inView) setActive('active')
  }, [inView])

  return { ref, inView, animation: currentAnimation }
}

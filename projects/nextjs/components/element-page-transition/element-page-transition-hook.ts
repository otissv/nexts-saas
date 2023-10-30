'use client'

import * as React from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { AnimationElementRef } from '@/hooks/animate.hook'

export type PageTransitionProp = {
  to: string
  onUpdate: () => void
  onComplete: (ref?: AnimationElementRef) => void
  onPlay: (ref?: AnimationElementRef) => void
  onStop: (ref?: AnimationElementRef) => void
  onRepeat: (ref?: AnimationElementRef) => void
}

export type PageTransition = {
  id: string
  currentPathName: string
  top?: number
  left?: number
  width?: number
  height?: number
}

export type SetPageTransition = (href: string, props: PageTransition) => void

export type GetPageTransition = (id: string) => PageTransition

export const useElementPageTransition = ({
  href,
  setPageState,
}: {
  href: string
  setPageState: SetPageTransition
}) => {
  const router = useRouter()

  const pathname = usePathname()

  const onElementClick = (id: string) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const element = e.currentTarget.querySelector(`[data-transition="${id}"]`)
    const { top, left, height, width } = element?.getBoundingClientRect() || {}

    setPageState(href, {
      top,
      left,
      height,
      width,
      currentPathName: pathname,
      id,
    })
    router.push(href)
  }

  return {
    onElementClick,
  }
}

const maybeProp = (prop: any, value: any) => (prop && value) ?? {}

export const useLoadElementPageTransition = ({
  getPage,
  ...props
}: {
  getPage: GetPageTransition
  width?: string | number | PageTransitionProp
  height?: string | number | PageTransitionProp
  top?: string | number | PageTransitionProp
  left?: string | number | PageTransitionProp
}) => {
  const [headerImageAnimation, setHeaderImageAnimation] = React.useState()
  const pathname = usePathname()

  const { top, left, width, height } = getPage(pathname) || {}

  const duration = top ? 1000 : 1

  const toWidth =
    props.width === 'full' || (props.width as PageTransitionProp)?.to === 'full'
      ? `${window.innerWidth}px`
      : `${(props.width as PageTransitionProp)?.to ?? props.width}px`

  const toHeight =
    props.height === 'full' ||
    (props.height as PageTransitionProp)?.to === 'full'
      ? `${window.innerHeight}px`
      : `${(props.height as PageTransitionProp)?.to ?? props.height}px`

  let toTransform = undefined || ''

  if ((props.top === 0 || props.top) ?? (props.left === 0 || props.left)) {
    toTransform = `translate(${
      (props.top as PageTransitionProp)?.to ?? props.top
    }px, ${(props.left as PageTransitionProp)?.to ?? props.left}px)`
  } else if (props.top === 0 || props.top) {
    toTransform = `translate(${
      (props.top as unknown as PageTransitionProp)?.to ?? props.top
    }px, ${(props.left as unknown as PageTransitionProp)?.to ?? props.left}px)`
  } else if (props.left === 0 || props.left) {
    toTransform = `translateX(${
      (props.left as unknown as PageTransitionProp)?.to ?? props.left
    }px)`
  }

  React.useEffect(() => {
    setHeaderImageAnimation({
      ...maybeProp(props.width, {
        width: {
          from: `${width}px`,
          to: toWidth,
          duration,
          onComplete: (props.width as PageTransitionProp)?.onComplete,
          flip: true,
        },
      }),
      ...maybeProp(props.height, {
        height: {
          from: `${height}px`,
          to: toHeight,
          duration,
          onComplete: (props.height as PageTransitionProp)?.onComplete,
          flip: true,
        },
      }),
      transform: {
        from: `translate(${left}px, ${top}px)`,
        to: toTransform,
        duration,
      },
      opacity: {
        from: 1,
        to: 1,
        duration,
      },
    })
  }, [])

  return { headerImageAnimation }
}

import { cn } from '@/lib/utils'
import React, { useMemo } from 'react'

export type PreloadType = 'none' | 'metadata' | 'auto'

export interface VideoInterface extends React.HTMLAttributes<HTMLElement> {
  allowFullScreen?: true
  autoplay?: true
  controls?: boolean
  embeded?: true
  height?: string
  intrinsicsize?: string
  inview?: true
  loop?: boolean
  muted?: true
  playsinline?: boolean
  preload?: PreloadType
  src?: string
  width?: string
}

export const Video = React.memo(function Video({
  children,
  className = '',
  embeded,
  ...props
}: VideoInterface) {
  return embeded ? (
    <div
      as={embeded ? null : 'video'}
      className={cn(className)}
      {...(embeded ? null : props)}
    >
      {embeded ? <iframe {...props} frameBorder="0" /> : children}
    </div>
  ) : (
    <video className={cn(className)} {...(embeded ? null : props)}>
      {embeded ? <iframe {...props} frameBorder="0" /> : children}
    </video>
  )
})

export default Video

'use client'

import * as React from 'react'

import { Textarea } from '@/components/ui/textarea'
import { usePageStore } from '../store/page.store'

export interface CssPanelProps {}

export const CssPanel = ({}: CssPanelProps) => {
  const { getPageLayout, setSelectedClassNames } = usePageStore()

  const value = getPageLayout().selectedProperties?.join(' ') || ''

  const handleOnClassNamesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    //TODO: add throttle
    setSelectedClassNames(event.target.value.split(' '))
  }

  return (
    <div className="p-1">
      <form id="classNames-form">
        <label htmlFor="classNames">Class Names</label>
        <Textarea
          className="bg-gray-600"
          name="classNames"
          id="classNames"
          value={value}
          onChange={handleOnClassNamesChange}
        />
      </form>
    </div>
  )
}

'use client'

import * as React from 'react'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useTranslateClient } from '@/components/translate/translate-client'
import { ButtonProps } from '@/components/buttons/types.button'

export const BackButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const router = useRouter()
    const t = useTranslateClient('ui.page.toolbar')

    return (
      <Button
        variant="ghost"
        className={className}
        onClick={() => router.back()}
        title={t('back.content')}
        ref={ref}
        {...props}
      >
        {children || (
          <>
            <ArrowLeft className="inline-block mr-2 h-4 w-4" />
            {t('back.content')}
          </>
        )}
      </Button>
    )
  }
)
BackButton.displayName = 'BackButton'

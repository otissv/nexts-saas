'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { isDev } from 'c-ufunc/libs/isDev'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Form, Submit } from '@/components/form/form'
import { FormConfig, useForm } from '@/components/form/useForm'

import { signInValidator } from '@/features/app-auth/auth.validators'
import {
  useTranslateClientComponent,
  useTranslateClient,
} from '@/components/translate/translate-client'
import { useErrorNotify } from '@/components/notify'

export function LoginForm({ providers }: { providers: string[] }) {
  const T = useTranslateClientComponent('ui.pages.authentication')
  const t = useTranslateClient('ui.pages.authentication')
  const errorNotify = useErrorNotify()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  React.useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        errorNotify({
          title: 'Login error',
          description: error || 'Authentication failed',
        })
      })
    }
  }, [error])

  const config: FormConfig = {
    username: {
      attributes: { placeholder: t('form.fields.username.placeholder') },
      classNames: {
        label: 'sr-only',
      },
      label: t('form.fields.username.label'),
      ref: React.useRef(null),
      error: t('form.fields.username.error'),
    },
    password: {
      type: 'password',
      attributes: { placeholder: t('form.fields.password.placeholder') },
      classNames: {
        label: 'sr-only',
      },
      label: t('form.fields.password.label'),
      ref: React.useRef(null),
      error: t('form.fields.password.error'),
    },
  }

  const onSubmit = async ({ error, values }: Submit) => {
    try {
      if (error || values?.username === '' || values?.password === '') {
        throw error
      }

      await signIn('credentials', {
        username: values?.username,
        password: values?.password,
        callbackUrl: '/',
      })
    } catch (error) {
      if (isDev()) {
        console.error('Error')
      }

      errorNotify({
        title: 'Something went wrong',
        description: 'There was a problem with your request.',
      })
    }
  }

  const schema = useForm(signInValidator, config)

  const form: Record<string, any> = {
    credentials: () => (
      <div className="grid gap-2">
        <Form
          id="login"
          className="grid gap-1"
          schema={schema}
          validator={signInValidator}
          submit={onSubmit}
        >
          <Button className="mt-2">
            <T>buttons.login.content</T>
          </Button>
        </Form>

        <p className=" mt-1 text-center text-sm text-muted-foreground">
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="/forgot-password"
          >
            <T>login.forgotPassword.content</T>
          </Link>
        </p>

        <p className=" mt-3 text-center text-sm text-muted-foreground">
          <T>login.text</T>{' '}
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="/signup"
          >
            <T>buttons.signup.content</T>
          </Link>
        </p>

        {providers.length > 0 && (
          <div className="relative flex justify-center text-xs uppercase my-5">
            <span className="bg-background px-2 text-muted-foreground ">
              <T>continueWith</T>
            </span>
          </div>
        )}
      </div>
    ),
    google: () => (
      <Button
        onClick={() => signIn('google')}
        className="w-72 mb-2 inline-block"
      >
        Google
      </Button>
    ),
    facebook: () => (
      <Button onClick={() => signIn('facebook')} className="w-72">
        Facebook
      </Button>
    ),
    twitter: () => (
      <Button onClick={() => signIn('twitter')} className="w-72">
        Twitter
      </Button>
    ),
    github: () => (
      <Button onClick={() => signIn('github')} className="w-72">
        Github
      </Button>
    ),
  }

  return (
    <>
      {providers.map((provider) => (
        <React.Fragment key={provider}>{form[provider]()}</React.Fragment>
      ))}
    </>
  )
}

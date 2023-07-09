'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { isDev } from 'c-ufunc/libs/isDev'

import { Button } from '@/components/ui/button'
import { Form, Submit } from '@/components/form'
import {
  FormConfig,
  createFormSchema,
} from '@/components/forms/createFormSchema'
import { signInValidator } from '@/features/app-auth/auth.validators'
import { translateClient, useTranslate } from '@/components/translate-client'
import { useErrorNotify } from '@/components/notify'

export function LoginForm({ providers }: { providers: string[] }) {
  const T = translateClient('ui.pages.authentication')
  const t = useTranslate('ui.pages.authentication')
  const errorNotify = useErrorNotify()

  const config: FormConfig = {
    username: {
      label: t('form.fields.username.label'),
      attributes: { placeholder: t('form.fields.username.placeholder') },
      classNames: {
        label: 'sr-only',
      },
      error: t('form.fields.username.error'),
    },
    password: {
      label: t('form.fields.password.label'),
      type: 'password',
      attributes: { placeholder: t('form.fields.password.placeholder') },
      classNames: {
        label: 'sr-only',
      },
      error: t('form.fields.password.error'),
    },
  }

  const onSubmit = async ({ error, values }: Submit) => {
    try {
      if (error) throw error

      await signIn('credentials', {
        username: values?.username,
        password: values?.password,
        callbackUrl: '/',
      })
    } catch (error) {
      if (isDev()) {
        console.error('Error')
        console.dir(error)
      }

      errorNotify({
        title: 'Something went wrong',
        description: 'There was a problem with your request.',
      })
    }

    signIn('credentials', {
      username: values?.username,
      password: values?.password,
      callbackUrl: '/',
    })
  }

  const schema = createFormSchema(signInValidator, config)

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
            <T>form.button.content</T>
          </Button>
        </Form>

        <p className=" mt-1 text-center text-sm text-muted-foreground">
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="/forgot-password"
          >
            <T>login.forgotPassword.a.content</T>
          </Link>
        </p>

        <p className=" mt-3 text-center text-sm text-muted-foreground">
          <T>login.text</T>{' '}
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="/signup"
          >
            <T>login.signup.a.content</T>
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

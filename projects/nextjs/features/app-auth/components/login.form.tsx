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
import { useErrorNotify } from '@/components/notify'

export function LoginForm({ providers }: { providers: string[] }) {
  const errorNotify = useErrorNotify()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

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
      attributes: { placeholder: 'username' },
      classNames: {
        label: 'sr-only',
      },
      label: 'Username',
      ref: React.useRef(null),
      error: 'Username should only should only contain letters and numbers.',
    },
    password: {
      type: 'password',
      attributes: { placeholder: 'password' },
      classNames: {
        label: 'sr-only',
      },
      label: 'Password',
      ref: React.useRef(null),
      error:
        'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character.',
    },
  }

  const onSubmit = async ({ error, values }: Submit) => {
    try {
      if (error || values?.username === '' || values?.password === '') {
        throw error
      }

      setIsSubmitting(true)

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

    setIsSubmitting(false)
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
          <Button className="mt-2" disabled={isSubmitting}>
            Login
          </Button>
        </Form>

        <p className=" mt-1 text-center text-sm text-muted-foreground">
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="/forgot-password"
          >
            Forgot password
          </Link>
        </p>

        <p className=" mt-3 text-center text-sm text-muted-foreground">
          Don&apos;t have an account
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="/signup"
          >
            OR CONTINUE WITH
          </Link>
        </p>

        {providers.length > 0 && (
          <div className="relative flex justify-center text-xs uppercase my-5">
            <span className="bg-background px-2 text-muted-foreground ">
              OR CONTINUE WITH
            </span>
          </div>
        )}
      </div>
    ),
    google: () => (
      <Button
        onClick={() => signIn('google')}
        className="w-72 mb-2 inline-block"
        disabled={isSubmitting}
      >
        Google
      </Button>
    ),
    facebook: () => (
      <Button
        onClick={() => signIn('facebook')}
        className="w-72"
        disabled={isSubmitting}
      >
        Facebook
      </Button>
    ),
    twitter: () => (
      <Button
        onClick={() => signIn('twitter')}
        className="w-72"
        disabled={isSubmitting}
      >
        Twitter
      </Button>
    ),
    github: () => (
      <Button
        onClick={() => signIn('github')}
        className="w-72"
        disabled={isSubmitting}
      >
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

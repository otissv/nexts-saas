import GoogleProvider from 'next-auth/providers/google'
import {
  Account,
  AuthOptions,
  Profile,
  Session,
  SessionStrategy,
  User,
} from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import { JWT } from 'next-auth/jwt/types'
import CredentialsProvider, {
  CredentialInput,
} from 'next-auth/providers/credentials'

import { serverContext } from '@/features/context-server-only'
import { env } from 'env/build'
import { authSignIn } from '@/features/app-auth/auth.actions'
import { oauthProviderSignup } from '@/features/app-oauth-providers/oauth-providers.action'
import { UserSession } from './auth.types'
import { isDev } from 'c-ufunc/libs/isDev'

const { google, nextAuthSecret } = env()
const { tenantsService, usersService } = serverContext()

export const authOptions: AuthOptions = {
  secret: nextAuthSecret,
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  providers: [
    GoogleProvider({
      clientId: google.clientId,
      clientSecret: google.clientSecret,
    }),
    // FacebookProvider({
    //   clientId: facebook.clientId,
    //   clientSecret: facebook.clientSecret,
    // }),
    // GithubProvider({
    //   clientId: github.clientId,
    //   clientSecret: github.clientSecret,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter username',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _req) {
        // You need to provide your own logic here that takes the credentials
        const result = await authSignIn({
          username: credentials?.username || '',
          password: credentials?.password || '',
        })

        if (result.error) {
          return Promise.reject('Sign in failed')
        } else {
          return result.data[0] as User
        }
      },
    }),
  ],

  callbacks: {
    async signIn({
      account,
      user,
      profile,
      credentials,
    }: {
      account: Account | null
      user: User | AdapterUser
      profile?: Profile | undefined
      credentials?: Record<string, CredentialInput> | undefined
    }) {
      try {
        if (credentials) {
          return true
        } else {
          const oauth = await oauthProviderSignup({
            provider: {
              provider: account?.provider || '',
              providerId: user.id,
            },
            user: {
              email: user.email || '',
              username: user.id || '',
              imageUrl: user.image || '',
              firstName: (profile as any)?.given_name || '',
              lastName: (profile as any)?.family_name || '',
              emailVerified: Boolean(account?.email_verified),
            },
          })

          if (oauth.error) throw oauth.error
          return true
        }
      } catch (error) {
        if (isDev()) {
          console.error(error)
        }
        return false
      }
    },

    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT
      user: User | AdapterUser
      account: Account | null
    }): Promise<UserSession> {
      const tenant = await tenantsService.selectByEmail({
        email: (token || user).email || '',
      })

      if (!tenant.data?.[0]) return {}

      const appUser = await usersService.selectByEmail({
        email: (token || user).email || '',
        columns: ['id'],
      })

      if (!appUser.data?.[0]) return {}

      const data = {
        ...token,
        ...user,
        userId: appUser.data[0]?.id,
      }

      //@ts-ignore do not send password. not to add as
      delete data.password

      return {
        ...data,
        accessToken: account?.access_token,
        tenantId: tenant.data[0] ? tenant.data[0]?.id : null,
      }
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      // TODO: FIX

      session.user = token
      return session
    },
  },

  pages: {
    signIn: '/login',
    error: '/error', // Error code passed in query string as ?error=
    verifyRequest: '/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
}

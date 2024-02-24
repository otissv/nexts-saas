import dotenv from 'dotenv'

dotenv.config({
  path: '../../.env',
})

const mayString = (value?: string) => value || ''

export const env = () => {
  return {
    nextAuthSecret: mayString(process.env.NEXTAUTH_SECRET),

    pageLimit: process.env.PAGE_LIMIT
      ? Number(process.env.PAGE_LIMIT)
      : Number(process.env.PAGE_MAX_ROWS),

    database: {
      database: mayString(process.env.POSTGRES_DATABASE),
      host: mayString(process.env.POSTGRES_HOST),
      idleTimeout: mayString(process.env.POSTGRES_IDLE_TIMEOUT),
      maxConnections: mayString(process.env.POSTGRES_MAX_CONNECTIONS),
      maxLifetime: mayString(process.env.POSTGRES_MAX_LIFETIME),
      password: mayString(process.env.POSTGRES_PASSWORD),
      port: mayString(process.env.POSTGRES_DATABASE_PORT),
      user: mayString(process.env.POSTGRES_USER),
    },

    isDev: process.env.NODE_ENV === 'development' || 'dev',
    isTest: process.env.NODE_ENV === 'test',
    isProd: process.env.NODE_ENV === 'production' || 'prod',

    google: {
      clientId: mayString(process.env.GOOGLE_CLIENT_ID),
      clientSecret: mayString(process.env.GOOGLE_CLIENT_SECRET),
    },

    facebook: {
      clientId: mayString(process.env.FACEBOOK_CLIENT_ID),
      clientSecret: mayString(process.env.FACEBOOK_CLIENT_SECRET),
    },

    github: {
      clientId: mayString(process.env.GITHUB_ID),
      clientSecret: mayString(process.env.GITHUB_SECRET),
    },

    aws: {
      iamUserName: process.env.IAM_USER_NAME,
      smtpUsername: process.env.SMTP_USERNAME,
      smtpPassword: process.env.SMTP_PASSWORD,
      smtpEndpoint: process.env.SMTP_ENDPOINT,
    },
  } as const
}

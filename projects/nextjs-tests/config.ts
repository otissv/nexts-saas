import dotenv from 'dotenv'

dotenv.config()

const mayBeString = (value: unknown) => (typeof value === 'string' ? value : '')

export function config() {
  return {
    google: {
      username: mayBeString(process.env.GOOGLE_USERNAME),
      password: mayBeString(process.env.GOOGLE_PASSWORD),
    },
  }
}

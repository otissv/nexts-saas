import { z } from 'zod'

import {
  userInsertValidator,
  userValidator,
  userUpdateValidator,
} from './users.validators'

/* Users */
export type User = z.infer<typeof userValidator>
export type UserInsert = z.infer<typeof userInsertValidator>
export type UserUpdate = z.infer<typeof userUpdateValidator>

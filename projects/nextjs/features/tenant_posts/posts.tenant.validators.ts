import { z } from 'zod'

export const postValidator = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
  createdAt: z.coerce.date(),
  createdBy: z.number().int().positive(),
  updatedAt: z.coerce.date(),
  updatedBy: z.number().int().positive(),
})

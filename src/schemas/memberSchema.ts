import { z } from 'zod'

export const createMemberSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must have at least 2 characters')
    .max(255, 'Name must have less than 255 characters'),
  membership: z.enum(['silver', 'platinum', 'gold'], {
    message: 'Membership must be one of: silver, platinum, gold'
  }),
  cpf: z
    .string()
    .length(11, 'CPF must have exactly 11 characters')
    .regex(/^\d+$/, 'CPF must contain only numbers'),
  email: z.string().email('Invalid email')
})

export const updateMemberSchema = createMemberSchema.extend({
  id: z.number()
})

export type CreateMemberInput = z.infer<typeof createMemberSchema>
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>

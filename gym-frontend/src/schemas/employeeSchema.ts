import { z } from 'zod'

export const createEmployeeSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must have at least 2 characters')
    .max(255, 'Name must have less than 255 characters'),
  email: z.string().email('Invalid email'),
  role: z.string().min(2, 'Role must have at least 2 characters'),
  cpf: z
    .string()
    .length(11, 'CPF must have exactly 11 characters')
    .regex(/^\d+$/, 'CPF must contain only numbers'),
  wage: z.number().min(1, 'Wage must be a positive number greater than zero')
})

export const updateEmployeeSchema = createEmployeeSchema.extend({
  id: z.number()
})

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>

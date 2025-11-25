import { z } from 'zod'

export const createEmployeeSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must have at least 2 characters')
    .max(50, 'Name must have less than 50 characters'),
  role: z
    .string()
    .min(3, 'Role must have at least 3 characters')
    .max(100, 'Role must have less than 100 characters'),
  cpf: z
    .string()
    .length(11, 'CPF must have exactly 11 characters')
    .regex(/^\d+$/, 'CPF must contain only numbers'),
  wage: z.number().min(1, 'Wage must be a positive number greater than zero')
})

export const updateEmployeeSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must have at least 2 characters')
      .max(50, 'Name must have less than 50 characters')
      .optional(),
    role: z
      .string()
      .min(3, 'Role must have at least 3 characters')
      .max(100, 'Role must have less than 100 characters')
      .optional(),
    cpf: z
      .string()
      .length(11, 'CPF must have exactly 11 characters')
      .regex(/^\d+$/, 'CPF must contain only numbers')
      .optional(),
    wage: z
      .number()
      .min(1, 'Wage must be a positive number greater than zero')
      .optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update'
  })

export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'ID must be a valid number')
    .transform(Number)
    .refine((num) => num > 0, 'ID must be positive')
})

export const createMemberSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must have at least 2 characters')
    .max(50, 'Name must have less than 50 characters'),
  membership: z.enum(['silver', 'platinum', 'gold'], {
    message: 'Membership must be one of: silver, platinum, gold'
  }),
  cpf: z
    .string()
    .length(11, 'CPF must have exactly 11 characters')
    .regex(/^\d+$/, 'CPF must contain only numbers')
})

export const updateMemberSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must have at least 2 characters')
      .max(50, 'Name must have less than 50 characters')
      .optional(),
    membership: z
      .enum(['silver', 'platinum', 'gold'], {
        message: 'Membership must be one of: silver, platinum, gold'
      })
      .optional(),
    cpf: z
      .string()
      .length(11, 'CPF must have exactly 11 characters')
      .regex(/^\d+$/, 'CPF must contain only numbers')
      .optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update'
  })

const exerciseSchema = z.object({
  name: z
    .string()
    .min(2, 'Exercise name must have at least 2 characters')
    .max(50, 'Exercise name must have less than 50 characters'),
  reps: z
    .number()
    .int('Reps must be an integer')
    .min(1, 'Reps must be at least 1')
    .max(1000, 'Reps cannot exceed 1000'),
  interval: z
    .number()
    .int('Interval must be an integer')
    .min(1, 'Interval must be at least 1 second')
    .max(3600, 'Interval cannot exceed 3600 seconds')
})

export const createWorkoutSchema = z.object({
  exercises: z
    .array(exerciseSchema)
    .min(1, 'Workout must have at least 1 exercise')
    .max(20, 'Workout cannot have more than 20 exercises'),
  personalId: z
    .number()
    .int('Personal ID must be an integer')
    .min(1, 'Personal ID must be positive'),
  memberId: z
    .number()
    .int('Member ID must be an integer')
    .min(1, 'Member ID must be positive')
})

export const updateWorkoutSchema = z
  .object({
    exercises: z
      .array(exerciseSchema)
      .min(1, 'Workout must have at least 1 exercise')
      .max(20, 'Workout cannot have more than 20 exercises')
      .optional(),
    personalId: z
      .number()
      .int('Personal ID must be an integer')
      .min(1, 'Personal ID must be positive')
      .optional(),
    memberId: z
      .number()
      .int('Member ID must be an integer')
      .min(1, 'Member ID must be positive')
      .optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update'
  })

export type CreateEmployeeData = z.infer<typeof createEmployeeSchema>
export type UpdateEmployeeData = z.infer<typeof updateEmployeeSchema>
export type CreateMemberData = z.infer<typeof createMemberSchema>
export type UpdateMemberData = z.infer<typeof updateMemberSchema>
export type CreateWorkoutData = z.infer<typeof createWorkoutSchema>
export type UpdateWorkoutData = z.infer<typeof updateWorkoutSchema>
export type IdParam = z.infer<typeof idParamSchema>

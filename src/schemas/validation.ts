import { z } from 'zod'
import { createEmployeeSchema, updateEmployeeSchema } from './employeeSchema'
import { createMemberSchema, updateMemberSchema } from './memberSchema'
import { loginSchema } from './loginSchema'
import { createWorkoutSchema, updateWorkoutSchema } from './workoutSchema'

export const validateCreateEmployee = (data: unknown) => {
  try {
    const validatedData = createEmployeeSchema.parse(data)
    return { success: true as const, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      for (const issue of error.issues) {
        const key = String(issue.path[0])
        errors[key] = issue.message
      }
      return { success: false as const, errors }
    }
    throw error
  }
}

export const validateUpdateEmployee = (data: unknown) => {
  try {
    const validatedData = updateEmployeeSchema.parse(data)
    return { success: true as const, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      for (const issue of error.issues) {
        const key = String(issue.path[0])
        errors[key] = issue.message
      }
      return { success: false as const, errors }
    }
    throw error
  }
}

export const validateCreateMember = (data: unknown) => {
  try {
    const validatedData = createMemberSchema.parse(data)
    return { success: true as const, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      for (const issue of error.issues) {
        const key = String(issue.path[0])
        errors[key] = issue.message
      }
      return { success: false as const, errors }
    }
    throw error
  }
}

export const validateUpdateMember = (data: unknown) => {
  try {
    const validatedData = updateMemberSchema.parse(data)
    return { success: true as const, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      for (const issue of error.issues) {
        const key = String(issue.path[0])
        errors[key] = issue.message
      }
      return { success: false as const, errors }
    }
    throw error
  }
}

export const validateLogin = (data: unknown) => {
  try {
    const validatedData = loginSchema.parse(data)
    return { success: true as const, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      for (const issue of error.issues) {
        const key = String(issue.path[0])
        errors[key] = issue.message
      }
      return { success: false as const, errors }
    }
    throw error
  }
}

export const validateCreateWorkout = (data: unknown) => {
  try {
    const validatedData = createWorkoutSchema.parse(data)
    return { success: true as const, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      for (const issue of error.issues) {
        const key = String(issue.path[0])
        errors[key] = issue.message
      }
      return { success: false as const, errors }
    }
    throw error
  }
}

export const validateUpdateWorkout = (data: unknown) => {
  try {
    const validatedData = updateWorkoutSchema.parse(data)
    return { success: true as const, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      for (const issue of error.issues) {
        const key = String(issue.path[0])
        errors[key] = issue.message
      }
      return { success: false as const, errors }
    }
    throw error
  }
}

export const validateField = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: z.ZodObject<any>,
  fieldName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): string => {
  try {
    const fieldSchema = schema.shape[fieldName]
    if (fieldSchema) {
      fieldSchema.parse(value)
    }
    return ''
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0]?.message || 'Valor inválido'
    }
    return ''
  }
}

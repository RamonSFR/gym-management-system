import { z } from 'zod'

export const createWorkoutSchema = z.object({
    exercises: z.array(
        z.object({
            name: z.string().min(2).max(100),
            sets: z.number().min(1),
            reps: z.number().min(1)
        })
    )
})

export const updateWorkoutSchema = createWorkoutSchema.extend({
    id: z.number()
})

export type CreateWorkoutInput = z.infer<typeof createWorkoutSchema>
export type UpdateWorkoutInput = z.infer<typeof updateWorkoutSchema>


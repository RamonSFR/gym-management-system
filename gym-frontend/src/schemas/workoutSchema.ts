import { z } from 'zod'

export const ExerciseSchema = z.object({
  name: z.string().min(1),
  reps: z.number().int().min(1),
  interval: z.number().int().min(1)
})

export const WorkoutSchema = z.object({
  id: z.number().int(),
  exercises: z.array(ExerciseSchema),
  personalId: z.number().int().nullable().optional(),
  memberId: z.number().int().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export const WorkoutsSchema = z.array(WorkoutSchema)

export type Exercise = z.infer<typeof ExerciseSchema>
export type Workout = z.infer<typeof WorkoutSchema>
export type Workouts = z.infer<typeof WorkoutsSchema>

export default WorkoutsSchema

import { prisma } from '../database/prisma'
import { Workout } from '../generated/prisma'

export interface Exercise {
  name: string
  reps: number
  interval: number
}

export type WorkoutExercises = Exercise[]

type workoutCreateData = Omit<Workout, 'id' | 'createdAt' | 'updatedAt'> & {
  exercises: WorkoutExercises
}

type workoutUpdateData = Partial<workoutCreateData>

export const getAll = async (): Promise<Workout[]> => {
  return prisma.workout.findMany({
    include: {
      personal: true,
      member: true
    }
  })
}

export const getById = async (id: number): Promise<Workout | null> => {
  return prisma.workout.findUnique({
    where: { id },
    include: {
      personal: true,
      member: true
    }
  })
}

export const add = async (data: workoutCreateData): Promise<Workout> => {
  const { id, createdAt, updatedAt, ...cleanData } = data as any
  return prisma.workout.create({ data: cleanData })
}

export const update = async (
  id: number,
  data: workoutUpdateData
): Promise<Workout> => {
  const { id: excludeId, createdAt, updatedAt, ...cleanData } = data as any
  return prisma.workout.update({ where: { id }, data: cleanData })
}

export const remove = async (id: number): Promise<Workout> => {
  return prisma.workout.delete({ where: { id } })
}

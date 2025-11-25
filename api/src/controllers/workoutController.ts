import { Request, Response } from 'express'
import * as service from '../services/workoutService'
import { Exercise, WorkoutExercises } from '../services/workoutService'

function isValidExercise(exercise: any): exercise is Exercise {
  return (
    typeof exercise === 'object' &&
    exercise !== null &&
    typeof exercise.name === 'string' &&
    typeof exercise.reps === 'number' &&
    typeof exercise.interval === 'number' &&
    exercise.name.trim().length > 0 &&
    exercise.reps > 0 &&
    exercise.interval > 0
  )
}

function validateExercises(exercises: any): exercises is WorkoutExercises {
  return (
    Array.isArray(exercises) &&
    exercises.length > 0 &&
    exercises.every(isValidExercise)
  )
}

export const getAllWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await service.getAll()
    return res.json(workouts)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const getWorkoutById = async (req: Request, res: Response) => {
  try {
    const workout = await service.getById(Number(req.params.id))
    return !workout
      ? res.status(404).json({ message: 'Workout not found' })
      : res.json(workout)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const addNewWorkout = async (req: Request, res: Response) => {
  try {
    if (
      'id' in req.body ||
      'createdAt' in req.body ||
      'updatedAt' in req.body
    ) {
      return res.status(400).json({
        message:
          'Cannot provide id, createdAt, or updatedAt when creating a workout'
      })
    }

    if (!req.body.exercises || !validateExercises(req.body.exercises)) {
      return res.status(400).json({
        message:
          'Exercises must be an array of objects with name (string), reps (number > 0), and interval (number > 0) properties'
      })
    }

    const workout = await service.add(req.body)
    return res.status(201).json(workout)
  } catch (error: any) {
    if (error.code === 'P2002')
      return res.status(409).json({
        message: `Unique field already exists: ${error.meta?.target || 'unknown field'}`
      })
    return res.status(500).json({ message: error.message })
  }
}

export const removeWorkout = async (req: Request, res: Response) => {
  try {
    await service.remove(Number(req.params.id))
    return res.status(204).send()
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Workout not found' })
    }
    return res.status(500).json({ message: error.message })
  }
}

export const updateWorkout = async (req: Request, res: Response) => {
  try {
    if (
      'id' in req.body ||
      'createdAt' in req.body ||
      'updatedAt' in req.body
    ) {
      return res.status(400).json({
        message: 'Cannot update id, createdAt, or updatedAt fields'
      })
    }

    if (req.body.exercises && !validateExercises(req.body.exercises)) {
      return res.status(400).json({
        message:
          'Exercises must be an array of objects with name (string), reps (number > 0), and interval (number > 0) properties'
      })
    }

    const workout = await service.update(Number(req.params.id), req.body)
    return res.json(workout)
  } catch (error: any) {
    if (error.code === 'P2025')
      return res.status(404).json({ message: 'Workout not found' })
    if (error.code === 'P2002')
      return res.status(409).json({
        message: `Unique field already exists: ${error.meta?.target || 'unknown field'}`
      })
    return res.status(500).json({ message: error.message })
  }
}

import { Router } from 'express'
import * as controller from '../controllers/workoutController'
import { validateBody, validateParams } from '../middlewares/validation'
import {
  createWorkoutSchema,
  idParamSchema,
  updateWorkoutSchema
} from '../schemas/validation'

const workoutRoutes = Router()

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get all workouts
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: List of all workouts with employee and member details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workout'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
workoutRoutes.get('/workouts', controller.getAllWorkouts)

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     summary: Get workout by ID
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Workout ID
 *     responses:
 *       200:
 *         description: Workout details with employee and member information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
workoutRoutes.get(
  '/workouts/:id',
  validateParams(idParamSchema),
  controller.getWorkoutById
)

/**
 * @swagger
 * /workouts:
 *   post:
 *     summary: Create a new workout
 *     tags: [Workouts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [exercises, personalId, memberId]
 *             properties:
 *               exercises:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Exercise'
 *                 example:
 *                   - name: "Push-ups"
 *                     reps: 15
 *                     interval: 30
 *                   - name: "Squats"
 *                     reps: 20
 *                     interval: 45
 *               personalId:
 *                 type: integer
 *                 description: ID of the personal trainer
 *                 example: 1
 *               memberId:
 *                 type: integer
 *                 description: ID of the member
 *                 example: 2
 *     responses:
 *       201:
 *         description: Workout created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
workoutRoutes.post(
  '/workouts',
  validateBody(createWorkoutSchema),
  controller.addNewWorkout
)

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     summary: Delete workout by ID
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Workout ID
 *     responses:
 *       204:
 *         description: Workout deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
workoutRoutes.delete(
  '/workouts/:id',
  validateParams(idParamSchema),
  controller.removeWorkout
)

/**
 * @swagger
 * /workouts/{id}:
 *   put:
 *     summary: Update workout by ID
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Workout ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exercises:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Exercise'
 *                 example:
 *                   - name: "Modified Push-ups"
 *                     reps: 20
 *                     interval: 25
 *     responses:
 *       200:
 *         description: Workout updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
workoutRoutes.put(
  '/workouts/:id',
  validateParams(idParamSchema),
  validateBody(updateWorkoutSchema),
  controller.updateWorkout
)

export default workoutRoutes

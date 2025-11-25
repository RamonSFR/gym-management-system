import { Router } from 'express'

import * as controller from '../controllers/employeeController'
import { validateBody, validateParams } from '../middlewares/validation'
import {
  createEmployeeSchema,
  idParamSchema,
  updateEmployeeSchema,
  loginSchema
} from '../schemas/validation'

const employeeRoutes = Router()

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of all employees with their workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
employeeRoutes.get('/employees', controller.getAllEmployees)

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee details with workouts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
employeeRoutes.get(
  '/employees/:id',
  validateParams(idParamSchema),
  controller.getEmployeeById
)

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       $ref: '#/components/requestBodies/EmployeeInput'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
employeeRoutes.post(
  '/employees',
  validateBody(createEmployeeSchema),
  controller.addNewEmployee
)

/**
 * @swagger
 * /employees/login:
 *   post:
 *     summary: Employee login
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "trainer@example.com"
 *               password:
 *                 type: string
 *                 example: "yourpassword"
 *     responses:
 *       200:
 *         description: Authenticated employee object (password omitted)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Invalid credentials
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// login
employeeRoutes.post(
  '/employees/login',
  validateBody(loginSchema),
  controller.getEmployeeByLogin
)

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
employeeRoutes.delete(
  '/employees/:id',
  validateParams(idParamSchema),
  controller.removeEmployee
)

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     requestBody:
 *       $ref: '#/components/schemas/EmployeeUpdate'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
employeeRoutes.put(
  '/employees/:id',
  validateParams(idParamSchema),
  validateBody(updateEmployeeSchema),
  controller.updateEmployee
)

export default employeeRoutes

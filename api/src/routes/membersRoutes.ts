import { Router } from 'express'
import * as controller from '../controllers/memberController'
import { validateBody, validateParams } from '../middlewares/validation'
import {
  createMemberSchema,
  idParamSchema,
  updateMemberSchema
} from '../schemas/validation'

const membersRoutes = Router()

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: List of all members with their workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
membersRoutes.get('/members', controller.getAllMembers)

/**
 * @swagger
 * /members/{id}:
 *   get:
 *     summary: Get member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Member ID
 *     responses:
 *       200:
 *         description: Member details with workouts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
membersRoutes.get(
  '/members/:id',
  validateParams(idParamSchema),
  controller.getMemberById
)

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, membership, cpf]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Member"
 *               membership:
 *                 type: string
 *                 enum: [silver, platinum, gold]
 *                 example: "gold"
 *               cpf:
 *                 type: string
 *                 example: "98765432100"
 *     responses:
 *       201:
 *         description: Member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
membersRoutes.post(
  '/members',
  validateBody(createMemberSchema),
  controller.addNewMember
)

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Delete member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Member ID
 *     responses:
 *       204:
 *         description: Member deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
membersRoutes.delete(
  '/members/:id',
  validateParams(idParamSchema),
  controller.removeMember
)

/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Update member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Updated Member"
 *               membership:
 *                 type: string
 *                 enum: [silver, platinum, gold]
 *                 example: "platinum"
 *               cpf:
 *                 type: string
 *                 example: "98765432101"
 *     responses:
 *       200:
 *         description: Member updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
membersRoutes.put(
  '/members/:id',
  validateParams(idParamSchema),
  validateBody(updateMemberSchema),
  controller.updateMember
)

export default membersRoutes

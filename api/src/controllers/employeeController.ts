import { Request, Response } from 'express'

import * as service from '../services/employeeService'

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await service.getAll()
    return res.json(employees)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await service.getById(Number(req.params.id))
    return !employee
      ? res.status(404).json({ message: 'Employee not found' })
      : res.json(employee)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const addNewEmployee = async (req: Request, res: Response) => {
  try {
    if (
      'id' in req.body ||
      'createdAt' in req.body ||
      'updatedAt' in req.body
    ) {
      return res.status(400).json({
        message:
          'Cannot provide id, createdAt, or updatedAt when creating employee'
      })
    }

    const newEmployee = await service.add(req.body)
    return res.status(201).json(newEmployee)
  } catch (error: any) {
    if (error.code === 'P2002')
      return res.status(409).json({
        message: `Unique field already exists: ${error.meta?.target || 'unknown field'}`
      })
    return res.status(500).json({ message: error.message })
  }
}

export const removeEmployee = async (req: Request, res: Response) => {
  try {
    await service.remove(Number(req.params.id))
    return res.status(204).send()
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Employee not found' })
    }
    return res.status(500).json({ message: error.message })
  }
}

export const updateEmployee = async (req: Request, res: Response) => {
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

    const toUpdateEmployee = await service.update(
      Number(req.params.id),
      req.body
    )
    return res.json(toUpdateEmployee)
  } catch (error: any) {
    if (error.code === 'P2025')
      return res.status(404).json({ message: 'Employee not found' })
    if (error.code === 'P2002')
      return res.status(409).json({
        message: `Unique field already exists: ${error.meta?.target || 'unknown field'}`
      })
    return res.status(500).json({ message: error.message })
  }
}

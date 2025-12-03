import { Request, Response } from 'express'

import * as service from '../services/employeeService'

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await service.getAll()
    const safe = employees.map((e: any) => {
      const { password: _pw, ...rest } = e as any
      return rest
    })
    return res.json(safe)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await service.getById(Number(req.params.id))
    return !employee
      ? res.status(404).json({ message: 'Employee not found' })
      : (() => {
          const { password: _pw, ...rest } = employee as any
          return res.json(rest)
        })()
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
    const { password: _pw, ...safe } = newEmployee as any
    return res.status(201).json(safe)
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
    const { password: _pw, ...safe } = toUpdateEmployee as any
    return res.json(safe)
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

export const getEmployeeByLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const employee = await service.getByLogin(email, password)
    if (!employee) {
      return res.status(404).json({ message: 'Invalid credentials' })
    }
    const { password: _pw, ...safeEmployee } = employee as any
    return res.json(safeEmployee)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

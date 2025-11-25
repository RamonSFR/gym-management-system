import { Request, Response } from 'express'

import * as service from '../services/memberService'

export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const members = await service.getAll()
    return res.json(members)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const member = await service.getById(Number(req.params.id))
    return !member
      ? res.status(404).json({ message: 'Member not found' })
      : res.json(member)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const addNewMember = async (req: Request, res: Response) => {
  try {
    if (
      'id' in req.body ||
      'createdAt' in req.body ||
      'updatedAt' in req.body
    ) {
      return res.status(400).json({
        message:
          'Cannot provide id, createdAt, or updatedAt when creating a member'
      })
    }

    if (
      req.body.membership &&
      !['silver', 'platinum', 'gold'].includes(req.body.membership)
    ) {
      return res.status(400).json({
        message: `Membership field must be "silver" "platinum" or "gold"`
      })
    }

    const newMember = await service.add(req.body)
    return res.status(201).json(newMember)
  } catch (error: any) {
    if (error.code === 'p2002')
      return res
        .status(409)
        .json({ message: `Unique field already exists: ${error.meta.target}` })
    return res.status(500).json({ message: error.message })
  }
}

export const removeMember = async (req: Request, res: Response) => {
  try {
    await service.remove(Number(req.params.id))
    return res.status(204).send()
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Member not found' })
    }
    return res.status(500).json({ message: error.message })
  }
}

export const updateMember = async (req: Request, res: Response) => {
  try {
    if (
      'id' in req.body ||
      'createdAt' in req.body ||
      'updatedAt' in req.body
    ) {
      return res
        .status(400)
        .json({ message: 'Cannot update id, createdAt, or updatedAt fields' })
    }

    if (
      req.body.membership &&
      !['silver', 'platinum', 'gold'].includes(req.body.membership)
    ) {
      return res.status(400).json({
        message: `Membership field must be "silver" "platinum" or "gold"`
      })
    }

    const updatedMember = await service.update(Number(req.params.id), req.body)
    return res.status(200).json(updatedMember)
  } catch (error: any) {
    if (error.code === 'P2025')
      return res.status(404).json({ message: 'Member not found' })
    if (error.code === 'P2002')
      return res
        .status(409)
        .json({ message: `Unique field already exists: ${error.meta.target}` })
    return res.status(500).json({ message: error.message })
  }
}

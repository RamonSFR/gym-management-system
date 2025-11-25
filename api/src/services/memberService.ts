import { prisma } from '../database/prisma'
import { Member } from '../generated/prisma'

type memberCreateData = Omit<Member, 'id' | 'createdAt' | 'updatedAt'>
type memberUpdateData = Partial<memberCreateData>

export const getAll = async (): Promise<Member[]> => {
  return prisma.member.findMany()
}

export const getById = async (id: number): Promise<Member | null> => {
  return prisma.member.findUnique({
    where: { id },
    include: {
      workouts: true
    }
  })
}

export const update = async (
  id: number,
  data: memberUpdateData
): Promise<Member> => {
  const { id: excludeId, createdAt, updatedAt, ...cleanData } = data as any
  return prisma.member.update({ where: { id }, data: cleanData })
}

export const add = async (data: memberCreateData): Promise<Member> => {
  const { id, createdAt, updatedAt, ...cleanData } = data as any
  return prisma.member.create({ data: cleanData })
}

export const remove = async (id: number): Promise<Member> => {
  return prisma.member.delete({ where: { id } })
}

import { prisma } from '../database/prisma'
import { Member } from '../generated/prisma'
import bcrypt from 'bcryptjs'

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

export const getByLogin = async (
  email: string,
  password: string
): Promise<Member | null> => {
  const member = await prisma.member.findUnique({ where: { email } })
  if (!member) return null
  const match = await bcrypt.compare(password, (member as any).password)
  return match ? member : null
}

export const update = async (
  id: number,
  data: memberUpdateData
): Promise<Member> => {
  const { id: excludeId, createdAt, updatedAt, ...cleanData } = data as any
  if (cleanData.password) {
    cleanData.password = await bcrypt.hash(cleanData.password, 10)
  }
  return prisma.member.update({ where: { id }, data: cleanData })
}

export const add = async (data: memberCreateData): Promise<Member> => {
  const { id, createdAt, updatedAt, ...cleanData } = data as any
  if (cleanData.password) {
    cleanData.password = await bcrypt.hash(cleanData.password, 10)
  }
  return prisma.member.create({ data: cleanData })
}

export const remove = async (id: number): Promise<Member> => {
  return prisma.member.delete({ where: { id } })
}

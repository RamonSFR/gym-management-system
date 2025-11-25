import { Employee } from '../generated/prisma'
import { prisma } from '../database/prisma'

type employeeCreateData = Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>
type employeeUpdateData = Partial<employeeCreateData>

export const getAll = async (): Promise<Employee[]> => {
  return prisma.employee.findMany()
}

export const getById = async (id: number): Promise<Employee | null> => {
  return prisma.employee.findUnique({
    where: { id },
    include: {
      workouts: true
    }
  })
}

export const add = async (data: employeeCreateData): Promise<Employee> => {
  const { id, createdAt, updatedAt, ...cleanData } = data as any
  return prisma.employee.create({ data: cleanData })
}

export const update = async (
  id: number,
  data: employeeUpdateData
): Promise<Employee> => {
  const { id: excludeId, createdAt, updatedAt, ...cleanData } = data as any
  return prisma.employee.update({ where: { id }, data: cleanData })
}

export const remove = async (id: number): Promise<Employee> => {
  return prisma.employee.delete({ where: { id } })
}

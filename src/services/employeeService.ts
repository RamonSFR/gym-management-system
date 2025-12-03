import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'

export const getEmployees = async () => {
  const response = await axios.get(`${API_ENDPOINTS.EMPLOYEES}`)
  return response.data
}

export const getEmployeeById = async (id: number) => {
  const response = await axios.get(`${API_ENDPOINTS.EMPLOYEES}/${id}`)
  return response.data
}

export const createEmployee = async (payload: {
  name: string
  email: string
  password: string
  role: string
  cpf: string
  wage: number
}) => {
  const response = await axios.post(`${API_ENDPOINTS.EMPLOYEES}`, payload)
  return response.data
}

export const updateEmployee = async (
  id: number,
  payload: Partial<{
    name: string
    email: string
    role: string
    cpf: string
    wage: number
  }>
) => {
  const response = await axios.put(`${API_ENDPOINTS.EMPLOYEES}/${id}`, payload)
  return response.data
}

export const deleteEmployee = async (id: number) => {
  const response = await axios.delete(`${API_ENDPOINTS.EMPLOYEES}/${id}`)
  return response.status === 204
}

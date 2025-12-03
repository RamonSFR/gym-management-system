import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'

export const getMembers = async () => {
  const response = await axios.get(`${API_ENDPOINTS.MEMBERS}`)
  return response.data
}

export const getMemberById = async (id: number) => {
  const response = await axios.get(`${API_ENDPOINTS.MEMBERS}/${id}`)
  return response.data
}

export const createMember = async (payload: {
  name: string
  email: string
  password: string
  membership: string
  cpf: string
}) => {
  const response = await axios.post(`${API_ENDPOINTS.MEMBERS}`, payload)
  return response.data
}

export const updateMember = async (
  id: number,
  payload: Partial<{
    name: string
    email: string
    membership: string
    cpf: string
  }>
) => {
  const response = await axios.put(`${API_ENDPOINTS.MEMBERS}/${id}`, payload)
  return response.data
}

export const deleteMember = async (id: number) => {
  const response = await axios.delete(`${API_ENDPOINTS.MEMBERS}/${id}`)
  return response.status === 204
}

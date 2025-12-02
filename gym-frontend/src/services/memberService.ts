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

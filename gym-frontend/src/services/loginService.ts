import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'

export const memberLogin = async (email: string, password: string) => {
  const response = await axios.post<Member>(`${API_ENDPOINTS.MEMBER_LOGIN}`, {
    email,
    password
  })
  return response.data
}

export const employeeLogin = async (email: string, password: string) => {
  const response = await axios.post<Employee>(
    `${API_ENDPOINTS.EMPLOYEE_LOGIN}`,
    {
      email,
      password
    }
  )
  return response.data
}

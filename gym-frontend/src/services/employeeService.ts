import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'

export const getEmployee = async () => {
    const response = await axios.get(`${API_ENDPOINTS.EMPLOYEES}`)
    return response.data
}

export const getEmployeeById = async (id: number) => {
    const response = await axios.get(`${API_ENDPOINTS.EMPLOYEES}/${id}`)
    return response.data
}

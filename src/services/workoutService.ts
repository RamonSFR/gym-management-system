import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'

export const getWorkouts = async () => {
  const response = await axios.get(`${API_ENDPOINTS.WORKOUTS}`)
  return response.data
}

export const getWorkoutById = async (id: number) => {
  const response = await axios.get(`${API_ENDPOINTS.WORKOUTS}/${id}`)
  return response.data
}

export const createWorkout = async (payload: unknown) => {
  const response = await axios.post(`${API_ENDPOINTS.WORKOUTS}`, payload)
  return response.data
}

export const updateWorkout = async (id: number, payload: unknown) => {
  const response = await axios.put(`${API_ENDPOINTS.WORKOUTS}/${id}`, payload)
  return response.data
}

export const deleteWorkout = async (id: number) => {
  const response = await axios.delete(`${API_ENDPOINTS.WORKOUTS}/${id}`)
  return response.status === 204
}

export const getMemberWorkouts = async (memberId: number) => {
  const res = await axios.get(`${API_ENDPOINTS.MEMBERS}/${memberId}`)
  return res.data?.workouts || []
}

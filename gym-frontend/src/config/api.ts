export const getApiUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }

  if (import.meta.env.PROD) {
    return ''
  }

  return 'http://localhost:3000'
}

export const API_BASE_URL = getApiUrl()

export const API_ENDPOINTS = {
  MEMBER_LOGIN: `${API_BASE_URL}/members/login`,
  MEMBERS: `${API_BASE_URL}/members`,

  EMPLOYEE_LOGIN: `${API_BASE_URL}/employees/login`,
  EMPLOYEES: `${API_BASE_URL}/employees`,

  WORKOUTS: `${API_BASE_URL}/workouts`
}

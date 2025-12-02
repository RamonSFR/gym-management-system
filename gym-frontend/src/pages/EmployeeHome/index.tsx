import { useNavigate, useParams } from 'react-router-dom'

import { getEmployeeById } from '../../services/employeeService'
import { useEffect, useState } from 'react'
import { useAuth } from '../../Contexts/AuthProvider'
import { BounceLoader } from 'react-spinners'

const EmployeeHome = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()

  const [employee, setEmployee] = useState<Employee | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    const mid = Number(id)
    if (Number.isNaN(mid)) return

    if (!user) {
      navigate('/')
      return
    }

    // If logged user is not an admin/has no special role, ensure they only access their own page
    const isAdmin = !!(user as Employee).role
    if (!isAdmin) {
      const loggedId = Number((user as Employee).id)
      if (Number.isNaN(loggedId) || loggedId !== mid) {
        navigate('/')
        return
      }
    }

    setTimeout(() => setIsLoading(true), 0)
    getEmployeeById(mid)
      .then((emp) => {
        if (!emp) {
          navigate('/')
          return
        }
        setEmployee(emp as Employee)
      })
      .catch((err: unknown) => {
        console.error('Failed to load employee', err)
        navigate('/')
      })
      .finally(() => setTimeout(() => setIsLoading(false), 0))
  }, [id, navigate, user])

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
        <BounceLoader color="#36d7b7" />
      </div>
    )
  }

  return <h1>Hello {employee?.name}</h1>
}

export default EmployeeHome

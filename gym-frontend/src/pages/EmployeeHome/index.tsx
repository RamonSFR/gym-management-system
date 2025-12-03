import { useNavigate, useParams } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'

import { getEmployeeById } from '../../services/employeeService'
import { useEffect, useState } from 'react'
import { useAuth } from '../../Contexts/AuthProvider'
import Aside from '../../components/Aside'
import MembersList from '../../components/MembersList'
import EmployeesList from '../../components/EmployeesList'

import * as S from './styles'

const EmployeeHome = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()

  const [employee, setEmployee] = useState<Employee | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [view, setView] = useState<'members' | 'employees' | 'info'>('members')

  useEffect(() => {
    if (!id) return
    const mid = Number(id)
    if (Number.isNaN(mid)) return

    if (!user) {
      navigate('/')
      return
    }

    type AuthUser = Partial<Employee> & Partial<Member> & { role?: string }
    const asAuthUser = user as AuthUser | null
    const isEmployeeUser =
      !!asAuthUser && typeof asAuthUser.role !== 'undefined'
    if (!isEmployeeUser) {
      navigate('/')
      return
    }

    const role = String(asAuthUser?.role || '')
    const isAdmin = role.toLowerCase() === 'admin'
    if (!isAdmin) {
      const loggedId = Number(asAuthUser?.id)
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

  if (!employee) return null

  if (isLoading) return <BounceLoader />

  return (
    <S.Container>
      <Aside
        name={employee.name}
        role={employee.role}
        current={view}
        onNavigate={setView}
      />
      <S.ContentArea>
        {view === 'members' && <MembersList />}
        {view === 'employees' && <EmployeesList />}
        {view === 'info' && (
          <div>
            <h2>Account</h2>
            <p>Name: {employee.name}</p>
            <p>Role: {employee.role}</p>
          </div>
        )}
      </S.ContentArea>
    </S.Container>
  )
}

export default EmployeeHome

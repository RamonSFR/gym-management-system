import { useNavigate, useParams } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'

import { getEmployeeById, updateEmployee } from '../../services/employeeService'
import { useEffect, useState } from 'react'
import { useAuth } from '../../Contexts/AuthProvider'
import Aside from '../../components/Aside'
import MembersList from '../../components/MembersList'
import EmployeesList from '../../components/EmployeesList'

import * as S from './styles'
import Button from '../../components/Button'

const EmployeeHome = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { user, signin } = useAuth()

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

  const [form, setForm] = useState({ name: '', email: '', cpf: '' })
  const [isSaving, setIsSaving] = useState(false)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (!employee) return
    setForm({
      name: employee.name || '',
      email: employee.email || '',
      cpf: employee.cpf || ''
    })
  }, [employee])

  if (!employee) return null

  if (isLoading) return <BounceLoader />

  const handleChange = (field: 'name' | 'email' | 'cpf', value: string) => {
    setForm((s) => ({ ...s, [field]: value }))
  }

  const handleSave = async () => {
    if (!employee) return
    setIsSaving(true)
    try {
      const updated = await updateEmployee(employee.id, {
        name: form.name,
        email: form.email,
        cpf: form.cpf
      })
      setEmployee(updated as Employee)
      const asAuthUser = user as
        | (Partial<Employee> & Partial<Member> & { role?: string })
        | null
      if (asAuthUser && Number(asAuthUser.id) === updated.id) {
        signin({ ...asAuthUser, ...updated } as Employee)
      }
    } catch (err: unknown) {
      console.error('Failed to update employee', err)
    } finally {
      setIsSaving(false)
    }
  }

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
          <S.AccountContainer>
            <h2>Account</h2>

            <S.FieldRow>
              <S.Label>Name</S.Label>
              {editing ? (
                <S.Input
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              ) : (
                <S.ReadonlyValue>{employee.name}</S.ReadonlyValue>
              )}
            </S.FieldRow>

            <S.FieldRow>
              <S.Label>Email</S.Label>
              {editing ? (
                <S.Input
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              ) : (
                <S.ReadonlyValue>{employee.email}</S.ReadonlyValue>
              )}
            </S.FieldRow>

            <S.FieldRow>
              <S.Label>CPF</S.Label>
              {editing ? (
                <S.Input
                  value={form.cpf}
                  onChange={(e) => handleChange('cpf', e.target.value)}
                />
              ) : (
                <S.ReadonlyValue>{employee.cpf}</S.ReadonlyValue>
              )}
            </S.FieldRow>

            <S.FieldRow>
              <S.Label>Role</S.Label>
              <S.ReadonlyValue>{employee.role}</S.ReadonlyValue>
            </S.FieldRow>

            <S.FieldRow>
              <S.Label>Wage</S.Label>
              <S.ReadonlyValue>{employee.wage}</S.ReadonlyValue>
            </S.FieldRow>

            <S.ButtonRow>
              {!editing ? (
                <Button onClick={() => setEditing(true)}>Edit</Button>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setEditing(false)
                      setForm({
                        name: employee.name,
                        email: employee.email,
                        cpf: employee.cpf
                      })
                    }}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={async () => {
                      await handleSave()
                      setEditing(false)
                    }}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                </>
              )}
            </S.ButtonRow>
          </S.AccountContainer>
        )}
      </S.ContentArea>
    </S.Container>
  )
}

export default EmployeeHome

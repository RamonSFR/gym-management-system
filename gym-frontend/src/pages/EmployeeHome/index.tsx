import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'

import { getEmployeeById, updateEmployee } from '../../services/employeeService'
import { useAuth } from '../../Contexts/AuthProvider'
import Aside from '../../components/Aside'
import MembersList from '../../components/MembersList'
import EmployeesList from '../../components/EmployeesList'
import WorkoutsList from '../../components/WorkoutsList'

import * as S from './styles'
import { validateUpdateEmployee } from '../../schemas/validation'
import Alert from '../../components/Alert'

const EmployeeHome = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { user, signin } = useAuth()

  const [employee, setEmployee] = useState<Employee | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [view, setView] = useState<
    'members' | 'employees' | 'info' | 'workouts'
  >('members')

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
  const [alerts, setAlerts] = useState<
    Array<{ type: 'success' | 'error'; message: string }>
  >([])
  const [errors, setErrors] = useState<Record<string, string>>({})

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
      const payload = {
        id: employee.id,
        name: form.name,
        email: form.email,
        cpf: form.cpf,
        role: employee.role,
        wage: employee.wage
      }
      const validation = validateUpdateEmployee(payload)
      if (!validation.success) {
        setErrors(validation.errors)
        const firstKey = Object.keys(validation.errors)[0]
        setAlerts((prev) => [
          ...prev,
          { type: 'error', message: validation.errors[firstKey] }
        ])
        setIsSaving(false)
        return
      }

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
      setAlerts((prev) => [
        ...prev,
        { type: 'success', message: 'Account updated' }
      ])
      setErrors({})
    } catch (err: unknown) {
      console.error('Failed to update employee', err)
      let msg = 'Failed to update'
      try {
        const cast = err as unknown as {
          response?: { data?: { message?: string } }
        }
        if (
          cast &&
          cast.response &&
          cast.response.data &&
          cast.response.data.message
        ) {
          msg = cast.response.data.message
        }
      } catch(err) {
        console.error(`Error: ${err}`)
      }
      setAlerts((prev) => [...prev, { type: 'error', message: String(msg) }])
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
        {alerts.map((a, i) => (
          <Alert key={i} type={a.type}>
            {a.message}
          </Alert>
        ))}
        {view === 'members' && <MembersList />}
        {view === 'employees' && <EmployeesList />}
        {view === 'workouts' && <WorkoutsList />}
        {view === 'info' && (
          <S.AccountContainer>
            <h2>Account</h2>

            <S.FieldRow>
              <S.Label>Name</S.Label>
              <S.Input
                className={errors.name ? 'isError' : ''}
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </S.FieldRow>

            <S.FieldRow>
              <S.Label>Email</S.Label>
              <S.Input
                className={errors.email ? 'isError' : ''}
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </S.FieldRow>

            <S.FieldRow>
              <S.Label>CPF</S.Label>
              <S.Input
                className={errors.cpf ? 'isError' : ''}
                value={form.cpf}
                onChange={(e) => handleChange('cpf', e.target.value)}
              />
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
              <button
                onClick={() =>
                  setForm({
                    name: employee.name,
                    email: employee.email,
                    cpf: employee.cpf
                  })
                }
                disabled={isSaving}
              >
                Cancel
              </button>
              <button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </S.ButtonRow>
          </S.AccountContainer>
        )}
      </S.ContentArea>
    </S.Container>
  )
}

export default EmployeeHome

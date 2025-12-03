import { useEffect, useState } from 'react'
import { useAuth } from '../../Contexts/AuthProvider'

import Button from '../Button'
import SearchBar from '../SearchBar'
import Modal from '../Modal'

import * as S from './styles'

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../../services/employeeService'
import {
  validateCreateEmployee,
  validateUpdateEmployee
} from '../../schemas/validation'
import Alert from '../Alert'

const EmployeesList = () => {
  const [employees, setEmployees] = useState<Employee[] | null>(null)
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<Employee | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    cpf: '',
    role: 'staff',
    wage: 0,
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [alerts, setAlerts] = useState<Array<{ type: 'success' | 'error'; message: string }>>([])
  type AuthUser = Partial<Employee> & Partial<Member> & { role?: string }
  const asAuthUser = user as AuthUser | null

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await getEmployees()
        if (mounted) setEmployees(data)
      } catch (e) {
        console.error('Failed to load employees', e)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const openNew = () => {
    setEditing(null)
    setForm({
      name: '',
      email: '',
      cpf: '',
      role: 'staff',
      wage: 0,
      password: ''
    })
  setErrors({})
    setIsModalOpen(true)
  }

  const openEdit = (m: Employee) => {
    const currentId = Number(asAuthUser?.id)
    if (!Number.isNaN(currentId) && currentId === m.id) return
    setEditing(m)
    setForm({
      name: m.name,
      email: m.email,
      cpf: m.cpf,
      role: m.role,
      wage: m.wage,
      password: ''
    })
  setErrors({})
    setIsModalOpen(true)
  }

  const handleChange = (k: string, v: string | number) =>
    setForm((s) => ({ ...s, [k]: v }))

  const handleSave = async () => {
    try {
      if (editing) {
        const payload = {
          id: editing.id,
          name: form.name,
          email: form.email,
          role: form.role,
          cpf: form.cpf,
          wage: Number(form.wage)
        }
        const validation = validateUpdateEmployee(payload)
        if (!validation.success) {
          setErrors(validation.errors)
          const firstKey = Object.keys(validation.errors)[0]
          setAlerts((prev) => [...prev, { type: 'error', message: validation.errors[firstKey] }])
          return
        }

        const updated = await updateEmployee(editing.id, {
          name: form.name,
          email: form.email,
          role: form.role,
          cpf: form.cpf,
          wage: Number(form.wage)
        })
        setEmployees((prev) =>
          prev
            ? prev.map((m) => (m.id === updated.id ? updated : m))
            : [updated]
        )
      } else {
        const createPayload = {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          cpf: form.cpf,
          wage: Number(form.wage)
        }
        const validation = validateCreateEmployee(createPayload)
        if (!validation.success) {
          setErrors(validation.errors)
          const firstKey = Object.keys(validation.errors)[0]
          setAlerts((prev) => [...prev, { type: 'error', message: validation.errors[firstKey] }])
          return
        }

        const created = await createEmployee(createPayload)
        setEmployees((prev) => (prev ? [created, ...prev] : [created]))
      }
  setErrors({})
  setIsModalOpen(false)
    } catch (err) {
      console.error('Save failed', err)
      type ErrResp = { response?: { data?: { message?: string } } }
      const msg = (err as ErrResp).response?.data?.message ?? 'Failed'
      setAlerts((prev) => [...prev, { type: 'error', message: String(msg) }])
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete employee?')) return
    try {
      await deleteEmployee(id)
      setEmployees((prev) => (prev ? prev.filter((m) => m.id !== id) : null))
    } catch (e) {
      console.error('Delete failed', e)
      setAlerts((prev) => [
        ...prev,
        { type: 'error', message: 'Delete failed' }
      ])
    }
  }

  const filtered = (employees || []).filter((m) => {
    const q = query.toLowerCase()
    return (
      String(m.name).toLowerCase().includes(q) ||
      String(m.email).toLowerCase().includes(q) ||
      String(m.cpf).toLowerCase().includes(q) ||
      String(m.role).toLowerCase().includes(q)
    )
  })

  const currentId = Number(asAuthUser?.id)
  const visible = filtered.filter(
    (m) => !(Number.isNaN(currentId) ? false : m.id === currentId)
  )

  return (
    <S.Container>
      {alerts.map((alert, i) => (
        <Alert key={i} type={alert.type}>
          {alert.message}
        </Alert>
      ))}
      <h2>Employees List:</h2>
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search employees..."
      />
      <S.labels>
        <li>
          <p>ID:</p>
        </li>
        <li>
          <p>Name:</p>
        </li>
        <li>
          <p>CPF:</p>
        </li>
        <li>
          <p>Email:</p>
        </li>
        <li>
          <p>Role:</p>
        </li>
        <li>
          <p>Actions:</p>
        </li>
      </S.labels>
      <S.MembersContainer>
        {visible.map((m) => (
          <S.MemberCard key={m.id}>
            <ul>
              <li>
                <p>{m.id}</p>
                <p>{m.name}</p>
                <p>{m.cpf}</p>
                <p>{m.email}</p>
                <p>{m.role}</p>
                <S.Actions>
                  <Button onClick={() => openEdit(m)}>Edit</Button>
                  <Button onClick={() => handleDelete(m.id)}>Delete</Button>
                </S.Actions>
              </li>
            </ul>
          </S.MemberCard>
        ))}
      </S.MembersContainer>
      <Button onClick={openNew}>New</Button>

      <Modal is_active={isModalOpen} onClick={() => setIsModalOpen(false)}>
        <S.ModalWrapper>
          <h3>{editing ? 'Edit employee' : 'New employee'}</h3>
          <S.FormGrid>
            <input
              placeholder="Name"
              className={errors.name ? 'isError' : ''}
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            <input
              placeholder="Email"
              className={errors.email ? 'isError' : ''}
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {!editing && (
              <input
                placeholder="Password"
                className={errors.password ? 'isError' : ''}
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
            )}
            <input
              placeholder="CPF (numbers only)"
              className={errors.cpf ? 'isError' : ''}
              value={form.cpf}
              onChange={(e) => handleChange('cpf', e.target.value)}
            />
            <input
              placeholder="Role"
              className={errors.role ? 'isError' : ''}
              value={form.role}
              onChange={(e) => handleChange('role', e.target.value)}
            />
            <input
              placeholder="Wage"
              type="number"
              className={errors.wage ? 'isError' : ''}
              value={Number(form.wage ?? 0)}
              onChange={(e) => handleChange('wage', Number(e.target.value))}
            />

            <S.ButtonRow>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </S.ButtonRow>
          </S.FormGrid>
        </S.ModalWrapper>
      </Modal>
    </S.Container>
  )
}

export default EmployeesList

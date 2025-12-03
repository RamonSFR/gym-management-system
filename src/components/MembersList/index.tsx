import { useEffect, useState } from 'react'

import Button from '../Button'
import SearchBar from '../SearchBar'
import Modal from '../Modal'

import {
  getMembers,
  createMember,
  updateMember,
  deleteMember
} from '../../services/memberService'
import {
  validateCreateMember,
  validateUpdateMember
} from '../../schemas/validation'
import Alert from '../Alert'

import * as S from './styles'

const MembersList = () => {
  const [members, setMembers] = useState<Member[] | null>(null)
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<Member | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [alerts, setAlerts] = useState<
    Array<{ type: 'success' | 'error'; message: string }>
  >([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    cpf: '',
    membership: 'silver',
    password: ''
  })

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await getMembers()
        if (mounted) setMembers(data)
      } catch (e) {
        console.error('Failed to load members', e)
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
      membership: 'silver',
      password: ''
    })
    setErrors({})
    setIsModalOpen(true)
  }

  const openEdit = (m: Member) => {
    setEditing(m)
    setForm({
      name: m.name,
      email: m.email,
      cpf: m.cpf,
      membership: m.membership,
      password: ''
    })
    setErrors({})
    setIsModalOpen(true)
  }

  const handleChange = (k: string, v: string) =>
    setForm((s) => ({ ...s, [k]: v }))

  const handleSave = async () => {
    try {
      if (editing) {
        const payload = {
          id: editing.id,
          name: form.name,
          email: form.email,
          cpf: form.cpf,
          membership: form.membership
        }
        const validation = validateUpdateMember(payload)
        if (!validation.success) {
          setErrors(validation.errors)
          const firstKey = Object.keys(validation.errors)[0]
          setAlerts((prev) => [
            ...prev,
            { type: 'error', message: validation.errors[firstKey] }
          ])
          return
        }

        const updated = await updateMember(editing.id, {
          name: form.name,
          email: form.email,
          membership: form.membership,
          cpf: form.cpf
        })
        setMembers((prev) =>
          prev
            ? prev.map((m) => (m.id === updated.id ? updated : m))
            : [updated]
        )
      } else {
        const createPayload = {
          name: form.name,
          email: form.email,
          password: form.password,
          membership: form.membership,
          cpf: form.cpf
        }
        const validation = validateCreateMember(createPayload)
        if (!validation.success) {
          setErrors(validation.errors)
          const firstKey = Object.keys(validation.errors)[0]
          setAlerts((prev) => [
            ...prev,
            { type: 'error', message: validation.errors[firstKey] }
          ])
          return
        }

        const created = await createMember(createPayload)
        setMembers((prev) => (prev ? [created, ...prev] : [created]))
      }
      setErrors({})
      setIsModalOpen(false)
    } catch (err) {
      console.error('Save failed', err)
      const msg =
        (err &&
          (err as { response?: { data?: { message?: string } } }).response?.data
            ?.message) ||
        'Failed'
      setAlerts((prev) => [...prev, { type: 'error', message: String(msg) }])
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete member?')) return
    try {
      await deleteMember(id)
      setMembers((prev) => (prev ? prev.filter((m) => m.id !== id) : null))
    } catch (e) {
      console.error('Delete failed', e)
      setAlerts((prev) => [
        ...prev,
        { type: 'error', message: 'Delete failed' }
      ])
    }
  }

  const filtered = (members || []).filter((m) => {
    const q = query.toLowerCase()
    return (
      String(m.name).toLowerCase().includes(q) ||
      String(m.email).toLowerCase().includes(q) ||
      String(m.cpf).toLowerCase().includes(q) ||
      String(m.membership).toLowerCase().includes(q)
    )
  })

  return (
    <S.Container>
      {alerts.map((alert, i) => (
        <Alert key={i} type={alert.type}>
          {alert.message}
        </Alert>
      ))}
      <h2>Members List:</h2>
      <SearchBar
        placeholder="Search members..."
        value={query}
        onChange={setQuery}
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
          <p>Membership:</p>
        </li>
        <li>
          <p>Actions:</p>
        </li>
      </S.labels>
      <S.MembersContainer>
        {filtered.map((m) => (
          <S.MemberCard key={m.id}>
            <ul>
              <li>
                <p>{m.id}</p>
                <p>{m.name}</p>
                <p>{m.cpf}</p>
                <p>{m.email}</p>
                <p>{m.membership}</p>
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
          <h3>{editing ? 'Edit member' : 'New member'}</h3>
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
            <select
              value={form.membership}
              onChange={(e) => handleChange('membership', e.target.value)}
            >
              <option value="silver">silver</option>
              <option value="gold">gold</option>
              <option value="platinum">platinum</option>
            </select>

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

export default MembersList

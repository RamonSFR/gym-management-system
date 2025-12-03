import { useEffect, useState } from 'react'

import Button from '../Button'
import Modal from '../Modal'
import Alert from '../Alert'

import { getMembers } from '../../services/memberService'
import {
  getMemberWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout
} from '../../services/workoutService'
import { useAuth } from '../../Contexts/AuthProvider'

import {
  validateCreateWorkout,
  validateUpdateWorkout
} from '../../schemas/validation'

import * as S from './styles'

const WorkoutsList = () => {
  const [members, setMembers] = useState<Member[] | null>(null)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [memberWorkouts, setMemberWorkouts] = useState<Workout[] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState<Workout | null>(null)
  const [form, setForm] = useState({
    name: '',
    description: '',
    exercises: [] as Exercise[]
  })
  const [alerts, setAlerts] = useState<
    Array<{ type: 'success' | 'error'; message: string }>
  >([])
  const { user } = useAuth()

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

  const openMember = async (m: Member) => {
    setSelectedMember(m)
    try {
      const workouts = await getMemberWorkouts(m.id)
      setMemberWorkouts(workouts)
    } catch (err) {
      console.error('Failed to fetch member workouts', err)
    }
  }

  const openNew = () => {
    setEditing(null)
    setForm({ name: '', description: '', exercises: [] })
    setIsModalOpen(true)
  }

  const openEdit = (w: Workout) => {
    setEditing(w)
    setForm({
      name: w.name,
      description: w.description || '',
      exercises: w.exercises || []
    })
    setIsModalOpen(true)
  }

  const handleExerciseChange = (
    idx: number,
    key: keyof Exercise,
    value: string | number
  ) => {
    setForm((s) => ({
      ...s,
      exercises: s.exercises.map((ex, i) =>
        i === idx ? { ...ex, [key]: value } : ex
      )
    }))
  }

  const addExercise = () =>
    setForm((s) => ({
      ...s,
      exercises: [...s.exercises, { name: '', reps: 1, interval: 30 }]
    }))

  const removeExercise = (idx: number) =>
    setForm((s) => ({
      ...s,
      exercises: s.exercises.filter((_, i) => i !== idx)
    }))

  const handleSave = async () => {
    if (!selectedMember) return
    try {
      const normalizedExercises = form.exercises.map((ex) => ({
        name: String(ex.name),
        reps: Number(ex.reps),
        interval: Number(ex.interval)
      }))
      if (editing) {
        const payload = {
          id: editing.id,
          name: form.name,
          description: form.description,
          exercises: normalizedExercises
        }
        const v = validateUpdateWorkout(payload)
        if (!v.success) {
          const first = Object.keys(v.errors)[0]
          setAlerts((p) => [...p, { type: 'error', message: v.errors[first] }])
          return
        }
        const updated = await updateWorkout(editing.id, payload)
        setMemberWorkouts((prev) =>
          prev
            ? prev.map((x) => (x.id === updated.id ? updated : x))
            : [updated]
        )
      } else {
        const asAuth = user as (Employee | Member | null) | undefined
        const trainerId =
          asAuth && typeof (asAuth as Employee).role !== 'undefined'
            ? Number((asAuth as Employee).id)
            : undefined

        if (!trainerId) {
          setAlerts((p) => [
            ...p,
            {
              type: 'error',
              message: 'You must be logged as an employee to create workouts'
            }
          ])
          return
        }

        const payload = {
          name: form.name,
          description: form.description,
          exercises: normalizedExercises,
          memberId: selectedMember.id,
          personalId: trainerId
        }
        const v = validateCreateWorkout(payload)
        if (!v.success) {
          const first = Object.keys(v.errors)[0]
          setAlerts((p) => [...p, { type: 'error', message: v.errors[first] }])
          return
        }
        const created = await createWorkout(payload)
        setMemberWorkouts((prev) => (prev ? [created, ...prev] : [created]))
      }
      setIsModalOpen(false)
    } catch (err) {
      console.error('Save workout failed', err)
      let msg = 'Failed'
      try {
        const cast = err as unknown as {
          response?: { data?: { message?: string } }
        }
        if (
          cast &&
          cast.response &&
          cast.response.data &&
          cast.response.data.message
        )
          msg = cast.response.data.message
      } catch (err) {
        console.error(`Error: ${err}`)
      }
      setAlerts((p) => [...p, { type: 'error', message: String(msg) }])
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete workout?')) return
    try {
      await deleteWorkout(id)
      setMemberWorkouts((prev) =>
        prev ? prev.filter((w) => w.id !== id) : null
      )
    } catch (err) {
      console.error('Delete workout failed', err)
      setAlerts((p) => [...p, { type: 'error', message: 'Delete failed' }])
    }
  }

  return (
    <S.Container>
      {alerts.map((a, i) => (
        <Alert key={i} type={a.type}>
          {a.message}
        </Alert>
      ))}
      <h2>Workouts</h2>
      <S.layout>
        <S.Left>
          <h3>Members:</h3>
          <S.MembersContainer>
            {(members || []).map((m) => (
              <S.MemberCard key={m.id} onClick={() => openMember(m)}>
                <ul>
                  <li>
                    <p>{m.id}</p>
                    <p>{m.name}</p>
                    <p>{m.membership}</p>
                    <S.Actions>
                      <Button onClick={() => openMember(m)}>View</Button>
                    </S.Actions>
                  </li>
                </ul>
              </S.MemberCard>
            ))}
          </S.MembersContainer>
        </S.Left>

        <S.Right>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <h3>
              {selectedMember
                ? `Workouts for ${selectedMember.name}`
                : 'Select a member'}
            </h3>
          </div>

          <S.WorkoutsList>
            {memberWorkouts && memberWorkouts.length === 0 && (
              <p>No workouts</p>
            )}
            {memberWorkouts &&
              memberWorkouts.map((w) => (
                <S.WorkoutCard key={w.id}>
                  <h4>{w.name}</h4>
                  <p>{w.description}</p>
                  <S.Actions>
                    <Button onClick={() => openEdit(w)}>Edit</Button>
                    <Button onClick={() => handleDelete(w.id)}>Delete</Button>
                  </S.Actions>
                </S.WorkoutCard>
              ))}
          </S.WorkoutsList>
          {selectedMember && <Button onClick={openNew}>New workout</Button>}
        </S.Right>
      </S.layout>

      <Modal is_active={isModalOpen} onClick={() => setIsModalOpen(false)}>
        <S.ModalWrapper>
          <h3>{editing ? 'Edit workout' : 'New workout'}</h3>
          <S.FormGrid>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            />
            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm((s) => ({ ...s, description: e.target.value }))
              }
            />

            <div>
              <h4>Exercises</h4>
              {form.exercises.map((ex, i) => (
                <S.ExerciseRow key={i}>
                  <input
                    placeholder="Exercise name"
                    value={ex.name}
                    onChange={(e) =>
                      handleExerciseChange(i, 'name', e.target.value)
                    }
                  />
                  <input
                    type="number"
                    value={ex.reps}
                    onChange={(e) =>
                      handleExerciseChange(i, 'reps', Number(e.target.value))
                    }
                  />
                  <input
                    type="number"
                    value={ex.interval}
                    onChange={(e) =>
                      handleExerciseChange(
                        i,
                        'interval',
                        Number(e.target.value)
                      )
                    }
                  />
                  <Button onClick={() => removeExercise(i)}>Remove</Button>
                </S.ExerciseRow>
              ))}
              <Button onClick={addExercise}>Add exercise</Button>
            </div>

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

export default WorkoutsList

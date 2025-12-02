import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { getMemberById } from '../../services/memberService'
import { getEmployeeById } from '../../services/employeeService'
import { useAuth } from '../../Contexts/AuthProvider'
import formatDateToDDMMYYYY from '../../utils/functions/fomatDate'

import Modal from '../../components/Modal'

import * as S from './styles'

const MembersHome: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [member, setMember] = useState<Member | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)
  const modalActive = !!selectedWorkout
  const [personalName, setPersonalName] = useState<string | null>(null)

  const images = [
    'https://linkspaces.co.uk/wp-content/uploads/2024/05/gb-botanica-gym-link-spaces-slough.jpg',
    'https://gymleco.com/cdn/shop/articles/Namnlos-design-11-1024x1024_b903e121-27ca-42b7-b44b-f8802a3485dd.png?v=1737651463&width=1024',
    'https://habitatgym.com.au/_astro/hero-home.CCo3jRKF_Z2liPpr.webp',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAgOKyWUh_S-Unb_TEj0awLDkLCoGEEiQWHA&s',
    'https://img.freepik.com/fotos-gratis/ginasio-com-equipamento-de-ciclismo-coberto_23-2149270210.jpg?semt=ais_hybrid&w=740&q=80'
  ]

  useEffect(() => {
    if (!id) return
    const mid = Number(id)
    if (Number.isNaN(mid)) return

    if (!user) {
      navigate('/')
      return
    }

    const isEmployee = !!(user as Employee).role
    if (!isEmployee) {
      const loggedMemberId = Number((user as Member).id)
      if (Number.isNaN(loggedMemberId) || loggedMemberId !== mid) {
        navigate('/')
        return
      }
    }

    setTimeout(() => setIsLoading(true), 0)
    getMemberById(mid)
      .then((m) => {
        if (!m) {
          navigate('/')
          return
        }

        const isEmpNow = !!(user as Employee).role
        if (!isEmpNow) {
          const loggedId = Number((user as Member).id)
          if (Number.isNaN(loggedId) || loggedId !== (m as Member).id) {
            navigate('/')
            return
          }
        }

        setMember(m as Member)
      })
      .catch((err: unknown) => {
        console.error('Failed to load member', err)
        navigate('/')
      })
      .finally(() => setTimeout(() => setIsLoading(false), 0))
  }, [id, navigate, user])

  const renderWorkouts = () => {
    if (!member) return null
    if (member.workouts?.length === 0)
      return <h5>Sorry, you don't have any workouts yet</h5>

    return (member.workouts || []).map((w) => (
      <S.Card onClick={() => setSelectedWorkout(w)} key={w.id}>
        <img src={images[w.id % images.length]} alt={w.name} />
        <div className="card-info">
          <h4>{w.name}</h4>
          <p>{w.description ?? ''}</p>
        </div>
      </S.Card>
    ))
  }

  const getPersonalName = async (personalId: number) => {
    try {
      const personal = await getEmployeeById(personalId)
      return personal ? personal.name : 'Unknown'
    } catch (error) {
      console.error('Failed to fetch personal trainer', error)
      return 'Unknown'
    }
  }

  // when a workout is selected, fetch the trainer name and store it in state
  useEffect(() => {
    if (!selectedWorkout) {
      setTimeout(() => setPersonalName(null), 0)
      return
    }

    let mounted = true
    ;(async () => {
      const name = await getPersonalName(selectedWorkout.personalId)
      if (mounted) setPersonalName(name)
    })()

    return () => {
      mounted = false
    }
  }, [selectedWorkout])

  return (
    <S.Container>
      {modalActive ? (
        <Modal is_active={modalActive} onClick={() => setSelectedWorkout(null)}>
          <S.ModalContent>
            <FontAwesomeIcon
              className="fa-xmark"
              icon={faXmark}
              onClick={() => setSelectedWorkout(null)}
            />

            <div>
              <h4>{selectedWorkout.name}</h4>
              <span>{selectedWorkout.description}</span>
            </div>

            <p className="label">Exercises:</p>
            <div className="exercise-list">
              {selectedWorkout.exercises.map((ex, index) => (
                <div className="exercise-card" key={index}>
                  <ul>
                    <li>
                      <span>{ex.name}</span>
                    </li>
                    <li>
                      Reps: <strong>{ex.reps}</strong>
                    </li>
                    <li>
                      Rest Interval: <strong>{ex.interval}s</strong>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <ul className="info-list">
              <li>
                <b>Made by:</b> {personalName ?? 'Loading...'}
              </li>
              <li>
                <b>Created at:</b> {formatDateToDDMMYYYY(selectedWorkout.createdAt)}
              </li>
              <li>
                <b>Last updated:</b> {formatDateToDDMMYYYY(selectedWorkout.updatedAt)}
              </li>
            </ul>
          </S.ModalContent>
        </Modal>
      ) : (
        ''
      )}

      <h1>
        Welcome <span>{member?.name}</span>
      </h1>
      <h3>My Workouts:</h3>

      <S.CardContainer>
        {isLoading ? (
          <div
            style={{ display: 'flex', justifyContent: 'center', padding: 40 }}
          >
            <BounceLoader color="#36d7b7" />
          </div>
        ) : (
          <>{renderWorkouts()}</>
        )}
      </S.CardContainer>
    </S.Container>
  )
}

export default MembersHome

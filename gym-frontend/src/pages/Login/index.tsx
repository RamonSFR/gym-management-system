import { useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'

import Button from '../../components/button'

import { employeeLogin, memberLogin } from '../../services/loginService'
import { validateLogin } from '../../schemas/validation'

import * as S from './styles'
import Alert from '../../components/Alert'

const REDIRECT_DELAY = 2500

const Login = () => {
  const navigate = useNavigate()
  const [isEmployee, setIsEmployee] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [alerts, setAlerts] = useState<Array<{ type: 'success' | 'error', message: string }>>([])

  useEffect(() => {
    const timers: number[] = []

    if (successMsg) {
      const t = window.setTimeout(() => {
        setAlerts((prev) => [...prev, { type: 'success', message: successMsg }])
      }, 0)
      timers.push(t)
    }

    if (errorMsg) {
      const t = window.setTimeout(() => {
        setAlerts((prev) => [...prev, { type: 'error', message: errorMsg }])
      }, 0)
      timers.push(t)
    }

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [successMsg, errorMsg])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      console.log('Submitting form data:', formData)

      const validation = validateLogin(formData)

      if (!validation.success) {
        setErrors(validation.errors)
        const firstKey = Object.keys(validation.errors)[0]
        if (firstKey) setErrorMsg(validation.errors[firstKey])
        return
      }

      setIsLoading(true)
      setErrorMsg('')
      setSuccessMsg('')

      if (isEmployee) {
        try {
          const employee: Employee = await employeeLogin(
            formData.email,
            formData.password
          )

          setErrors({})
          setSuccessMsg(`Welcome, ${employee.name}!`)
          setTimeout(() => {
            setIsLoading(false)
            navigate('/home')
          }, REDIRECT_DELAY)
          return
        } catch (error) {
          setIsLoading(false)
          console.error('Login failed:', error)
          setErrorMsg('Please check your credentials and try again.')
          return
        }
      }

      try {
        const member: Member = await memberLogin(
          formData.email,
          formData.password
        )

        setErrors({})
        setSuccessMsg(`Welcome, ${member.name}!`)
        setTimeout(() => {
          navigate(`/members/${member.id}`)
          setIsLoading(false)
          return
        }, REDIRECT_DELAY)
      } catch (error) {
        console.error('Login failed:', error)
        setErrorMsg('Please check your credentials and try again.')
        setIsLoading(false)
        return
      }
    },
    [formData, navigate, isEmployee]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    []
  )

  return (
    <S.Container>

      {alerts.map((alert, index) => (
        <Alert key={index} type={alert.type}>{alert.message}</Alert>
      ))}

      <S.Title>GYM</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <FontAwesomeIcon className="login-icon" icon={faCircleUser} />
        <S.ButtonsSwitch>
          <button
            type="button"
            className={`member-button ${!isEmployee ? 'is-active' : ''}`}
            onClick={() => setIsEmployee(false)}
          >
            Member
          </button>
          <button
            type="button"
            className={`employee-button ${isEmployee ? 'is-active' : ''}`}
            onClick={() => setIsEmployee(true)}
          >
            Employee
          </button>
        </S.ButtonsSwitch>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            className={errors.email ? 'error' : ''}
            disabled={isLoading}
            onChange={handleInputChange}
            name="email"
            type="email"
            value={formData.email}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            className={errors.password ? 'error' : ''}
            disabled={isLoading}
            onChange={handleInputChange}
            name="password"
            type="password"
            value={formData.password}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <ClipLoader color="#ffffff" size={20} />
          ) : (
            <>
              Login
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </>
          )}
        </Button>
      </S.Form>
    </S.Container>
  )
}

export default Login

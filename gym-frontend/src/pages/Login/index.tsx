import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'

import Button from '../../components/button'

import { employeeLogin, memberLogin } from '../../services/loginService'
import { validateLogin } from '../../schemas/validation'

import * as S from './styles'

const REDIRECT_DELAY = 2000

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      console.log('Submitting form data:', formData)

      const validation = validateLogin(formData)

      if (!validation.success) {
        setErrors(validation.errors)
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

          alert("Login successful!")
          setSuccessMsg(`Welcome, ${employee.name}!`)
          setTimeout(() => {
            navigate('/home')
          }, REDIRECT_DELAY)

        } catch (error) {
          console.error('Login failed:', error)
          setErrorMsg('Error during login. Please check your credentials and try again.')
        } finally {
          setIsLoading(false)
        }
        return
      }


      try {
        const member: Member = await memberLogin(
          formData.email,
          formData.password
        )

        alert("Login successful!")
        setSuccessMsg(`Welcome, ${member.name}!`)
        setTimeout(() => {
          navigate('/home')
        }, REDIRECT_DELAY)

      } catch (error) {
        console.error('Login failed:', error)
        setErrorMsg('Error during login. Please check your credentials and try again.')
      } finally {
        setIsLoading(false)
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
          <input disabled={isLoading} onChange={handleInputChange} name="email" type="email" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input disabled={isLoading} onChange={handleInputChange} name="password" type="password" />
        </div>
        <Button type="submit">
          <>
            Login
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </>
        </Button>
        <p>
          {isEmployee ? (
            ''
          ) : (
            <>
              doesn't have an account yet? <span>create account</span>
            </>
          )}
        </p>
      </S.Form>
    </S.Container>
  )
}

export default Login

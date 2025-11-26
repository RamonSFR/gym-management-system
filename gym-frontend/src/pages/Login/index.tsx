import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'

import Button from '../../components/button'

import * as S from './styles'

const Login = () => {
  const [isEmployee, setIsEmployee] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Login submitted")
  }

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
          <input type="email" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" />
        </div>
        <Button type='submit'>
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'

import Button from '../../components/button'

import * as S from './styles'

const Login = () => {
  return (
    <S.Container>
      <S.Title>GYM</S.Title>
      <S.Form>
        <FontAwesomeIcon className="login-icon" icon={faCircleUser} />
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" />
        </div>
        <Button>
          <>
            Login
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </>
        </Button>
        <p>
          doesn't have an account yet? <span>create account</span>
        </p>
      </S.Form>
    </S.Container>
  )
}

export default Login

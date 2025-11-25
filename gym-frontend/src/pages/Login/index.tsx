import Button from '../../components/button'

import * as S from './styles'

const Login = () => {
  return (
    <S.Container>
      <S.Title>GYM</S.Title>
      <S.Form>
        <h3>Login</h3>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" />
        </div>
        <Button>Login</Button>
        <p>
          doesn't have an account yet? <span>create account</span>
        </p>
      </S.Form>
    </S.Container>
  )
}

export default Login

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import * as S from './styles'

const Error = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }, [navigate])

  return (
    <S.Container>
      <h1>404: Page Not found</h1>
      <span>Redirecting back to login page...</span>
    </S.Container>
  )
}

export default Error

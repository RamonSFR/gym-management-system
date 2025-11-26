import type { JSX } from 'react'

import * as S from './styles'

type Props = {
  children: string | JSX.Element
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const Button = ({ children, type = 'button', onClick }: Props) => {
  return <S.Btn type={type} onClick={onClick}>{children}</S.Btn>
}

export default Button

import type { JSX } from 'react'

import * as S from './styles'

type Props = {
  children: string | JSX.Element
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({ children, type = 'button' }: Props) => {
  return <S.Btn type={type}>{children}</S.Btn>
}

export default Button

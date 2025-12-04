import type { JSX } from 'react'
//a
import * as S from './styles'

type Props = {
  children: string | JSX.Element
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
}

const Button = ({ children, type = 'button', onClick, disabled }: Props) => {
  return (
    <S.Btn
      className={disabled ? 'disabled' : ''}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </S.Btn>
  )
}

export default Button

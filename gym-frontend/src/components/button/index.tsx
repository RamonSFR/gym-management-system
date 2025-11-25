import * as S from './styles'

type Props = {
    children: string
}

const Button = (props: Props) => {
    return <S.Btn>{props.children}</S.Btn>
}

export default Button

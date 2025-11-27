import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import * as S from './styles'

export interface Props {
    type?: 'success' | 'error'
    children: React.ReactNode
}

const Alert = ({ children, type }: Props) => {
    return (
        <S.AlertContainer className={`alert ${type}`}>
            <FontAwesomeIcon icon={faCircleXmark} />
            <span>{children}</span>
        </S.AlertContainer>
    )
}

export default Alert

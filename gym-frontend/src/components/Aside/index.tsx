import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAddressBook,
  faCircleInfo,
  faCircleUser,
  faList
} from '@fortawesome/free-solid-svg-icons'

import * as S from './styles'

interface Props {
  name: string
  role: string
  current?: 'members' | 'employees' | 'info'
  onNavigate?: (v: 'members' | 'employees' | 'info') => void
}

const Aside = (props: Props) => {
  const go = (v: 'members' | 'employees' | 'info') => props.onNavigate?.(v)
  const cur = props.current
  return (
    <S.AsideContainer>
      <div className="user-info">
        <FontAwesomeIcon
          className="user-icon"
          icon={faCircleUser}
          color="#e4e4e4"
        />
        <h2>{props.name}</h2>
        <h3>{props.role}</h3>
      </div>
      <S.Nav>
        <button
          className={cur === 'members' ? 'isActive' : ''}
          onClick={() => go('members')}
        >
          <FontAwesomeIcon icon={faList} />
          Members List
        </button>
        <button
          className={cur === 'employees' ? 'isActive' : ''}
          onClick={() => go('employees')}
        >
          <FontAwesomeIcon icon={faAddressBook} />
          Employees List
        </button>
        <button
          className={cur === 'info' ? 'isActive' : ''}
          onClick={() => go('info')}
        >
          <FontAwesomeIcon icon={faCircleInfo} />
          Account Info
        </button>
      </S.Nav>
    </S.AsideContainer>
  )
}

export default Aside

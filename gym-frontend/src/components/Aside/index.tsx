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
}

const Aside = (props: Props) => {
  return (
    <S.AsideContainer>
      <div className='user-info'>
        <FontAwesomeIcon className='user-icon' icon={faCircleUser} color='#e4e4e4'/>
              <h2>{props.name}</h2>
              <h3>{props.role}</h3>
      </div>
      <S.Nav>
        <a href="">
          <FontAwesomeIcon icon={faList} />
          Members List
        </a>
        <a href="">
          <FontAwesomeIcon icon={faAddressBook} />
          Employees List
        </a>
        <a href="">
          <FontAwesomeIcon icon={faCircleInfo} />
          Account Info
        </a>
      </S.Nav>
    </S.AsideContainer>
  )
}

export default Aside

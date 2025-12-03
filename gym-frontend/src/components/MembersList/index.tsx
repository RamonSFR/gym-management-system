import SearchBar from '../SearchBar'
import * as S from './styles'

const MembersList = () => {
  return (
    <S.Container>
      <h2>Members List:</h2>
      <SearchBar />
      <S.labels>
        <li>
          <p>ID:</p>
        </li>
        <li>
          <p>Name:</p>
        </li>
        <li>
          <p>CPF:</p>
        </li>
        <li>
          <p>Email:</p>
        </li>
        <li>
          <p>Membership:</p>
        </li>
      </S.labels>
      <S.MembersContainer>
        <S.MemberCard>
          <ul>
            <li>
              <p>1</p>
              <p>James Sunderland</p>
              <p>123.456.123-22</p>
              <p>james@gmail.com</p>
              <p>Silver</p>
            </li>
          </ul>
        </S.MemberCard>
      </S.MembersContainer>
    </S.Container>
  )
}

export default MembersList

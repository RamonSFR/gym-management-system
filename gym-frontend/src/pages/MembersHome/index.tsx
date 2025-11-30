import * as S from './styles'

const MembersHome = () => {
  return (
    <S.Container>
      <h1>
        Bem vindo <span>James Sunderland</span>
      </h1>
      <h3>Meus Treinos:</h3>

      <S.CardContainer>
        <S.Card>
          <h4>Treino A - Peito e Tríceps</h4>
          <p>Segunda, Quarta e Sexta</p>
        </S.Card>
      </S.CardContainer>
    </S.Container>
  )
}

export default MembersHome

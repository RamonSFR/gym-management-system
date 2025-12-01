import { useParams } from 'react-router-dom'

import * as S from './styles'

const MembersHome = () => {
  const { id } = useParams<{ id: string }>()
  console.log('Member ID:', id)

  return (
    <S.Container>
      <h1>
        Welcome <span>James Sunderland</span>
      </h1>
      <h3>My Workouts:</h3>

      <S.CardContainer>
        <S.Card>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkarA_0L4R1NYltv8EEyaeKBoIA53bzLJFxg&s"
            alt=""
          />
          <div className="card-info">
            <h4>Workout A</h4>
            <p>Monday, Wednesday and Friday</p>
          </div>
        </S.Card>
        <S.Card>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkarA_0L4R1NYltv8EEyaeKBoIA53bzLJFxg&s"
            alt=""
          />
          <div className="card-info">
            <h4>Workout A</h4>
            <p>Monday, Wednesday and Friday</p>
          </div>
        </S.Card>
        <S.Card>
          <img
            src="https://img.freepik.com/fotos-gratis/vista-de-angulo-baixo-do-homem-de-construcao-muscular-irreconhecivel-se-preparando-para-levantar-uma-barra-em-um-clube-de-saude_637285-2497.jpg?semt=ais_hybrid&w=740&q=80"
            alt=""
          />
          <div className="card-info">
            <h4>Workout A</h4>
            <p>Monday, Wednesday and Friday</p>
          </div>
        </S.Card>
        <S.Card>
          <img
            src="https://gymleco.com/cdn/shop/articles/Namnlos-design-11-1024x1024_b903e121-27ca-42b7-b44b-f8802a3485dd.png?v=1737651463&width=1024"
            alt=""
          />
          <div className="card-info">
            <h4>Workout A</h4>
            <p>Monday, Wednesday and Friday</p>
          </div>
        </S.Card>
        <S.Card>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkarA_0L4R1NYltv8EEyaeKBoIA53bzLJFxg&s"
            alt=""
          />
          <div className="card-info">
            <h4>Workout A</h4>
            <p>Monday, Wednesday and Friday</p>
          </div>
        </S.Card>
      </S.CardContainer>
    </S.Container>
  )
}

export default MembersHome

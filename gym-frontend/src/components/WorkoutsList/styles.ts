import styled from 'styled-components'
import { colors as c } from '../../Styles/GlobalStyles'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${c.tertiary};
  border-radius: 16px;
  padding: 24px;

  h2 {
    color: ${c.lightPurple};
    font-weight: 900;
    font-size: 2em;
  }
`

export const layout = styled.div`
  display: flex;
  gap: 16px;
`

export const Left = styled.div`
  width: 50%;
`

export const Right = styled.div`
  flex: 1;
`

export const labels = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 8px 0;
  display: grid;
  grid-template-columns: 60px 2fr 1fr 140px;
  gap: 12px;
  font-weight: 700;
`

export const MembersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: calc(100vh - 360px);
  overflow-y: scroll;
  margin: 16px 0;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const MemberCard = styled.div`
  padding: 8px;
  background-color: #fff;
  border: 2px solid ${c.darkPurple};
  border-radius: 8px;
  cursor: pointer;

  ul li {
    display: flex;
    justify-content: space-between;
  }
`

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`

export const WorkoutsList = styled.div`
  max-width: 55vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const WorkoutCard = styled.div`
  background: #fff;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${c.darkPurple};

  display: flex;
  justify-content: space-between;
`

export const ModalWrapper = styled.div`
  width: 640px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
`

export const FormGrid = styled.div`
  display: grid;
  gap: 8px;

  input {
    padding: 8px 12px;
    border: 1px solid ${c.darkPurple};
    border-radius: 6px;
  }
`

export const ExerciseRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 80px auto;
  gap: 8px;
  margin-bottom: 8px;
`

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`

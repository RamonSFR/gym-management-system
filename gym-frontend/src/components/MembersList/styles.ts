import styled from 'styled-components'

import { colors as c } from '../../Styles/GlobalStyles'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${c.tertiary};
  border-radius: 16px;
  padding: 32px;

  h2 {
    color: ${c.lightPurple};
    font-weight: 900;
    font-size: 2em;
  }
`

export const labels = styled.ul`
  width: 100%;
  margin-bottom: 16px;
  font-weight: 700;
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
  display: grid;
  grid-template-columns: 60px 2fr 160px 2fr 140px 140px;
  align-items: center;
  gap: 12px;
  color: ${c.darkPurple};
  li p {
    margin: 0;
  }
`

export const MembersContainer = styled.div`
  max-height: 55vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;

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

  ul li {
    display: grid;
    grid-template-columns: 60px 2fr 160px 2fr 140px 140px;
    align-items: center;
    gap: 12px;
  }

  p {
    margin: 0;
  }
`

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`

export const ModalWrapper = styled.div`
  width: 520px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;

  h3 {
    color: ${c.darkPurple};
    margin-bottom: 16px;
  }
`

export const FormGrid = styled.div`
  display: grid;
  gap: 8px;

  input {
    padding: 8px 16px;
    border: 2px solid ${c.darkPurple};
    border-radius: 8px;
    outline: none;
    font-size: 16px;
  }

  input.isError {
    border-color: #ff4d4f;
  }

  select {
    padding: 8px 16px;
    border: 2px solid ${c.darkPurple};
    border-radius: 8px;
    outline: none;
    font-size: 16px;
  }

  select.isError {
    border-color: #ff4d4f;
  }
`

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`

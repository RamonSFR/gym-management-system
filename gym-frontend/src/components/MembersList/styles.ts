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

  display: flex;
  justify-content: space-between;
`

export const MembersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const MemberCard = styled.div`
  padding: 16px;
  background-color: #fff;
  border: 2px solid ${c.darkPurple};
  border-radius: 8px;

  ul li {
    display: flex;
    justify-content: space-between;
  }

  p {
    margin: 0;
  }
`

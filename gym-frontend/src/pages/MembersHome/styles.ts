import styled from 'styled-components'

import { colors as c } from '../../pages/Styles/GlobalStyles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 100px;
  gap: 32px;
  color: ${c.tertiary};

  span {
    color: ${c.lightPurple};
  }
`

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`

export const Card = styled.div`
  max-width: 272px;
  background-color: ${c.primary};
  border-radius: 8px;
`

import styled from 'styled-components'

import { colors as c } from '../../Styles/GlobalStyles'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10%;

  h1 {
    color: #e4e4e4e4;
    font-weight: bold;
    font-size: 3rem;
  }

  span {
    color: ${c.tertiary};
    font-weight: 400;
  }
`

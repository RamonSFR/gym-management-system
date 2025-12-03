import styled from 'styled-components'

import { colors as c } from '../../Styles/GlobalStyles'

export const Search = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e4e4e4;
  border-radius: 8px;
  font-size: 1em;
  margin-top: 16px;
  margin-bottom: 32px;

  &:focus {
    outline: none;
    border-color: ${c.primary};
  }
`

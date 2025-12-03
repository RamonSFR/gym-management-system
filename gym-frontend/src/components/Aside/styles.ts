import styled from 'styled-components'

import { colors as c } from '../../Styles/GlobalStyles'

export const AsideContainer = styled.aside`
  width: 250px;
  height: 100vh;
  background-color: ${c.primary};

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 16px;

    .user-icon {
      font-size: 128px;
    }

    h2 {
      font-size: 18px;
      font-weight: bold;
      color: ${c.tertiary};
    }

    h3 {
        color: #e4e4e4e4;
        font-weight: 500;
        font-size: 16px;
    }
  }
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;

  a {
    display: flex;
    align-items: center;
    gap: 8px;

    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.255);
    width: 100%;
    background-color: ${c.darkPurple};
    padding: 8px 16px;
    color: ${c.tertiary};

    &:hover {
      cursor: pointer;
    }
  }
`

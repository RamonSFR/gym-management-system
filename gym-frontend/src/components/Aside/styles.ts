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

  button {
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    font-size: 16px;
    gap: 8px;
    font-weight: 500;
    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.255);
    width: 100%;
    background-color: ${c.darkPurple};
    padding: 8px 16px;
    color: ${c.tertiary};

    &:hover {
      cursor: pointer;
    }

    &.isActive {
      background-color: ${c.lightPurple};
      color: ${c.primary};
    }
  }
`
